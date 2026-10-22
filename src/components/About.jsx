import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { about, profile } from '../data/profile';
import photo from '../assets/profile.jpg';

export default function About() {
  return (
    <Reveal as="section" className="section about" id="about">
      <SectionTitle index="01">Sobre mim</SectionTitle>

      <div className="about-inner">
        <div className="about-text">
          {about.paragraphs.map((text) => (
            <p key={text.slice(0, 24)}>{text}</p>
          ))}
          <p>{about.techIntro}</p>
          <ul className="tech-list">
            {about.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>

        <div className="about-photo">
          <div className="photo-wrapper">
            <img src={photo} alt={`Foto de ${profile.name}`} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
