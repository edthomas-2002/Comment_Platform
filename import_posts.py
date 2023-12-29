# import_posts.py

import json
from pathlib import Path
import django
import os

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'comment_platform.settings')
django.setup()

from bobyard.models import Post  # Import your Post model

def import_posts():
    json_file_path = Path('./comments.json')  # Adjust the path to your JSON file
    with open(json_file_path, 'r') as file:
        data = json.load(file)

    for item in data['comments']:
        id = item['id']
        author = item['author']
        text = item['text']
        date = item['date']
        likes = item['likes']
        image = item['image']
        # Create and save a Post object
        # new_post = Post.objects.create(id=id, author=author, text=text, date=date, likes=likes, image=image)
        post = Post(id=id, author=author, text=text, date=date, likes=likes, image=image)
        post.save()

if __name__ == "__main__":
    import_posts()
