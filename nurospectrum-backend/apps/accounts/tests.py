from allauth.account.models import EmailAddress
from django.test import TestCase
from rest_framework.test import APIClient

from .models import User


class EmailPasswordAuthenticationTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_signup_creates_account_and_requires_email_verification(self):
        response = self.client.post(
            '/_allauth/browser/v1/auth/signup',
            data={'email': 'new@example.com', 'password': 'Safe-password-123!'},
            format='json',
        )

        self.assertEqual(response.status_code, 401)
        body = response.json()
        self.assertFalse(body['meta']['is_authenticated'])
        verify_flow = next(flow for flow in body['data']['flows'] if flow['id'] == 'verify_email')
        self.assertTrue(verify_flow['is_pending'])
        self.assertTrue(User.objects.filter(email='new@example.com').exists())

    def test_verified_email_password_can_sign_in(self):
        user = User.objects.create_user('member@example.com', 'Safe-password-123!')
        EmailAddress.objects.create(user=user, email=user.email, primary=True, verified=True)

        response = self.client.post(
            '/_allauth/browser/v1/auth/login',
            data={'email': user.email, 'password': 'Safe-password-123!'},
            format='json',
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['meta']['is_authenticated'])
