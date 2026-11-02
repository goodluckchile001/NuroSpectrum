from django.contrib import admin

from .models import Event, Post, PostImage, Resource


class PostImageInline(admin.TabularInline):
    model = PostImage
    extra = 0


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('slug', 'tone', 'published', 'published_at')
    list_filter = ('published', 'tone')
    search_fields = ('slug', 'body')
    inlines = [PostImageInline]


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'date', 'is_online', 'published')
    list_filter = ('published', 'is_online')
    date_hierarchy = 'date'


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'kind', 'by', 'published', 'order')
    list_filter = ('kind', 'published')
    search_fields = ('title', 'by')
