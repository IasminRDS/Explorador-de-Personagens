import { useState, useEffect } from 'react';
import { useCharacters } from './hooks/useCharacters';
import { useDebounce } from './hooks/useDebounce';
import Filters from './components/Filters';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import Pagination from './components/Pagination';
import './App.css';

export default function App() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  // Ao mudar busca ou status, sempre voltar para a primeira página.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  const { results, totalPages, count, loading, error } = useCharacters({
    page,
    name: debouncedSearch,
    status,
  });

  return (
    <div className="app">
      <header className="header">
        <h1>👽 Explorador de Personagens</h1>
        <p>Universo Rick and Morty · dados em tempo real via API pública</p>
      </header>

      <main className="container">
        <Filters
          search={search}
          onSearch={setSearch}
          status={status}
          onStatus={setStatus}
        />

        {loading && <p className="status">Carregando personagens...</p>}

        {error && (
          <p className="status status--error">
            ⚠️ {error} Verifique sua conexão e tente novamente.
          </p>
        )}

        {!loading && !error && (
          <>
            <p className="result-count">
              {count > 0
                ? `${count} personagem(ns) encontrado(s)`
                : 'Nenhum personagem corresponde à busca.'}
            </p>

            <div className="grid">
              {results.map((c) => (
                <CharacterCard key={c.id} character={c} onSelect={setSelected} />
              ))}
            </div>

            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        )}
      </main>

      <CharacterModal character={selected} onClose={() => setSelected(null)} />

      <footer className="footer">
        <p>Feito com React + Vite · Fonte: rickandmortyapi.com</p>
      </footer>
    </div>
  );
}
