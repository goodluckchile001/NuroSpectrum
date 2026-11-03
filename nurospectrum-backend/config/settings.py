"""Nurospectrum API settings. Everything environment-specific comes from env vars (see .env.example)."""
import os
from pathlib import Path

import dj_database_url
from django.core.exceptions import ImproperlyConfigured
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / '.env')


def env_bool(name, default=False):
    return os.environ.get(name, str(default)).strip().lower() in ('1', 'true', 'yes', 'on')


def env_list(name, default=''):
    return [x.strip() for x in os.environ.get(name, default).split(',') if x.strip()]


def configured_allowed_hosts():
    hosts = env_list('ALLOWED_HOSTS', 'localhost,127.0.0.1')
    render_hostname = os.environ.get('RENDER_EXTERNAL_HOSTNAME', '').strip()
    if render_hostname and render_hostname not in hosts:
        hosts.append(render_hostname)
    return hosts


# --- Core -------------------------------------------------------------------
DEBUG = env_bool('DEBUG', False)  # secure by default: you must opt in to debug

SECRET_KEY = os.environ.get('SECRET_KEY', '')
if not SECRET_KEY:
    if DEBUG:
        SECRET_KEY = 'dev-only-insecure-key'
    else:
        raise ImproperlyConfigured('Set the SECRET_KEY environment variable.')

ALLOWED_HOSTS = configured_allowed_hosts()
CSRF_TRUSTED_ORIGINS = env_list('CSRF_TRUSTED_ORIGINS')
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:3000').rstrip('/')
ADMIN_URL = os.environ.get('ADMIN_URL', 'admin/')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # third party
    'rest_framework',
    'corsheaders',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'allauth.headless',
    # local
    'apps.accounts',
    'apps.content',
    'apps.community',
    'apps.common',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'
WSGI_APPLICATION = 'config.wsgi.application'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# --- Database ---------------------------------------------------------------
DATABASES = {
    'default': dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
    )
}
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# --- Auth -------------------------------------------------------------------
AUTH_USER_MODEL = 'accounts.User'
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# django-allauth, headless (API) mode with email/password and optional Google sign-in.
ACCOUNT_ADAPTER = 'apps.accounts.adapters.AccountAdapter'
SOCIALACCOUNT_ADAPTER = 'apps.accounts.adapters.SocialAccountAdapter'  # allows Google sign-ups
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_LOGIN_METHODS = {'email'}
ACCOUNT_SIGNUP_FIELDS = ['email*', 'password1*', 'password2*']
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
HEADLESS_ONLY = True
HEADLESS_FRONTEND_URLS = {
    'account_confirm_email': f'{FRONTEND_URL}/account/verify-email/{{key}}',
    'account_reset_password': f'{FRONTEND_URL}/account/password/reset',
    'account_reset_password_from_key': f'{FRONTEND_URL}/account/password/reset/key/{{key}}',
    'account_signup': f'{FRONTEND_URL}/login',
    # Where to land if the Google handshake fails
    'socialaccount_login_error': f'{FRONTEND_URL}/login?error=google',
}
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
            'client_id': os.environ.get('GOOGLE_CLIENT_ID', ''),
            'secret': os.environ.get('GOOGLE_CLIENT_SECRET', ''),
            'key': '',
        },
        'SCOPE': ['profile', 'email'],
        'AUTH_PARAMS': {'access_type': 'online'},
    }
}

# --- REST framework ---------------------------------------------------------
_num_proxies = os.environ.get('NUM_PROXIES')
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ['rest_framework.authentication.SessionAuthentication'],
    'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.AllowAny'],
    'DEFAULT_RENDERER_CLASSES': ['rest_framework.renderers.JSONRenderer']
    + (['rest_framework.renderers.BrowsableAPIRenderer'] if DEBUG else []),
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {'anon': '300/hour', 'user': '2000/hour', 'forms': '10/hour'},
    'NUM_PROXIES': int(_num_proxies) if _num_proxies else None,
}

# --- CORS / cookies ---------------------------------------------------------
# Not needed when Next.js proxies /api, /_allauth and /accounts to Django (recommended).
CORS_ALLOWED_ORIGINS = env_list('CORS_ALLOWED_ORIGINS')
CORS_ALLOW_CREDENTIALS = True
SESSION_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_HTTPONLY = False  # the frontend reads the csrftoken cookie to send X-CSRFToken

# --- App settings -----------------------------------------------------------
WHATSAPP_NATIONAL_URL = os.environ.get('WHATSAPP_NATIONAL_URL', '')
TURNSTILE_SECRET_KEY = os.environ.get('TURNSTILE_SECRET_KEY', '')
INQUIRY_NOTIFY_EMAIL = os.environ.get('INQUIRY_NOTIFY_EMAIL', '')

# --- Email ------------------------------------------------------------------
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', 'Nurospectrum <no-reply@localhost>')
if os.environ.get('EMAIL_HOST'):
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = os.environ['EMAIL_HOST']
    EMAIL_PORT = int(os.environ.get('EMAIL_PORT', '587'))
    EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', '')
    EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')
    EMAIL_USE_TLS = env_bool('EMAIL_USE_TLS', True)
else:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# --- i18n / static ----------------------------------------------------------
LANGUAGE_CODE = 'en'
TIME_ZONE = 'Africa/Lagos'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_URL = '/media/'
MEDIA_ROOT = Path(os.environ.get('MEDIA_ROOT', BASE_DIR / 'media'))
STORAGES = {
    'default': {'BACKEND': 'django.core.files.storage.FileSystemStorage'},
    'staticfiles': {'BACKEND': 'whitenoise.storage.CompressedStaticFilesStorage'},
}

# --- Production hardening ---------------------------------------------------
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = env_bool('SECURE_SSL_REDIRECT', True)
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 60 * 60 * 24 * 30
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
