import os
from unittest.mock import patch

from django.test import TestCase
from rest_framework.test import APIClient

from config.settings import configured_allowed_hosts


class UtilityEndpointTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_health_endpoint_returns_ok(self):
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'status': 'ok'})

    def test_platform_health_endpoint_returns_ok(self):
        response = self.client.get('/healthz')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'status': 'ok'})

    def test_csrf_endpoint_sets_cookie(self):
        response = self.client.get('/api/csrf')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'ok': True})
        self.assertIn('csrftoken', self.client.cookies)

    def test_render_hostname_is_allowed_alongside_configured_hosts(self):
        with patch.dict(os.environ, {
            'ALLOWED_HOSTS': 'admin.example.com',
            'RENDER_EXTERNAL_HOSTNAME': 'nurospectrum.onrender.com',
        }):
            self.assertEqual(
                configured_allowed_hosts(),
                ['admin.example.com', 'nurospectrum.onrender.com'],
            )
