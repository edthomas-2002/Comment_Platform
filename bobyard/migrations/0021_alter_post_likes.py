# Generated by Django 5.0 on 2023-12-29 00:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bobyard', '0020_alter_post_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='likes',
            field=models.IntegerField(default=0),
        ),
    ]
