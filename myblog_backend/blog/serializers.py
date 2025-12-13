# blog/serializers.py
from rest_framework import serializers
from .models import Category, Blog

# FIX 1: Typo in class name + missing get_ method
class PublicCategorySerializer(serializers.ModelSerializer):  # ← Fixed: was PublicCategorySerializers
    blogs_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'blogs_count']

    def get_blogs_count(self, obj):
        return obj.blogs.count()  # ← You were missing this method!

# FIX 2: Field name should be lowercase 'category'
class PublicBlogSerializer(serializers.ModelSerializer):
    category = PublicCategorySerializer(read_only=True) 
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )

    class Meta:
        model = Blog
        fields = ['id', 'title','image', 'content', 'category', 'category_id', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

# Admin serializers (optional, but fix typos)
class AdminCategorySerializer(serializers.ModelSerializer):  
    class Meta:
        model = Category
        fields = ['id', 'name', 'created_at']

class AdminBlogSerializer(serializers.ModelSerializer): 
    category = AdminCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category'
    )

    class Meta:
        model = Blog
        fields = ['id', 'title','image','content', 'category', 'category_id', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']