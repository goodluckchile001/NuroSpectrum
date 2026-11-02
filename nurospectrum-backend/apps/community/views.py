from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from rest_framework import mixins, status, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.accounts.models import Profile
from apps.common.throttles import FormThrottle
from apps.common.turnstile import verify_turnstile

from .models import Membership, StateCommunity, Story
from .serializers import (
    CommunitySerializer, JoinSerializer, PartnerInquirySerializer, StoryPublicSerializer, StorySubmitSerializer,
)


class StoryPagination(LimitOffsetPagination):
    default_limit = 20
    max_limit = 50


def _check_turnstile(request, serializer):
    token = serializer.validated_data.pop('turnstile_token', '')
    if not verify_turnstile(token, request.META.get('REMOTE_ADDR')):
        raise ValidationError({'turnstile_token': 'Could not verify that you are human. Please try again.'})


class CommunityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StateCommunity.objects.filter(is_active=True)
    serializer_class = CommunitySerializer
    lookup_field = 'state'
    lookup_value_regex = '[^/]+'


class JoinView(APIView):
    """Sign-in required. Records membership and returns the WhatsApp invite link to open."""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = JoinSerializer(data=request.data)
        data.is_valid(raise_exception=True)
        community = get_object_or_404(StateCommunity, state=data.validated_data['state'], is_active=True)
        role = data.validated_data.get('role', '')
        membership, _ = Membership.objects.update_or_create(
            user=request.user, community=community, defaults={'role': role} if role else {},
        )
        profile, _ = Profile.objects.get_or_create(user=request.user)
        if not profile.state:
            profile.state = community.state
            profile.save(update_fields=['state'])
        return Response({
            'state': community.state,
            'joined': True,
            'whatsapp_invite_url': community.whatsapp_invite_url or settings.WHATSAPP_NATIONAL_URL,
        }, status=status.HTTP_200_OK)


class StoryViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    """GET lists approved stories. POST submits a new story for moderation (sign-in not required)."""

    pagination_class = StoryPagination

    def get_queryset(self):
        return Story.objects.filter(status=Story.Status.APPROVED)

    def get_serializer_class(self):
        return StorySubmitSerializer if self.action == 'create' else StoryPublicSerializer

    def get_throttles(self):
        return [FormThrottle()] if self.action == 'create' else super().get_throttles()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        _check_turnstile(request, serializer)
        serializer.validated_data.pop('website', None)
        author = request.user if request.user.is_authenticated else None
        Story.objects.create(author=author, **serializer.validated_data)
        # Never echo the story back: it is private until a moderator approves it.
        return Response({'received': True}, status=status.HTTP_201_CREATED)


class PartnerInquiryView(CreateAPIView):
    serializer_class = PartnerInquirySerializer

    def get_throttles(self):
        return [FormThrottle()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        _check_turnstile(request, serializer)
        serializer.validated_data.pop('website', None)
        inquiry = serializer.Meta.model.objects.create(**serializer.validated_data)
        if settings.INQUIRY_NOTIFY_EMAIL:
            send_mail(
                subject=f'New {inquiry.get_kind_display()} inquiry from {inquiry.name}',
                message=f'{inquiry.name} <{inquiry.email}>\nOrganisation: {inquiry.organisation or "-"}\n\n{inquiry.message}',
                from_email=None,
                recipient_list=[settings.INQUIRY_NOTIFY_EMAIL],
                fail_silently=True,
            )
        return Response({'received': True}, status=status.HTTP_201_CREATED)
