# Generated by Django 2.1.2 on 2019-01-02 21:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0003_project'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='content',
            field=models.TextField(max_length=1000),
        ),
    ]
