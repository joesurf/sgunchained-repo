from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Activity
from .serializer import *

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
  routes = [
    "/api/products/",
    "/api/products/create",
    "/api/products/upload",
    "/api/products/<id>/reviews/",
    "/api/products/top/",
    "/api/products/<id>/",
    "/api/products/delete/<id>/",
    "/api/products/<update>/<id>/",
  ]
  return Response(routes)

@api_view(['GET'])
def getActivities(request):
  activities = Activity.objects.all()
  serializer = ActivitySerializer(activities, many=True)
  return Response(serializer.data)


@api_view(['GET'])
def getActivity(request, pk):
  activity = Activity.objects.get(_id=pk)
  serializer = ActivitySerializer(activity, many=False)
  return Response(serializer.data)