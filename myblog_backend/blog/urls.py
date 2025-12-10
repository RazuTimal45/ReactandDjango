from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from . import views
from .views import current_user

router = DefaultRouter()
router.register('categories', views.CategoryViewSet)
router.register('blogs', views.BlogViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-token-auth/', obtain_auth_token),
    # path('api-auth/', include('rest_framework.urls')),
    path('current-user/', current_user),
]