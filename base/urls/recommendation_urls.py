from django.urls import path
from base.views import recommendation_view as views


urlpatterns = [
    path('', views.getRecommendation, name="recommendation"),
]