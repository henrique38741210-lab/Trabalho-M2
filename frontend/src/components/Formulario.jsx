import { useState } from "react";

const VAZIO = { titulo: "", autor: "", ano: "", avaliacao: "" };

export default function Formulario({ aoCadastrar, erro }) {
  const [form, setForm] = useState(VAZIO);

  function mudar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function enviar(e) {
    e.preventDefault();
    const aceito = await aoCadastrar(form);
    if (aceito) setForm(VAZIO);
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <h2>Novo livro</h2>
      <input name="titulo" placeholder="Título" value={form.titulo} onChange={mudar} />
      <input name="autor" placeholder="Autor" value={form.autor} onChange={mudar} />
      <input name="ano" type="number" placeholder="Ano" value={form.ano} onChange={mudar} />
      <input
        name="avaliacao"
        type="number"
        step="0.1"
        placeholder="Avaliação (0 a 10)"
        value={form.avaliacao}
        onChange={mudar}
      />
      <button type="submit">Cadastrar</button>
      {erro && <p className="erro">{erro}</p>}
    </form>
  );
}
