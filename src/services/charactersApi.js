// Camada de acesso à API pública Rick and Morty (https://rickandmortyapi.com).
// A própria API faz busca por nome, filtro por status e paginação no servidor.

const BASE_URL = 'https://rickandmortyapi.com/api/character';

// Monta a URL com os filtros ativos e busca uma página de personagens.
// Retorna { results, totalPages, count }.
export async function fetchCharacters({ page = 1, name = '', status = '' } = {}) {
  const params = new URLSearchParams({ page: String(page) });
  if (name.trim()) params.set('name', name.trim());
  if (status) params.set('status', status);

  const res = await fetch(`${BASE_URL}?${params.toString()}`);

  // A API responde 404 quando nenhum personagem casa com o filtro:
  // tratamos como "lista vazia", não como erro.
  if (res.status === 404) {
    return { results: [], totalPages: 0, count: 0 };
  }
  if (!res.ok) {
    throw new Error(`Falha ao carregar personagens (HTTP ${res.status}).`);
  }

  const data = await res.json();
  return {
    results: data.results,
    totalPages: data.info.pages,
    count: data.info.count,
  };
}
