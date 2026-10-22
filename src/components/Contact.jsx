import Reveal from './Reveal';
import { profile } from '../data/profile';

export default function Contact() {
  return (
    <Reveal as="section" className="section contact" id="contact">
      <p className="contact-overline">05. E agora?</p>
      <h2 className="contact-title">Vamos conversar</h2>
      <p>
        Estou aberta a novas oportunidades, projetos e trocas sobre desenvolvimento e segurança. Seja para uma
        proposta, uma dúvida ou só para dizer oi, minha caixa de entrada está sempre aberta!
      </p>
      <a href={`mailto:${profile.email}`} className="btn btn-lg">
        Diga olá
      </a>
    </Reveal>
  );
}
