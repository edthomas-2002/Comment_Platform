# Generated by Django 5.0 on 2023-12-29 00:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bobyard', '0019_alter_post_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
