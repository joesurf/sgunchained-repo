# Generated by Django 4.0.4 on 2022-05-25 18:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_alter_address_activity'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='address',
            name='activity',
        ),
        migrations.AddField(
            model_name='activity',
            name='location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.address'),
        ),
    ]
