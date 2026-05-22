import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const { empresa, nome, telefone, email, segmento, produto, mensagem } = data;

    if (!empresa || !telefone) {
      return new Response(
        JSON.stringify({ message: 'Nome da empresa e telefone são obrigatórios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const smtpHost = import.meta.env.SMTP_HOST;
    const smtpUser = import.meta.env.SMTP_USER;
    const smtpPass = import.meta.env.SMTP_PASS;
    const contactEmail = import.meta.env.CONTACT_EMAIL || 'bra@bratekx.com.br';

    if (smtpHost && smtpUser && smtpPass) {
      // Dynamic import to avoid bundling nodemailer in client
      const nodemailer = await import('nodemailer');

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(import.meta.env.SMTP_PORT) || 465,
        secure: import.meta.env.SMTP_SECURE !== 'false',
        auth: { user: smtpUser, pass: smtpPass },
      });

      const subject = produto
        ? `Orçamento: ${produto} — ${empresa}`
        : `Novo orçamento — ${empresa}`;

      const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px">
          <div style="background:#0A1628;padding:20px;border-radius:4px 4px 0 0">
            <h1 style="color:#fff;font-size:22px;margin:0">
              BRATEKX — Nova Solicitação
            </h1>
          </div>
          <div style="background:#F5F5F5;padding:24px;border-radius:0 0 4px 4px">
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:8px 0;font-weight:bold;color:#5A5A5A;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;width:140px">Empresa</td>
                <td style="padding:8px 0;color:#111;font-size:15px">${empresa}</td>
              </tr>
              ${nome ? `<tr><td style="padding:8px 0;font-weight:bold;color:#5A5A5A;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Responsável</td><td style="padding:8px 0;color:#111;font-size:15px">${nome}</td></tr>` : ''}
              <tr>
                <td style="padding:8px 0;font-weight:bold;color:#5A5A5A;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Telefone</td>
                <td style="padding:8px 0;color:#111;font-size:15px"><a href="tel:${telefone}" style="color:#E35106">${telefone}</a></td>
              </tr>
              ${email ? `<tr><td style="padding:8px 0;font-weight:bold;color:#5A5A5A;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">E-mail</td><td style="padding:8px 0;color:#111;font-size:15px"><a href="mailto:${email}" style="color:#E35106">${email}</a></td></tr>` : ''}
              ${segmento ? `<tr><td style="padding:8px 0;font-weight:bold;color:#5A5A5A;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Segmento</td><td style="padding:8px 0;color:#111;font-size:15px">${segmento}</td></tr>` : ''}
              ${produto ? `<tr><td style="padding:8px 0;font-weight:bold;color:#5A5A5A;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Produto</td><td style="padding:8px 0;color:#E35106;font-size:15px;font-weight:bold">${produto}</td></tr>` : ''}
            </table>
            ${mensagem ? `<div style="margin-top:16px;padding:16px;background:#fff;border-radius:3px;border:1px solid #EBEBEB"><div style="font-size:12px;font-weight:bold;color:#5A5A5A;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px">Mensagem</div><p style="color:#3A3A3A;font-size:14px;line-height:1.6;margin:0">${mensagem.replace(/\n/g, '<br>')}</p></div>` : ''}
          </div>
          <p style="color:#8A8A8A;font-size:11px;text-align:center;margin-top:12px">
            Enviado pelo site bratekx.com.br
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: `"BRATEKX Site" <${smtpUser}>`,
        to: contactEmail,
        replyTo: email || smtpUser,
        subject,
        html,
        text: `${subject}\n\nEmpresa: ${empresa}\nTelefone: ${telefone}\nE-mail: ${email || '-'}\nSegmento: ${segmento || '-'}\nProduto: ${produto || '-'}\n\n${mensagem || ''}`,
      });
    }

    // Log to console if SMTP not configured (dev/testing)
    if (!smtpHost) {
      console.log('[Contact form submission]', { empresa, nome, telefone, email, segmento, produto, mensagem });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[Contact API error]', err);
    return new Response(
      JSON.stringify({ message: 'Erro interno. Tente novamente em alguns minutos.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
