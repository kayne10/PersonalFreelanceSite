from django.conf.urls import url
from . import views

app_name = 'website'

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^portfolio/$', views.portfolio, name="developer"),
    url(r'^about/$', views.about, name="about"),
    url(r'^gallery/$', views.gallery, name="gallery"),
    url(r'^blog/$', views.blog, name="blog"),
    url(r'^blog/(?P<slug>[-\w]+)$', views.detail, name="detail"),
    url(r'^search/(?P<topic>[\w\-]+)/$', views.search_blog_by_tag, name='search'),
]
