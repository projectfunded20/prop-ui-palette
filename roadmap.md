# VEXO FUNDED — roadmap

## Done
- [x] Full rebrand from old identity to VEXO FUNDED (logo, favicon, tokens, copy, metadata)
- [x] Landing and funding-path redesign (Dark Institutional)
- [x] Backend: database for profiles, orders, support tickets with row-level security
- [x] Email + password sign-in and Google sign-in (instant access, no dead verification screen)
- [x] Login required before checkout and dashboard (`_authenticated` route group)
- [x] Orders saved per user, shown in dashboard on desktop and mobile
- [x] Orders auto-decline one hour after submission (until the admin panel exists)
- [x] Friendly "order not found" state instead of a broken page
- [x] Support tickets and replies stored per user
- [x] Human dashboard copy
- [x] SEO: sitemap, robots with AI crawlers, Organization + WebSite structured data, OG/Twitter image

## Next
- [ ] Admin panel: approve / reject orders, deliver account details, then switch auto-decline off
- [ ] Connect the real live-chat provider into `src/components/vexo/live-support.tsx`
- [ ] Payout requests and funded-account performance tracking
