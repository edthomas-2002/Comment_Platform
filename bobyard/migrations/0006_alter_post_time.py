# Generated by Django 5.0 on 2023-12-28 05:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bobyard', '0005_alter_post_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='time',
            field=models.TimeField(default=datetime.datetime(2023, 12, 28, 5, 18, 58, 610433, tzinfo=datetime.timezone.utc)),
        ),
    ]
