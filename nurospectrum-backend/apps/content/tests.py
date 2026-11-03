from datetime import timedelta
from tempfile import TemporaryDirectory

from django.core.management import call_command
from django.test import TestCase, override_settings
from django.utils import timezone
from rest_framework.test import APIClient

from .admin import EventAdminForm, PostAdminForm
from .models import Event, Post, PostImage, Resource


class ContentAdminFormTests(TestCase):
    def test_blog_post_form_generates_slug_and_saves_translations(self):
        form = PostAdminForm(data={
            'title_en': 'A Guide to Neurodiversity',
            'title_ha': 'Jagora',
            'tag_en': 'Wellbeing',
            'summary_en': 'An introduction.',
            'summary_ha': 'Gabatarwa.',
            'body': 'Article text.',
            'tone': 'green',
            'published_at': timezone.localtime().strftime('%Y-%m-%d %H:%M:%S'),
        })

        self.assertTrue(form.is_valid(), form.errors)
        post = form.save()

        self.assertEqual(post.slug, 'a-guide-to-neurodiversity')
        self.assertEqual(post.title, {'en': 'A Guide to Neurodiversity', 'ha': 'Jagora'})
        self.assertEqual(post.tag, {'en': 'Wellbeing'})
        self.assertEqual(post.summary, {'en': 'An introduction.', 'ha': 'Gabatarwa.'})
        self.assertEqual(Post._meta.verbose_name, 'blog post')
        self.assertNotIn('title', form.fields)
        self.assertNotIn('summary', form.fields)

    def test_blog_post_form_updates_slug_when_title_changes(self):
        post = Post.objects.create(
            slug='old-title',
            title={'en': 'Old title'},
            tag={'en': 'Tag'},
            summary={'en': 'Summary'},
            body='Article text.',
        )
        form = PostAdminForm(instance=post, data={
            'title_en': 'A New Title',
            'tag_en': 'Tag',
            'summary_en': 'Summary',
            'body': 'Updated article text.',
            'tone': 'green',
            'published': '',
            'published_at': post.published_at.isoformat(),
        })

        self.assertTrue(form.is_valid(), form.errors)
        self.assertEqual(form.save().slug, 'a-new-title')

    def test_event_form_saves_translations_without_json_fields(self):
        form = EventAdminForm(data={
            'title_en': 'Community meeting',
            'title_ha': "Taron al'umma",
            'description_en': 'Meet and connect.',
            'date': '2026-11-14',
            'tone': 'green',
        })

        self.assertTrue(form.is_valid(), form.errors)
        event = form.save()

        self.assertEqual(event.title, {'en': 'Community meeting', 'ha': "Taron al'umma"})
        self.assertEqual(event.description, {'en': 'Meet and connect.'})
        self.assertNotIn('title', form.fields)
        self.assertNotIn('description', form.fields)


class ContentApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.post = Post.objects.create(
            slug='shown', tag={'en': 'Basics'}, title={'en': 'Shown'}, summary={'en': 'S'},
            body='One.\n\nTwo.\n\nThree.', note='Note', source='Src', published=True,
        )
        Post.objects.create(
            slug='hidden', tag={'en': 'Basics'}, title={'en': 'Hidden'}, summary={'en': 'S'}, body='x', published=False,
        )

    def test_only_published_posts_are_listed(self):
        response = self.client.get('/api/posts')
        self.assertEqual(response.status_code, 200)
        self.assertEqual([p['slug'] for p in response.json()], ['shown'])

    def test_post_detail_splits_paragraphs(self):
        response = self.client.get('/api/posts/shown')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['paragraphs'], ['One.', 'Two.', 'Three.'])

    def test_post_images_are_returned_with_their_positions(self):
        self.post.cover_image = 'blog/covers/shown.png'
        self.post.cover_alt = 'A sample cover'
        self.post.save()
        inline_image = PostImage.objects.create(
            post=self.post,
            image='blog/inline/diagram.png',
            alt_text='A simple diagram',
            caption='A helpful diagram',
            position=1,
        )

        listing = self.client.get('/api/posts').json()[0]
        detail = self.client.get('/api/posts/shown').json()

        self.assertEqual(listing['cover_image'], '/media/blog/covers/shown.png')
        self.assertEqual(listing['cover_alt'], 'A sample cover')
        self.assertEqual(detail['images'], [{
            'id': inline_image.pk,
            'image': '/media/blog/inline/diagram.png',
            'alt_text': 'A simple diagram',
            'caption': 'A helpful diagram',
            'position': 1,
            'order': 0,
        }])

    def test_unpublished_post_is_404(self):
        self.assertEqual(self.client.get('/api/posts/hidden').status_code, 404)

    def test_events_default_to_upcoming(self):
        today = timezone.localdate()
        Event.objects.create(title={'en': 'Past'}, description={'en': 'd'}, date=today - timedelta(days=3), published=True)
        Event.objects.create(title={'en': 'Next'}, description={'en': 'd'}, date=today + timedelta(days=3), published=True)
        upcoming = [e['title']['en'] for e in self.client.get('/api/events').json()]
        everything = [e['title']['en'] for e in self.client.get('/api/events?when=all').json()]
        self.assertEqual(upcoming, ['Next'])
        self.assertEqual(everything, ['Past', 'Next'])

    def test_event_detail_is_available(self):
        event = Event.objects.create(
            title={'en': 'Next'}, description={'en': 'Details'}, date=timezone.localdate() + timedelta(days=3),
            published=True,
        )
        response = self.client.get(f'/api/events/{event.pk}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['title']['en'], 'Next')

    def test_resources_list_and_detail_only_include_published_items(self):
        resource = Resource.objects.create(
            kind=Resource.Kind.ARTICLE, title='Published resource', by='Author', published=True,
        )
        hidden = Resource.objects.create(
            kind=Resource.Kind.BOOK, title='Hidden resource', by='Author', published=False,
        )

        listing = self.client.get('/api/resources')
        self.assertEqual(listing.status_code, 200)
        self.assertEqual([item['title'] for item in listing.json()], ['Published resource'])

        detail = self.client.get(f'/api/resources/{resource.pk}')
        self.assertEqual(detail.status_code, 200)
        self.assertEqual(detail.json()['by'], 'Author')
        self.assertEqual(self.client.get(f'/api/resources/{hidden.pk}').status_code, 404)

    def test_translation_validator_requires_english(self):
        from django.core.exceptions import ValidationError

        post = Post(slug='x', tag={'ha': 'x'}, title={'en': 'T'}, summary={'en': 'S'}, body='b')
        with self.assertRaises(ValidationError):
            post.full_clean()

    def test_seed_command_is_idempotent(self):
        with TemporaryDirectory() as media_root, override_settings(MEDIA_ROOT=media_root):
            call_command('seed_site', verbosity=0)
            call_command('seed_site', verbosity=0)
            seeded_post = Post.objects.get(published=True, slug='words')
            self.assertEqual(Post.objects.filter(published=True, slug='words').count(), 1)
            self.assertEqual(seeded_post.cover_image.name, 'blog/covers/words.png')
            self.assertTrue(seeded_post.cover_alt)
