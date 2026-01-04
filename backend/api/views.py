from rest_framework import viewsets
from .models import BookLibrary
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = BookLibrary.objects.all()
    serializer_class = BookSerializer


