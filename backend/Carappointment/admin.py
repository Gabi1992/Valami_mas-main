from django.contrib import admin
from .models import  Megrendelo
from .models import  Szolgaltatas
from .models import  Auto

admin.site.register(Megrendelo)
admin.site.register(Szolgaltatas)
admin.site.register(Auto)

# Register your models here.