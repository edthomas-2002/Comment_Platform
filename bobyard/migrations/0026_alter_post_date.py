# Generated by Django 5.0 on 2023-12-29 04:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bobyard', '0025_alter_post_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]