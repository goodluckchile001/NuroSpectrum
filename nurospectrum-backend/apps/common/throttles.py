from rest_framework.throttling import SimpleRateThrottle


class FormThrottle(SimpleRateThrottle):
    """Strict per-client limit for public form submissions (rate: THROTTLE_RATES['forms'])."""

    scope = 'forms'

    def get_cache_key(self, request, view):
        return self.cache_format % {'scope': self.scope, 'ident': self.get_ident(request)}
