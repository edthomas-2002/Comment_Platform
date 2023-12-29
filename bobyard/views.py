from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
from django.http import JsonResponse

# Create your views here.
class PostViewset(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    # Not needed unless there is additional logic to be performed. Same with create(), destroy(), etc
    # def update(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=True)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data)

    
# list(), retrieve(), create(), update(), destroy()
    