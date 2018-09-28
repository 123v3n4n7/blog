from django.conf.urls import include, url
from rest_framework import routers

from .api import ArticleViewSet, CommentsViewSet, RegistrationAPI, LoginAPI, UserAPI, ProfileAPI, ArticleDelete, \
    ArticlePost, ProfileGetAPI

router = routers.DefaultRouter()
router.register('comments', CommentsViewSet)

urlpatterns = [
    url("/", include(router.urls)),
    url("auth/register/", RegistrationAPI.as_view()),
    url("auth/login/", LoginAPI.as_view()),
    url("auth/user/", UserAPI.as_view()),
    url("auth/profiles/(?P<username>\w+)/$", ProfileAPI.as_view()),
    url("auth/profile/(?P<username>\w+)/$", ProfileGetAPI.as_view()),
    url("articles/", ArticleViewSet.as_view()),
    url("article/", ArticlePost.as_view()),
    url("articles/(?P<id>[0-9]+)/$", ArticleDelete.as_view()),
]
