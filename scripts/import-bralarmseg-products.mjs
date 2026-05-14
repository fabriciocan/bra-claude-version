import { createClient } from '@sanity/client';
import { readFileSync, writeFileSync } from 'node:fs';

function env(name, fallback = '') {
  if (process.env[name]) return process.env[name];
  try {
    const line = readFileSync('.env', 'utf8')
      .split(/\r?\n/)
      .find((entry) => entry.trim().startsWith(`${name}=`));
    return line ? line.slice(line.indexOf('=') + 1).trim() : fallback;
  } catch {
    return fallback;
  }
}

const projectId = env('PUBLIC_SANITY_PROJECT_ID');
const dataset = env('PUBLIC_SANITY_DATASET', 'production');
const token = env('SANITY_API_WRITE_TOKEN') || env('SANITY_API_READ_TOKEN');

if (!projectId || !token) {
  throw new Error('Configure PUBLIC_SANITY_PROJECT_ID e SANITY_API_WRITE_TOKEN no .env');
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-01-01',
});

const img = (path) => `https://www.bralarmseg.com.br/imagens/${path}`;
const ledManual = (file) => `https://www.bralarmseg.com.br/datasheets/ilum_industrial/${file}.pdf`;
const emergManual = (file) => `https://www.bralarmseg.com.br/datasheets/lum_emerg/${file}.pdf`;

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function spec(obj) {
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
}

function product(data) {
  const slug = data.slug || slugify(data.name);
  return {
    _id: `product.${slug}`,
    _type: 'product',
    name: data.name,
    fullName: data.fullName,
    slug: { _type: 'slug', current: slug },
    category: data.category,
    productLine: data.productLine,
    imageUrl: data.imageUrl,
    shortDesc: data.shortDesc,
    longDesc: data.longDesc,
    badge: data.badge || null,
    badgeColor: data.badgeColor || null,
    specs: spec(data.specs || {}),
    applications: data.applications || [],
    certifications: data.certifications || [],
    downloads: (data.downloads || []).map((download) => ({
      _type: 'download',
      name: download.name,
      type: download.type || 'PDF',
      url: download.url,
    })),
    featured: Boolean(data.featured),
    order: data.order ?? 99,
  };
}

const LED_APPS = ['Galpões', 'Fábricas', 'Armazéns', 'Centros logísticos'];
const EXT_APPS = ['Indústrias', 'Galpões', 'Frigoríficos', 'Ambientes externos'];
const INT_APPS = ['Corredores', 'Escadas', 'Saídas de emergência', 'Áreas internas'];

const products = [
  product({
    order: 10,
    name: 'BR-HBM150',
    fullName: 'Luminária Industrial Highbay Magna',
    slug: 'highbay-magna',
    category: 'Highbay',
    productLine: 'led',
    imageUrl: img('ilum_industrial/br-hbm150.jpg'),
    shortDesc: 'Highbay industrial IP66 de 150W para pé-direito elevado.',
    longDesc: 'Luminária industrial indicada para galpões, fábricas, armazéns e instalações de grande porte. Corpo em alumínio injetado, proteção IP66 e LEDs de alta performance.',
    badge: 'IP66',
    badgeColor: '#003DA5',
    specs: {
      Referência: 'BR-HBM150',
      Alimentação: '127/220Vac (47/63Hz)',
      Potência: '150W',
      'Fluxo luminoso': '20.775 lm',
      Eficiência: '140 lm/W',
      Proteção: 'IP66',
      'Temperatura de cor': '4000K ou 5000K',
      'Fator de potência': '>0,97 (110Vac); >0,95 (220Vac)',
      Dimensões: '450 x 440 mm',
      Peso: '10 kg',
    },
    applications: LED_APPS,
    certifications: ['IP66', 'IK08', 'Classe I'],
    downloads: [{ name: 'Manual técnico BR-HBM150', url: ledManual('br-hbm150') }],
    featured: true,
  }),
  product({
    order: 20,
    name: 'BR-HBC100/150',
    fullName: 'Luminária Industrial Highbay Classic',
    slug: 'highbay-classic',
    category: 'Highbay',
    productLine: 'led',
    imageUrl: img('ilum_industrial/br-highbayclassic.jpg'),
    shortDesc: 'Highbay Classic IP20 em 100W ou 150W para áreas industriais.',
    longDesc: 'Luminária LED de alto desempenho para galpões, armazéns, centros de distribuição, ginásios e linhas de montagem.',
    specs: {
      Referência: 'BR-HBC100/150',
      Alimentação: '220Vac (50/60Hz)',
      Potência: '100W / 150W',
      'Fluxo luminoso': '14.000 lm / 21.000 lm',
      Eficiência: '140 lm/W',
      Proteção: 'IP20',
      'Temperatura de cor': '4000K ou 5000K',
      Dimensões: '168 x 196 x 570 mm (100W) / 168 x 263 x 570 mm (150W)',
      Peso: '1,5 kg (100W) / 2,5 kg (150W)',
    },
    applications: LED_APPS,
    certifications: ['IP20', 'IK08', 'Classe I'],
    downloads: [{ name: 'Manual técnico BR-HBC100/150', url: ledManual('br-hbc') }],
  }),
  product({
    order: 30,
    name: 'BR-HBI100/150/200',
    fullName: 'Luminária Highbay Industrial',
    slug: 'highbay-industrial',
    category: 'Highbay',
    productLine: 'led',
    imageUrl: img('ilum_industrial/br-hbi.jpg'),
    shortDesc: 'Highbay Industrial IP65 em 100W, 150W ou 200W.',
    longDesc: 'Highbay nacional em alumínio injetado para ambientes industriais com umidade, poeira e pé-direito elevado.',
    badge: 'IP65',
    badgeColor: '#003DA5',
    specs: {
      Referência: 'BR-HBI100/150/200',
      Alimentação: '127/220Vac (50/60Hz)',
      Potência: '100W / 150W / 200W',
      'Fluxo luminoso': '14.350 lm (100W); demais consultar catálogo',
      Eficiência: '140 lm/W',
      Proteção: 'IP65',
      'Temperatura de cor': '4000K ou 5000K',
      Dimensões: '160 x 285 x 215 mm (100W)',
      Peso: '2,7 kg (100W)',
    },
    applications: LED_APPS,
    certifications: ['IP65', 'IK08', 'Classe I'],
    downloads: [{ name: 'Manual técnico BR-HBI', url: ledManual('br-highbayindustrial') }],
  }),
  product({
    order: 40,
    name: 'BR-HBIP110/160/220',
    fullName: 'Luminária Highbay Industrial Plus',
    slug: 'highbay-industrial-plus',
    category: 'Highbay',
    productLine: 'led',
    imageUrl: img('ilum_industrial/br-hbi.jpg'),
    shortDesc: 'Highbay Industrial Plus IP65 com eficiência de 160 lm/W.',
    longDesc: 'Highbay industrial de alta eficiência para galpões, armazéns, centros de distribuição e áreas produtivas.',
    badge: '160 lm/W',
    badgeColor: '#1A8A4A',
    specs: {
      Referência: 'BR-HBIP110/160/220',
      Alimentação: '127/220Vac (50/60Hz)',
      Potência: '110W / 160W / 220W',
      'Fluxo luminoso': '17.350 lm (110W); demais consultar catálogo',
      Eficiência: '160 lm/W',
      Proteção: 'IP65',
      'Temperatura de cor': '4000K ou 5000K',
      Dimensões: '160 x 285 x 215 mm (110W)',
      Peso: '2,7 kg (110W)',
    },
    applications: LED_APPS,
    certifications: ['IP65', 'IK08', 'Classe I'],
    downloads: [{ name: 'Manual técnico BR-HBIP', url: ledManual('br-highbayindustrialplus') }],
    featured: true,
  }),
  product({
    order: 50,
    name: 'BR-LE050',
    fullName: 'Luminária Lumo de Emergência Industrial',
    slug: 'luminaria-lumo-emergencia-industrial',
    category: 'Emergência',
    productLine: 'led',
    imageUrl: img('ilum_industrial/br-le050.jpg'),
    shortDesc: 'Luminária Lumo industrial de emergência com 50W e IP20.',
    longDesc: 'Luminária para ambientes internos como corredores, escadas, halls, supermercados, escritórios, showrooms e centros logísticos.',
    specs: {
      Referência: 'BR-LE050',
      Alimentação: '220-240Vac (47-63Hz)',
      Potência: '50W',
      'Fluxo luminoso': '7.950 lm sem difusor',
      Eficiência: '130 lm/W',
      Proteção: 'IP20',
      'Temperatura de cor': '4000K ou 5000K',
      Dimensões: '62 x 1134 x 62 mm',
      Peso: '1,2 kg',
    },
    applications: ['Supermercados', 'Escritórios', 'Showrooms', 'Centros logísticos'],
    certifications: ['IP20', 'Classe I'],
    downloads: [{ name: 'Manual técnico BR-LE050', url: ledManual('br-le050') }],
  }),

  ...[
    ['BR-UFOLUXI', 'Projetor Industrial UFO Luxi', 'ufo-luxi', 'Projetor UFO', img('ilum_industrial/br-ufo.jpg'), '110 lm/W', '100W / 150W / 200W', 'IP65', '11.000 lm (100W)', ledManual('br-ufo')],
    ['BR-UFOELITE', 'Projetor Industrial UFO Elite', 'ufo-elite', 'Projetor UFO', img('ilum_industrial/br-ufoelite.jpg'), '160 lm/W', '100W / 150W / 200W', 'IP65', '16.000 lm (100W)', ledManual('br-ufoelite')],
    ['BR-SPORT', 'Projetor Industrial Sport', 'projetor-sport', 'Projetor', img('ilum_industrial/br-sport_plus.jpg'), '140 lm/W', '50W / 100W / 150W / 200W', 'IP66', '6.750 lm (50W)', ledManual('br-sport')],
    ['BR-SPORTPLUS', 'Projetor Industrial Sport Plus', 'projetor-sport-plus', 'Projetor', img('ilum_industrial/br-sport_plus.jpg'), '160 lm/W', '60W / 110W / 160W / 220W / 260W', 'IP66', '9.310 lm (60W)', ledManual('br-sportplus')],
    ['BR-VEGAS', 'Projetor Industrial Vegas', 'projetor-vegas', 'Projetor', img('ilum_industrial/br-vegas.jpg'), '140 lm/W', '50W / 100W / 150W / 200W', 'IP66', '6.750 lm (50W)', ledManual('br-vegas')],
    ['BR-VEGASPLUS', 'Projetor Industrial Vegas Plus', 'projetor-vegas-plus', 'Projetor', img('ilum_industrial/br-vegas.jpg'), '160 lm/W', '60W / 110W / 160W / 220W', 'IP66', '9.310 lm (60W)', ledManual('br-vegasplus')],
    ['BR-FAROS24', 'Projetor Industrial Faros24', 'projetor-faros24', 'Projetor', img('ilum_industrial/br-faros24_plus.jpg'), '140 lm/W', '50W / 100W', 'IP66', '7.000 lm (50W)', ledManual('br-faros24')],
    ['BR-FAROS24 PLUS', 'Projetor Industrial Faros24 Plus', 'projetor-faros24-plus', 'Projetor', img('ilum_industrial/br-faros24_plus.jpg'), '160 lm/W', '50W / 100W', 'IP66', '8.000 lm (50W)', ledManual('br-faros24plus')],
    ['BR-FOXIR', 'Projetor Industrial Fox IR', 'projetor-fox-ir', 'Projetor', img('ilum_industrial/br-foxir.jpg'), 'IR 850nm ou 940nm', '35W / 50W', 'IP66', 'Infravermelho para CFTV', ledManual('br-foxir')],
  ].map(([name, fullName, slug, category, imageUrl, efficiency, power, protection, flux, manual], index) => product({
    order: 100 + index * 10,
    name,
    fullName,
    slug,
    category,
    productLine: 'led',
    imageUrl,
    shortDesc: `${fullName} ${protection} para aplicação industrial.`,
    longDesc: `${fullName} para galpões, fábricas, centros logísticos, fachadas e ambientes industriais. Corpo em alumínio injetado e suporte para instalação ajustável conforme aplicação.`,
    badge: efficiency.includes('IR') ? 'IR' : efficiency,
    badgeColor: efficiency.includes('160') ? '#1A8A4A' : efficiency.includes('IR') ? '#5A3A8A' : '#003DA5',
    specs: {
      Referência: name,
      Alimentação: name.includes('FAROS24') ? '24Vdc' : '127/220Vac (50/60Hz)',
      Potência: power,
      'Fluxo luminoso': flux,
      Eficiência: efficiency,
      Proteção: protection,
      'Temperatura de cor': name.includes('FOXIR') ? '850nm ou 940nm' : '4000K ou 5000K',
      'Material do corpo': 'Alumínio injetado',
      'Proteção mecânica': 'IK08',
    },
    applications: name.includes('FOXIR') ? ['CFTV', 'Segurança', 'Rodovias', 'Túneis'] : LED_APPS,
    certifications: [protection, 'IK08', 'Classe I'],
    downloads: [{ name: `Manual técnico ${name}`, url: manual }],
    featured: ['BR-UFOELITE', 'BR-VEGASPLUS'].includes(name),
  })),

  ...[
    ['SPTBLE', 'Luminária de Emergência Industrial SPTBLE', 'sptble', 'Uso Externo', img('lum_emerg/SPTBLE.png'), '8W', '1.200 lm', '5 horas', 'IP66/68', emergManual('SPTBLE')],
    ['SPTLE2F', 'Luminária de Emergência 2 Faróis Industrial IP66/68', 'sptle2f', 'Uso Externo', img('lum_emerg/SPTLE2F.png'), '16W', '2.400 lm', 'superior a 7 horas', 'IP66/68', emergManual('SPTLE2F')],
    ['SPTLE3F', 'Luminária de Emergência 3 Faróis Industrial IP66/68', 'sptle3f', 'Uso Externo', img('lum_emerg/SPTLE3F.png'), '24W', '3.600 lm', 'aproximadamente 5 horas', 'IP66/68', emergManual('SPTLE3F')],
    ['SPT2FR', 'Luminária de Emergência 2 Faróis Rota de Fuga', 'spt2fr', 'Uso Externo', img('lum_emerg/SPT2FR.png'), '24W', '3.000 lm', 'aproximadamente 5 horas', 'IP66/68', emergManual('SPT2FR')],
    ['SPTLHE', 'Luminária de Emergência Hermética SPTLHE', 'sptlhe', 'Uso Externo', img('lum_emerg/SPTLHE.png'), '8W', '1.200 lm', '5 horas', 'IP66/68', emergManual('SPTLHE')],
    ['SPTLEV', 'Luminária de Emergência SPTLEV', 'sptlev', 'Uso Externo', img('lum_emerg/SPTLEV.png'), '8W', '1.200 lm', '5 horas', 'IP66/68', emergManual('SPTLEV')],
    ['ALMBA45L', 'Luminária de Emergência ALMBA45L', 'almba45l', 'Uso Externo', img('lum_emerg/ALMBA45L.png'), '45 LEDs', 'consultar catálogo', 'consultar catálogo', 'IP66/68', emergManual('ALMBA45L')],
    ['ALMBA2F', 'Luminária de Emergência ALMBA2F', 'almba2f', 'Uso Externo', img('lum_emerg/ALMBA2F.png'), '18W', '3.000 lm', '7 horas', 'IP66/68', emergManual('ALMBA2F')],
    ['ALMBADF', 'Luminária de Emergência ALMBADF', 'almbadf', 'Uso Externo', img('lum_emerg/ALMBADF.png'), 'consultar catálogo', 'consultar catálogo', 'consultar catálogo', 'IP66/68', emergManual('ALMBADF')],
    ['ALMIN8000', 'Luminária de Emergência ALMIN8000', 'almin8000', 'Uso Externo', img('lum_emerg/ALMIN8000.png'), '60W', '8.000 lm', '4 horas', 'IP66/68', emergManual('ALMIN8000')],
    ['ALM03026', 'Luminária de Emergência ALM03026', 'alm03026', 'Uso Externo', img('lum_emerg/ALM03026.jpg'), '26W', '2.418 lm', 'consultar catálogo', 'IP68', emergManual('ALM03026')],
  ].map(([name, fullName, slug, category, imageUrl, power, flux, autonomy, protection, manual], index) => product({
    order: 300 + index * 10,
    name,
    fullName,
    slug,
    category,
    productLine: 'emergencia',
    imageUrl,
    shortDesc: `${fullName} com proteção ${protection}.`,
    longDesc: `${fullName} indicada para ambientes externos, empoeirados, úmidos e industriais. Atende aplicações de iluminação de emergência conforme ABNT NBR 10898.`,
    badge: protection,
    badgeColor: '#DC2626',
    specs: {
      Referência: name,
      Alimentação: '90~240Vac',
      Potência: power,
      'Fluxo luminoso': flux,
      Autonomia: autonomy,
      Proteção: protection,
      'Temperatura de cor': '6000K',
      Bateria: name.startsWith('SPT') || name.startsWith('ALM') ? 'Selada livre de manutenção' : 'Consultar catálogo',
      Norma: 'ABNT NBR 10898',
    },
    applications: EXT_APPS,
    certifications: [protection, 'ABNT NBR 10898'],
    downloads: [{ name: `Manual técnico ${name}`, url: manual }],
    featured: ['ALMBA2F', 'ALMIN8000'].includes(name),
  })),

  ...[
    ['EQPLAM-SB', 'Bloco Autônomo de Emergência EQPLAM-SB', 'eqplam-sb', img('lum_emerg/EQPLAM-SB.png'), '9W', '4.000 lm', 'superior a 1,5 hora', emergManual('EQPLAM-SB')],
    ['ALMIPL', 'Luminária Autônoma de Emergência com LEDs SMD', 'almipl', img('lum_emerg/ALMIPL.jpg'), '4W (SE) / 9W (NE)', '500 lm', '5 horas (SE) / 3 horas (NE)', emergManual('ALMIPL')],
    ['EQ288L', 'Luminária de Emergência 288 lumens', 'eq288l', img('lum_emerg/EQ288L.png'), '36 LEDs', '288 lm', '1 hora e 30 minutos', emergManual('EQ288L')],
    ['LUMLED30', 'Luminária de Emergência LUMLED30', 'lumled30', img('lum_emerg/LUMLED30.png'), '30 LEDs', '90~120 lm', '3~6 horas', emergManual('LUMLED30')],
    ['LASLEDAC', 'Luminária Autônoma de Saída com LEDs - Acrílico', 'lasledac', img('lum_emerg/LASLEDAC.png'), '2W', '50 lm', 'superior a 2 horas', emergManual('LASLEDAC')],
    ['LASLEDPS', 'Luminária Autônoma de Saída com LEDs - PS', 'lasledps', img('lum_emerg/LASLEDPS.png'), '2W', '50 lm', 'superior a 2 horas', emergManual('LASLEDAC')],
    ['LNELED', 'Luminária Autônoma de Saída Normal/Emergência', 'lneled', img('lum_emerg/LNELED.png'), '< 3W', '50 lm', 'aproximadamente 3 horas', emergManual('LNELED')],
    ['LUMAUT', 'Luminária Autônoma de Saída', 'lumaut', img('lum_emerg/LUMAUT.png'), '5W', '35 lm', 'aproximadamente 3 horas', emergManual('LUMAUT')],
    ['PFHSD/PFHSE/PFDFSD/PFDFSE/PFSE/PFS', 'Placas Fotoluminescentes para Sinalização de Rota de Fuga', 'placas-fotoluminescentes-rota-de-fuga', img('lum_emerg/PFHSD.png'), 'Sem consumo', 'Fotoluminescente', 'Permanente após exposição à luz', emergManual('placas-fotoluminescentes')],
  ].map(([name, fullName, slug, imageUrl, power, flux, autonomy, manual], index) => product({
    order: 500 + index * 10,
    name,
    fullName,
    slug,
    category: name.startsWith('PF') ? 'Sinalização' : 'Uso Interno',
    productLine: 'emergencia',
    imageUrl,
    shortDesc: `${fullName} para rotas de fuga e áreas internas.`,
    longDesc: `${fullName} indicada para iluminação ou sinalização de emergência em corredores, escadas, rotas de fuga e ambientes internos.`,
    badge: 'IP20',
    badgeColor: '#DC2626',
    specs: {
      Referência: name,
      Alimentação: name.startsWith('PF') ? 'Não aplicável' : '110/220V',
      Potência: power,
      'Fluxo luminoso': flux,
      Autonomia: autonomy,
      Proteção: name.startsWith('PF') ? 'PVC anti-chama' : 'IP20',
      Frequência: name.startsWith('PF') ? 'Não aplicável' : '50/60 Hz',
    },
    applications: name.startsWith('PF') ? ['Rotas de fuga', 'Sinalização', 'Saídas de emergência'] : INT_APPS,
    certifications: name.startsWith('PF') ? ['PVC anti-chama'] : ['IP20', 'ABNT NBR 10898'],
    downloads: [{ name: `Manual técnico ${name}`, url: manual }],
  })),
];

console.log(`Importando ${products.length} produtos para ${projectId}/${dataset}...`);

if (process.argv.includes('--ndjson')) {
  const output = 'scripts/bralarmseg-products.ndjson';
  writeFileSync(output, products.map((item) => JSON.stringify(item)).join('\n') + '\n');
  console.log(`Arquivo gerado: ${output}`);
  process.exit(0);
}

const tx = client.transaction();
for (const item of products) tx.createOrReplace(item);
await tx.commit();

console.log('Importação concluída.');
