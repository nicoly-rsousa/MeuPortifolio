import { useEffect, useState } from 'react';

const CACHE_TTL = 5 * 60 * 1000;

function readCache(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { savedAt, repos } = JSON.parse(raw);
    return Date.now() - savedAt < CACHE_TTL ? repos : null;
  } catch {
    return null;
  }
}

function writeCache(key, repos) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), repos }));
  } catch {
    // Armazenamento indisponível (modo privado, bloqueio): segue sem cache
  }
}

/**
 * Busca os repositórios próprios que receberam estrela (favoritos) no GitHub.
 * Dar ou tirar a estrela de um repositório atualiza a lista automaticamente.
 * @param {string} user
 * @returns {{ status: 'loading' | 'success' | 'error', repos: Array<object> }}
 */
export function useGithubStarred(user) {
  const [state, setState] = useState({ status: 'loading', repos: [] });

  useEffect(() => {
    const cacheKey = `github-starred-v2-${user}`;
    const cached = readCache(cacheKey);
    if (cached) {
      setState({ status: 'success', repos: cached });
      return;
    }

    const controller = new AbortController();
    // Ordenado pela data em que a estrela foi dada (mais recente primeiro)
    fetch(`https://api.github.com/users/${user}/starred?per_page=100`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal
    })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub API respondeu ${response.status}`);
        return response.json();
      })
      .then((data) => {
        // Ignora estrelas dadas a projetos de terceiros
        const repos = data
          .filter((repo) => repo.owner.login.toLowerCase() === user.toLowerCase())
          .map(({ id, name, description, html_url, homepage, has_pages, language, topics }) => ({
            id,
            name,
            description,
            html_url,
            language,
            topics: topics || [],
            // Site publicado: o campo "Website" do repositório ou, se houver, o GitHub Pages
            demo: homepage || (has_pages ? `https://${user}.github.io/${name}/` : null)
          }));
        writeCache(cacheKey, repos);
        setState({ status: 'success', repos });
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        console.warn('Não foi possível carregar os projetos do GitHub:', error);
        setState({ status: 'error', repos: [] });
      });

    return () => controller.abort();
  }, [user]);

  return state;
}
