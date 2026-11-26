import { useEffect, useState } from "react";
import { listarLivros, buscarResumo, cadastrarLivro } from "./api";
import Resumo from "./components/Resumo";
import Formulario from "./components/Formulario";
import Busca from "./components/Busca";
import ListaLivros from "./components/ListaLivros";

export default function App() {
  const [livros, setLivros] = useState([]);
  const [resumo, setResumo] = useState({ total: 0 });
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState("");

  async function carregar() {
    setLivros(await listarLivros());
    setResumo(await buscarResumo());
  }

  useEffect(() => {
    carregar();
  }, []);

  async function aoCadastrar(livro) {
    const resultado = await cadastrarLivro(livro);
    if (resultado.ok) {
      setErro("");
      await carregar();
      return true;
    }
    setErro(resultado.erro);
    return false;
  }

  const livrosFiltrados = livros.filter((l) =>
    l.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main className="container">
      <h1>Minha Coleção de Livros</h1>
      <Resumo resumo={resumo} />
      <Formulario aoCadastrar={aoCadastrar} erro={erro} />
      <Busca valor={busca} aoMudar={setBusca} />
      <ListaLivros livros={livrosFiltrados} />
    </main>
  );
}
