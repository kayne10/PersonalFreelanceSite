from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.template.defaultfilters import slugify
from markdownx.models import MarkdownxField

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    category = ArrayField(models.CharField(max_length=50),blank=True,null=True)
    content = MarkdownxField()
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

class Project(models.Model):
    field = models.CharField(max_length=50,default='data science')
    title = models.CharField(max_length=100)
    topics = ArrayField(models.CharField(max_length=50),blank=True,null=True)
    content = models.TextField(max_length=1000)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    github_link = models.CharField(max_length=100,blank=True,null=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Project, self).save(*args, **kwargs)
