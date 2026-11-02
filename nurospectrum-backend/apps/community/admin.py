from django.contrib import admin
from django.utils import timezone

from .models import Membership, PartnerInquiry, StateCommunity, Story


@admin.register(StateCommunity)
class StateCommunityAdmin(admin.ModelAdmin):
    list_display = ('state', 'whatsapp_invite_url', 'is_active')
    list_editable = ('whatsapp_invite_url', 'is_active')
    search_fields = ('state',)


@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = ('user', 'community', 'role', 'joined_at')
    list_filter = ('community', 'role')
    search_fields = ('user__email',)
    autocomplete_fields = ('user',)


@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'status', 'state', 'is_anonymous', 'created_at', 'excerpt')
    list_filter = ('status', 'is_anonymous', 'state')
    search_fields = ('text', 'display_name')
    readonly_fields = ('author', 'created_at', 'reviewed_at', 'reviewed_by')
    actions = ['approve', 'reject']

    @admin.display(description='Story')
    def excerpt(self, obj):
        return obj.text[:80]

    def _review(self, request, queryset, status):
        return queryset.update(status=status, reviewed_at=timezone.now(), reviewed_by=request.user)

    @admin.action(description='Approve selected stories')
    def approve(self, request, queryset):
        count = self._review(request, queryset.filter(consent=True), Story.Status.APPROVED)
        self.message_user(request, f'{count} story(ies) approved. Stories without consent are skipped.')

    @admin.action(description='Reject selected stories')
    def reject(self, request, queryset):
        count = self._review(request, queryset, Story.Status.REJECTED)
        self.message_user(request, f'{count} story(ies) rejected.')


@admin.register(PartnerInquiry)
class PartnerInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'kind', 'organisation', 'email', 'handled', 'created_at')
    list_filter = ('kind', 'handled')
    list_editable = ('handled',)
    search_fields = ('name', 'email', 'organisation', 'message')
    readonly_fields = ('created_at',)
