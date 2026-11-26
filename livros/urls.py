from django.urls import path

from . import views

urlpatterns = [
    path("livros/resumo/", views.resumo),
    path("livros/", views.livros),
]
