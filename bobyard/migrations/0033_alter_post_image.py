# Generated by Django 5.0 on 2023-12-29 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bobyard', '0032_alter_post_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.FileField(blank=True, max_length=500, upload_to=''),
        ),
    ]
