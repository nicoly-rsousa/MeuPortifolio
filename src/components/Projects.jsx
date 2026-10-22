import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { useGithubStarred } from '../hooks/useGithubStarred';
import { profile, projectExtras } from '../data/profile';

// Fotos em src/assets/projects/<chave>.png, indexadas pela chave do repositório
const IMAGES = Object.fromEntries(
  Object.entries(
    import.meta.glob('../assets/projects/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' })
  ).map(([path, url]) => [path.split('/').pop().replace(/\.\w+$/, ''), url])
);

function projectKey(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function formatName(name) {
  return name.replace(/^-+|-+$/g, '').replace(/[-_.]+/g, ' ');
}

function Project({ repo }) {
  const key = projectKey(repo.name);
  const extra = projectExtras[key] || {};
  const title = extra.title || formatName(repo.name);
  const description = extra.description || repo.description || 'Projeto sem descrição no momento.';
  const tech = extra.tech || [...repo.topics, repo.language].filter(Boolean);
  const image = IMAGES[key];
  const link = repo.demo || repo.html_url;

  return (
    <Reveal as="li" className="project">
      <div className="project-content">
        <p className="project-overline">Projeto em destaque</p>
        <h3 className="project-title">
          <a href={link} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h3>
        <div className="project-description">
          <p>{description}</p>
        </div>
        {tech.length > 0 && (
          <ul className="project-tech">
            {tech.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        <div className="project-links">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label={`Código de ${title} no GitHub`}>
            <i className="fa-brands fa-github" aria-hidden="true" />
          </a>
          {repo.demo && (
            <a href={repo.demo} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${title} publicado`}>
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <div className="project-image">
        <a href={link} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
          {image ? (
            <img src={image} alt={`Tela do projeto ${title}`} loading="lazy" />
          ) : (
            // Sem foto em src/assets/projects/, mostra uma prévia com o nome do projeto
            <span className="project-placeholder" aria-hidden="true">
              <i className="fa-solid fa-code" />
              <span>{title}</span>
            </span>
          )}
        </a>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const { status, repos } = useGithubStarred(profile.github);

  return (
    <section className="section projects" id="projects">
      <Reveal>
        <SectionTitle index="03">Projetos que construí</SectionTitle>
      </Reveal>

      {status === 'loading' && <p className="projects-status">Carregando projetos do GitHub...</p>}
      {status === 'error' && (
        <p className="projects-status">Não foi possível carregar os projetos agora. Veja todos no GitHub abaixo.</p>
      )}
      {status === 'success' && repos.length === 0 && (
        <p className="projects-status">Nenhum projeto favoritado no momento.</p>
      )}

      {status === 'success' && (
        <ul className="projects-list">
          {repos.map((repo) => (
            <Project key={repo.id} repo={repo} />
          ))}
        </ul>
      )}

      <Reveal className="projects-more">
        <a href={`https://github.com/${profile.github}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="btn">
          Ver todos no GitHub
        </a>
      </Reveal>
    </section>
  );
}
