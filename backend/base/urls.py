from django.urls import path
from . import views

urlpatterns = [
  path('', views.getRoutes, name="routes"),
  path('activities/', views.getActivities, name="activities"),
  path('activities/<str:pk>/', views.getActivity, name="activity"),
]