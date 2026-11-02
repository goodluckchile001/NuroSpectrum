from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static

from config.api import api_urlpatterns

urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    # Google OAuth callback lives here: /accounts/google/login/callback/
    path('accounts/', include('allauth.urls')),
    # Login/logout/session API for the frontend: /_allauth/browser/v1/...
    path('_allauth/', include('allauth.headless.urls')),
    path('api/', include(api_urlpatterns)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
