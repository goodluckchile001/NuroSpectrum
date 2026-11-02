from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from .models import Profile
from .serializers import ProfileSerializer


class MeView(RetrieveUpdateAPIView):
    """The signed-in person's profile. GET to read, PATCH to update state/language/role."""

    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'patch', 'head', 'options']

    def get_object(self):
        profile, _ = Profile.objects.get_or_create(user=self.request.user)
        return profile
