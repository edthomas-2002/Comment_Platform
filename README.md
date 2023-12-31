List of commands to get the app running: 

python3 -m venv bobyard_env
source bobyard_env/bin/activate
cd comment_platform
pip install django
pip install djangorestframework
pip install psycopg2-binary
pip install django-cors-headers
npm install react-router-dom ? idk if this is in comment_platform OR frontend
https://www.postgresql.org/download/
set password for “postgres” user to “postgres" — if already different then incomment_platform/settings.py, change the password field of the Database, also change port as needed
psql -U postgres
CREATE DATABASE bobyard_comment_platform;
python import_posts.py
python manage.py runserver
AND go to http://127.0.0.1:8000/api/posts/ to see backend
OPEN new terminal window, cd frontend
npm install
npm start
—> if this errors, delete the node_modules directory in frontend/ and then run npm install and npm start and open in browser.