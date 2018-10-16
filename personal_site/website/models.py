from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.template.defaultfilters import slugify

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    tags = ArrayField(models.CharField(max_length=50),blank=True,null=True)
    content = models.TextField(max_length=2000)
    image = models.FileField(blank=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.title


    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Post, self).save(*args, **kwargs)
