from django.db import models

class BookLibrary(models.Model):
    CHOICES = [
        ('wish to', 'Wish to'),
        ('read', 'Read'),
        ('favourites', 'Favourites'),
    ]
    book_name = models.CharField(max_length=100)
    author = models.CharField(blank=True, null=True)
    published_at = models.IntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    bookmark = models.TextField(blank=True, null=True)
    choices = models.CharField(blank=True, choices=CHOICES, default='read')
    


