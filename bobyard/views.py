from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import *
from .serializers import *

# Create your views here.
class PostViewset(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class ProfileViewset(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    
# list(), retrieve(), create(), update(), destroy()
    
@api_view(['POST'])
def user_login(request):
    author = request.data.get('author')
    password = request.data.get('password')
    
    profile = Profile.objects.filter(author=author, password=password).first()

    if profile is not None:
        # Perform additional actions upon successful login if needed
        return Response({'message': 'Login successful'})
    else:
        return Response({'message': 'Invalid credentials'})


@api_view(['POST'])
def user_signup(request):
    author = request.data.get('author')
    password = request.data.get('password')
    
    if Profile.objects.filter(author=author).exists():
        return Response({'message': 'User already exists'})
    
    profile = Profile.objects.create(author=author, password=password)
    # Perform additional actions upon successful signup if needed
    return Response({'message': 'Signup successful'})