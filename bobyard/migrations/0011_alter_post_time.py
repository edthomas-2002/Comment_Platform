# Generated by Django 5.0 on 2023-12-28 05:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bobyard', '0010_alter_post_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='time',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
