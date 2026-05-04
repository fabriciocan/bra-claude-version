import { sanityClient } from './sanity';

// ——— Types ———

export interface ProductSpec {
  key: string;
  value: string;
}

export interface Product {
  _id: string;
  name: string;
  fullName: string;
  slug: string;
  category: string;
  imageUrl: string | null;
  shortDesc: string;
  longDesc: string;
  badge: string | null;
  badgeColor: string | null;
  specs: ProductSpec[];
  applications: string[];
  certifications: string[];
  featured: boolean;
}

export interface Testimonial {
  _id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface SiteSettings {
  phone1: string;
  phone2: string;
  phone3: string;
  phone4: string;
  email: string;
  address: string;
  cnpj: string;
  whatsapp: string;
}

// ——— GROQ Queries ———

const PRODUCT_FIELDS = `
  _id,
  name,
  fullName,
  "slug": slug.current,
  category,
  "imageUrl": coalesce(image.asset->url, imageUrl),
  shortDesc,
  longDesc,
  badge,
  badgeColor,
  specs[]{ key, value },
  applications,
  certifications,
  featured
`;

// ——— Fallback data (used when Sanity is not configured) ———

const FALLBACK_PRODUCTS: Product[] = [
  {
    _id: 'hbm150', name: 'HIGHBAY MAGNA', fullName: 'Luminária Highbay Magna',
    slug: 'highbay-magna', category: 'Highbay',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-hbm150.jpg',
    shortDesc: 'Ideal para galpões e fábricas com pé-direito elevado.',
    longDesc: 'A Luminária Highbay Magna foi projetada para ambientes industriais de grande porte, com pé-direito superior a 8 metros. Seu corpo em alumínio de alta pressão garante excelente dissipação térmica, prolongando a vida útil do sistema LED.',
    badge: 'Mais vendido', badgeColor: '#E35106',
    specs: [
      { key: 'Potência', value: '150W' }, { key: 'Proteção', value: 'IP66' },
      { key: 'Eficiência', value: '140 lm/W' }, { key: 'Fluxo luminoso', value: '21.000 lm' },
      { key: 'Temperatura de cor', value: '4000K / 5700K' }, { key: 'Tensão', value: '100–277 Vac' },
      { key: 'Fator de potência', value: '> 0,95' }, { key: 'Vida útil', value: '50.000 h (L70)' },
      { key: 'Ângulo de abertura', value: '120°' }, { key: 'Peso', value: '3,2 kg' },
      { key: 'Dimensões', value: 'Ø 340 × 150 mm' }, { key: 'Garantia', value: '2 anos' },
    ],
    applications: ['Galpões industriais', 'Fábricas', 'Centros logísticos', 'Armazéns'],
    certifications: ['INMETRO', 'IP66', 'CE', 'RoHS'], featured: true,
  },
  {
    _id: 'hbc', name: 'HIGHBAY CLASSIC', fullName: 'Luminária Highbay Classic',
    slug: 'highbay-classic', category: 'Highbay',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-highbayclassic.jpg',
    shortDesc: 'Eficiência luminosa 140lm/W para ambientes industriais.',
    longDesc: 'A Highbay Classic combina eficiência energética com custo-benefício excepcional. Disponível em 100W e 150W, atende a grande maioria dos projetos industriais com altura de instalação entre 5 e 10 metros.',
    badge: null, badgeColor: null,
    specs: [
      { key: 'Potência', value: '100W / 150W' }, { key: 'Proteção', value: 'IP20' },
      { key: 'Eficiência', value: '140 lm/W' }, { key: 'Fluxo luminoso', value: '14.000–21.000 lm' },
      { key: 'Temperatura de cor', value: '4000K / 5700K' }, { key: 'Tensão', value: '100–277 Vac' },
      { key: 'Fator de potência', value: '> 0,95' }, { key: 'Vida útil', value: '50.000 h (L70)' },
      { key: 'Ângulo de abertura', value: '120°' }, { key: 'Peso', value: '2,8 kg' },
      { key: 'Dimensões', value: 'Ø 310 × 140 mm' }, { key: 'Garantia', value: '2 anos' },
    ],
    applications: ['Galpões industriais', 'Fábricas', 'Montadoras'],
    certifications: ['INMETRO', 'IP20', 'CE', 'RoHS'], featured: false,
  },
  {
    _id: 'hbi', name: 'HIGHBAY INDUSTRIAL', fullName: 'Luminária Highbay Industrial',
    slug: 'highbay-industrial', category: 'Highbay',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-hbi.jpg',
    shortDesc: 'Corpo em alumínio injetado com alta dissipação térmica.',
    longDesc: 'A Highbay Industrial é a escolha para os ambientes mais exigentes. Com grau de proteção IP65 e corpo em alumínio injetado sob pressão, resiste a poeira, jatos d\'água e variações extremas de temperatura.',
    badge: 'IP65', badgeColor: '#003DA5',
    specs: [
      { key: 'Potência', value: '100W / 150W / 200W' }, { key: 'Proteção', value: 'IP65' },
      { key: 'Eficiência', value: '140 lm/W' }, { key: 'Fluxo luminoso', value: '14.000–28.000 lm' },
      { key: 'Temperatura de cor', value: '4000K / 5700K' }, { key: 'Tensão', value: '100–277 Vac' },
      { key: 'Fator de potência', value: '> 0,95' }, { key: 'Vida útil', value: '50.000 h (L70)' },
      { key: 'Ângulo de abertura', value: '90° / 120°' }, { key: 'Peso', value: '4,1 kg' },
      { key: 'Dimensões', value: 'Ø 360 × 170 mm' }, { key: 'Garantia', value: '2 anos' },
    ],
    applications: ['Frigoríficos', 'Câmaras frias', 'Indústria alimentícia', 'Petroquímica'],
    certifications: ['INMETRO', 'IP65', 'CE', 'RoHS'], featured: false,
  },
  {
    _id: 'ufo-luxi', name: 'UFO LUXI', fullName: 'Projetor UFO Luxi',
    slug: 'ufo-luxi', category: 'Projetor UFO',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-ufo.jpg',
    shortDesc: 'Expectativa de vida útil de 25.000 horas.',
    longDesc: 'O Projetor UFO Luxi oferece uma solução versátil para instalações industriais e comerciais, com design compacto e alto desempenho. Seu formato UFO facilita a instalação em estruturas tubulares.',
    badge: null, badgeColor: null,
    specs: [
      { key: 'Potência', value: '100W / 150W / 200W' }, { key: 'Proteção', value: 'IP65' },
      { key: 'Eficiência', value: '130 lm/W' }, { key: 'Fluxo luminoso', value: '13.000–26.000 lm' },
      { key: 'Temperatura de cor', value: '4000K / 5700K' }, { key: 'Tensão', value: '100–277 Vac' },
      { key: 'Fator de potência', value: '> 0,95' }, { key: 'Vida útil', value: '25.000 h' },
      { key: 'Ângulo de abertura', value: '120°' }, { key: 'Peso', value: '2,4 kg' },
      { key: 'Dimensões', value: 'Ø 280 × 80 mm' }, { key: 'Garantia', value: '1 ano' },
    ],
    applications: ['Estacionamentos', 'Galpões', 'Supermercados', 'Quadras esportivas'],
    certifications: ['IP65', 'CE', 'RoHS'], featured: false,
  },
  {
    _id: 'ufo-elite', name: 'UFO ELITE', fullName: 'Projetor UFO Elite',
    slug: 'ufo-elite', category: 'Projetor UFO',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-ufoelite.jpg',
    shortDesc: '160lm/W — vida útil de 50.000 horas (L70).',
    longDesc: 'O UFO Elite representa o estado da arte em eficiência luminosa. Com 160lm/W, é o produto de maior rendimento do portfólio BRALARMSEG, indicado para projetos que exigem máxima eficiência e menor TCO (Total Cost of Ownership).',
    badge: 'Alta eficiência', badgeColor: '#1A8A4A',
    specs: [
      { key: 'Potência', value: '100W / 150W / 200W' }, { key: 'Proteção', value: 'IP65' },
      { key: 'Eficiência', value: '160 lm/W' }, { key: 'Fluxo luminoso', value: '16.000–32.000 lm' },
      { key: 'Temperatura de cor', value: '4000K / 5700K' }, { key: 'Tensão', value: '100–277 Vac' },
      { key: 'Fator de potência', value: '> 0,97' }, { key: 'Vida útil', value: '50.000 h (L70)' },
      { key: 'Ângulo de abertura', value: '90° / 120°' }, { key: 'Peso', value: '2,9 kg' },
      { key: 'Dimensões', value: 'Ø 300 × 90 mm' }, { key: 'Garantia', value: '2 anos' },
    ],
    applications: ['Alta performance', 'Indústria farmacêutica', 'Logística de precisão'],
    certifications: ['INMETRO', 'IP65', 'CE', 'RoHS', 'DLC'], featured: true,
  },
  {
    _id: 'sport', name: 'SPORT', fullName: 'Projetor Sport',
    slug: 'projetor-sport', category: 'Projetor',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-sport_plus.jpg',
    shortDesc: 'Ângulo ajustável para quadras e galpões.',
    longDesc: 'O Projetor Sport foi desenvolvido para aplicações que exigem alta intensidade luminosa em áreas amplas. Com ângulo de instalação ajustável em 0–90°, adapta-se a quadras esportivas, galpões e fachadas.',
    badge: null, badgeColor: null,
    specs: [
      { key: 'Potência', value: '50W / 100W / 150W / 200W' }, { key: 'Proteção', value: 'IP66' },
      { key: 'Eficiência', value: '140 lm/W' }, { key: 'Fluxo luminoso', value: '7.000–28.000 lm' },
      { key: 'Temperatura de cor', value: '4000K / 5700K / 3000K' }, { key: 'Tensão', value: '100–277 Vac' },
      { key: 'Fator de potência', value: '> 0,95' }, { key: 'Vida útil', value: '50.000 h (L70)' },
      { key: 'Ângulo ajustável', value: '0–90°' }, { key: 'Peso', value: '3,8 kg' },
      { key: 'Dimensões', value: '380 × 280 × 90 mm' }, { key: 'Garantia', value: '2 anos' },
    ],
    applications: ['Quadras esportivas', 'Galpões', 'Pátios industriais', 'Portos'],
    certifications: ['IP66', 'CE', 'RoHS'], featured: false,
  },
  {
    _id: 'vegas', name: 'VEGAS', fullName: 'Projetor Vegas',
    slug: 'projetor-vegas', category: 'Projetor',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-vegas.jpg',
    shortDesc: 'Design moderno com ângulo de instalação ajustável.',
    longDesc: 'O Projetor Vegas une estética moderna com desempenho técnico sólido. Com corpo em alumínio fundido e vidro temperado de 4mm, é indicado para áreas externas e ambientes com exposição à chuva e poeira.',
    badge: null, badgeColor: null,
    specs: [
      { key: 'Potência', value: '50W / 100W / 150W / 200W' }, { key: 'Proteção', value: 'IP66' },
      { key: 'Eficiência', value: '140 lm/W' }, { key: 'Fluxo luminoso', value: '7.000–28.000 lm' },
      { key: 'Temperatura de cor', value: '4000K / 5700K' }, { key: 'Tensão', value: '100–277 Vac' },
      { key: 'Fator de potência', value: '> 0,95' }, { key: 'Vida útil', value: '50.000 h (L70)' },
      { key: 'Ângulo ajustável', value: '0–180°' }, { key: 'Peso', value: '4,2 kg' },
      { key: 'Dimensões', value: '400 × 300 × 100 mm' }, { key: 'Garantia', value: '2 anos' },
    ],
    applications: ['Estacionamentos externos', 'Pátios', 'Fachadas', 'Aeroportos'],
    certifications: ['IP66', 'CE', 'RoHS'], featured: false,
  },
  {
    _id: 'faros24', name: 'FAROS24', fullName: 'Projetor Faros24',
    slug: 'projetor-faros24', category: 'Projetor',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-faros24_plus.jpg',
    shortDesc: 'Alimentação 24Vdc ideal para torres solares.',
    longDesc: 'O Faros24 é o único projetor do portfólio BRALARMSEG com alimentação em 24Vdc, desenvolvido especialmente para sistemas off-grid e torres solares. Compatível com baterias e controladores de carga fotovoltaicos.',
    badge: '24Vdc', badgeColor: '#003DA5',
    specs: [
      { key: 'Potência', value: '50W / 100W' }, { key: 'Proteção', value: 'IP66' },
      { key: 'Eficiência', value: '130 lm/W' }, { key: 'Fluxo luminoso', value: '6.500–13.000 lm' },
      { key: 'Temperatura de cor', value: '4000K / 5700K' }, { key: 'Tensão', value: '24 Vdc' },
      { key: 'Fator de potência', value: '> 0,95' }, { key: 'Vida útil', value: '30.000 h' },
      { key: 'Ângulo ajustável', value: '0–90°' }, { key: 'Peso', value: '2,6 kg' },
      { key: 'Dimensões', value: '340 × 260 × 80 mm' }, { key: 'Garantia', value: '1 ano' },
    ],
    applications: ['Torres solares', 'Off-grid', 'Áreas remotas', 'Mineração'],
    certifications: ['IP66', 'CE', 'RoHS'], featured: false,
  },
  {
    _id: 'foxir', name: 'FOX IR', fullName: 'Projetor Fox IR',
    slug: 'projetor-fox-ir', category: 'Projetor',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-foxir.jpg',
    shortDesc: 'Infravermelho 850nm ou 940nm para segurança e vigilância.',
    longDesc: 'O Fox IR é um iluminador infravermelho de alta potência para sistemas CFTV. Disponível em 850nm (com leve brilho vermelho visível) ou 940nm (completamente invisível ao olho humano), complementa câmeras de segurança em ambientes externos.',
    badge: 'IR', badgeColor: '#5A3A8A',
    specs: [
      { key: 'Potência', value: '35W / 50W' }, { key: 'Proteção', value: 'IP66' },
      { key: 'Comprimento de onda', value: '850nm / 940nm' }, { key: 'Alcance IR', value: 'até 80m (850nm)' },
      { key: 'Ângulo de abertura', value: '30° / 60° / 90°' }, { key: 'Tensão', value: '100–277 Vac' },
      { key: 'Fator de potência', value: '> 0,90' }, { key: 'Vida útil', value: '25.000 h' },
      { key: 'Ângulo ajustável', value: '0–90°' }, { key: 'Peso', value: '2,1 kg' },
      { key: 'Dimensões', value: '290 × 220 × 70 mm' }, { key: 'Garantia', value: '1 ano' },
    ],
    applications: ['Segurança perimetral', 'CFTV', 'Portos', 'Aeroportos'],
    certifications: ['IP66', 'CE'], featured: false,
  },
  {
    _id: 'lumo', name: 'LUMO EMERGÊNCIA', fullName: 'Luminária Lumo Emergência',
    slug: 'lumo-emergencia', category: 'Emergência',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-lumoemergencia.jpg',
    shortDesc: '130lm/W para supermercados e escritórios.',
    longDesc: 'A Luminária Lumo Emergência garante iluminação de segurança em caso de queda de energia. Com bateria interna de lítio, autonomia de 3 horas e eficiência de 130lm/W, atende a normas de AVCB e laudos de bombeiros.',
    badge: 'Emergência', badgeColor: '#DC2626',
    specs: [
      { key: 'Potência', value: '50W' }, { key: 'Proteção', value: 'IP20' },
      { key: 'Eficiência', value: '130 lm/W' }, { key: 'Fluxo luminoso', value: '6.500 lm' },
      { key: 'Temperatura de cor', value: '6500K' }, { key: 'Tensão', value: '100–240 Vac' },
      { key: 'Bateria', value: 'Lítio 6V 4Ah' }, { key: 'Autonomia', value: '3 horas' },
      { key: 'Vida útil', value: '50.000 h' }, { key: 'Dimensões', value: '580 × 80 × 60 mm' },
      { key: 'Garantia', value: '2 anos' },
    ],
    applications: ['Supermercados', 'Escritórios', 'Shoppings', 'Saídas de emergência'],
    certifications: ['INMETRO', 'ABNT NBR 10898', 'CE'], featured: false,
  },
];

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    _id: 't1',
    quote: 'A troca para LED industrial reduziu nossa conta de energia em 65% no primeiro ano. O investimento se pagou em menos de 18 meses.',
    name: 'Carlos Mendes', role: 'Diretor de Operações', company: 'Metalúrgica São Paulo',
  },
  {
    _id: 't2',
    quote: 'Nossos colaboradores relataram melhora significativa no conforto visual. A iluminação uniforme aumentou a produtividade e reduziu acidentes.',
    name: 'Ana Paula Costa', role: 'Gerente de Facilities', company: 'Logística Express',
  },
  {
    _id: 't3',
    quote: 'Após 3 anos de uso intensivo, ainda não precisamos substituir nenhuma luminária. Manutenção praticamente zero.',
    name: 'Roberto Silva', role: 'Supervisor de Manutenção', company: 'Frigorífico Nacional',
  },
];

const FALLBACK_SETTINGS: SiteSettings = {
  phone1: '(41) 99274-4818', phone2: '(41) 3045-9744',
  phone3: '(41) 4063-5272', phone4: '(11) 4063-5268',
  email: 'bra@bralarmseg.com.br',
  address: 'Rua Des. Antonio de Paula, 3586\nBoqueirão, Curitiba - PR, 81720-280',
  cnpj: '09.251.362/0001-20', whatsapp: '5541992744818',
};

// ——— Fetch helpers ———

export async function getProducts(): Promise<Product[]> {
  if (!sanityClient) return FALLBACK_PRODUCTS;
  try {
    return await sanityClient.fetch(
      `*[_type == "product"] | order(order asc) { ${PRODUCT_FIELDS} }`
    );
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // Try to find in fallback first if no client
  if (!sanityClient) {
    return FALLBACK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
  try {
    return await sanityClient.fetch(
      `*[_type == "product" && slug.current == $slug][0] { ${PRODUCT_FIELDS} }`,
      { slug }
    );
  } catch {
    return FALLBACK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (!ids.length) return [];
  if (!sanityClient) return FALLBACK_PRODUCTS.filter((p) => ids.includes(p.slug));
  try {
    return await sanityClient.fetch(
      `*[_type == "product" && slug.current in $ids] | order(order asc) { ${PRODUCT_FIELDS} }`,
      { ids }
    );
  } catch {
    return FALLBACK_PRODUCTS.filter((p) => ids.includes(p.slug));
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!sanityClient) return FALLBACK_TESTIMONIALS;
  try {
    return await sanityClient.fetch(`*[_type == "testimonial"] | order(order asc)`);
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityClient) return FALLBACK_SETTINGS;
  try {
    const result = await sanityClient.fetch(`*[_type == "siteSettings"][0]`);
    return result ?? FALLBACK_SETTINGS;
  } catch {
    return FALLBACK_SETTINGS;
  }
}
