// ApplicationsSection.jsx — environments/segments

const BRAApplicationsSection = () => {
  const apps = [
    { label: 'Galpões Industriais', img: 'https://www.bralarmseg.com.br/lp/imgs/iluminacao-galpao.jpg' },
    { label: 'Frigoríficos', img: 'https://www.bralarmseg.com.br/lp/imgs/cameras-frias.jpg' },
    { label: 'Centros Logísticos', img: 'https://www.bralarmseg.com.br/lp/imgs/logistica.jpg' },
    { label: 'Estacionamentos', img: 'https://www.bralarmseg.com.br/lp/imgs/luminaria-led-para-estacionamento-novvalight.png' },
    { label: 'Fábricas', img: 'https://www.bralarmseg.com.br/lp/imgs/iluminacao-industria.jpg' },
    { label: 'Armazéns', img: 'https://www.bralarmseg.com.br/lp/imgs/projeto-iluminacao-industrial-LED-1.jpg' },
  ];

  return React.createElement('section', { style: appStyles.section, id: 'applications' },
    React.createElement('div', { style: appStyles.inner },
      React.createElement('div', { style: appStyles.header },
        React.createElement('div', { style: appStyles.eyebrow }, 'Onde atuamos'),
        React.createElement('h2', { style: appStyles.heading }, 'APLICAÇÕES E AMBIENTES'),
        React.createElement('p', { style: appStyles.sub }, 'Soluções especializadas para cada tipo de ambiente industrial.')
      ),
      React.createElement('div', { style: appStyles.grid },
        apps.map((app, i) =>
          React.createElement(AppTile, { key: i, label: app.label, img: app.img })
        )
      )
    )
  );
};

const AppTile = ({ label, img }) => {
  const [hovered, setHovered] = React.useState(false);
  return React.createElement('div', {
    style: { ...appStyles.tile, ...(hovered ? appStyles.tileHover : {}) },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  },
    React.createElement('img', { src: img, alt: label, style: { ...appStyles.tileImg, transform: hovered ? 'scale(1.05)' : 'scale(1)' }, loading: 'lazy' }),
    React.createElement('div', { style: appStyles.tileOverlay }),
    React.createElement('div', { style: appStyles.tileLabel }, label)
  );
};

const appStyles = {
  section: { padding: '80px 0', background: '#F5F5F5' },
  inner: { maxWidth: 1280, margin: '0 auto', padding: '0 24px' },
  header: { textAlign: 'center', marginBottom: 40 },
  eyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E35106', marginBottom: 8 },
  heading: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 44, fontWeight: 800, color: '#111', margin: '0 0 12px', letterSpacing: '-0.01em' },
  sub: { fontSize: 16, color: '#5A5A5A', maxWidth: 480, margin: '0 auto' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 },
  tile: { position: 'relative', borderRadius: 4, overflow: 'hidden', height: 180, cursor: 'pointer', transition: 'box-shadow 200ms' },
  tileHover: { boxShadow: '0 8px 24px rgba(0,0,0,0.2)' },
  tileImg: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 400ms ease-out', display: 'block' },
  tileOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,13,26,0.75) 0%, rgba(6,13,26,0.1) 60%)', pointerEvents: 'none' },
  tileLabel: { position: 'absolute', bottom: 12, left: 14, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }
};

Object.assign(window, { BRAApplicationsSection });
