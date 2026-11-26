# Minha Coleção – Django + React

**Integrantes**
- Henrique dos Santos – RA 11261104846
- Pedro Telline – RA 11261105226
- João – RA (preencher)

**Variante:** Livros (app `livros`, model `Livro`: `titulo`, `autor`, `ano`, `avaliacao`)

## Como rodar o backend (Django)

```bash
cd colecao
python -m venv .venv
# Windows: .venv\Scripts\activate   |  Linux/Mac: source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

O backend roda em http://127.0.0.1:8000/ (admin em `/admin/`).
Cadastre pelo menos 8 livros reais pelo admin.

Endpoints:
- `GET /api/livros/` lista todos os livros
- `POST /api/livros/` cadastra (valida `avaliacao` de 0 a 10 e `ano` de 1900 a 2026; erro 400 com `{"erro": "..."}`)
- `GET /api/livros/resumo/` devolve `total`, `media_avaliacao` e `melhor`

## Como rodar o frontend (React + Vite)

```bash
cd colecao/frontend
npm install
npm run dev
```

O frontend roda em http://localhost:5173 (única origem liberada no CORS).
Deixe o backend rodando ao mesmo tempo.
