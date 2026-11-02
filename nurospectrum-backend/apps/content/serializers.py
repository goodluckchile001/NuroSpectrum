from rest_framework import serializers

from .models import Event, Post, PostImage, Resource


class PostListSerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['slug', 'tone', 'tag', 'title', 'summary', 'cover_image', 'cover_alt', 'published_at']

    def get_cover_image(self, obj):
        return obj.cover_image.url if obj.cover_image else None


class PostImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = PostImage
        fields = ['id', 'image', 'alt_text', 'caption', 'position', 'order']

    def get_image(self, obj):
        return obj.image.url


class PostDetailSerializer(PostListSerializer):
    paragraphs = serializers.SerializerMethodField()
    images = PostImageSerializer(many=True, read_only=True)

    class Meta(PostListSerializer.Meta):
        fields = PostListSerializer.Meta.fields + ['paragraphs', 'images', 'note', 'source']

    def get_paragraphs(self, obj):
        return [p.strip() for p in obj.body.split('\n\n') if p.strip()]


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'date', 'title', 'description', 'location', 'is_online', 'tone']


class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'kind', 'title', 'by', 'note', 'url']
