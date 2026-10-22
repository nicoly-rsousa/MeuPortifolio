import { profile } from '../data/profile';

/** Redes sociais (esquerda) e e-mail (direita) fixos nas laterais da tela. */
export default function SideLinks() {
  return (
    <>
      <div className="side side-left">
        <ul>
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                <i className={social.icon} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="side side-right">
        <a href={`mailto:${profile.email}`} className="side-email">
          {profile.email}
        </a>
      </div>
    </>
  );
}
