# Generated by Django 2.1.4 on 2019-04-29 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_auto_20190426_0724'),
    ]

    operations = [
        migrations.AddField(
            model_name='metadata',
            name='public',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterUniqueTogether(
            name='documentpart',
            unique_together=set(),
        ),
    ]
