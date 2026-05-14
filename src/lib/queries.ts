import { sanityClient } from './sanity';

// ——— Types ———

export interface ProductSpec {
  key: string;
  value: string;
}

export interface ProductDownload {
  name: string;
  type: string;
  url: string;
}

export interface Product {
  _id: string;
  name: string;
  fullName: string;
  slug: string;
  category: string;
  productLine: 'led' | 'emergencia';
  imageUrl: string | null;
  shortDesc: string;
  longDesc: string;
  badge: string | null;
  badgeColor: string | null;
  specs: ProductSpec[];
  applications: string[];
  certifications: string[];
  downloads?: ProductDownload[];
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
  productLine,
  "imageUrl": coalesce(image.asset->url, imageUrl),
  shortDesc,
  longDesc,
  badge,
  badgeColor,
  specs[]{ key, value },
  applications,
  certifications,
  downloads[]{ name, type, url },
  featured
`;

// ——— Fallback data (used when Sanity is not configured) ———

const FALLBACK_PRODUCTS: Product[] = [
  {
    _id: 'hbm150', name: 'HIGHBAY MAGNA', fullName: 'Luminária Highbay Magna',
    slug: 'highbay-magna', category: 'Highbay', productLine: 'led',
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
    slug: 'highbay-classic', category: 'Highbay', productLine: 'led',
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
    slug: 'highbay-industrial', category: 'Highbay', productLine: 'led',
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
    _id: 'hbip', name: 'HIGHBAY IND. PLUS', fullName: 'Luminária Highbay Industrial Plus',
    slug: 'highbay-industrial-plus', category: 'Highbay', productLine: 'led',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-hbi.jpg',
    shortDesc: '160lm/W e IP65. Alta eficiência para ambientes industriais exigentes.',
    longDesc: 'A Highbay Industrial Plus eleva o padrão de eficiência luminosa para 160lm/W com grau IP65. Disponível em 110W, 160W e 220W, corpo em alumínio injetado de alta pressão com excelente dissipação térmica.',
    badge: '160 lm/W', badgeColor: '#1A8A4A',
    specs: [
      { key: 'Potência', value: '110W / 160W / 220W' }, { key: 'Proteção', value: 'IP65' },
      { key: 'Eficiência', value: '160 lm/W' }, { key: 'Fluxo luminoso', value: '17.350–35.200 lm' },
      { key: 'Temperatura de cor', value: '4000K / 5700K' }, { key: 'Tensão', value: '90-305 Vac' },
      { key: 'Fator de potência', value: '> 0,97' }, { key: 'Vida útil', value: '50.000 h (L70)' },
      { key: 'Ângulo de abertura', value: '120°' }, { key: 'Peso', value: '2,7 kg' },
      { key: 'Dimensões', value: '160 × 285 × 215 mm' }, { key: 'Garantia', value: '2 anos' },
    ],
    applications: ['Indústria farmacêutica', 'Indústria alimentícia', 'Frigoríficos', 'Câmaras frias'],
    certifications: ['INMETRO', 'IP65', 'CE', 'RoHS'], featured: false,
  },
  {
    _id: 'ufo-luxi', name: 'UFO LUXI', fullName: 'Projetor UFO Luxi',
    slug: 'ufo-luxi', category: 'Projetor UFO', productLine: 'led',
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
    slug: 'ufo-elite', category: 'Projetor UFO', productLine: 'led',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-ufoelite.jpg',
    shortDesc: '160lm/W — vida útil de 50.000 horas (L70).',
    longDesc: 'O UFO Elite representa o estado da arte em eficiência luminosa. Com 160lm/W, é o produto de maior rendimento do portfólio BRATECH, indicado para projetos que exigem máxima eficiência e menor TCO (Total Cost of Ownership).',
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
    slug: 'projetor-sport', category: 'Projetor', productLine: 'led',
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
    slug: 'projetor-vegas', category: 'Projetor', productLine: 'led',
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
    slug: 'projetor-faros24', category: 'Projetor', productLine: 'led',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/ilum_industrial/br-faros24_plus.jpg',
    shortDesc: 'Alimentação 24Vdc ideal para torres solares.',
    longDesc: 'O Faros24 é o único projetor do portfólio BRATECH com alimentação em 24Vdc, desenvolvido especialmente para sistemas off-grid e torres solares. Compatível com baterias e controladores de carga fotovoltaicos.',
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
    slug: 'projetor-fox-ir', category: 'Projetor', productLine: 'led',
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
  // --- External Emergency (IP66/68) ---
  { _id: 'sptble', name: 'SPTBLE', fullName: 'Luminária Emergência SPTBLE',
    slug: 'sptble', category: 'Uso Externo', productLine: 'emergencia',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/lum_emerg/SPTBLE.png',
    shortDesc: 'Luminária industrial caixa com 60 LEDs SMD. IP66/68 para ambientes externos.',
    longDesc: 'A SPTBLE é uma luminária autônoma de emergência tipo caixa com 60 LEDs SMD de alto brilho. Carcaça em ABS antichama, grau de proteção IP66/68 ideal para indústrias, galpões e ambientes externos agressivos.',
    badge: 'IP66/68', badgeColor: '#003DA5',
    specs: [
      { key: 'Potência', value: '8W' }, { key: 'Fluxo luminoso', value: '1.200 lm' },
      { key: 'Temperatura de cor', value: '6000K' }, { key: 'Tensão', value: '90-240 Vac' },
      { key: 'Proteção', value: 'IP66/68' }, { key: 'Bateria', value: '12V / 2,2Ah' },
      { key: 'Autonomia', value: '5 horas' }, { key: 'Carcaça', value: 'ABS antichama' },
    ],
    applications: ['Indústrias', 'Galpões', 'Fábricas', 'Ambientes externos'],
    certifications: ['IP66', 'IP68', 'ABNT NBR 10898'], featured: false,
  },
  { _id: 'sptle2f', name: 'SPTLE2F', fullName: 'Luminária Emergência SPTLE2F',
    slug: 'sptle2f', category: 'Uso Externo', productLine: 'emergencia',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/lum_emerg/SPTLE2F.png',
    shortDesc: 'Luminária autônoma com 2 faros direcionais e 30 LEDs SMD.',
    longDesc: 'A SPTLE2F conta com 2 faros articulados e 30 LEDs SMD de alto brilho por faro. Autonomia superior a 7 horas, carcaça ABS antichama, grau IP66/68 para uso externo em indústrias e grandes instalações.',
    badge: '7h Autonomia', badgeColor: '#1A8A4A',
    specs: [
      { key: 'Potência', value: '16W' }, { key: 'Fluxo luminoso', value: '2.400 lm' },
      { key: 'Temperatura de cor', value: '6000K' }, { key: 'Tensão', value: '90-240 Vac' },
      { key: 'Proteção', value: 'IP66/68' }, { key: 'Bateria', value: '12V / 7Ah' },
      { key: 'Autonomia', value: '> 7 horas' }, { key: 'Faros', value: '2 direcionais' },
    ],
    applications: ['Indústrias', 'Portos', 'Mineração', 'Pátios externos'],
    certifications: ['IP66', 'IP68', 'ABNT NBR 10898'], featured: false,
  },
  { _id: 'sptle3f', name: 'SPTLE3F', fullName: 'Luminária Emergência SPTLE3F',
    slug: 'sptle3f', category: 'Uso Externo', productLine: 'emergencia',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/lum_emerg/SPTLE3F.png',
    shortDesc: 'Unidade autônoma de emergência com 3 faros direcionais ajustáveis.',
    longDesc: 'A SPTLE3F possui 3 faros articulados com 15 LEDs SMD cada, totalizando 45 LEDs. Carcaça em ABS antichama com IP66/68, ideal para iluminação de grandes áreas externas.',
    badge: null, badgeColor: null,
    specs: [
      { key: 'Potência', value: '24W' }, { key: 'Fluxo luminoso', value: '3.600 lm' },
      { key: 'Temperatura de cor', value: '6000K' }, { key: 'Tensão', value: '90-240 Vac' },
      { key: 'Proteção', value: 'IP66/68' }, { key: 'Bateria', value: '12V / 7Ah' },
      { key: 'Autonomia', value: '~ 5 horas' }, { key: 'Faros', value: '3 direcionais' },
    ],
    applications: ['Pátios industriais', 'Estacionamentos', 'Portos', 'Aeroportos'],
    certifications: ['IP66', 'IP68', 'ABNT NBR 10898'], featured: false,
  },
  { _id: 'almba2f', name: 'ALMBA2F', fullName: 'Luminária Emergência ALMBA2F',
    slug: 'almba2f', category: 'Uso Externo', productLine: 'emergencia',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/lum_emerg/ALMBA2F.png',
    shortDesc: '2 faros articulados de 18 LEDs. 7 horas de autonomia. IP66/68.',
    longDesc: 'A ALMBA2F é uma luminária industrial de emergência robusta com 2 faros articulados de 18 LEDs cada. Bateria de 12V/7Ah garante autonomia de até 7 horas com grau IP66/68.',
    badge: 'Mais vendida', badgeColor: '#E35106',
    specs: [
      { key: 'Potência', value: '18W' }, { key: 'Fluxo luminoso', value: '3.000 lm' },
      { key: 'Temperatura de cor', value: '6000K' }, { key: 'Tensão', value: '90-240 Vac' },
      { key: 'Proteção', value: 'IP66/68' }, { key: 'Bateria', value: '12V / 7Ah' },
      { key: 'Autonomia', value: '7 horas' }, { key: 'Faros', value: '2 articulados' },
    ],
    applications: ['Indústrias', 'Galpões', 'Fábricas', 'Frigoríficos'],
    certifications: ['IP66', 'IP68', 'ABNT NBR 10898'], featured: true,
  },
  { _id: 'almin8000', name: 'ALMIN8000', fullName: 'Luminária Emergência ALMIN8000',
    slug: 'almin8000', category: 'Uso Externo', productLine: 'emergencia',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/lum_emerg/ALMIN8000.png',
    shortDesc: '8.000 lúmens em aço inox. Cobre até 1.600 m². IP66/68.',
    longDesc: 'A ALMIN8000 é a luminária de emergência de maior potência do portfólio. Com carcaça em aço inoxidável, 8.000 lúmens e autonomia de 4 horas, é indicada para grandes plantas industriais, frigoríficos e ambientes críticos.',
    badge: '8.000 lm', badgeColor: '#003DA5',
    specs: [
      { key: 'Potência', value: '60W' }, { key: 'Fluxo luminoso', value: '8.000 lm' },
      { key: 'Temperatura de cor', value: '6000K' }, { key: 'Tensão', value: '90-264 Vac' },
      { key: 'Proteção', value: 'IP66/68' }, { key: 'Bateria', value: '12V / 18Ah' },
      { key: 'Autonomia', value: '4 horas' }, { key: 'Carcaça', value: 'Aço inoxidável' },
      { key: 'Cobertura', value: 'até 1.600 m²' },
    ],
    applications: ['Plantas industriais', 'Frigoríficos', 'Fundições', 'Grandes galpões'],
    certifications: ['IP66', 'IP68', 'ABNT NBR 10898'], featured: true,
  },
  { _id: 'alm03026', name: 'ALM03026', fullName: 'Luminária Emergência ALM03026',
    slug: 'alm03026', category: 'Uso Externo', productLine: 'emergencia',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/lum_emerg/ALM03026.jpg',
    shortDesc: 'Corpo em alumínio. 26W, 2.418 lm. IP68 para ambientes agressivos.',
    longDesc: 'A ALM03026 é uma luminária robusta em alumínio com proteção hermética IP68 para fundições, túneis e ambientes altamente agressivos. Vida útil de 35.000 horas com alimentação em 110/220/24V.',
    badge: 'IP68', badgeColor: '#003DA5',
    specs: [
      { key: 'Potência', value: '26W' }, { key: 'Fluxo luminoso', value: '2.418 lm' },
      { key: 'Ângulo de abertura', value: '120°' }, { key: 'Tensão', value: '110/220/24V' },
      { key: 'Proteção', value: 'IP68' }, { key: 'Vida útil', value: '35.000 h' },
      { key: 'Carcaça', value: 'Alumínio' },
    ],
    applications: ['Fundições', 'Túneis', 'Petroquímica', 'Ambientes corrosivos'],
    certifications: ['IP68', 'ABNT NBR 10898'], featured: false,
  },
  // --- Internal Emergency (IP20) ---
  { _id: 'almipl', name: 'ALMIPL', fullName: 'Luminária Emergência ALMIPL',
    slug: 'almipl', category: 'Uso Interno', productLine: 'emergencia',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/lum_emerg/ALMIPL.jpg',
    shortDesc: 'Luminária autônoma interna com LEDs SMD. Uso interno IP20.',
    longDesc: 'A ALMIPL é uma luminária autônoma de emergência para uso interno, disponível para aclaramento (4W/500lm) ou blocos autônomos (9W). Bateria selada de 6V com autonomia de até 5 horas.',
    badge: null, badgeColor: null,
    specs: [
      { key: 'Potência', value: '4W / 9W' }, { key: 'Fluxo luminoso', value: '500 lm' },
      { key: 'Temperatura de cor', value: '5000K' }, { key: 'Tensão', value: '110/220V' },
      { key: 'Proteção', value: 'IP20' }, { key: 'Bateria', value: '6V selada' },
      { key: 'Autonomia', value: '5 horas (SE) / 3h (NE)' },
    ],
    applications: ['Escritórios', 'Shoppings', 'Supermercados', 'Saídas de emergência'],
    certifications: ['IP20', 'ABNT NBR 10898'], featured: false,
  },
  { _id: 'eq288l', name: 'EQ288L', fullName: 'Luminária Emergência EQ288L',
    slug: 'eq288l', category: 'Uso Interno', productLine: 'emergencia',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/lum_emerg/EQ288L.png',
    shortDesc: 'Luminária compacta com 36 LEDs de alto brilho. Autonomia 1,5h.',
    longDesc: 'A EQ288L é uma luminária de emergência compacta com 36 LEDs SMD de alto brilho. Construção em ABS, bateria Ni-Cd 3,6V/600mAh com autonomia de 1,5 hora, indicada para saídas de emergência internas.',
    badge: null, badgeColor: null,
    specs: [
      { key: 'LEDs', value: '36 SMD alto brilho' }, { key: 'Tensão', value: '110/220 Vac' },
      { key: 'Proteção', value: 'IP20' }, { key: 'Bateria', value: 'Ni-Cd 3,6V / 600mAh' },
      { key: 'Autonomia', value: '1,5 horas' }, { key: 'Carcaça', value: 'ABS' },
    ],
    applications: ['Saídas de emergência', 'Corredores', 'Escadas', 'Escritórios'],
    certifications: ['IP20', 'ABNT NBR 10898'], featured: false,
  },
  { _id: 'lumled30', name: 'LUMLED30', fullName: 'Luminária Emergência LUMLED30',
    slug: 'lumled30', category: 'Uso Interno', productLine: 'emergencia',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/lum_emerg/LUMLED30.png',
    shortDesc: '30 LEDs, bateria de lítio, alça retrátil. 3-6h de autonomia.',
    longDesc: 'A LUMLED30 combina praticidade e performance com 30 LEDs, bateria de lítio recarregável e alça retrátil para fácil transporte e instalação. Autonomia de 3 a 6 horas conforme o nível de brilho.',
    badge: null, badgeColor: null,
    specs: [
      { key: 'LEDs', value: '30 LEDs' }, { key: 'Fluxo luminoso', value: '90-120 lm' },
      { key: 'Tensão', value: '110/220 Vac' }, { key: 'Proteção', value: 'IP20' },
      { key: 'Bateria', value: 'Lítio recarregável' }, { key: 'Autonomia', value: '3-6 horas' },
      { key: 'Alça', value: 'Retrátil' },
    ],
    applications: ['Saídas de emergência', 'Hotelaria', 'Residências', 'Comércio'],
    certifications: ['IP20', 'ABNT NBR 10898'], featured: false,
  },
  // --- Signage ---
  { _id: 'lasledac', name: 'LASLEDAC', fullName: 'Placa Saída de Emergência LASLEDAC',
    slug: 'lasledac', category: 'Sinalização', productLine: 'emergencia',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/lum_emerg/LASLEDAC.png',
    shortDesc: 'Placa de saída autônoma com LEDs de alto brilho. Simples ou dupla face.',
    longDesc: 'A LASLEDAC é uma placa de sinalização de saída de emergência autônoma com LEDs de alto brilho. Disponível em simples ou dupla face, com autonomia de aproximadamente 2 horas.',
    badge: null, badgeColor: null,
    specs: [
      { key: 'Potência', value: '2W' }, { key: 'Fluxo luminoso', value: '50 lm' },
      { key: 'Tensão', value: '100-240 Vac' }, { key: 'Proteção', value: 'IP20' },
      { key: 'Bateria', value: 'NiCad 3,6V / 100mAh' }, { key: 'Autonomia', value: '~ 2 horas' },
      { key: 'Faces', value: 'Simples ou dupla' },
    ],
    applications: ['Saídas de emergência', 'Corredores', 'Escadas', 'Shoppings'],
    certifications: ['IP20', 'ABNT NBR 10898'], featured: false,
  },
  { _id: 'lneled', name: 'LNELED', fullName: 'Placa Saída Normal/Emergência LNELED',
    slug: 'lneled', category: 'Sinalização', productLine: 'emergencia',
    imageUrl: 'https://www.bralarmseg.com.br/imagens/lum_emerg/LNELED.png',
    shortDesc: 'Placa normal/emergência com LEDs alto brilho. Carcaça metálica.',
    longDesc: 'A LNELED é uma placa de sinalização autônoma para modo normal e emergência, com LEDs de alto brilho e carcaça metálica. Placa de acrílico cristal, autonomia de aproximadamente 3 horas.',
    badge: null, badgeColor: null,
    specs: [
      { key: 'Potência', value: '< 3W' }, { key: 'Fluxo luminoso', value: '50 lm' },
      { key: 'Tensão', value: '127/220V 60Hz' }, { key: 'Proteção', value: 'IP20' },
      { key: 'Autonomia', value: '~ 3 horas' }, { key: 'Carcaça', value: 'Metálica' },
      { key: 'Placa', value: 'Acrílico cristal' },
    ],
    applications: ['Saídas de emergência', 'Corredores', 'Shoppings', 'Condomínios'],
    certifications: ['IP20', 'ABNT NBR 10898'], featured: false,
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
