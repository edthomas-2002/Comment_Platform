# Generated by Django 5.0 on 2023-12-29 03:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bobyard', '0023_alter_post_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.FileField(default=None, upload_to=''),
        ),
    ]