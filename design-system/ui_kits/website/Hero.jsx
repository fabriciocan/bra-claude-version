// Hero.jsx — BRALARMSEG hero section

const BRAHero = ({ onNavigate }) => {
  return React.createElement('section', { style: heroStyles.section },
    // Dark overlay
    React.createElement('div', { style: heroStyles.overlay }),
    React.createElement('div', { style: heroStyles.content },
      React.createElement('div', { style: heroStyles.eyebrow }, 'Desde 2007 — Curitiba, PR'),
      React.createElement('h1', { style: heroStyles.headline },
        'ILUMINAÇÃO LED', React.createElement('br', null), 'INDUSTRIAL'
      ),
      React.createElement('p', { style: heroStyles.sub },
        'Eficiência, durabilidade e economia para o seu negócio.',
        React.createElement('br', null),
        'Soluções com IP65 a IP68 para ambientes industriais adversos.'
      ),
      React.createElement('div', { style: heroStyles.stats },
        React.createElement(HeroStat, { num: '80%', label: 'Economia energética' }),
        React.createElement(HeroStat, { num: '+50k', label: 'Horas de vida útil' }),
        React.createElement(HeroStat, { num: 'IP68', label: 'Proteção máxima' }),
      ),
      React.createElement('div', { style: heroStyles.ctas },
        React.createElement('a', {
          href: '#', style: heroStyles.ctaPrimary,
          onClick: e => { e.preventDefault(); onNavigate && onNavigate('products'); }
        }, 'VER PRODUTOS'),
        React.createElement('a', {
          href: '#', style: heroStyles.ctaSecondary,
          onClick: e => { e.preventDefault(); onNavigate && onNavigate('contact'); }
        }, 'SOLICITAR ORÇAMENTO')
      )
    )
  );
};

const HeroStat = ({ num, label }) =>
  React.createElement('div', { style: heroStyles.stat },
    React.createElement('div', { style: heroStyles.statNum }, num),
    React.createElement('div', { style: heroStyles.statLabel }, label)
  );

const heroStyles = {
  section: {
    position: 'relative', minHeight: 520,
    background: 'linear-gradient(135deg, #060D1A 0%, #0A1628 60%, #0F2040 100%)',
    display: 'flex', alignItems: 'center', overflow: 'hidden'
  },
  overlay: {
    position: 'absolute', inset: 0,
    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.025) 39px, rgba(255,255,255,0.025) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.025) 39px, rgba(255,255,255,0.025) 40px)',
    pointerEvents: 'none'
  },
  content: { position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '80px 24px', width: '100%' },
  eyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E35106', marginBottom: 16 },
  headline: {
    fontFamily: "'Barlow Condensed', sans-serif", fontSize: 80, fontWeight: 800,
    lineHeight: 0.95, letterSpacing: '-0.02em', color: '#fff', margin: '0 0 20px'
  },
  sub: { fontFamily: "'Barlow', sans-serif", fontSize: 18, fontWeight: 300, lineHeight: 1.65, color: '#A0B4CC', marginBottom: 36, maxWidth: 520 },
  stats: { display: 'flex', gap: 32, marginBottom: 36 },
  stat: { display: 'flex', flexDirection: 'column', gap: 2 },
  statNum: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 800, color: '#E35106', lineHeight: 1 },
  statLabel: { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5A7AA0' },
  ctas: { display: 'flex', gap: 12, alignItems: 'center' },
  ctaPrimary: {
    fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700,
    letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
    background: '#E35106', color: '#fff', padding: '13px 28px', borderRadius: 3,
    transition: 'background 150ms'
  },
  ctaSecondary: {
    fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, fontWeight: 700,
    letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
    background: 'transparent', color: '#fff', padding: '12px 28px', borderRadius: 3,
    border: '2px solid rgba(255,255,255,0.3)', transition: 'border-color 150ms'
  }
};

Object.assign(window, { BRAHero });
