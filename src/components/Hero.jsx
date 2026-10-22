import { profile } from '../data/profile';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <p className="hero-overline fade-up" style={{ '--d': 1 }}>
        Olá, meu nome é
      </p>
      <h1 className="hero-name fade-up" style={{ '--d': 2 }}>
        {profile.name}.
      </h1>
      <h2 className="hero-headline fade-up" style={{ '--d': 3 }}>
        {profile.headline}
      </h2>
      <p className="hero-intro fade-up" style={{ '--d': 4 }}>
        {profile.intro}
      </p>
      <div className="fade-up" style={{ '--d': 5 }}>
        <a href="#projects" className="btn btn-lg">
          Veja meus projetos!
        </a>
      </div>
    </section>
  );
}
