from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Activity
from base.serializer import *

from taggit.models import Tag


# Create your views here.
@api_view(['GET'])
def getActivities(request, tag_slug=None):
  activities = Activity.objects.all()
  tag = None
  if tag_slug:
    tag = get_object_or_404(Tag, slug=tag_slug)
    activities = activities.filter(tags__in=[tag])
  serializer = ActivitySerializer(activities, many=True)
  return Response(serializer.data)


@api_view(['GET'])
def getActivity(request, pk):
  activity = Activity.objects.get(_id=pk)
  serializer = ActivitySerializer(activity, many=False)
  return Response(serializer.data)