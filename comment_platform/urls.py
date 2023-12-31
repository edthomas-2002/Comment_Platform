"""
URL configuration for comment_platform project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.views.generic.base import RedirectView
from django.views.generic import TemplateView
from bobyard.views import *

router = DefaultRouter()
router.register(r'posts', PostViewset)
router.register(r'profiles', ProfileViewset)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/login/', user_login),
    path('api/signup/', user_signup),
]