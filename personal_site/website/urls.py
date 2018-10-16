from django.conf.urls import url
from . import views

app_name = 'website'

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^developer/$', views.developer, name="developer"),
    url(r'^about/$', views.about, name="about"),
    url(r'^gallery/$', views.gallery, name="gallery"),
    url(r'^gallery/rocky-mtn/$', views.explore_rockies, name="explore_rockies"),
    url(r'^gallery/israel/$', views.explore_israel, name="explore_israel"),
    url(r'^explore/$', views.blog, name="blog"),
    url(r'^explore/(?P<slug>[-\w]+)$', views.detail, name="detail"),
]
