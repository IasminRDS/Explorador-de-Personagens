const STATUS = [
  { value: '', label: 'Todos os status' },
  { value: 'alive', label: 'Vivo' },
  { value: 'dead', label: 'Morto' },
  { value: 'unknown', label: 'Desconhecido' },
];

// Busca por nome + filtro por status (ambos aplicados pela API).
export default function Filters({ search, onSearch, status, onStatus }) {
  return (
    <div className="filters">
      <input
        type="search"
        className="filters__search"
        placeholder="🔎 Buscar personagem..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Buscar personagem pelo nome"
      />
      <select value={status} onChange={(e) => onStatus(e.target.value)} aria-label="Filtrar por status">
        {STATUS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
