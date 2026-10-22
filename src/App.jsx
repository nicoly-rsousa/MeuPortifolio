import Nav from './components/Nav';
import SideLinks from './components/SideLinks';
import Hero from './components/Hero';
import About from './components/About';
import Jobs from './components/Jobs';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import { profile } from './data/profile';

export default function App() {
  return (
    <>
      <a href="#content" className="skip-link">
        Pular para o conteúdo
      </a>
      <Nav />
      <SideLinks />

      <main id="content">
        <Hero />
        <About />
        <Jobs />
        <Projects />
        <Education />
        <Contact />
      </main>

      <footer className="footer">
        <ul className="footer-socials">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                <i className={social.icon} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <p>
          Feito por {profile.name} · Layout inspirado em{' '}
          <a href="https://github.com/bchiang7/v4" target="_blank" rel="noopener noreferrer">
            Brittany Chiang
          </a>
        </p>
      </footer>
    </>
  );
}
