from django.urls import path
from base.views import activity_views as views


urlpatterns = [
    path('', views.getActivities, name="activities"),
    
    # ordered to avoid slug confusion
    path('create/', views.createActivity, name="activity-create"),
    path('upload/', views.uploadImage, name="image-upload"),    

    path('<slug:tag_slug>/', views.getActivities, name="activities_by_tag"),
    path('id/<str:pk>/', views.getActivity, name="activity"),

    path('update/<str:pk>/', views.updateActivity, name="activity-update"),
    path('delete/<str:pk>/', views.deleteActivity, name="activity-delete"),
]