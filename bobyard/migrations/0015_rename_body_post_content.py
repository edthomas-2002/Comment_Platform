# Generated by Django 5.0 on 2023-12-28 18:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bobyard', '0014_alter_post_time'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='body',
            new_name='content',
        ),
    ]
