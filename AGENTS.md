<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to Lovable. Avoid rewriting published git history because the editor synchronizes the connected branch.
<!-- LOVABLE:END -->

- Keep all product content, plans, brokers, and payment networks in one browser-safe domain data module so every surface stays consistent.
- Normalize new order payloads through the domain module's plan lookup instead of accepting totals or promotional fields from checkout URLs, so listed prices stay authoritative.
- Keep authenticated customer operations behind the managed pathless auth layout and owner-scoped database policies because account data is private.
- Grant staff access through `public.user_roles` and `has_role`-checked database policies, never email checks in browser code, so customer ownership remains private while assigned admins can review orders and support.
- Resolve expired pending orders through the authenticated database lifecycle function before order reads so the one-hour rule is persistent.
- Keep Tawk.to behind the branded Live support control and suppress its standalone launcher so chat entry stays consistent with the site UI.
- Build every shareable link (affiliate referrals, SEO/social metadata) from the canonical site domain in `src/lib/site.ts`, never `window.location.origin`, so visitors never receive the hosting preview address.
