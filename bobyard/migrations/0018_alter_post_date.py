# Generated by Django 5.0 on 2023-12-29 00:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bobyard', '0017_remove_post_content_remove_post_last_edited_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
