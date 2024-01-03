from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import *
from .serializers import *

# Create your views here.
class PostViewset(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def list(self, request, *args, **kwargs):
        posts = self.get_queryset().order_by('-date').values()
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['PUT'], url_path='like') # detail=True means its for a specific instance of the resource
    def like_post(self, request, pk=None):
        post = self.get_object()
        liker = request.data.get('liker')
        liker_profile = Profile.objects.filter(author=liker).first()
        message = ''
        if liker_profile is not None:
            if not post.likers.filter(author=liker):
                post.likers.add(liker_profile)
                post.likes+=1
                message = 'Liked'
            else:
                post.likers.remove(liker_profile)
                post.likes-=1
                message = 'Not liked'
        else:
            return Response({'message': 'Could not find active profile'}, status=400)
        post.save()
        serializer = self.get_serializer(post)
        response_data = serializer.data
        response_data['message'] = message
        return Response(response_data)
    
    @action(detail=True, methods=['GET'], url_path='check-like')
    def check_like(self, request, pk=None):
        post = self.get_object()
        active_author = request.GET.get('active_author')
        if not post.likers.filter(author=active_author):
            return Response({'message': 'Not liked'})
        return Response({'message': 'Liked'})
    
    @action(detail=False, methods=['GET'], url_path='query')
    def perform_query(self, request, pk=None):
        query = request.GET.get('query_content')
        posts = self.get_queryset()
        filtered_posts = posts.filter(text__contains=query).values()
        serializer = self.get_serializer(filtered_posts, many=True)
        return Response(serializer.data)

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