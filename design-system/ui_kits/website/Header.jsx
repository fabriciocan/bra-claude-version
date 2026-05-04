// Header.jsx — BRALARMSEG sticky navigation header

const BRAHeader = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Início' },
    { id: 'about', label: 'Sobre' },
    { id: 'products', label: 'Produtos' },
    { id: 'applications', label: 'Aplicações' },
    { id: 'blog', label: 'Blog' },
  ];

  return React.createElement(React.Fragment, null,
    // Topbar
    React.createElement('div', { style: headerStyles.topbar },
      React.createElement('div', { style: headerStyles.topbarInner },
        React.createElement('div', { style: headerStyles.topbarItems },
          React.createElement('span', { style: headerStyles.topbarItem },
            React.createElement(PhoneIcon, null), ' (41) 99274-4818  |  (41) 3045-9744'
          ),
          React.createElement('span', { style: headerStyles.topbarItem },
            React.createElement(MailIcon, null), ' bra@bralarmseg.com.br'
          ),
          React.createElement('span', { style: headerStyles.topbarItem },
            React.createElement(MapPinIcon, null), ' Curitiba, PR — desde 2007'
          )
        )
      )
    ),
    // Main nav
    React.createElement('nav', {
      style: {
        ...headerStyles.nav,
        boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.12)' : '0 1px 4px rgba(0,0,0,0.08)'
      }
    },
      React.createElement('div', { style: headerStyles.navInner },
        // Logo
        React.createElement('div', {
          style: headerStyles.logoArea,
          onClick: () => onNavigate && onNavigate('home'),
          role: 'button'
        },
          React.createElement('div', { style: headerStyles.logoWord },
            'BR', React.createElement('span', { style: { color: '#E35106' } }, 'A'), 'LARMSEG'
          ),
          React.createElement('div', { style: headerStyles.logoSub }, 'Segurança e Emergência')
        ),
        // Desktop nav links
        React.createElement('div', { style: headerStyles.navLinks },
          navLinks.map(link =>
            React.createElement('a', {
              key: link.id,
              href: '#',
              onClick: e => { e.preventDefault(); onNavigate && onNavigate(link.id); },
              style: {
                ...headerStyles.navLink,
                ...(currentPage === link.id ? headerStyles.navLinkActive : {})
              }
            }, link.label)
          ),
          React.createElement('a', {
            href: '#',
            onClick: e => { e.preventDefault(); onNavigate && onNavigate('contact'); },
            style: headerStyles.navCta
          }, 'Solicitar Orçamento')
        )
      )
    )
  );
};

const PhoneIcon = () => React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, style: { display: 'inline', marginRight: 4, verticalAlign: 'middle' } },
  React.createElement('path', { d: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z' })
);
const MailIcon = () => React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, style: { display: 'inline', marginRight: 4, verticalAlign: 'middle' } },
  React.createElement('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }),
  React.createElement('polyline', { points: '22,6 12,13 2,6' })
);
const MapPinIcon = () => React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, style: { display: 'inline', marginRight: 4, verticalAlign: 'middle' } },
  React.createElement('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z' }),
  React.createElement('circle', { cx: 12, cy: 10, r: 3 })
);

const headerStyles = {
  topbar: { background: '#0A1628', padding: '5px 0' },
  topbarInner: { maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'flex-end' },
  topbarItems: { display: 'flex', gap: 20 },
  topbarItem: { fontSize: 11, color: '#A0B4CC', display: 'flex', alignItems: 'center' },
  nav: { background: '#fff', position: 'sticky', top: 0, zIndex: 100, transition: 'box-shadow 200ms ease-out' },
  navInner: { maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 },
  logoArea: { cursor: 'pointer', display: 'flex', flexDirection: 'column' },
  logoWord: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.01em' },
  logoSub: { fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A8A8A', marginTop: 2 },
  navLinks: { display: 'flex', alignItems: 'center', gap: 0 },
  navLink: { fontFamily: "'Barlow', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#3A3A3A', padding: '0 14px', height: 64, display: 'flex', alignItems: 'center', textDecoration: 'none', borderBottom: '3px solid transparent', transition: 'color 150ms, border-color 150ms' },
  navLinkActive: { color: '#E35106', borderBottomColor: '#E35106' },
  navCta: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', background: '#E35106', color: '#fff', padding: '9px 18px', borderRadius: 3, textDecoration: 'none', marginLeft: 12 }
};

Object.assign(window, { BRAHeader });
