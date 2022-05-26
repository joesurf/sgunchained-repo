from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Activity
from base.serializer import *

# Create your views here.
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