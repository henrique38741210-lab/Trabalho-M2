const BASE = "http://127.0.0.1:8000/api/livros";

export async function listarLivros() {
  const resp = await fetch(`${BASE}/`);
  return resp.json();
}

export async function buscarResumo() {
  const resp = await fetch(`${BASE}/resumo/`);
  return resp.json();
}

export async function cadastrarLivro(livro) {
  const resp = await fetch(`${BASE}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(livro),
  });
  const dados = await resp.json();
  if (resp.status === 201) return { ok: true };
  return { ok: false, erro: dados.erro || "Erro ao cadastrar." };
}
