from django.shortcuts import render, redirect, get_object_or_404
from .models import Post, Project
from django.db.models import Q
from itertools import chain

# Create your views here.
def index(request):
    return render(request, 'web/index.html')

def about(request):
    return render(request, 'web/about.html')

def gallery(request):
    return render(request, 'web/gallery.html')

def blog(request):
    # hike_posts = Post.objects.filter(Q(category__icontains='hike'))
    # camp_posts = Post.objects.filter(Q(category__icontains='camp'))
    # code_posts = Post.objects.filter(Q(category__icontains='code'))
    all_posts = Post.objects.all()
    return render(request, 'web/blog.html', {'all_posts':all_posts})

def detail(request, slug):
    post = get_object_or_404(Post, slug=slug)
    return render(request, 'web/detail.html', {'post':post})

def portfolio(request):
    all_ds_projects = Project.objects.filter(field="data science")
    all_fs_projects = Project.objects.filter(field="full stack")
    return render(request, 'web/portfolio.html',{
                                                'all_ds_projects':all_ds_projects,
                                                'all_fs_projects':all_fs_projects
                                                })


def search_blog_by_tag(request, topic):
    related_posts = Post.objects.filter(Q(category__icontains=topic)).distinct().order_by('-id')
    related_projects = Project.objects.filter(Q(topics__icontains=topic)).distinct().order_by('-id')
    all_related = list(chain(related_posts,related_projects))
    return render(request, 'web/search.html', {'all': all_related, 'result': topic})
