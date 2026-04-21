export default async function handler(req, res) {
  const { shop } = req.query;
  
  if (!shop) {
    return res.status(400).send('Missing shop parameter');
  }

  // Initiate OAuth flow - redirect to Shopify's authorization page
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const scopes = 'read_products,write_products,read_orders,write_orders,read_all_orders,read_content,write_content,read_themes,write_themes,read_metaobjects,write_metaobjects,read_inventory,write_inventory,read_fulfillments,write_fulfillments,read_shipping,write_shipping,read_analytics,read_reports,write_reports,read_markets,read_price_rules,write_price_rules,read_discounts,write_discounts,read_files,write_files';
  const redirectUri = 'https://shopify-oauth-receiver.vercel.app/api/auth/callback';
  
  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;
  
  res.redirect(302, authUrl);
}
