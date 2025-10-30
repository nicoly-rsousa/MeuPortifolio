/**
 * Configurações globais da aplicação de portfólio.
 * @const {object}
 */
const CONFIG = {
  /** Configurações de animação */
  ANIMATIONS: {
    REVEAL_THRESHOLD: 0.15,
    REVEAL_DELAY: 100,
    TYPING_SPEED: 100,
    TYPING_DELETE_SPEED: 50,
    TYPING_PAUSE: 2000
  },
  
  /** Configurações do sistema de partículas */
  PARTICLES: {
    COUNT_DESKTOP: 30,
    COUNT_MOBILE: 15,
    SIZE_MIN: 1,
    SIZE_MAX: 4,
    DURATION_MIN: 10,
    DURATION_MAX: 15
  },
  
  /** Configurações do cursor personalizado */
  CURSOR: {
    SIZE: 40,
    DOT_SIZE: 8,
    FOLLOW_SPEED: 0.15,
    HOVER_SCALE: 1.5
  },
  
  /** Breakpoints de resolução */
  BREAKPOINTS: {
    MOBILE: 480,
    TABLET: 768,
    DESKTOP: 1200
  },
  
  /** Intervalo para o badge de experiência (simulação) */
  SKILL_EXPERIENCE_MIN: 1,
  SKILL_EXPERIENCE_MAX: 3
};

/**
 * Seletores de DOM usados com frequência na aplicação.
 * @const {object}
 */
const SELECTORS = {
  REVEAL_ELEMENTS: '.reveal',
  SKILL_CARDS: '.skill-card',
  SKILL_ICON: '.skill-icon',
  PARTICLE_CONTAINER: '#particle-container',
  SUBTITLE: '.subtitle',
  PROJECT_IMAGE: '.project-image'
};

/**
 * Palavras a serem usadas no efeito de digitação.
 * @const {string[]}
 */
const TYPING_WORDS = [
  'Desenvolvedora Full Stack em Formação',
  'Professora de TI',
  'Estudante de Sistemas de Informação'
];

// ============================================
// UTILITÁRIOS
// ============================================

/**
 * @namespace DOM
 * Utilitários para manipulação do DOM.
 */
const DOM = {
  /**
   * Seleciona um único elemento do DOM.
   * @param {string} selector - O seletor CSS.
   * @param {Document|HTMLElement} [parent=document] - O elemento pai para buscar.
   * @returns {HTMLElement | null} O elemento encontrado ou null.
   */
  select: (selector, parent = document) => parent.querySelector(selector),
  
  /**
   * Seleciona múltiplos elementos do DOM.
   * @param {string} selector - O seletor CSS.
   * @param {Document|HTMLElement} [parent=document] - O elemento pai para buscar.
   * @returns {HTMLElement[]} Um array de elementos encontrados.
   */
  selectAll: (selector, parent = document) => Array.from(parent.querySelectorAll(selector)),
  
  /**
   * Cria um novo elemento DOM com propriedades.
   * @param {string} tag - A tag HTML (ex: 'div').
   * @param {object} [props={}] - Propriedades para aplicar ao elemento (className, style, data-*, etc.).
   * @returns {HTMLElement} O novo elemento criado.
   */
  create: (tag, props = {}) => {
    const element = document.createElement(tag);
    
    Object.entries(props).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else if (key.startsWith('on') && typeof value === 'function') {
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        element.setAttribute(key, value);
      }
    });
    
    return element;
  },
  
  /**
   * Adiciona uma classe a um elemento após um atraso.
   * @param {HTMLElement} element - O elemento alvo.
   * @param {string} className - A classe para adicionar.
   * @param {number} [delay=0] - O atraso em milissegundos.
   */
  addClassWithDelay: (element, className, delay = 0) => {
    setTimeout(() => element.classList.add(className), delay);
  }
};

/**
 * @namespace MathUtils
 * Utilitários matemáticos.
 */
const MathUtils = {
  /**
   * Gera um número aleatório de ponto flutuante em um intervalo.
   * @param {number} min - Valor mínimo.
   * @param {number} max - Valor máximo.
   * @returns {number}
   */
  random: (min, max) => Math.random() * (max - min) + min,
  
  /**
   * Gera um número inteiro aleatório em um intervalo.
   * @param {number} min - Valor mínimo.
   * @param {number} max - Valor máximo.
   * @returns {number}
   */
  randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  
  /**
   * Limita um valor entre um mínimo e um máximo.
   * @param {number} value - O valor para limitar.
   * @param {number} min - O limite mínimo.
   * @param {number} max - O limite máximo.
   * @returns {number}
   */
  clamp: (value, min, max) => Math.min(Math.max(value, min), max)
};

/**
 * @namespace Performance
 * Utilitários de otimização de performance.
 */
const Performance = {
  /**
   * Cria uma função "debounce".
   * @param {Function} func - A função para executar.
   * @param {number} wait - O tempo de espera em ms.
   * @returns {Function}
   */
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },
  
  /**
   * Cria uma função "throttle".
   * @param {Function} func - A função para executar.
   * @param {number} limit - O intervalo de tempo em ms.
   * @returns {Function}
   */
  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  /**
   * Verifica se o navegador suporta IntersectionObserver.
   * @returns {boolean}
   */
  supportsIntersectionObserver: () => 'IntersectionObserver' in window
};

// ============================================
// CLASSE: GERENCIADOR DE ANIMAÇÕES
// ============================================
/**
 * @class AnimationController
 * Gerencia as animações de "reveal-on-scroll" usando IntersectionObserver.
 */
class AnimationController {
  constructor() {
    /** @private @type {IntersectionObserver | null} */
    this.observer = null;
    /** @private @type {HTMLElement[]} */
    this.elements = [];
  }
  
  /**
   * Inicializa o observador e começa a observar os elementos.
   */
  init() {
    if (!Performance.supportsIntersectionObserver()) {
      this.fallbackInit();
      return;
    }
    
    this.setupObserver();
    this.observeElements();
  }
  
  /**
   * @private
   * Configura a instância do IntersectionObserver.
   */
  setupObserver() {
    const options = {
      root: null,
      threshold: CONFIG.ANIMATIONS.REVEAL_THRESHOLD,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      options
    );
  }
  
  /**
   * @private
   * Callback executado quando um elemento entra ou sai da viewport.
   * @param {IntersectionObserverEntry[]} entries - As entradas do observador.
   */
  handleIntersection(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
        const delay = index * CONFIG.ANIMATIONS.REVEAL_DELAY;
        this.revealElement(entry.target, delay);
      }
    });
  }
  
  /**
   * @private
   * Torna um elemento visível com um atraso.
   * @param {HTMLElement} element - O elemento para revelar.
   * @param {number} delay - O atraso em ms.
   */
  revealElement(element, delay) {
    setTimeout(() => {
      element.classList.add('visible');
      this.applySpecialEffects(element);
    }, delay);
  }
  
  /**
   * @private
   * Aplica efeitos especiais adicionais em elementos específicos.
   * @param {HTMLElement} element - O elemento revelado.
   */
  applySpecialEffects(element) {
    if (element.classList.contains('skill-card')) {
      this.animateSkillCard(element);
    }
  }
  
  /**
   * @private
   * Anima um card de habilidade e adiciona um "badge" de experiência (simulado).
   * @param {HTMLElement} card - O elemento .skill-card.
   */
  animateSkillCard(card) {
    const icon = card.querySelector(SELECTORS.SKILL_ICON);
    
    if (icon && !card.dataset.animated) {
      card.dataset.animated = 'true';
      
      // Reseta e reinicia animação
      icon.style.animation = 'none';
      setTimeout(() => {
        icon.style.animation = 'iconBounce 0.6s ease, iconFloat 3s ease-in-out infinite 0.6s';
      }, 10);
      
      this.addExperienceBadge(card);
    }
  }
  
  /**
   * @private
   * Adiciona um "badge" de experiência simulado ao card.
   * @param {HTMLElement} card - O elemento .skill-card.
   */
  addExperienceBadge(card) {
    const experience = MathUtils.randomInt(
      CONFIG.SKILL_EXPERIENCE_MIN,
      CONFIG.SKILL_EXPERIENCE_MAX
    );
    
    const badge = DOM.create('div', {
      className: 'experience-badge',
      style: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'rgba(248, 24, 148, 0.2)',
        color: 'var(--primary-color)',
        padding: '5px 10px',
        borderRadius: '15px',
        fontSize: '0.8em',
        fontWeight: '600',
        border: '1px solid var(--primary-color)',
        zIndex: '10',
        opacity: '0',
        animation: 'fadeInScale 0.5s ease forwards 0.3s'
      }
    });
    
    badge.textContent = `${experience}+ anos`;
    card.style.position = 'relative';
    card.appendChild(badge);
  }
  
  /**
   * @private
   * Seleciona e observa todos os elementos .reveal.
   */
  observeElements() {
    this.elements = DOM.selectAll(SELECTORS.REVEAL_ELEMENTS);
    this.elements.forEach(el => this.observer.observe(el));
  }
  
  /**
   * @private
   * Fallback para navegadores sem IntersectionObserver.
   */
  fallbackInit() {
    const elements = DOM.selectAll(SELECTORS.REVEAL_ELEMENTS);
    elements.forEach(el => el.classList.add('visible'));
  }
  
  /**
   * Destrói o observador e limpa referências.
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// ============================================
// CLASSE: SISTEMA DE PARTÍCULAS
// ============================================
/**
 * @class ParticleSystem
 * Cria e gerencia o background animado de partículas.
 */
class ParticleSystem {
  /**
   * @param {string} containerId - O ID do elemento container.
   */
  constructor(containerId) {
    /** @type {HTMLElement | null} */
    this.container = DOM.select(containerId);
    /** @private @type {HTMLElement[]} */
    this.particles = [];
    /** @type {boolean} */
    this.isActive = false;
  }
  
  /**
   * Inicializa e cria as partículas.
   */
  init() {
    if (!this.container) {
      console.warn('Container de partículas não encontrado');
      return;
    }
    
    this.createParticles();
    this.isActive = true;
  }
  
  /**
   * @private
   * Cria o pool inicial de partículas.
   */
  createParticles() {
    const count = this.getParticleCount();
    
    for (let i = 0; i < count; i++) {
      const particle = this.createParticle();
      this.particles.push(particle);
      this.container.appendChild(particle);
    }
  }
  
  /**
   * @private
   * Retorna a contagem de partículas com base na largura da tela.
   * @returns {number}
   */
  getParticleCount() {
    return window.innerWidth > CONFIG.BREAKPOINTS.TABLET
      ? CONFIG.PARTICLES.COUNT_DESKTOP
      : CONFIG.PARTICLES.COUNT_MOBILE;
  }
  
  /**
   * @private
   * Cria um único elemento de partícula com estilos aleatórios.
   * @returns {HTMLElement}
   */
  createParticle() {
    const size = MathUtils.random(CONFIG.PARTICLES.SIZE_MIN, CONFIG.PARTICLES.SIZE_MAX);
    const startX = MathUtils.random(0, 100);
    const drift = MathUtils.random(-200, 200);
    const delay = MathUtils.random(0, 10);
    const duration = MathUtils.random(CONFIG.PARTICLES.DURATION_MIN, CONFIG.PARTICLES.DURATION_MAX);
    
    return DOM.create('div', {
      className: 'particle',
      style: {
        width: `${size}px`,
        height: `${size}px`,
        left: `${startX}%`,
        '--drift': `${drift}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }
    });
  }
  
  /**
   * Pausa a animação das partículas.
   */
  pause() {
    this.particles.forEach(p => p.style.animationPlayState = 'paused');
    this.isActive = false;
  }
  
  /**
   * Retoma a animação das partículas.
   */
  resume() {
    this.particles.forEach(p => p.style.animationPlayState = 'running');
    this.isActive = true;
  }
  
  /**
   * Remove todas as partículas do DOM.
   */
  destroy() {
    this.particles.forEach(p => p.remove());
    this.particles = [];
    this.isActive = false;
  }
}

// ============================================
// CLASSE: EFEITO DE DIGITAÇÃO
// ============================================
/**
 * @class TypingEffect
 * Gerencia o efeito de digitação no subtítulo.
 */
class TypingEffect {
  /**
   * @param {string | HTMLElement} selector - O seletor CSS ou elemento.
   * @param {string[]} [words=TYPING_WORDS] - Array de palavras para digitar.
   */
  constructor(selector, words = TYPING_WORDS) {
    /** @type {HTMLElement | null} */
    this.element = typeof selector === 'string' ? DOM.select(selector) : selector;
    /** @type {string[]} */
    this.words = words;
    /** @private @type {number} */
    this.wordIndex = 0;
    /** @private @type {number} */
    this.charIndex = 0;
    /** @private @type {boolean} */
    this.isDeleting = false;
    /** @type {boolean} */
    this.isRunning = false;
    /** @private @type {number | null} */
    this.timeoutId = null;
    /** @private @type {string} */
    this.originalText = '';
  }
  
  /**
   * Inicia o efeito de digitação após um atraso.
   * @param {number} [delay=1000] - Atraso inicial em ms.
   */
  start(delay = 1000) {
    if (!this.element || this.isRunning) return;
    
    this.isRunning = true;
    this.originalText = this.element.textContent || '';
    
    setTimeout(() => {
      if (this.element) this.element.textContent = '';
      this.type();
    }, delay);
  }
  
  /**
   * @private
   * A lógica recursiva de digitação.
   */
  type() {
    if (!this.isRunning || !this.element) return;
    
    const currentWord = this.words[this.wordIndex];
    
    if (this.isDeleting) {
      this.element.textContent = currentWord.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentWord.substring(0, this.charIndex + 1);
      this.charIndex++;
    }
    
    let typeSpeed = this.isDeleting 
      ? CONFIG.ANIMATIONS.TYPING_DELETE_SPEED 
      : CONFIG.ANIMATIONS.TYPING_SPEED;
    
    if (!this.isDeleting && this.charIndex === currentWord.length) {
      typeSpeed = CONFIG.ANIMATIONS.TYPING_PAUSE;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      typeSpeed = 500;
    }
    
    this.timeoutId = setTimeout(() => this.type(), typeSpeed);
  }
  
  /**
   * Para completamente o efeito.
   */
  stop() {
    this.isRunning = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
  
  /**
   * Pausa o efeito.
   */
  pause() {
    this.isRunning = false;
  }
  
  /**
   * Retoma o efeito.
   */
  resume() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.type();
    }
  }
  
  /**
   * Para e restaura o texto original.
   */
  destroy() {
    this.stop();
    if (this.originalText && this.element) {
      this.element.textContent = this.originalText;
    }
  }
}

// ============================================
// CLASSE: CURSOR PERSONALIZADO
// ============================================
/**
 * @class CursorEffect
 * Cria um cursor personalizado que segue o mouse.
 */
class CursorEffect {
  constructor() {
    /** @private @type {HTMLElement | null} */
    this.cursor = null;
    /** @private @type {HTMLElement | null} */
    this.cursorDot = null;
    /** @private @type {number} */
    this.mouseX = 0;
    /** @private @type {number} */
    this.mouseY = 0;
    /** @private @type {number} */
    this.cursorX = 0;
    /** @private @type {number} */
    this.cursorY = 0;
    /** @private @type {number | null} */
    this.animationId = null;
    /** @type {boolean} */
    this.isActive = false;
  }
  
  /**
   * Inicializa o cursor, se não for um dispositivo móvel.
   */
  init() {
    if (window.innerWidth <= CONFIG.BREAKPOINTS.TABLET) {
      return; // Não ativar em mobile/tablet
    }
    
    this.createElements();
    this.attachListeners();
    this.animate();
    this.isActive = true;
  }
  
  /**
   * @private
   * Cria os elementos DOM para o cursor.
   */
  createElements() {
    this.cursor = DOM.create('div', {
      className: 'custom-cursor',
      style: {
        position: 'fixed',
        width: `${CONFIG.CURSOR.SIZE}px`,
        height: `${CONFIG.CURSOR.SIZE}px`,
        border: '2px solid var(--primary-color)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '9998',
        transition: 'all 0.15s ease',
        opacity: '0',
        transform: 'translate(-50%, -50%)'
      }
    });
    
    this.cursorDot = DOM.create('div', {
      className: 'custom-cursor-dot',
      style: {
        position: 'fixed',
        width: `${CONFIG.CURSOR.DOT_SIZE}px`,
        height: `${CONFIG.CURSOR.DOT_SIZE}px`,
        background: 'var(--primary-color)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '9999',
        opacity: '0',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 10px var(--primary-color)'
      }
    });
    
    document.body.appendChild(this.cursor);
    document.body.appendChild(this.cursorDot);
  }
  
  /**
   * @private
   * Adiciona listeners de mouse.
   */
  attachListeners() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      
      if (this.cursor) this.cursor.style.opacity = '1';
      if (this.cursorDot) this.cursorDot.style.opacity = '1';
      
      if (this.cursorDot) {
        this.cursorDot.style.left = this.mouseX + 'px';
        this.cursorDot.style.top = this.mouseY + 'px';
      }
    });
    
    this.setupHoverEffects();
  }
  
  /**
   * @private
   * Configura efeitos de hover para elementos interativos.
   */
  setupHoverEffects() {
    const selectors = 'a, button, .skill-card, .project-card, .social-btn';
    const elements = DOM.selectAll(selectors);
    
    elements.forEach(el => {
      el.addEventListener('mouseenter', () => this.scaleUp());
      el.addEventListener('mouseleave', () => this.scaleDown());
    });
  }
  
  /**
   * @private
   * Aumenta o cursor no hover.
   */
  scaleUp() {
    if (this.cursor) {
      this.cursor.style.transform = `translate(-50%, -50%) scale(${CONFIG.CURSOR.HOVER_SCALE})`;
      this.cursor.style.borderColor = 'var(--secondary-color)';
    }
  }
  
  /**
   * @private
   * Retorna o cursor ao tamanho normal.
   */
  scaleDown() {
    if (this.cursor) {
      this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      this.cursor.style.borderColor = 'var(--primary-color)';
    }
  }
  
  /**
   * @private
   * Loop de animação (requestAnimationFrame) para suavizar o movimento do cursor.
   */
  animate() {
    this.cursorX += (this.mouseX - this.cursorX) * CONFIG.CURSOR.FOLLOW_SPEED;
    this.cursorY += (this.mouseY - this.cursorY) * CONFIG.CURSOR.FOLLOW_SPEED;
    
    if (this.cursor) {
      this.cursor.style.left = this.cursorX + 'px';
      this.cursor.style.top = this.cursorY + 'px';
    }
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  /**
   * Remove o cursor e para a animação.
   */
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.cursor) this.cursor.remove();
    if (this.cursorDot) this.cursorDot.remove();
    this.isActive = false;
  }
}

// ============================================
// CLASSE: BARRA DE PROGRESSO DE SCROLL
// ============================================
/**
 * @class ScrollProgress
 * Cria uma barra de progresso no topo da página que reage ao scroll.
 */
class ScrollProgress {
  constructor() {
    /** @private @type {HTMLElement | null} */
    this.progressBar = null;
    /** @type {boolean} */
    this.isActive = false;
  }
  
  /**
   * Inicializa e cria a barra de progresso.
   */
  init() {
    this.createProgressBar();
    this.attachListener();
    this.isActive = true;
  }
  
  /**
   * @private
   * Cria o elemento DOM da barra de progresso.
   */
  createProgressBar() {
    this.progressBar = DOM.create('div', {
      className: 'scroll-progress',
      style: {
        position: 'fixed',
        top: '0',
        left: '0',
        height: '4px',
        background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--tertiary-color))',
        width: '0%',
        zIndex: '9999',
        transition: 'width 0.1s ease',
        boxShadow: '0 0 10px rgba(248, 24, 148, 0.8)'
      }
    });
    
    document.body.appendChild(this.progressBar);
  }
  
  /**
   * @private
   * Adiciona o listener de scroll (com throttle) para atualizar a barra.
   */
  attachListener() {
    const updateProgress = Performance.throttle(() => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      if (this.progressBar) {
        this.progressBar.style.width = scrolled + '%';
      }
    }, 16); // ~60fps
    
    window.addEventListener('scroll', updateProgress);
  }
  
  /**
   * Remove a barra de progresso do DOM.
   */
  destroy() {
    if (this.progressBar) {
      this.progressBar.remove();
    }
    this.isActive = false;
  }
}

// ============================================
// CLASSE: SMOOTH SCROLL
// ============================================
/**
 * @class SmoothScroll
 * Implementa o scroll suave para links âncora (href="#...").
 */
class SmoothScroll {
  constructor() {
    /** @type {boolean} */
    this.isActive = false;
  }
  
  /**
   * Inicializa e adiciona os listeners de clique.
   */
  init() {
    this.attachListeners();
    this.isActive = true;
  }
  
  /**
   * @private
   * Adiciona listeners de clique aos links âncora.
   */
  attachListeners() {
    const links = DOM.selectAll('a[href^="#"]');
    
    links.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        
        e.preventDefault();
        const target = DOM.select(href);
        
        if (target) {
          this.scrollToElement(target);
        }
      });
    });
  }
  
  /**
   * Executa o scroll suave para um elemento.
   * @param {HTMLElement} element - O elemento alvo.
   * @param {number} [offset=80] - Deslocamento (ex: para altura de um header fixo).
   */
  scrollToElement(element, offset = 80) {
    const targetPosition = element.offsetTop - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// ============================================
// CLASSE: MONITOR DE PERFORMANCE (DEBUG)
// ============================================
/**
 * @class PerformanceMonitor
 * Exibe um monitor de FPS e outros dados de debug (ativado com #debug na URL).
 */
class PerformanceMonitor {
  constructor() {
    /** @private @type {HTMLElement | null} */
    this.monitor = null;
    /** @private @type {number} */
    this.fps = 0;
    /** @private @type {number} */
    this.lastTime = performance.now();
    /** @private @type {number} */
    this.frames = 0;
    /** @type {boolean} */
    this.isActive = false;
  }
  
  /**
   * Inicializa e cria o monitor.
   */
  init() {
    this.createMonitor();
    this.startMonitoring();
    this.isActive = true;
  }
  
  /**
   * @private
   * Cria o elemento DOM para o monitor.
   */
  createMonitor() {
    this.monitor = DOM.create('div', {
      className: 'performance-monitor',
      style: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.9)',
        color: 'var(--primary-color)',
        padding: '15px',
        borderRadius: '10px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.9em',
        zIndex: '9999',
        border: '1px solid var(--primary-color)',
        minWidth: '200px'
      }
    });
    
    document.body.appendChild(this.monitor);
  }
  
  /**
   * @private
   * Inicia o loop (requestAnimationFrame) para calcular o FPS.
   */
  startMonitoring() {
    const update = () => {
      this.frames++;
      const currentTime = performance.now();
      
      if (currentTime >= this.lastTime + 1000) {
        this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
        this.frames = 0;
        this.lastTime = currentTime;
        this.updateDisplay();
      }
      
      if (this.isActive) {
        requestAnimationFrame(update);
      }
    };
    
    update();
  }
  
  /**
   * @private
   * Atualiza o HTML do monitor com os dados mais recentes.
   */
  updateDisplay() {
    if (this.monitor) {
      this.monitor.innerHTML = `
        <div style="margin-bottom: 5px;"><strong>FPS:</strong> ${this.fps}</div>
        <div style="margin-bottom: 5px;"><strong>Resolução:</strong> ${window.innerWidth}x${window.innerHeight}</div>
        <div><strong>Scroll:</strong> ${Math.round(window.scrollY)}px</div>
      `;
    }
  }
  
  /**
   * Para o monitor e o remove do DOM.
   */
  destroy() {
    this.isActive = false;
    if (this.monitor) {
      this.monitor.remove();
    }
  }
}

// ============================================
// CLASSE PRINCIPAL: PORTFOLIO APP
// ============================================
/**
 * @class PortfolioApp
 * Classe principal que orquestra todos os módulos da aplicação.
 */
class PortfolioApp {
  constructor() {
    /** * @private
     * @type {Object<string, object>} 
     */
    this.modules = {};
    /** @type {boolean} */
    this.isInitialized = false;
  }
  
  /**
   * Inicializa a aplicação principal e todos os módulos.
   */
  async init() {
    if (this.isInitialized) {
      console.warn('Portfólio já foi inicializado');
      return;
    }
    
    try {
      this.initModules();
      this.setupGlobalListeners();
      this.addCustomStyles();
      this.isInitialized = true;
      this.logWelcome();
    } catch (error) {
      console.error('Erro ao inicializar portfólio:', error);
    }
  }
  
  /**
   * @private
   * Instancia e inicializa todos os módulos.
   */
  initModules() {
    // Animações de reveal
    this.modules.animations = new AnimationController();
    this.modules.animations.init();
    
    // Sistema de partículas
    this.modules.particles = new ParticleSystem(SELECTORS.PARTICLE_CONTAINER);
    this.modules.particles.init();
    
    // Efeito de digitação
    this.modules.typing = new TypingEffect(SELECTORS.SUBTITLE);
    this.modules.typing.start(1000);
    
    // Cursor personalizado
    this.modules.cursor = new CursorEffect();
    this.modules.cursor.init();
    
    // Barra de progresso
    this.modules.scrollProgress = new ScrollProgress();
    this.modules.scrollProgress.init();
    
    // Smooth scroll
    this.modules.smoothScroll = new SmoothScroll();
    this.modules.smoothScroll.init();
    
    // Monitor de performance (apenas em modo debug)
    if (window.location.hash === '#debug') {
      this.modules.monitor = new PerformanceMonitor();
      this.modules.monitor.init();
    }
  }
  
  /**
   * @private
   * Configura listeners globais (ex: visibilidade da aba).
   */
  setupGlobalListeners() {
    // Pausar animações quando aba não está ativa
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    });
    
    // Cleanup ao sair
    window.addEventListener('beforeunload', () => {
      this.destroy();
    });
  }
  
  /**
   * @private
   * Adiciona estilos CSS dinâmicos necessários para os scripts.
   */
  addCustomStyles() {
    const style = DOM.create('style');
    style.textContent = `
      /* Animação para o badge de experiência */
      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.5);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      /* Esconde o cursor padrão em desktops onde o cursor personalizado está ativo */
      @media (min-width: ${CONFIG.BREAKPOINTS.TABLET + 1}px) {
        * {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  /**
   * Pausa todos os módulos que suportam pausa.
   */
  pause() {
    Object.values(this.modules).forEach(module => {
      if (module.pause && typeof module.pause === 'function') {
        module.pause();
      }
    });
  }
  
  /**
   * Retoma todos os módulos que suportam retomada.
   */
  resume() {
    Object.values(this.modules).forEach(module => {
      if (module.resume && typeof module.resume === 'function') {
        module.resume();
      }
    });
  }
  
  /**
   * Destrói todos os módulos e limpa a aplicação.
   */
  destroy() {
    Object.values(this.modules).forEach(module => {
      if (module.destroy && typeof module.destroy === 'function') {
        module.destroy();
      }
    });
    this.modules = {};
    this.isInitialized = false;
  }
  
  /**
   * @private
   * Exibe uma mensagem de boas-vindas no console (para recrutadores).
   */
  logWelcome() {
    console.log('%c🚀 Bem-vindo ao portfólio de Nicoly Rodrigues!', 
      'font-size: 20px; font-weight: bold; color: #F81894;');
    console.log('%c👀 Recrutador? Que bom te ver por aqui! Este site foi construído com JS modular e moderno.', 
      'font-size: 14px; color: #A78BFA;');
    console.log('%cCódigo-fonte deste script está documentado (JSDoc) para mostrar minhas boas práticas.', 
      'font-size: 12px; color: #14b8a6;');
    
    if (window.location.hash !== '#debug') {
      console.log('%c💡 P.S.: Adicione #debug na URL para ativar o monitor de performance (FPS, etc.)', 
        'font-size: 11px; color: #888;');
    }
  }
}

// ============================================
// INICIALIZAÇÃO
// ============================================
/**
 * Listener de evento principal que inicializa a aplicação
 * assim que o DOM estiver pronto.
 */
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
  app.init();
  
  // Expor globalmente para debugging (apenas em modo debug)
  if (window.location.hash === '#debug') {
    window.portfolioApp = app;
    console.log('%c🔧 Debug Mode Ativo - use window.portfolioApp para inspecionar', 
      'font-size: 12px; color: #FFD700; font-weight: bold;');
  }
});