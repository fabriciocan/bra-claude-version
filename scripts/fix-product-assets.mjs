import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';

function env(name, fallback = '') {
  const line = readFileSync('.env', 'utf8')
    .split(/\r?\n/)
    .find((entry) => entry.trim().startsWith(`${name}=`));
  return line ? line.slice(line.indexOf('=') + 1).trim() : fallback;
}

const client = createClient({
  projectId: env('PUBLIC_SANITY_PROJECT_ID'),
  dataset: env('PUBLIC_SANITY_DATASET', 'production'),
  token: env('SANITY_API_WRITE_TOKEN'),
  useCdn: false,
  apiVersion: '2024-01-01',
});

const led = (file) => `https://www.bralarmseg.com.br/datasheets/ilum_industrial/${file}.pdf`;
const emerg = (file) => `https://www.bralarmseg.com.br/datasheets/lum_emerg/${file}.pdf`;
const image = (path) => `https://www.bralarmseg.com.br/imagens/${path}`;

const patches = {
  'product.highbay-classic': {
    downloads: [{ name: 'Manual técnico BR-HBC100/150', type: 'PDF', url: led('br-highbayclassic') }],
  },
  'product.luminaria-lumo-emergencia-industrial': {
    imageUrl: image('ilum_industrial/br-lumoemergencia.jpg'),
    downloads: [{ name: 'Manual técnico BR-LE050', type: 'PDF', url: led('br-lumoemergencia') }],
  },
  'product.projetor-faros24-plus': {
    downloads: [{ name: 'Manual técnico BR-FAROS24 PLUS', type: 'PDF', url: led('br-farosplus24') }],
  },
  'product.sptble': { downloads: [{ name: 'Manual técnico SPTBLE', type: 'PDF', url: emerg('datasheet_sptble') }] },
  'product.sptle2f': { downloads: [{ name: 'Manual técnico SPTLE2F', type: 'PDF', url: emerg('datasheet_sptle2f') }] },
  'product.sptle3f': { downloads: [{ name: 'Manual técnico SPTLE3F', type: 'PDF', url: emerg('datasheet_sptle3f') }] },
  'product.spt2fr': { downloads: [{ name: 'Manual técnico SPT2FR', type: 'PDF', url: emerg('datasheet_spt2fr') }] },
  'product.sptlhe': { downloads: [{ name: 'Manual técnico SPTLHE', type: 'PDF', url: emerg('datasheet_sptlhe') }] },
  'product.sptlev': {
    imageUrl: image('lum_emerg/sptlev.png'),
    downloads: [{ name: 'Manual técnico SPTLEV', type: 'PDF', url: emerg('datasheet_sptlev') }],
  },
  'product.almba45l': {
    imageUrl: image('lum_emerg/almba45l.png'),
    downloads: [{ name: 'Manual técnico ALMBA45L', type: 'PDF', url: emerg('datasheet_almba45l') }],
  },
  'product.almba2f': { downloads: [{ name: 'Manual técnico ALMBA2F', type: 'PDF', url: emerg('datasheet_almba2f') }] },
  'product.almbadf': { downloads: [{ name: 'Manual técnico ALMBADF', type: 'PDF', url: emerg('datasheet_almbadf') }] },
  'product.almin8000': { downloads: [] },
  'product.alm03026': { downloads: [{ name: 'Manual técnico ALM03026', type: 'PDF', url: emerg('datasheet_ALM03026') }] },
  'product.eqplam-sb': {
    imageUrl: image('lum_emerg/eqplam.png'),
    downloads: [{ name: 'Manual técnico EQPLAM-SB', type: 'PDF', url: emerg('datasheet_eqplam') }],
  },
  'product.almipl': { downloads: [{ name: 'Manual técnico Série ALMIPL', type: 'PDF', url: emerg('datasheet_SERIE_ALMIPL') }] },
  'product.eq288l': { downloads: [{ name: 'Manual técnico EQ288L', type: 'PDF', url: emerg('datasheet_EQ288L') }] },
  'product.lumled30': { downloads: [] },
  'product.lasledac': { downloads: [{ name: 'Manual técnico LASLED', type: 'PDF', url: emerg('datasheet_LASLED') }] },
  'product.lasledps': { downloads: [{ name: 'Manual técnico LASLED', type: 'PDF', url: emerg('datasheet_LASLED') }] },
  'product.lneled': { downloads: [{ name: 'Manual técnico LNELED', type: 'PDF', url: emerg('datasheet_LNELED') }] },
  'product.placas-fotoluminescentes-rota-de-fuga': {
    imageUrl: image('lum_emerg/PFHSD.jpg'),
    downloads: [{ name: 'Manual técnico PFHSD', type: 'PDF', url: emerg('datasheet_PFHSD') }],
  },
};

for (const [id, patch] of Object.entries(patches)) {
  const update = { ...patch };
  if (update.downloads) {
    update.downloads = update.downloads.map((download) => ({ _type: 'download', ...download }));
  }
  await client.patch(id).set(update).commit();
  console.log(`OK ${id}`);
}

await client.patch('1efc751f-3715-4ef5-89d5-ae89e44cd53d').set({ order: 9999 }).commit().catch(() => {});

console.log('Correções aplicadas.');
