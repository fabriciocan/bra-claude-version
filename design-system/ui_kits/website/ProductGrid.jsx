// ProductGrid.jsx — products section with filter tabs

const BRAProductGrid = ({ onContact }) => {
  const categories = ['Todos', 'Highbay', 'Projetor UFO', 'Projetor', 'Emergência'];
  const [active, setActive] = React.useState('Todos');

  const products = [
    { id: 1, name: 'LUMINÁRIA HIGHBAY MAGNA', category: 'Highbay', specs: ['150W','IP66','140lm/W'], desc: 'Ideal para galpões e fábricas com pé-direito elevado.', imgUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-hbm150.jpg' },
    { id: 2, name: 'LUMINÁRIA HIGHBAY CLASSIC', category: 'Highbay', specs: ['100/150W','IP20','140lm/W'], desc: 'Eficiência luminosa 140lm/W para ambientes industriais.', imgUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-highbayclassic.jpg' },
    { id: 3, name: 'LUMINÁRIA HIGHBAY INDUSTRIAL', category: 'Highbay', specs: ['100–200W','IP65','Alumínio'], desc: 'Corpo em alumínio injetado com alta dissipação térmica.', imgUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-hbi.jpg' },
    { id: 4, name: 'PROJETOR UFO LUXI', category: 'Projetor UFO', specs: ['100–200W','IP65','25.000h'], desc: 'Expectativa de vida útil de 25.000 horas.', imgUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-ufo.jpg' },
    { id: 5, name: 'PROJETOR UFO ELITE', category: 'Projetor UFO', specs: ['100–200W','IP65','160lm/W','50.000h'], desc: 'Alta eficiência com vida útil de 50.000 horas (L70).', imgUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-ufoelite.jpg' },
    { id: 6, name: 'PROJETOR SPORT', category: 'Projetor', specs: ['50–200W','IP66','Ângulo ajustável'], desc: 'Ideal para quadras esportivas e galpões.', imgUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-sport_plus.jpg' },
    { id: 7, name: 'PROJETOR VEGAS', category: 'Projetor', specs: ['50–200W','IP66'], desc: 'Design moderno com ângulo de instalação ajustável.', imgUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-vegas.jpg' },
    { id: 8, name: 'PROJETOR FAROS24', category: 'Projetor', specs: ['50/100W','IP66','24Vdc'], desc: 'Alimentação 24Vdc, ideal para torres solares.', imgUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-faros24_plus.jpg' },
    { id: 9, name: 'PROJETOR FOX IR', category: 'Projetor', specs: ['35/50W','IP66','850/940nm'], desc: 'Infravermelho para segurança e vigilância (CFTV).', imgUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-foxir.jpg' },
    { id: 10, name: 'LUMINÁRIA LUMO EMERGÊNCIA', category: 'Emergência', specs: ['50W','IP20','130lm/W'], desc: 'Eficiência luminosa para supermercados e escritórios.', imgUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-lumoemergencia.jpg' },
  ];

  const filtered = active === 'Todos' ? products : products.filter(p => p.category === active);

  return React.createElement('section', { style: pgStyles.section, id: 'products' },
    React.createElement('div', { style: pgStyles.inner },
      React.createElement('div', { style: pgStyles.header },
        React.createElement('div', { style: pgStyles.eyebrow }, 'Catálogo Técnico'),
        React.createElement('h2', { style: pgStyles.heading }, 'NOSSOS PRODUTOS'),
        React.createElement('p', { style: pgStyles.sub }, 'Soluções LED industriais com garantia estendida e suporte técnico especializado.')
      ),
      // Filter tabs
      React.createElement('div', { style: pgStyles.tabs },
        categories.map(cat =>
          React.createElement('button', {
            key: cat, style: { ...pgStyles.tab, ...(active === cat ? pgStyles.tabActive : {}) },
            onClick: () => setActive(cat)
          }, cat)
        )
      ),
      // Grid
      React.createElement('div', { style: pgStyles.grid },
        filtered.map(p =>
          React.createElement(BRAProductCard, { key: p.id, product: p, onContact })
        )
      )
    )
  );
};

const pgStyles = {
  section: { padding: '80px 0', background: '#fff' },
  inner: { maxWidth: 1280, margin: '0 auto', padding: '0 24px' },
  header: { textAlign: 'center', marginBottom: 40 },
  eyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E35106', marginBottom: 8 },
  heading: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 44, fontWeight: 800, color: '#111', margin: '0 0 12px', letterSpacing: '-0.01em' },
  sub: { fontSize: 16, color: '#5A5A5A', maxWidth: 520, margin: '0 auto' },
  tabs: { display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' },
  tab: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '7px 16px', borderRadius: 3, border: '1px solid #DCDCDC', background: '#fff', color: '#5A5A5A', cursor: 'pointer', transition: 'all 150ms' },
  tabActive: { background: '#E35106', color: '#fff', borderColor: '#E35106' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }
};

Object.assign(window, { BRAProductGrid });
