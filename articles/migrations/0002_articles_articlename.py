# Generated by Django 2.1 on 2018-08-20 10:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='articles',
            name='articleName',
            field=models.CharField(default=0, max_length=50),
        ),
    ]
