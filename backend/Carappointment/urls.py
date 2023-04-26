from django.urls import path, include
from . import views


urlpatterns = [
    path('',views.endpoints),
    path('szolgaltatasok/',views.MindenSzolgaltatas),
    path('szolgaltatas/<int:pk>',views.SzolgaltatasByID),
    path('createszolg/',views.CreateSzolgaltatas),
    path('updateszolg/<int:pk>',views.UpdateSzolgaltatas),
    path('deleteszolg/<int:pk>',views.DeleteSzolgaltatas),
    path('autok/',views.MindenAuto),
    path('auto/<int:pk>',views.AutoByID),
    path('createauto/',views.CreateAuto),
    path('megrendelok/',views.MindenMegrendelo),
    path('megrendelo/<int:pk>',views.MegrendeloByID),
    path('createmegrendelok/',views.CreateMegrendelo),
]