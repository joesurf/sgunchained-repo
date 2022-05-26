from django.urls import path
from base.views import activity_views as views


urlpatterns = [
    path('', views.getActivities, name="activities"),
    path('<str:pk>/', views.getActivity, name="activity"),
]