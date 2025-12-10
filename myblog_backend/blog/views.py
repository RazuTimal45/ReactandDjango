# blog/views.py
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated
from rest_framework.decorators import action,api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Category, Blog
from .serializers import PublicCategorySerializer, PublicBlogSerializer  

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
    })

class CategoryViewSet(viewsets.ModelViewSet):  
    queryset = Category.objects.all()
    serializer_class = PublicCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.select_related('category', 'author').all()
    serializer_class = PublicBlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'category__name']
    ordering_fields = ['created_at', 'title']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)  

  
    @action(detail=False, methods=['get'], url_path=r'category/(?P<category_id>\d+)')
    def by_category(self, request, category_id=None):
        category = get_object_or_404(Category, id=category_id)
        blogs = self.get_queryset().filter(category=category)
        page = self.paginate_queryset(blogs)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(blogs, many=True)
        return Response(serializer.data)