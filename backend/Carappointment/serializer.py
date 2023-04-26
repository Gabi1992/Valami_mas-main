from .models import Megrendelo,Auto,Szolgaltatas
from rest_framework import serializers

class SzolgaltatasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Szolgaltatas
        fields = '__all__'

class AutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auto
        fields = '__all__'
        
class MegrendeloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Megrendelo
        fields = '__all__'
        