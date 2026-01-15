from .models import Sale
from .serializers import SaleSerializer
from rest_framework import viewsets
from django.http import JsonResponse

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

def health(request):
    return JsonResponse({"status":"ok"})