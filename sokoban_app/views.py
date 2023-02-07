from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from .models import Level

# Create your views here.
def get_count(request):
    count = Level.objects.count()
    return JsonResponse({"count": count})

def get_board(request, id):
    level = get_object_or_404(Level, id=id)
    return JsonResponse({"board": level.board})

def index(request):
    return render(request, "index.html")