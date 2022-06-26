from django.db import models
from django.contrib.auth.models import User
from taggit.managers import TaggableManager

# Create your models here.
class Experience(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=200, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    totalCost = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    plannedDate = models.DateTimeField(auto_now_add=False, null=True, blank=True)

    def __str__(self):
        return self.title


class Activity(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/chang-duong-Sj0iMtq_Z4w-unsplash.jpg')
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    tags = TaggableManager()

    # link = models.CharField(max_length=200, null=True, blank=True)
    # genre = models.CharField(max_length=200, null=True, blank=True)
    # purpose = models.CharField(max_length=200, null=True, blank=True)
    # colour = models.CharField(max_length=200, null=True, blank=True)
    # rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    # numReviews = models.IntegerField(null=True, blank=True, default=0)
    # numPeople = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return f"{self.name}"


class Address(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    activity = models.ForeignKey(Activity, on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return str(self.address)


class ExperienceItem(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    experience = models.ForeignKey(Experience, on_delete=models.CASCADE, null=True)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, null=True)
    cost = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return self.name


class Note(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    message = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title


