// ProductCard.jsx — single product card

const BRAProductCard = ({ product, onContact }) => {
  const [hovered, setHovered] = React.useState(false);

  return React.createElement('div', {
    style: {
      ...productCardStyles.card,
      boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.14)' : '0 1px 4px rgba(0,0,0,0.08)',
      transform: hovered ? 'translateY(-3px)' : 'none',
      borderColor: hovered ? '#BABABA' : '#DCDCDC'
    },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  },
    // Image area
    React.createElement('div', { style: productCardStyles.imgWrap },
      product.imgUrl
        ? React.createElement('img', { src: product.imgUrl, alt: product.name, style: productCardStyles.img, loading: 'lazy' })
        : React.createElement('div', { style: productCardStyles.imgPlaceholder },
            React.createElement(LightbulbIcon, null)
          )
    ),
    // Body
    React.createElement('div', { style: productCardStyles.body },
      React.createElement('div', { style: productCardStyles.tag }, product.category),
      React.createElement('div', { style: productCardStyles.title }, product.name),
      React.createElement('div', { style: productCardStyles.specs },
        product.specs.map((s, i) =>
          React.createElement('span', { key: i, style: productCardStyles.chip }, s)
        )
      ),
      React.createElement('p', { style: productCardStyles.desc }, product.desc),
      React.createElement('button', {
        style: productCardStyles.cta,
        onClick: () => onContact && onContact(product)
      }, 'Entrar em contato →')
    )
  );
};

const LightbulbIcon = () => React.createElement('svg', {
  width: 40, height: 40, viewBox: '0 0 24 24', fill: 'none',
  stroke: '#003DA5', strokeWidth: 1.5, opacity: 0.3
},
  React.createElement('line', { x1: 12, y1: 1, x2: 12, y2: 3 }),
  React.createElement('line', { x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64 }),
  React.createElement('line', { x1: 1, y1: 12, x2: 3, y2: 12 }),
  React.createElement('line', { x1: 21, y1: 12, x2: 23, y2: 12 }),
  React.createElement('line', { x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22 }),
  React.createElement('path', { d: 'M9 21h6M12 3a9 9 0 110 18' })
);

const productCardStyles = {
  card: { background: '#fff', border: '1px solid #DCDCDC', borderRadius: 4, overflow: 'hidden', transition: 'box-shadow 200ms ease-out, transform 200ms ease-out, border-color 200ms ease-out', display: 'flex', flexDirection: 'column' },
  imgWrap: { width: '100%', height: 140, background: '#FAFAFA', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderBottom: '1px solid #F0F0F0' },
  img: { width: '100%', height: '100%', objectFit: 'contain', padding: 16 },
  imgPlaceholder: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' },
  body: { padding: 16, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 },
  tag: { fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E35106' },
  title: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, fontWeight: 700, color: '#111', lineHeight: 1.2 },
  specs: { display: 'flex', gap: 5, flexWrap: 'wrap' },
  chip: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, background: '#F0F0F0', color: '#3A3A3A', padding: '2px 7px', borderRadius: 2 },
  desc: { fontSize: 13, color: '#5A5A5A', lineHeight: 1.5, flex: 1 },
  cta: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#E35106', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', marginTop: 4, transition: 'color 150ms' }
};

Object.assign(window, { BRAProductCard });
