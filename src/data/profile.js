// Conteúdo do portfólio. Para atualizar textos, edite apenas este arquivo.

export const profile = {
  name: 'Nicoly Rodrigues',
  initials: 'NR',
  headline: 'Construo para a web pensando em segurança.',
  intro:
    'Sou estagiária em Segurança de TI no Grupo Energisa, atuando com gestão de acessos e identidades (IAM) ' +
    'em ambientes OT e TI. Também desenvolvo aplicações web com React, JavaScript e C#.',
  github: 'nicoly-rsousa',
  email: 'nicolydevv@gmail.com',
  socials: [
    { label: 'GitHub', icon: 'fa-brands fa-github', href: 'https://github.com/nicoly-rsousa' },
    { label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: 'https://linkedin.com/in/nicoly-rodrigues-54998a222' },
    { label: 'Instagram', icon: 'fa-brands fa-instagram', href: 'https://instagram.com/_nicoly.rsousa' }
  ]
};

export const about = {
  paragraphs: [
    'Olá! Sou a Nicoly, profissional de TI de Cataguases (MG). Meu interesse por tecnologia começou no ' +
      'Técnico em Informática do IF Sudeste MG e hoje se divide entre duas paixões: segurança da informação ' +
      'e desenvolvimento de software.',
    'Atualmente trabalho com gestão de acessos, monitoramento de eventos de segurança e análise inicial de ' +
      'incidentes no Grupo Energisa. Antes disso, fui educadora de TI na Microlins, onde aprendi a traduzir ' +
      'temas técnicos de forma clara, e dei suporte técnico no Hospital de Cataguases.',
    'Estou no último período de Sistemas de Informação e cursando o Técnico em Desenvolvimento de Sistemas.'
  ],
  techIntro: 'Algumas tecnologias com que tenho trabalhado recentemente:',
  tech: [
    'React',
    'JavaScript (ES6+)',
    'TypeScript',
    'Node.js & Next.js',
    'C# & .NET',
    'SQL & PL/SQL',
    'Active Directory',
    'ITIL / ITSM'
  ]
};

export const jobs = [
  {
    company: 'Grupo Energisa',
    role: 'Estagiária em Segurança de TI',
    period: 'Jan 2026 – Presente',
    points: [
      'Gestão de acessos e administração de identidades em ambientes OT e TI.',
      'Monitoramento de eventos de segurança e análise inicial de incidentes.',
      'Suporte à administração de firewalls, ambientes virtualizados e infraestrutura de TI.',
      'Contribuição na implementação de controles de segurança, mitigação de riscos e conformidade com as políticas corporativas.'
    ]
  },
  {
    company: 'Microlins',
    role: 'Educadora de TI',
    period: 'Mar 2025 – Jan 2026',
    points: [
      'Condução de aulas de informática básica, avançada e administrativa.',
      'Planejamento de atividades, elaboração de provas, planos de aula e desenvolvimento de cursos.',
      'Gestão de indicadores (NPS, presença, taxas e retenção) com análise semanal de metas.'
    ]
  },
  {
    company: 'Hospital de Cataguases',
    role: 'Suporte Técnico',
    period: 'Abr 2024 – Jun 2024',
    points: [
      'Suporte ao sistema hospitalar e à infraestrutura de TI.',
      'Atendimento e resolução de chamados técnicos garantindo a disponibilidade de equipamentos e da rede.',
      'Manutenção e suporte em computadores e impressoras.'
    ]
  }
];

/**
 * Informações extras dos projetos que a API do GitHub não fornece.
 * A chave é o nome do repositório em minúsculas, sem hífens, pontos ou underlines.
 * A foto de cada projeto fica em src/assets/projects/<chave>.png (ou .jpg/.webp).
 */
export const projectExtras = {
  pethealthlite: {
    title: 'PetHealth Lite',
    tech: ['React', 'TypeScript', 'Tailwind', 'React Hook Form', 'Zod']
  },
  minhasfinancas: {
    title: 'Minhas Finanças',
    description:
      'Dashboard de finanças pessoais que calcula saldo, taxa de poupança e distribuição do orçamento, com gráficos de tendência mensal e exportação de relatório.',
    tech: ['React', 'Recharts', 'Vite', 'Lucide']
  },
  crudprodutosrpv: {
    title: 'CRUD de Produtos',
    tech: ['Next.js', 'Express', 'TypeScript', 'Knex', 'MySQL', 'JWT']
  },
  controlealmoxarifado: {
    title: 'Controle de Almoxarifado',
    tech: ['Next.js', 'Node.js', 'Express', 'MySQL']
  }
};

export const education = [
  { title: 'Bacharelado em Sistemas de Informação', institution: 'Estácio', period: '2023 – 2026' },
  { title: 'Técnico em Desenvolvimento de Sistemas', institution: 'Senai CTTI MG · Rio Pomba Valley', period: 'Desde 2025' },
  { title: 'Técnico Integrado em Informática', institution: 'IF Sudeste MG', period: '2017 – 2019' }
];

export const certifications = [
  'C# Essencial (LINQ, .NET 7, 8 e 9)',
  'Microsoft Azure AI Essentials',
  'Excel VBA Avançado',
  'Arquitetura de Redes',
  'Lógica de Programação'
];
