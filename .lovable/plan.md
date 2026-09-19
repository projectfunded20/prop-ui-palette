# VEXO FUNDED frontend rebrand

## Goal
Transform the complete existing prop-firm frontend into VEXO FUNDED without changing its prices, account rules, broker choices, content structure, mock checkout flow, dashboard behavior, or responsive functionality.

## Visual direction
- Use the selected Carbon & Signal palette: carbon `#101315`, raised surface `#1C2226`, cyan `#19B5C5`, and signal lime `#B9E94E`.
- Use Space Grotesk for headings and DM Sans for interface and body text, with tabular numerals for market/account data.
- Build a disciplined trading-platform aesthetic: compact information hierarchy, crisp borders, restrained effects, low-radius panels, and clear status colors.
- Avoid the discarded concept previews, excessive gradients, glassmorphism, decorative glow, and generic startup styling.

## Implementation
1. Create an original reusable VEXO monogram/wordmark component with compact, full, and inverse-ready variants; use it throughout public pages, account screens, authentication, checkout, dashboard, footer, and mobile navigation.
2. Replace the global theme with centralized semantic VEXO tokens for backgrounds, panels, text, borders, cyan data emphasis, lime actions/success, warning, and error states.
3. Restyle shared navigation, buttons, cards, fields, badges, account cards, page headings, tables, tabs, forms, and mobile controls so all routes inherit one cohesive design system.
4. Refine the home and account-selection experiences around a professional trading-console hierarchy while preserving every existing plan value and rule.
5. Apply the same identity to brokers, How It Works, FAQ, reviews, contact, legal/status, login/signup, checkout, dashboard, orders, profile, security, and support pages.
6. Move the live-support launcher and mock panel into a dedicated reusable module with a clear future integration boundary; do not connect a provider.
7. Replace every visible and metadata reference to QXT with VEXO, including demo order references, legal copy, page titles, Open Graph text, and browser metadata.
8. Create a matching lightweight VEXO favicon from the new brand mark and remove inactive old main-brand assets from frontend usage while retaining third-party broker and payment assets.

## Validation
- Scan all active frontend source and public assets for `QXT`, old logo references, and old gold-theme classes/tokens.
- Verify key public, auth, checkout, dashboard, support, legal, and status flows with mock data only.
- Check desktop, tablet, and mobile layouts, especially navigation, pricing cards, tables, forms, checkout, and live support.
- Confirm build diagnostics are clean and no backend, payment, authentication, email, database, or chat integration was added.
