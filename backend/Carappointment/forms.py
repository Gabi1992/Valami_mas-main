from django import forms
from django.forms import ModelForm
from .models import Megrendelo

class MegrendeloForm(ModelForm):
    class Meta:
        model = Megrendelo
        fields = ('nev','telefonszam','email','szolgaltatas','auto')
        
        labels ={
            'nev': '',
            'telefonszam': '',
            'email': '',
        }
        
        widget = {
            'nev': forms.TextInput(attrs={'class':'form-control', 'placeholder':'Adja meg a nevét!'}),
            'telefonszam': forms.TextInput(attrs={'class':'form-control', 'placeholder':'Adja meg a telefonszámát!'}),
            'email': forms.EmailInput(attrs={'class':'form-control', 'placeholder':'Adja meg az email cimét!'}),
        }
        