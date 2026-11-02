"""Optional Cloudflare Turnstile check for public forms. Disabled when no secret is configured."""
import json
import urllib.parse
import urllib.request

from django.conf import settings

VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'


def verify_turnstile(token, remote_ip=None):
    secret = settings.TURNSTILE_SECRET_KEY
    if not secret:
        return True  # not configured
    if not token:
        return False
    payload = {'secret': secret, 'response': token}
    if remote_ip:
        payload['remoteip'] = remote_ip
    request = urllib.request.Request(VERIFY_URL, data=urllib.parse.urlencode(payload).encode())
    try:
        with urllib.request.urlopen(request, timeout=5) as response:
            return bool(json.load(response).get('success'))
    except Exception:
        return False  # configured but unreachable: fail closed
