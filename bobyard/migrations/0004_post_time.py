# Generated by Django 5.0 on 2023-12-28 05:12

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bobyard', '0003_remove_post_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='time',
            field=models.TimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
