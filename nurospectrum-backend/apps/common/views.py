import logging

from django.db import DatabaseError, connections
from django.http import JsonResponse
from django.views.decorators.http import require_GET

logger = logging.getLogger(__name__)


@require_GET
def health_check(request):
    try:
        connections['default'].ensure_connection()
    except DatabaseError:
        logger.exception('Application health check failed to connect to the database.')
        return JsonResponse({'status': 'unavailable'}, status=503)
    return JsonResponse({'status': 'ok'})
