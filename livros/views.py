import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Livro

CAMPOS = ["titulo", "autor", "ano", "avaliacao"]


def erro(mensagem):
    return JsonResponse({"erro": mensagem}, status=400)


@csrf_exempt
def livros(request):
    if request.method == "GET":
        lista = list(Livro.objects.values("id", *CAMPOS))
        return JsonResponse(lista, safe=False)

    if request.method == "POST":
        try:
            dados = json.loads(request.body)
        except json.JSONDecodeError:
            return erro("JSON inválido.")

        for campo in CAMPOS:
            if campo not in dados or str(dados[campo]).strip() == "":
                return erro(f"O campo '{campo}' é obrigatório.")

        try:
            ano = int(dados["ano"])
        except (TypeError, ValueError):
            return erro("O campo 'ano' deve ser um número inteiro.")
        try:
            avaliacao = float(str(dados["avaliacao"]).replace(",", "."))
        except (TypeError, ValueError):
            return erro("O campo 'avaliacao' deve ser um número.")

        if ano < 1900 or ano > 2026:
            return erro("O ano deve estar entre 1900 e 2026.")
        if avaliacao < 0 or avaliacao > 10:
            return erro("A avaliação deve estar entre 0 e 10.")

        titulo = str(dados["titulo"]).strip()
        autor = str(dados["autor"]).strip()
        if len(titulo) > 100 or len(autor) > 100:
            return erro("Título e autor devem ter no máximo 100 caracteres.")

        livro = Livro.objects.create(
            titulo=titulo, autor=autor, ano=ano, avaliacao=avaliacao
        )
        return JsonResponse({"id": livro.id}, status=201)

    return JsonResponse({"erro": "Método não permitido."}, status=405)


def resumo(request):
    lista = list(Livro.objects.values("titulo", "avaliacao"))
    total = len(lista)

    if total == 0:
        return JsonResponse({"total": 0})

    soma = 0
    melhor = lista[0]
    for item in lista:
        soma += item["avaliacao"]
        if item["avaliacao"] > melhor["avaliacao"]:
            melhor = item

    return JsonResponse(
        {
            "total": total,
            "media_avaliacao": round(soma / total, 2),
            "melhor": melhor["titulo"],
        }
    )
