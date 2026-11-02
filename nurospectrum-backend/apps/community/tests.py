from django.core import mail
from django.core.cache import cache
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from apps.accounts.models import User

from .models import Membership, PartnerInquiry, StateCommunity, Story

LONG_TEXT = 'This is my story about growing up and finding the right support. ' * 2


class CommunityApiTests(TestCase):
    def setUp(self):
        cache.clear()  # reset throttling counters
        self.client = APIClient()
        self.lagos = StateCommunity.objects.create(state='Lagos', whatsapp_invite_url='https://chat.whatsapp.com/abc')
        StateCommunity.objects.create(state='Kano')
        self.user = User.objects.create_user('ada@example.com')

    def test_communities_hide_the_invite_link(self):
        data = self.client.get('/api/communities').json()
        lagos = next(c for c in data if c['state'] == 'Lagos')
        self.assertTrue(lagos['has_whatsapp'])
        self.assertNotIn('whatsapp_invite_url', lagos)

    def test_community_detail_is_available(self):
        response = self.client.get('/api/communities/Lagos')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'state': 'Lagos', 'has_whatsapp': True})

    def test_join_requires_sign_in(self):
        response = self.client.post('/api/join', {'state': 'Lagos'}, format='json')
        self.assertIn(response.status_code, (401, 403))

    def test_join_records_membership_and_returns_link(self):
        self.client.force_authenticate(self.user)
        response = self.client.post('/api/join', {'state': 'Lagos', 'role': 'family'}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['whatsapp_invite_url'], 'https://chat.whatsapp.com/abc')
        self.assertTrue(Membership.objects.filter(user=self.user, community=self.lagos, role='family').exists())
        self.user.profile.refresh_from_db()
        self.assertEqual(self.user.profile.state, 'Lagos')

    def test_join_falls_back_to_national_link(self):
        self.client.force_authenticate(self.user)
        with override_settings(WHATSAPP_NATIONAL_URL='https://chat.whatsapp.com/national'):
            response = self.client.post('/api/join', {'state': 'Kano'}, format='json')
        self.assertEqual(response.json()['whatsapp_invite_url'], 'https://chat.whatsapp.com/national')

    def test_joining_twice_does_not_duplicate(self):
        self.client.force_authenticate(self.user)
        for _ in range(2):
            self.client.post('/api/join', {'state': 'Lagos'}, format='json')
        self.assertEqual(Membership.objects.filter(user=self.user).count(), 1)

    def test_me_endpoint_updates_profile(self):
        self.client.force_authenticate(self.user)
        response = self.client.patch('/api/me', {'state': 'Oyo', 'language': 'yo'}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['language'], 'yo')

    def test_me_endpoint_returns_signed_in_profile(self):
        self.client.force_authenticate(self.user)
        response = self.client.get('/api/me')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['email'], 'ada@example.com')

    def test_me_endpoint_requires_sign_in_for_read_and_update(self):
        self.assertIn(self.client.get('/api/me').status_code, (401, 403))
        response = self.client.patch('/api/me', {'language': 'yo'}, format='json')
        self.assertIn(response.status_code, (401, 403))


class StoryTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()

    def payload(self, **extra):
        return {'text': LONG_TEXT, 'consent': True, 'is_anonymous': True, **extra}

    def test_story_is_saved_as_pending_and_not_echoed(self):
        response = self.client.post('/api/stories', self.payload(), format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {'received': True})
        self.assertEqual(Story.objects.get().status, Story.Status.PENDING)
        self.assertEqual(self.client.get('/api/stories').json()['results'], [])

    def test_consent_is_required(self):
        response = self.client.post('/api/stories', self.payload(consent=False), format='json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Story.objects.count(), 0)

    def test_honeypot_blocks_bots(self):
        response = self.client.post('/api/stories', self.payload(website='http://spam.example'), format='json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Story.objects.count(), 0)

    def test_short_story_is_rejected(self):
        response = self.client.post('/api/stories', self.payload(text='too short'), format='json')
        self.assertEqual(response.status_code, 400)

    def test_approved_anonymous_story_hides_the_name(self):
        Story.objects.create(
            display_name='Real Name', is_anonymous=True, text=LONG_TEXT, consent=True, status=Story.Status.APPROVED,
        )
        results = self.client.get('/api/stories').json()['results']
        self.assertEqual(results[0]['author_name'], 'Anonymous')
        self.assertNotIn('Real Name', str(results))


class PartnerInquiryTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()

    @override_settings(INQUIRY_NOTIFY_EMAIL='team@example.com')
    def test_inquiry_is_saved_and_emailed(self):
        response = self.client.post('/api/partner-inquiries', {
            'name': 'Tolu', 'email': 'tolu@example.com', 'kind': 'partner', 'message': 'Let us work together.',
        }, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(PartnerInquiry.objects.count(), 1)
        self.assertEqual(len(mail.outbox), 1)

    def test_invalid_kind_is_rejected(self):
        response = self.client.post('/api/partner-inquiries', {
            'name': 'Tolu', 'email': 'tolu@example.com', 'kind': 'nonsense', 'message': 'Hi',
        }, format='json')
        self.assertEqual(response.status_code, 400)
