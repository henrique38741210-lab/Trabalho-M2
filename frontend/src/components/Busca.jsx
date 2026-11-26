export default function Busca({ valor, aoMudar }) {
  return (
    <input
      className="busca"
      type="search"
      placeholder="Buscar por título..."
      value={valor}
      onChange={(e) => aoMudar(e.target.value)}
    />
  );
}
