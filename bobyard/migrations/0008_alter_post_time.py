# Generated by Django 5.0 on 2023-12-28 05:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bobyard', '0007_alter_post_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='time',
            field=models.TimeField(auto_now_add=True),
        ),
    ]
