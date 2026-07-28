import { useEffect } from 'react';

const STATUS_PT = { Alive: 'Vivo', Dead: 'Morto', unknown: 'Desconhecido' };
const GENDER_PT = {
  Male: 'Masculino',
  Female: 'Feminino',
  Genderless: 'Sem gênero',
  unknown: 'Desconhecido',
};

// Modal de detalhes do personagem. Fecha com Esc ou clique fora.
export default function CharacterModal({ character, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!character) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes de ${character.name}`}
      >
        <button className="modal__close" onClick={onClose} aria-label="Fechar">✕</button>
        <img className="modal__img" src={character.image} alt={character.name} />
        <h2 className="modal__title">{character.name}</h2>
        <dl className="modal__details">
          <div><dt>Status</dt><dd>{STATUS_PT[character.status] ?? character.status}</dd></div>
          <div><dt>Espécie</dt><dd>{character.species}</dd></div>
          <div><dt>Gênero</dt><dd>{GENDER_PT[character.gender] ?? character.gender}</dd></div>
          <div><dt>Origem</dt><dd>{character.origin?.name ?? '—'}</dd></div>
          <div><dt>Localização</dt><dd>{character.location?.name ?? '—'}</dd></div>
          <div><dt>Episódios</dt><dd>{character.episode?.length ?? 0}</dd></div>
        </dl>
      </div>
    </div>
  );
}
