from django.test import TestCase
from rest_framework.test import APIClient


class UtilityEndpointTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_health_endpoint_returns_ok(self):
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'status': 'ok'})

    def test_csrf_endpoint_sets_cookie(self):
        response = self.client.get('/api/csrf')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'ok': True})
        self.assertIn('csrftoken', self.client.cookies)
