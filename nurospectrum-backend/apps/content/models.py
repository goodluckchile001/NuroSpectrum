from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils import timezone

from apps.common.constants import TONES
from apps.common.validators import validate_image_size, validate_translations

IMAGE_VALIDATORS = [
    FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'webp']),
    validate_image_size,
]


class Post(models.Model):
    """A blog article. title/summary/tag are translated: {"en": "...", "ha": "...", ...}."""

    slug = models.SlugField(unique=True)
    tone = models.CharField(max_length=10, choices=TONES, default='green')
    tag = models.JSONField(validators=[validate_translations])
    title = models.JSONField(validators=[validate_translations])
    summary = models.JSONField(validators=[validate_translations])
    cover_image = models.ImageField(
        upload_to='blog/covers/',
        blank=True,
        validators=IMAGE_VALIDATORS,
        help_text='Optional image shown on the blog card and at the top of the article. Max 5 MB.',
    )
    cover_alt = models.CharField(max_length=250, blank=True, help_text='Describe the image for screen readers.')
    body = models.TextField(help_text='English text. Separate paragraphs with a blank line.')
    note = models.CharField(max_length=200, blank=True, help_text='The highlighted line shown after the 2nd paragraph.')
    source = models.TextField(blank=True, help_text='Citation for the article.')
    published = models.BooleanField(default=False)
    published_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['published_at', 'id']
        verbose_name = 'blog post'
        verbose_name_plural = 'blog posts'

    def __str__(self):
        return self.title.get('en', self.slug)


class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='blog/inline/', validators=IMAGE_VALIDATORS)
    alt_text = models.CharField(max_length=250, help_text='Describe the image for screen readers.')
    caption = models.CharField(max_length=300, blank=True)
    position = models.PositiveIntegerField(
        default=1,
        help_text='0 places the image before the first paragraph; 1 places it after paragraph 1, and so on.',
    )
    order = models.PositiveIntegerField(default=0, help_text='Order for images at the same position.')

    class Meta:
        ordering = ['position', 'order', 'id']

    def __str__(self):
        return f'Image for {self.post}'


class Event(models.Model):
    title = models.JSONField(validators=[validate_translations])
    description = models.JSONField(validators=[validate_translations])
    date = models.DateField()
    location = models.CharField(max_length=120, blank=True)
    is_online = models.BooleanField(default=False)
    tone = models.CharField(max_length=10, choices=TONES, default='green')
    published = models.BooleanField(default=False)

    class Meta:
        ordering = ['date', 'id']

    def __str__(self):
        return f"{self.title.get('en', 'Event')} ({self.date})"


class Resource(models.Model):
    """A Library item. When url is empty the frontend builds a search link instead."""

    class Kind(models.TextChoices):
        ARTICLE = 'article', 'Article or research'
        BOOK = 'book', 'Book'
        MAGAZINE = 'magazine', 'Magazine or journal'
        VIDEO = 'video', 'Video'

    kind = models.CharField(max_length=10, choices=Kind.choices)
    title = models.CharField(max_length=250)
    by = models.CharField(max_length=250, help_text='Author, publisher and year.')
    note = models.CharField(max_length=300, blank=True)
    url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    published = models.BooleanField(default=True)

    class Meta:
        ordering = ['kind', 'order', 'id']

    def __str__(self):
        return self.title
