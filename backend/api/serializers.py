from rest_framework import serializers
from .models import BookLibrary

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookLibrary
        fields = "__all__"
