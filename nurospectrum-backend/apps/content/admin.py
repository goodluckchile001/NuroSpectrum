from django import forms
from django.contrib import admin
from django.utils.text import slugify

from apps.common.constants import LANGUAGES
from .models import Event, Post, PostImage, Resource


class PostAdminForm(forms.ModelForm):
    slug = forms.SlugField(
        required=False,
        disabled=True,
        help_text='Generated automatically from the English title.',
    )
    title_en = forms.CharField(label='English', max_length=250)
    title_ha = forms.CharField(label='Hausa', max_length=250, required=False)
    title_yo = forms.CharField(label='Yorùbá', max_length=250, required=False)
    title_ig = forms.CharField(label='Igbo', max_length=250, required=False)
    tag_en = forms.CharField(label='English', max_length=250)
    tag_ha = forms.CharField(label='Hausa', max_length=250, required=False)
    tag_yo = forms.CharField(label='Yorùbá', max_length=250, required=False)
    tag_ig = forms.CharField(label='Igbo', max_length=250, required=False)
    summary_en = forms.CharField(label='English', widget=forms.Textarea)
    summary_ha = forms.CharField(label='Hausa', widget=forms.Textarea, required=False)
    summary_yo = forms.CharField(label='Yorùbá', widget=forms.Textarea, required=False)
    summary_ig = forms.CharField(label='Igbo', widget=forms.Textarea, required=False)

    class Meta:
        model = Post
        exclude = ('title', 'tag', 'summary')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk:
            for name in ('title', 'tag', 'summary'):
                translations = getattr(self.instance, name)
                for code, _label in LANGUAGES:
                    self.initial[f'{name}_{code}'] = translations.get(code, '')
            self.initial['slug'] = slugify(self.instance.title.get('en', ''))

    def clean(self):
        cleaned_data = super().clean()
        title = cleaned_data.get('title_en', '')
        generated_slug = slugify(title)
        if title and not generated_slug:
            self.add_error('title_en', 'Enter a title that can be used to create a web address.')
        cleaned_data['slug'] = generated_slug
        return cleaned_data

    def save(self, commit=True):
        post = super().save(commit=False)
        for name in ('title', 'tag', 'summary'):
            setattr(post, name, {
                code: self.cleaned_data[f'{name}_{code}']
                for code, _label in LANGUAGES
                if self.cleaned_data.get(f'{name}_{code}')
            })
        post.slug = self.cleaned_data['slug']
        if commit:
            post.save()
            self.save_m2m()
        return post


class EventAdminForm(forms.ModelForm):
    title_en = forms.CharField(label='English', max_length=250)
    title_ha = forms.CharField(label='Hausa', max_length=250, required=False)
    title_yo = forms.CharField(label='Yorùbá', max_length=250, required=False)
    title_ig = forms.CharField(label='Igbo', max_length=250, required=False)
    description_en = forms.CharField(label='English', widget=forms.Textarea)
    description_ha = forms.CharField(label='Hausa', widget=forms.Textarea, required=False)
    description_yo = forms.CharField(label='Yorùbá', widget=forms.Textarea, required=False)
    description_ig = forms.CharField(label='Igbo', widget=forms.Textarea, required=False)

    class Meta:
        model = Event
        exclude = ('title', 'description')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk:
            for name in ('title', 'description'):
                translations = getattr(self.instance, name)
                for code, _label in LANGUAGES:
                    self.initial[f'{name}_{code}'] = translations.get(code, '')

    def save(self, commit=True):
        event = super().save(commit=False)
        for name in ('title', 'description'):
            setattr(event, name, {
                code: self.cleaned_data[f'{name}_{code}']
                for code, _label in LANGUAGES
                if self.cleaned_data.get(f'{name}_{code}')
            })
        if commit:
            event.save()
            self.save_m2m()
        return event


class PostImageInline(admin.TabularInline):
    model = PostImage
    extra = 0


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    form = PostAdminForm
    list_display = ('title_english', 'slug', 'tone', 'published', 'published_at')
    list_filter = ('published', 'tone')
    search_fields = ('slug', 'body')
    inlines = [PostImageInline]
    fieldsets = (
        ('Blog post', {
            'fields': (
                'title_en', 'title_ha', 'title_yo', 'title_ig', 'slug',
            ),
        }),
        ('Tag', {
            'fields': (
                'tag_en', 'tag_ha', 'tag_yo', 'tag_ig',
            ),
        }),
        ('Summary', {'fields': ('summary_en', 'summary_ha', 'summary_yo', 'summary_ig')}),
        ('Article text', {'fields': ('body', 'note', 'source')}),
        ('Image', {'fields': ('cover_image', 'cover_alt')}),
        ('Publishing', {'fields': ('tone', 'published', 'published_at')}),
    )

    @admin.display(description='Blog post')
    def title_english(self, obj):
        return obj.title.get('en', '')


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    form = EventAdminForm
    list_display = ('__str__', 'date', 'is_online', 'published')
    list_filter = ('published', 'is_online')
    date_hierarchy = 'date'
    fieldsets = (
        ('Event title', {'fields': ('title_en', 'title_ha', 'title_yo', 'title_ig')}),
        ('Description', {'fields': ('description_en', 'description_ha', 'description_yo', 'description_ig')}),
        ('Date and location', {'fields': ('date', 'location', 'is_online')}),
        ('Publishing', {'fields': ('tone', 'published')}),
    )


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'kind', 'by', 'published', 'order')
    list_filter = ('kind', 'published')
    search_fields = ('title', 'by')
