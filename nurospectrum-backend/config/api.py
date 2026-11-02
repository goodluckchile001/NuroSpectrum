from django.http import JsonResponse
from django.urls import path
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.routers import DefaultRouter

from apps.accounts.views import MeView
from apps.community.views import CommunityViewSet, JoinView, PartnerInquiryView, StoryViewSet
from apps.content.views import EventViewSet, PostViewSet, ResourceViewSet

router = DefaultRouter(trailing_slash=False)
router.register('posts', PostViewSet, basename='post')
router.register('events', EventViewSet, basename='event')
router.register('resources', ResourceViewSet, basename='resource')
router.register('communities', CommunityViewSet, basename='community')
router.register('stories', StoryViewSet, basename='story')


@ensure_csrf_cookie
def csrf(request):
    """Call once on page load so the browser receives the csrftoken cookie."""
    return JsonResponse({'ok': True})


def health(request):
    return JsonResponse({'status': 'ok'})


api_urlpatterns = [
    path('csrf', csrf),
    path('health', health),
    path('me', MeView.as_view()),
    path('join', JoinView.as_view()),
    path('partner-inquiries', PartnerInquiryView.as_view()),
    *router.urls,
]
