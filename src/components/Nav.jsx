import { useEffect, useState } from 'react';
import { profile } from '../data/profile';

export const NAV_LINKS = [
  { id: 'about', label: 'Sobre' },
  { id: 'jobs', label: 'Experiência' },
  { id: 'projects', label: 'Projetos' },
  { id: 'education', label: 'Formação' },
  { id: 'contact', label: 'Contato' }
];

/** Menu fixo que se esconde ao rolar para baixo e reaparece ao rolar para cima. */
export default function Nav() {
  const [direction, setDirection] = useState('up');
  const [atTop, setAtTop] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 50);
      if (Math.abs(y - lastY) > 5) {
        setDirection(y > lastY ? 'down' : 'up');
        lastY = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('blur', open);
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const hidden = direction === 'down' && !atTop && !open;
  const className = ['nav', atTop ? '' : 'is-scrolled', hidden ? 'is-hidden' : ''].join(' ');

  return (
    <header className={className}>
      <nav className="nav-inner" aria-label="Principal">
        <a href="#top" className="logo" aria-label="Início">
          <span>{profile.initials}</span>
        </a>

        <ol className="nav-links">
          {NAV_LINKS.map((link, i) => (
            <li key={link.id} style={{ '--i': i }}>
              <a href={`#${link.id}`}>{link.label}</a>
            </li>
          ))}
        </ol>

        <button
          type="button"
          className={`hamburger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Menu"
        >
          <span />
        </button>

        <aside className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
          <ol>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                  {link.label}
                </a>
              </li>
            ))}
          </ol>
          <a href={`mailto:${profile.email}`} className="btn" tabIndex={open ? 0 : -1}>
            Fale comigo
          </a>
        </aside>
      </nav>
    </header>
  );
}
