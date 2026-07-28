import { useState, useEffect } from 'react';
import { fetchCharacters } from '../services/charactersApi';

// Hook que refaz a busca sempre que página, nome ou status mudam.
// Expõe os estados de carregamento, erro, resultados e total de páginas.
export function useCharacters({ page, name, status }) {
  const [data, setData] = useState({ results: [], totalPages: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ativo = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchCharacters({ page, name, status });
        if (ativo) setData(result);
      } catch (err) {
        if (ativo) setError(err.message);
      } finally {
        if (ativo) setLoading(false);
      }
    }

    load();
    return () => {
      ativo = false;
    };
  }, [page, name, status]);

  return { ...data, loading, error };
}
