// Traduz o status da API para português e escolhe a cor do indicador.
const STATUS_INFO = {
  Alive: { label: 'Vivo', color: '#22c55e' },
  Dead: { label: 'Morto', color: '#ef4444' },
  unknown: { label: 'Desconhecido', color: '#94a3b8' },
};

export default function CharacterCard({ character, onSelect }) {
  const info = STATUS_INFO[character.status] ?? STATUS_INFO.unknown;

  return (
    <button className="char-card" onClick={() => onSelect(character)}>
      <img
        className="char-card__img"
        src={character.image}
        alt={character.name}
        loading="lazy"
      />
      <div className="char-card__body">
        <h3 className="char-card__name">{character.name}</h3>
        <p className="char-card__status">
          <span className="dot" style={{ background: info.color }} />
          {info.label} · {character.species}
        </p>
      </div>
    </button>
  );
}
