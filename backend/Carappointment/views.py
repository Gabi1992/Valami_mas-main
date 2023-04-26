from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Szolgaltatas,Auto,Megrendelo
from .serializer import AutoSerializer,MegrendeloSerializer,SzolgaltatasSerializer


@api_view(['GET'])
def endpoints(request):
    points = {'Message': 'Teszt'}
    return Response(points)

#-------------------------#

@api_view(['GET'])
def MindenSzolgaltatas(request):
    szolgaltatasok = Szolgaltatas.objects.all()
    serialized = SzolgaltatasSerializer(szolgaltatasok, many = True)
    
    return Response(serialized.data)

#-------------------------#

@api_view(['GET'])
def SzolgaltatasByID(request,pk):
    try:
        szolgaltatas = Szolgaltatas.objects.get(id=pk)
        serialized = SzolgaltatasSerializer(szolgaltatas, many = False) 
        return Response(serialized.data)
    except Exception as e:
        return Response({'Message': str(e)})
#-------------------------# 
@api_view(['POST'])
def CreateSzolgaltatas(request):
    serializer = SzolgaltatasSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response("Hiba történt!")

#-------------------------#

@api_view(['POST'])
def CreateSzolgaltatas(request):
    serializer = SzolgaltatasSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response("Hiba történt!")

#-------------------------#

@api_view(['DELETE'])
def DeleteSzolgaltatas(request,pk):
    szolgaltatas = Szolgaltatas.objects.get(id = pk)
    serializer = SzolgaltatasSerializer(instance=szolgaltatas)
    szolgaltatas.delete()
    return Response("A szolgáltatás törölve!")

#-------------------------#

@api_view(['PUT'])
def UpdateSzolgaltatas(request,pk):
    szolgaltatas = Szolgaltatas.objects.get(id = pk)
    serializer = SzolgaltatasSerializer(instance=szolgaltatas, data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response("Hiba történt!")

#-------------------------#

@api_view(['GET'])
def MindenAuto(request):
    autok = Auto.objects.all()
    serialized = AutoSerializer(autok, many = True)
    
    return Response(serialized.data)

#-------------------------#

@api_view(['GET'])
def AutoByID(request,pk):
    try:
        auto = Auto.objects.get(id=pk)
        serialized = AutoSerializer(auto, many = False) 
        return Response(serialized.data)
    except Exception as e:
        return Response({'Message': str(e)})

#-------------------------#

@api_view(['POST'])
def CreateAuto(request):

    serializer = AutoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response("Hiba történt!")   

#-------------------------#

@api_view(['GET'])
def MindenMegrendelo(request):
    megrendelok = Megrendelo.objects.all()
    serialized = MegrendeloSerializer(megrendelok, many = True)
    
    return Response(serialized.data)

#-------------------------#

@api_view(['GET'])
def MegrendeloByID(request,pk):
    try:
        megrendelo = Megrendelo.objects.get(id=pk)
        serialized = MegrendeloSerializer(megrendelo, many = False) 
        return Response(serialized.data)
    except Exception as e:
        return Response({'Message': str(e)})

#-------------------------#

@api_view(['POST'])
def CreateMegrendelo(request):
    serializer = MegrendeloSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response("Hiba történt!")

# Create your views here.