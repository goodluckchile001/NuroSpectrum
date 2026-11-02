from django.utils import timezone
from rest_framework import viewsets

from .models import Event, Post, Resource
from .serializers import EventSerializer, PostDetailSerializer, PostListSerializer, ResourceSerializer


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Post.objects.filter(published=True)
        if self.action == 'retrieve':
            return queryset.prefetch_related('images')
        return queryset

    def get_serializer_class(self):
        return PostDetailSerializer if self.action == 'retrieve' else PostListSerializer


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    """Upcoming events by default. Use ?when=all to include past events."""

    serializer_class = EventSerializer

    def get_queryset(self):
        queryset = Event.objects.filter(published=True)
        if self.request.query_params.get('when') != 'all':
            queryset = queryset.filter(date__gte=timezone.localdate())
        return queryset


class ResourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Resource.objects.filter(published=True)
    serializer_class = ResourceSerializer
