export default async function handler(req, res) {
  const { code, shop } = req.query;
  
  // If Shopify sent a code, exchange it for a token
  if (code && shop) {
    try {
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
      
      return res.status(200).setHeader('Content-Type', 'text/html').send(`
        <html><body style="font-family:monospace;padding:40px">
        <h1>✅ Token received!</h1>
        <p>Copy this token and send it to Leo:</p>
        <pre style="background:#f0f0f0;padding:20px;font-size:16px;word-break:break-all">${data.access_token || JSON.stringify(data)}</pre>
        <p>Scopes: ${data.scope || 'N/A'}</p>
        </body></html>
      `);
    } catch (err) {
      return res.status(500).send('Token exchange failed: ' + err.message);
    }
  }
  
  // No code - just show a welcome page
  res.status(200).setHeader('Content-Type', 'text/html').send(`
    <html><body style="font-family:monospace;padding:40px">
    <h1>Shopify OAuth Receiver</h1>
    <p>Waiting for Shopify redirect...</p>
    </body></html>
  `);
}
