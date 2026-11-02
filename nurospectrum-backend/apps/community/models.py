from django.conf import settings
from django.db import models

from apps.common.constants import ROLES, STATE_CHOICES
from apps.common.validators import validate_whatsapp_url


class StateCommunity(models.Model):
    state = models.CharField(max_length=32, choices=STATE_CHOICES, unique=True)
    whatsapp_invite_url = models.URLField(
        blank=True,
        validators=[validate_whatsapp_url],
        help_text='WhatsApp invite link for this state. If empty, the national link is used.',
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['state']
        verbose_name_plural = 'state communities'

    def __str__(self):
        return self.state


class Membership(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='memberships')
    community = models.ForeignKey(StateCommunity, on_delete=models.CASCADE, related_name='memberships')
    role = models.CharField(max_length=20, choices=ROLES, blank=True)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-joined_at']
        constraints = [models.UniqueConstraint(fields=['user', 'community'], name='unique_membership')]

    def __str__(self):
        return f'{self.user} in {self.community}'


class Story(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', 'Pending review'
        APPROVED = 'approved', 'Approved'
        REJECTED = 'rejected', 'Rejected'

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name='stories',
        help_text='Private. Never shown publicly, even for named stories.',
    )
    display_name = models.CharField(max_length=80, blank=True)
    is_anonymous = models.BooleanField(default=False)
    state = models.CharField(max_length=32, choices=STATE_CHOICES, blank=True)
    text = models.TextField()
    consent = models.BooleanField(default=False, help_text='The sender agreed to publication after review.')
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)
    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name='+',
    )

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'stories'

    def __str__(self):
        return f'Story #{self.pk} ({self.status})'


class PartnerInquiry(models.Model):
    class Kind(models.TextChoices):
        PARTNER = 'partner', 'Partner with Nurospectrum'
        INVEST = 'invest', 'Invest or fund'
        CONTRIBUTE = 'contribute', 'Contribute my skills'

    name = models.CharField(max_length=120)
    email = models.EmailField()
    organisation = models.CharField(max_length=160, blank=True)
    kind = models.CharField(max_length=12, choices=Kind.choices)
    message = models.TextField()
    handled = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'partner inquiries'

    def __str__(self):
        return f'{self.name} ({self.get_kind_display()})'
