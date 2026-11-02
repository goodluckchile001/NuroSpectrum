from django.core.exceptions import ValidationError

from apps.common.constants import LANGUAGE_CODES


def validate_image_size(image):
    if image.size > 5 * 1024 * 1024:
        raise ValidationError('Images must be no larger than 5 MB.')


def validate_translations(value):
    """Translated text is stored as {"en": "...", "ha": "...", ...}. English is required."""
    if not isinstance(value, dict):
        raise ValidationError('Must be an object like {"en": "..."}.')
    unknown = set(value) - set(LANGUAGE_CODES)
    if unknown:
        raise ValidationError(f'Unknown language codes: {", ".join(sorted(unknown))}.')
    if not str(value.get('en', '')).strip():
        raise ValidationError('An English ("en") version is required.')
    if not all(isinstance(v, str) for v in value.values()):
        raise ValidationError('Every translation must be text.')


def validate_whatsapp_url(value):
    if value and not value.startswith(('https://chat.whatsapp.com/', 'https://whatsapp.com/channel/')):
        raise ValidationError('Use a WhatsApp invite link that starts with https://chat.whatsapp.com/')
