from django.conf import settings
from rest_framework import serializers

from apps.common.constants import ROLES, STATE_CHOICES

from .models import PartnerInquiry, StateCommunity, Story


class CommunitySerializer(serializers.ModelSerializer):
    # The invite link itself is only given to signed-in people via POST /api/join/.
    has_whatsapp = serializers.SerializerMethodField()

    class Meta:
        model = StateCommunity
        fields = ['state', 'has_whatsapp']

    def get_has_whatsapp(self, obj):
        return bool(obj.whatsapp_invite_url or settings.WHATSAPP_NATIONAL_URL)


class JoinSerializer(serializers.Serializer):
    state = serializers.ChoiceField(choices=STATE_CHOICES)
    role = serializers.ChoiceField(choices=ROLES, required=False, allow_blank=True)


class _SpamGuardMixin(serializers.Serializer):
    # Honeypot: real people never see or fill this field; bots often do.
    website = serializers.CharField(write_only=True, required=False, allow_blank=True)
    turnstile_token = serializers.CharField(write_only=True, required=False, allow_blank=True)

    def validate_website(self, value):
        if value:
            raise serializers.ValidationError('Invalid submission.')
        return value


class StorySubmitSerializer(_SpamGuardMixin, serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ['display_name', 'is_anonymous', 'state', 'text', 'consent', 'website', 'turnstile_token']
        extra_kwargs = {'text': {'min_length': 50, 'max_length': 5000}}

    def validate_consent(self, value):
        if not value:
            raise serializers.ValidationError('Please agree to have your story reviewed and published.')
        return value


class StoryPublicSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Story
        fields = ['id', 'author_name', 'state', 'text', 'created_at']

    def get_author_name(self, obj):
        return 'Anonymous' if obj.is_anonymous or not obj.display_name else obj.display_name


class PartnerInquirySerializer(_SpamGuardMixin, serializers.ModelSerializer):
    class Meta:
        model = PartnerInquiry
        fields = ['name', 'email', 'organisation', 'kind', 'message', 'website', 'turnstile_token']
        extra_kwargs = {'message': {'max_length': 5000}}
