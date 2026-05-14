import type { APIRoute } from 'astro';

const PRODUCT_CATALOG = `
LED INDUSTRIAL:
- highbay-magna: HIGHBAY MAGNA - 150W, 21000lm, IP66, para galpões pé-direito elevado (>8m)
- highbay-classic: HIGHBAY CLASSIC - 100/150W, 14000-21000lm, IP20, comercial e industrial
- highbay-industrial: HIGHBAY INDUSTRIAL - 100/150/200W, IP65, ambientes úmidos
- highbay-industrial-plus: HIGHBAY INDUSTRIAL PLUS - 110/160/220W, 160lm/W, IP65, alta eficiência
- ufo-luxi: UFO LUXI - 100/150/200W, IP65, 25000h, estacionamentos e galpões
- ufo-elite: UFO ELITE - 100/150/200W, 160lm/W, IP65, máxima eficiência
- projetor-sport: SPORT - 50-200W, IP66, ângulo 0-90° ajustável, quadras e galpões
- projetor-vegas: VEGAS - 50-200W, IP66, ângulo 0-180°, pátios e fachadas externas
- projetor-faros24: FAROS24 - 50/100W, 24Vdc, IP66, solar/off-grid
- projetor-fox-ir: FOX IR - 35/50W, infravermelho 850/940nm, IP66, CFTV/segurança

EMERGÊNCIA EXTERNA (IP66/68):
- sptble: SPTBLE - 8W, 1200lm, 5h autonomia, IP66/68
- sptle2f: SPTLE2F - 16W, 2400lm, 7h autonomia, 2 faros direcionais, IP66/68
- sptle3f: SPTLE3F - 24W, 3600lm, 5h autonomia, 3 faros, IP66/68
- almba2f: ALMBA2F - 18W, 3000lm, 7h autonomia, IP66/68, mais vendida
- almin8000: ALMIN8000 - 60W, 8000lm, 4h autonomia, aço inox, cobre até 1600m²
- alm03026: ALM03026 - 26W, 2418lm, IP68, alumínio, fundições e túneis

EMERGÊNCIA INTERNA (IP20):
- almipl: ALMIPL - 4/9W, 500lm, 5h autonomia, IP20, escritórios e shoppings
- eq288l: EQ288L - 36 LEDs, 1.5h autonomia, IP20, compacta
- lumled30: LUMLED30 - 30 LEDs, 3-6h autonomia, IP20, lítio recarregável

SINALIZAÇÃO:
- lasledac: LASLEDAC - placa saída, 2W, 2h autonomia, simples ou dupla face
- lneled: LNELED - placa normal/emergência, 3W, 3h autonomia, carcaça metálica
`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { ambiente, altura, area, tensao, local, emergencia, obs } = body;

    const apiKey = import.meta.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify(rulesBasedRec(body)), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userMsg = `Dados da instalação:
- Tipo de ambiente: ${ambiente}
- Pé-direito/altura: ${altura}
- Área total: ${area} m²
- Localização: ${local}
- Tensão: ${tensao}
- Necessita emergência: ${emergencia ? 'Sim' : 'Não'}
${obs ? `- Observações: ${obs}` : ''}

Catálogo de produtos disponíveis:
${PRODUCT_CATALOG}

Recomende de 2 a 4 produtos ideais para esta instalação. Responda SOMENTE em JSON válido, sem markdown, no formato:
{"reasoning":"explicação em português brasileiro em 2-3 frases sobre por que esses produtos são indicados","products":[{"slug":"slug-do-produto","name":"NOME DO PRODUTO","reason":"motivo curto em 1 frase"}]}`;

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        messages: [{ role: 'user', content: userMsg }],
      }),
    });

    if (!resp.ok) {
      return new Response(JSON.stringify(rulesBasedRec(body)), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await resp.json();
    const text = data.content?.[0]?.text || '{}';

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      const match = text.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : rulesBasedRec(body);
    }

    return new Response(JSON.stringify(parsed), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ reasoning: 'Erro interno.', products: [], error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

function rulesBasedRec(form: { ambiente: string; altura: string; area: string; local: string; emergencia: boolean; tensao: string; obs: string }) {
  const products: { slug: string; name: string; reason: string }[] = [];
  const { altura, local, emergencia, tensao } = form;

  if (emergencia) {
    if (local === 'externo') {
      products.push({ slug: 'almba2f', name: 'ALMBA2F', reason: 'Uso externo com IP66/68 e 7h de autonomia.' });
      products.push({ slug: 'sptle2f', name: 'SPTLE2F', reason: '2 faros direcionais para cobertura ampla de área externa.' });
    } else {
      products.push({ slug: 'almipl', name: 'ALMIPL', reason: 'Luminária interna IP20 com até 5h de autonomia.' });
      products.push({ slug: 'lasledac', name: 'LASLEDAC', reason: 'Placa de saída autônoma para sinalização de rotas de fuga.' });
    }
  }

  if (tensao === '24Vdc (solar/off-grid)') {
    products.push({ slug: 'projetor-faros24', name: 'FAROS24', reason: 'Único projetor 24Vdc do portfólio, ideal para sistemas solares.' });
  } else if (altura === 'Acima de 12 m' || altura === '8 a 12 m') {
    products.push({ slug: 'highbay-magna', name: 'HIGHBAY MAGNA', reason: 'Alta potência e IP66 para grandes pés-direitos industriais.' });
    products.push({ slug: 'ufo-elite', name: 'UFO ELITE', reason: '160lm/W para máxima eficiência em pés-direitos elevados.' });
  } else if (local === 'externo') {
    products.push({ slug: 'projetor-vegas', name: 'VEGAS', reason: 'IP66 com ângulo ajustável 0-180° para áreas externas.' });
    products.push({ slug: 'ufo-luxi', name: 'UFO LUXI', reason: 'Versátil para instalações externas em estruturas tubulares.' });
  } else {
    products.push({ slug: 'highbay-industrial', name: 'HIGHBAY INDUSTRIAL', reason: 'IP65 e alumínio injetado para ambientes internos úmidos.' });
    products.push({ slug: 'ufo-elite', name: 'UFO ELITE', reason: '160lm/W — máxima eficiência para ambientes internos.' });
  }

  return {
    reasoning: 'Recomendação baseada nos dados fornecidos. Para uma análise personalizada com IA, configure a chave ANTHROPIC_API_KEY.',
    products: products.slice(0, 3),
    error: '',
  };
}
