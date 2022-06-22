from django.urls import path
from base.views import activity_views as views


urlpatterns = [
    path('', views.getActivities, name="activities"),
    path('<slug:tag_slug>/', views.getActivities, name="activities_by_tag"),
    path('id/<str:pk>/', views.getActivity, name="activity"),
]