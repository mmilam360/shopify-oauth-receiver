export default async function handler(req, res) {
  const { code, shop } = req.query;
  if (!code || !shop) {
    return res.status(400).send('Missing code or shop');
  }
  
  const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.SHOPIFY_CLIENT_ID,
      client_secret: process.env.SHOPIFY_CLIENT_SECRET,
      code: code
    })
  });
  
  const data = await tokenRes.json();
  
  res.status(200).send(`
    <html><body style="font-family:monospace;padding:40px">
    <h1>Token received!</h1>
    <p>Copy this token and send it to Leo:</p>
    <pre style="background:#f0f0f0;padding:20px;font-size:16px;word-break:break-all">${data.access_token}</pre>
    <p>Scopes: ${data.scope}</p>
    </body></html>
  `);
}
