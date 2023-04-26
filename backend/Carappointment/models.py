from django.db import models
from django.contrib.auth.models import User
    
class Szolgaltatas(models.Model):
    kategoria = models.CharField("Kategória", max_length=200, blank=True)
    neve = models.CharField("Szolgáltatás", max_length=200, blank=True)
    ara = models.IntegerField("Ára (Ft-ban értendő)", blank=True)
    ido = models.IntegerField("Munkaidő (percben értendő)", blank=True)
    
    def __str__(self):
        return self.neve
    
class Auto(models.Model):
     marka = models.CharField("Autó márkája", max_length=200, blank=True)
     
     
     def __str__(self):
         return self.marka
    
class Megrendelo(models.Model):
    nev = models.CharField("Adja meg a teljes nevét!",max_length=100,blank=True)
    telefonszam = models.CharField("Adja meg a telefonszámot!",max_length=11,blank=True)
    email = models.EmailField("Adja meg a email cimét!",blank=True)
    szolgaltatas = models.ManyToManyField(Szolgaltatas, blank=True)
    auto = models.ForeignKey(Auto, blank=True, on_delete=models.CASCADE)
    datum = models.CharField("Datum", max_length=200, blank=True)

    def __str__(self):
        return self.nev