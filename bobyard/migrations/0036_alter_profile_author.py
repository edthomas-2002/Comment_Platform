# Generated by Django 5.0 on 2023-12-31 03:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bobyard', '0035_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='author',
            field=models.TextField(unique=True),
        ),
    ]