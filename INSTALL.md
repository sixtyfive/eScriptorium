# Full local installation (no Docker)

Install the following dependencies in your environment of choice:

Examples below are given for a standard virtualenv/pip on a current Ubuntu.

## Git

```bash
sudo apt install git
```

## Postgres

```bash
sudo apt install postgresql postgresql-contrib
```

Setup a user and create a database (default name is escriptorium):

```bash
sudo -i -u postgres  # switch to postgres user
createuser --interactive

Enter name of role to add: <your username> # use your system user name

Shall the new role be a superuser? (y/n) y

exit # logout from postgres user

createdb escriptorium
```

## Redis

```bash
sudo apt install redis-server
```

## Third-party tools

```bash
sudo apt install netcat-traditional jpegoptim pngcrush
```

## eScriptorium itself

Clone the repository:

```bash
git clone git@gitlab.inria.fr:scripta/escriptorium.git
cd escriptorium
```

Using [virtualenv](https://docs.python.org/3/tutorial/venv.html) here but any environment manager should work.

```bash
sudo apt install build-essential python3.8 python-dev python3.8-dev python3-venv python3-pip # depends on distro/OS a lot...
pip3 install virtualenv
virtualenv env -p python3.8 # any version >= 3.7 should work
source env/bin/activate  
pip install -r app/requirements.txt  
```

The default settings needs to be overridden for developers; these local settings can include the configuration you choose for development purposes:

```bash
cp app/escriptorium/local_settings.py{.example,}  
<your favorite editor> app/escriptorium/local_settings.py
```

Change, for example, the database role if need-be.

It is then recommended to set `DJANGO_SETTINGS_MODULE`:

```bash
export DJANGO_SETTINGS_MODULE escriptorium.local_settings
```

And use something like (direnv)[https://direnv.net/] or use a custom shell script that automates it.

```bash
#!/bin/bash
# manage.sh

export DJANGO_SETTINGS_MODULE=escriptorium.local_settings
python manage.py $@
```

Then every time you would be using `python manage.py [args]`, you can now use `./manage.sh [args]` instead.

Another option is to point the `--settings` option of the `manage` command to the module.

```bash
python manage [command] --settings=escriptorium.local_settings
```

Change to the working directory:

```bash
cd app
```

To check your installation thus far, run:

```bash
python manage.py check
```

To run a basic `celery` worker listening on everything (open a new terminal or use `screen`/`tmux`):

```bash
celery -A escriptorium worker -l INFO
```

To disable `celery` completely, and process everything synchronously, you can set `CELERY_TASK_ALWAYS_EAGER = True`.

## Creating SQL Tables, adding a superuser and running the server

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

The website should be accessible at http://localhost:8000/.
