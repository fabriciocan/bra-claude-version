// StatsSection.jsx + TestimonialsSection.jsx + Footer.jsx

/* ---- STATS ---- */
const BRAStatsSection = () => {
  const stats = [
    { num: '80%', label: 'Redução no consumo energético' },
    { num: '+50k', label: 'Horas de vida útil (L70)' },
    { num: 'IP68', label: 'Proteção máxima disponível' },
    { num: '160', label: 'lm/W eficiência luminosa' },
    { num: '~18m', label: 'Payback médio em meses' },
  ];
  return React.createElement('section', { style: statsStyles.section },
    React.createElement('div', { style: statsStyles.inner },
      stats.map((s, i) =>
        React.createElement('div', { key: i, style: statsStyles.item },
          React.createElement('div', { style: statsStyles.num }, s.num),
          React.createElement('div', { style: statsStyles.label }, s.label)
        )
      )
    )
  );
};

const statsStyles = {
  section: { background: '#0A1628', padding: '48px 0' },
  inner: { maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 0, justifyContent: 'space-between', flexWrap: 'wrap' },
  item: { textAlign: 'center', padding: '8px 16px', flex: '1 1 140px' },
  num: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 48, fontWeight: 800, color: '#E35106', lineHeight: 1 },
  label: { fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5A7AA0', marginTop: 6 }
};

/* ---- TESTIMONIALS ---- */
const BRATestimonialsSection = () => {
  const testimonials = [
    { quote: 'A troca para LED industrial reduziu nossa conta de energia em 65% no primeiro ano. O investimento se pagou em menos de 18 meses.', name: 'Carlos Mendes', role: 'Diretor de Operações', company: 'Metalúrgica São Paulo' },
    { quote: 'Nossos colaboradores relataram melhora significativa no conforto visual. A iluminação uniforme aumentou a produtividade e reduziu acidentes.', name: 'Ana Paula Costa', role: 'Gerente de Facilities', company: 'Logística Express' },
    { quote: 'Após 3 anos de uso intensivo, ainda não precisamos substituir nenhuma luminária. Manutenção praticamente zero.', name: 'Roberto Silva', role: 'Supervisor de Manutenção', company: 'Frigorífico Nacional' },
  ];

  return React.createElement('section', { style: testStyles.section },
    React.createElement('div', { style: testStyles.inner },
      React.createElement('div', { style: testStyles.header },
        React.createElement('div', { style: testStyles.eyebrow }, 'Clientes'),
        React.createElement('h2', { style: testStyles.heading }, 'O QUE DIZEM NOSSOS CLIENTES')
      ),
      React.createElement('div', { style: testStyles.grid },
        testimonials.map((t, i) =>
          React.createElement('div', { key: i, style: testStyles.card },
            React.createElement('div', { style: testStyles.quoteIcon }, '\u201C'),
            React.createElement('p', { style: testStyles.quote }, t.quote),
            React.createElement('div', { style: testStyles.author },
              React.createElement('div', { style: testStyles.authorAvatar }, t.name.charAt(0)),
              React.createElement('div', null,
                React.createElement('div', { style: testStyles.authorName }, t.name),
                React.createElement('div', { style: testStyles.authorRole }, t.role, ' — ', t.company)
              )
            )
          )
        )
      )
    )
  );
};

const testStyles = {
  section: { padding: '80px 0', background: '#fff' },
  inner: { maxWidth: 1280, margin: '0 auto', padding: '0 24px' },
  header: { textAlign: 'center', marginBottom: 40 },
  eyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E35106', marginBottom: 8 },
  heading: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 40, fontWeight: 800, color: '#111', margin: 0, letterSpacing: '-0.01em' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 },
  card: { background: '#F5F5F5', border: '1px solid #EBEBEB', borderRadius: 4, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 },
  quoteIcon: { fontFamily: 'Georgia, serif', fontSize: 48, lineHeight: 1, color: '#E35106', opacity: 0.4, marginBottom: -8 },
  quote: { fontSize: 14, color: '#3A3A3A', lineHeight: 1.65, fontStyle: 'italic', flex: 1 },
  author: { display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 },
  authorAvatar: { width: 36, height: 36, borderRadius: '50%', background: '#003DA5', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 700, flexShrink: 0 },
  authorName: { fontSize: 13, fontWeight: 600, color: '#111' },
  authorRole: { fontSize: 11, color: '#7A7A7A', marginTop: 1 }
};

/* ---- FOOTER ---- */
const BRAFooter = ({ onNavigate }) => {
  return React.createElement('footer', { style: footerStyles.footer },
    React.createElement('div', { style: footerStyles.inner },
      // Brand col
      React.createElement('div', { style: footerStyles.col },
        React.createElement('div', { style: footerStyles.logoWord },
          'BR', React.createElement('span', { style: { color: '#E35106' } }, 'A'), 'LARMSEG'
        ),
        React.createElement('div', { style: footerStyles.logoSub }, 'Segurança e Emergência'),
        React.createElement('p', { style: footerStyles.desc },
          'Especialistas em soluções de iluminação LED para o setor industrial. Tecnologia, eficiência e durabilidade para o seu negócio.'
        )
      ),
      // Links col
      React.createElement('div', { style: footerStyles.col },
        React.createElement('div', { style: footerStyles.colTitle }, 'Links Rápidos'),
        ['Início','Sobre','Produtos','Aplicações','Blog','Luminárias de Emergência'].map(l =>
          React.createElement('a', { key: l, href: '#', style: footerStyles.link }, l)
        )
      ),
      // Contact col
      React.createElement('div', { style: footerStyles.col },
        React.createElement('div', { style: footerStyles.colTitle }, 'Contato'),
        React.createElement('p', { style: footerStyles.contactLine },
          'Rua Des. Antonio de Paula, 3586', React.createElement('br', null),
          'Boqueirão, Curitiba - PR, 81720-280'
        ),
        React.createElement('p', { style: footerStyles.contactLine }, '(41) 99274-4818  |  (41) 3045-9744'),
        React.createElement('p', { style: footerStyles.contactLine }, '(41) 4063-5272  |  (11) 4063-5268'),
        React.createElement('p', { style: footerStyles.contactLine }, 'bra@bralarmseg.com.br'),
        React.createElement('a', {
          href: '#',
          style: footerStyles.cta,
          onClick: e => { e.preventDefault(); onNavigate && onNavigate('contact'); }
        }, 'SOLICITAR ORÇAMENTO')
      )
    ),
    React.createElement('div', { style: footerStyles.bar },
      React.createElement('div', { style: footerStyles.barInner },
        '© 2025 BRALARMSEG — Todos os direitos reservados.  |  CNPJ: 09.251.362/0001-20',
        React.createElement('a', { href: '#', style: { ...footerStyles.link, marginLeft: 16 } }, 'Políticas de Privacidade')
      )
    )
  );
};

const footerStyles = {
  footer: { background: '#0A1628', color: '#A0B4CC' },
  inner: { maxWidth: 1280, margin: '0 auto', padding: '64px 24px 40px', display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', gap: 48 },
  col: { display: 'flex', flexDirection: 'column', gap: 8 },
  logoWord: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 800, color: '#fff', lineHeight: 1 },
  logoSub: { fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5A7AA0', marginBottom: 4 },
  desc: { fontSize: 13, lineHeight: 1.65, color: '#5A7AA0', maxWidth: 300 },
  colTitle: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', marginBottom: 4 },
  link: { fontSize: 13, color: '#5A7AA0', textDecoration: 'none', transition: 'color 150ms', padding: '2px 0' },
  contactLine: { fontSize: 13, color: '#5A7AA0', lineHeight: 1.65 },
  cta: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#E35106', color: '#fff', padding: '10px 18px', borderRadius: 3, textDecoration: 'none', display: 'inline-block', marginTop: 8 },
  bar: { borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px 0' },
  barInner: { maxWidth: 1280, margin: '0 auto', padding: '0 24px', fontSize: 11, color: '#3A5070', display: 'flex', alignItems: 'center' }
};

Object.assign(window, { BRAStatsSection, BRATestimonialsSection, BRAFooter });
