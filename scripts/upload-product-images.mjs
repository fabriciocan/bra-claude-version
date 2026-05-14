import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { Readable } from 'node:stream';

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

const products = await client.fetch(
  `*[_type == "product" && defined(imageUrl) && !defined(image.asset)]{_id, name, imageUrl}`
);

console.log(`Enviando imagens para ${products.length} produtos...`);

for (const product of products) {
  try {
    const response = await fetch(product.imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      console.warn(`Falha ${response.status}: ${product.name} (${product.imageUrl})`);
      continue;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const filename = product.imageUrl.split('/').pop() || `${product._id}.jpg`;
    const asset = await client.assets.upload('image', Readable.from(buffer), {
      filename,
      contentType: response.headers.get('content-type') || undefined,
    });

    await client
      .patch(product._id)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      })
      .commit();

    console.log(`OK ${product.name}`);
  } catch (error) {
    console.warn(`Erro ${product.name}: ${error.message}`);
  }
}

console.log('Upload de imagens concluído.');
