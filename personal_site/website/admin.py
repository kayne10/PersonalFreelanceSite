from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin
from .models import Post, Project

# Register your models here.
admin.site.register(Post, MarkdownxModelAdmin)
admin.site.register(Project)
admin.site.site_header = "Troy Kayne's Personal Website"
