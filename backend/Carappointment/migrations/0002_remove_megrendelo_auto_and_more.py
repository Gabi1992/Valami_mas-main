# Generated by Django 4.2 on 2023-04-18 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Carappointment', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='megrendelo',
            name='auto',
        ),
        migrations.RemoveField(
            model_name='megrendelo',
            name='szolgaltatas',
        ),
        migrations.AddField(
            model_name='megrendelo',
            name='auto',
            field=models.ManyToManyField(blank=True, to='Carappointment.auto'),
        ),
        migrations.AddField(
            model_name='megrendelo',
            name='szolgaltatas',
            field=models.ManyToManyField(blank=True, to='Carappointment.szolgaltatas'),
        ),
    ]
