# Generated by Django 4.2 on 2023-04-26 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Carappointment', '0009_megrendelo_datum_alter_szolgaltatas_ara_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='szolgaltatas',
            name='ara',
            field=models.IntegerField(blank=True, verbose_name='Ára (Ft-ban értendő)'),
        ),
        migrations.AlterField(
            model_name='szolgaltatas',
            name='ido',
            field=models.IntegerField(blank=True, verbose_name='Munkaidő (perc)'),
        ),
    ]
