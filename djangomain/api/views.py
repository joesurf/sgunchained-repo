from django.shortcuts import render
from rest_framework import generics
from .serializers import ActivitySerializer
from .models import Activity

# Create your views here.
class ActivityView(generics.ListAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer