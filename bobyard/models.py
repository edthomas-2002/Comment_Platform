from django.db import models
from django.utils import timezone

# Create your models here.
class Post(models.Model):
    author = models.TextField()
    text = models.TextField()
    date = models.TextField()
    likes = models.IntegerField(default=0)
    image = models.FileField(blank=True, max_length=500)