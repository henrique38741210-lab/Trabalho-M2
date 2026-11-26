export default function Resumo({ resumo }) {
  if (!resumo.total) {
    return (
      <section className="resumo">
        <p>Nenhum livro cadastrado ainda.</p>
      </section>
    );
  }

  return (
    <section className="resumo">
      <div className="card">
        <span>Total</span>
        <strong>{resumo.total}</strong>
      </div>
      <div className="card">
        <span>Média das avaliações</span>
        <strong>{resumo.media_avaliacao}</strong>
      </div>
      <div className="card">
        <span>Melhor livro</span>
        <strong>{resumo.melhor}</strong>
      </div>
    </section>
  );
}
