import { useRef, useState } from 'react';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import { jobs } from '../data/profile';

/** Experiências em abas, navegáveis também pelas setas do teclado. */
export default function Jobs() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);

  function onKeyDown(event) {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (active + step + jobs.length) % jobs.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  const job = jobs[active];

  return (
    <Reveal as="section" className="section jobs" id="jobs">
      <SectionTitle index="02">Onde trabalhei</SectionTitle>

      <div className="jobs-inner">
        <div
          className="jobs-tabs"
          role="tablist"
          aria-label="Empresas"
          onKeyDown={onKeyDown}
          style={{ '--active': active }}
        >
          {jobs.map((item, i) => (
            <button
              key={item.company}
              ref={(el) => (tabs.current[i] = el)}
              type="button"
              role="tab"
              id={`tab-${i}`}
              aria-selected={active === i}
              aria-controls={`panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              className={`jobs-tab ${active === i ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              {item.company}
            </button>
          ))}
          <span className="jobs-highlight" aria-hidden="true" />
        </div>

        {/* key reinicia a animação de entrada ao trocar de aba */}
        <div className="jobs-panel" key={active} role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
          <h3>
            {job.role} <span className="accent">@ {job.company}</span>
          </h3>
          <p className="jobs-period">{job.period}</p>
          <ul className="arrow-list">
            {job.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
