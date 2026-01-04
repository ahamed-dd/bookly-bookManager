from rest_framework import serializers
from .models import BookLibrary

class BookSerializer(serializers.Serializer):
    class Meta:
        model = BookLibrary
        fields = "__all__"
