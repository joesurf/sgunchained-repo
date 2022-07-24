# Generated by Django 4.0.4 on 2022-07-23 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_remove_activity_colour_remove_activity_genre_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='adventure',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True),
        ),
        migrations.AddField(
            model_name='activity',
            name='people',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='activity',
            name='purpose',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
