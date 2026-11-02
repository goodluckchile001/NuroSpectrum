from rest_framework import serializers

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    name = serializers.SerializerMethodField()
    communities = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['email', 'name', 'state', 'language', 'role', 'communities']

    def get_name(self, obj):
        return obj.user.get_full_name() or obj.user.email

    def get_communities(self, obj):
        return list(obj.user.memberships.values_list('community__state', flat=True))
