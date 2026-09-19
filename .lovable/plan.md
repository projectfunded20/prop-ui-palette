# Recreate the existing QXT Funded frontend

## Goal
Rebuild the uploaded website’s complete visible experience in this Lovable project without redesigning it or connecting any backend services. Preserve the original QXT Funded branding, dark charcoal and gold visual system, wording, prices, account rules, page structure, interactions, and mobile behavior.

## Scope

### Shared visual system and assets
- Recreate the original charcoal, paper, gold, mint, warning, and error color roles; Space Grotesk headings, Inter body text, JetBrains Mono figures; grids, gold glow, glass header, cards, focus states, transitions, and reduced-motion behavior.
- Reuse the uploaded QXT logo, favicon, broker logos, and cryptocurrency icons through safe project assets.
- Build reusable buttons, fields, cards, badges, page sections, account cards, status indicators, tables, mobile drawers, banners, and empty/loading/error states rather than one large page file.

### Public website
- Shared fixed desktop/mobile navigation, cookie banner, mobile action banner, support shortcut, and complete footer.
- Home page with animated trading backdrop, headline, statistics, benefits, account preview, broker grid, testimonials, FAQ preview, and final action area.
- Dedicated pages for Accounts, Brokers, How It Works, FAQ with search/filtering, Reviews, Support, Contact, and Thank You.
- Preserve all existing account prices, funding sizes, loss limits, drawdowns, profit targets, profit split, broker copy, reviews, questions, support copy, and legal wording from the archive.

### Account access and checkout demonstrations
- Recreate Sign In, Sign Up, Forgot Password, and Verify Email screens with their original split-screen treatment and working client-side form states.
- Recreate the three-step checkout: customer details, payment/coupon selection, and cryptocurrency deposit confirmation with order summary, progress, copy controls, upload state, and validation.
- Account selection and all checkout actions will use in-memory mock state only; no authentication, payments, email, storage, or external service calls.

### Customer dashboard demonstration
- Recreate the responsive sidebar/header shell, profile menu, notification popover, and mobile drawer.
- Dashboard overview, order list/table, order detail/timeline/receipt/account details, support ticket list/detail/new-ticket form, profile editor, and security settings.
- Use the archive’s realistic sample orders, ticket conversations, user information, status labels, and chart/stat values. Dashboard and checkout routes will be directly previewable without login enforcement.

### Legal and system pages
- Recreate Terms, Privacy, Refund, Risk Disclosure, and Cookies pages, including existing alternate public URLs where present.
- Recreate 404, server error, and maintenance views.

### Navigation and metadata
- Convert the original React Router structure to this project’s TanStack routing while preserving the same public URLs and navigation behavior.
- Give every content page its own matching title, description, Open Graph text, and social card metadata.
- Keep menus, tabs, accordions, searches, forms, copy buttons, mock submissions, drawers, notification panels, and responsive tables interactive.

## Technical details
- The original Firebase/authentication, database, live chat injection, and API modules will not be copied or called.
- Backend reads and writes will be represented by typed static datasets and local component state; sensitive environment files and credentials are excluded.
- Existing remote image fallbacks will not be required; bundled uploaded assets will provide the visible branding and logos.
- The implementation will remain within the existing TanStack Start project and use its reusable design components and semantic styling tokens.

## Validation
- Check every route and major interaction in the running preview.
- Verify desktop and mobile layouts, navigation, drawers, tables, forms, checkout steps, dashboard states, and no-overlap behavior.
- Confirm the final build is clean and that no backend, authentication, payment, database, webhook, email, or secret dependency remains.
