import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { certifications, education } from '../data/profile';

export default function Education() {
  return (
    <Reveal as="section" className="section education" id="education">
      <SectionTitle index="04">Formação</SectionTitle>

      <div className="education-inner">
        <ol className="education-list">
          {education.map((item) => (
            <li key={item.title}>
              <span className="education-period">{item.period}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.institution}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="cert-box">
          <h3>Certificações</h3>
          <ul className="arrow-list">
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
