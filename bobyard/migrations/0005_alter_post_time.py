# Generated by Django 5.0 on 2023-12-28 05:16

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bobyard', '0004_post_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='time',
            field=models.TimeField(default=django.utils.timezone.now),
        ),
    ]
