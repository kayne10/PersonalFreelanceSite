from django.shortcuts import render, redirect, get_object_or_404
from .models import Post
from django.db.models import Q

# Create your views here.
def index(request):
    return render(request, 'web/index.html')

def about(request):
    return render(request, 'web/about.html')

def gallery(request):
    return render(request, 'web/gallery.html')

def explore_rockies(request):
    return render(request, 'web/rocky-mtn-gallery.html')

def explore_israel(request):
    return render(request, 'web/israel-gallery.html')

def blog(request):
    posts = Post.objects.all()
    return render(request, 'web/explore.html', {'posts':posts})

def detail(request):
    post = get_object_or_404(Post, slug=slug)
    return render(request, 'web/detail.html', {'post':post})

def developer(request):
    return render(request, 'web/developer.html')
