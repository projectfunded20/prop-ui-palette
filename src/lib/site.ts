// Single source of truth for the site's own public address. Every shareable
// link (affiliate referrals, social/SEO metadata) must use this domain so
// visitors never receive the hosting preview address.
export const SITE_URL = 'https://www.vexofunded.com';

export function affiliateLink(code: string) {
  const clean = (code || '').replace(/[^A-Za-z0-9]/g, '').slice(0, 16).toUpperCase();
  return clean ? `${SITE_URL}/signup?ref=${clean}` : '';
}
