# Generated by Django 5.0 on 2023-12-31 00:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bobyard', '0033_alter_post_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.URLField(blank=True, max_length=500),
        ),
    ]
