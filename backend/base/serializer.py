from rest_framework import serializers
from django.contrib.auth.models import User

from .models import *


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'