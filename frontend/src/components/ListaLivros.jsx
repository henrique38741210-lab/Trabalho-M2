export default function ListaLivros({ livros }) {
  if (livros.length === 0) {
    return <p className="vazio">Nenhum livro encontrado.</p>;
  }

  return (
    <table className="lista">
      <thead>
        <tr>
          <th>Título</th>
          <th>Autor</th>
          <th>Ano</th>
          <th>Avaliação</th>
        </tr>
      </thead>
      <tbody>
        {livros.map((l) => (
          <tr key={l.id}>
            <td>{l.titulo}</td>
            <td>{l.autor}</td>
            <td>{l.ano}</td>
            <td>{l.avaliacao}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
