# Rebuild VEXO FUNDED from scratch

## Goal
Replace the hand-written application code with a completely new implementation while keeping the current VEXO FUNDED product, branding direction, pages, pricing, account rules, brokers, wallet addresses, and user journeys. Reset the current app data and rebuild the backend schema securely.

## What will stay the same
- VEXO FUNDED name, reusable V mark/logo, dark institutional visual direction, Plus Jakarta Sans and JetBrains Mono typography.
- Instant and Challenge account sizes, prices, profit targets, daily limits, drawdowns, and 92% split.
- Current broker and crypto/network logos.
- Wallet addresses:
  - TRC20: `TNto6htwqih9tuLXn5A1gJy5KHqcKPNTY7`
  - ERC20: `0x3a34eEf262eb473384271BCae800ad064FaCabf4`
  - BEP20: `0x3a34eEf262eb473384271BCae800ad064FaCabf4`
  - Ethereum: `0x3a34eEf262eb473384271BCae800ad064FaCabf4`
  - BTC: `bc1qng02vsgrv68n63alucr24kd8uegsgdh58080gd`
- Existing public pages, auth screens, checkout stages, customer dashboard, orders, profile, security, support tickets, legal pages, responsive layouts, SEO assets, and isolated live-support widget.
- Login required before checkout and dashboard access; orders remain pending and become rejected after one hour until an admin panel exists.

## Rebuild scope
1. **Clean replacement**
   - Remove all current hand-written page, component, styling, data, and app-logic files.
   - Preserve only framework-managed integrations, generated route tree handling, package/tool configuration, and approved media assets needed by the rebuilt app.
   - Create every replacement module from a blank file; no old JSX/CSS/app logic will be retained.

2. **New design system and shared shell**
   - Recreate semantic color, typography, spacing, border, shadow, focus, and responsive tokens from scratch.
   - Rebuild the reusable VEXO logo, buttons, fields, badges, cards, status indicators, dialogs, navigation, footer, cookie prompt, error/empty/loading states, and mobile menus.
   - Keep the established dark institutional character while making the new structure original, polished, and non-template-like.

3. **Public experience**
   - Rebuild Home, Accounts, Brokers, How It Works, FAQ, Reviews, Support, Contact, Thank You, maintenance, 404/500, and all legal pages.
   - Recreate desktop/tablet/mobile account listings with clear Instant/Challenge switching and all exact business values.
   - Preserve working search, FAQ filters/accordions, forms, navigation, cookie controls, and live-support interactions.

4. **Authentication and protected experience**
   - Rebuild email/password signup, login, password reset, and working Google sign-in.
   - Rebuild the protected customer dashboard, orders list/detail, profile, password security, support ticket list/detail/new ticket, and responsive dashboard navigation.
   - Ensure attempted checkout returns the user to the intended step after login.

5. **Checkout and order lifecycle**
   - Rebuild broker selection, coupon/payment selection, and deposit confirmation.
   - Use the exact supplied wallet addresses and validate route/search input so malformed links cannot crash a page.
   - Save orders to the new database, show the created reference immediately, and show a friendly unavailable state for invalid or inaccessible references.

6. **Backend reset and secure rebuild**
   - Remove current application tables and recreate profiles, orders, support tickets, and ticket messages with fresh schema, grants, indexes, validation, and row-level access rules.
   - Reset existing application users and rows as requested, then recreate the new-user profile trigger.
   - Keep users restricted to their own profile, orders, tickets, and messages; no admin panel or public access to customer data.
   - Implement the one-hour rejection rule in durable database state rather than display-only logic, so status is consistent everywhere.

7. **SEO and resilience**
   - Recreate unique metadata for every content route, structured data, favicon, share image references, robots rules, and sitemap.
   - Add route-level validation and stable error boundaries so every URL opens without crashing.
   - Do not introduce payment gateways, admin tools, payout tracking, external live chat, or unrelated features.

## Verification
- Scan the repository to confirm none of the old hand-written frontend/app code remains.
- Validate auth protection, signup/login, checkout, order creation/detail/list, profile editing, password reset, and support tickets.
- Open every public and protected route on desktop and phone sizes; verify navigation, menus, dialogs, forms, overflow, and empty/error states.
- Confirm all wallet addresses, prices, limits, rules, broker labels, and SEO metadata match the retained requirements.
- Confirm the latest build and runtime logs contain no errors before completion.

## Technical details
- Keep TanStack Start file-based routing and let its generated route tree rebuild automatically.
- Keep Lovable-managed Cloud integration files untouched; all new customer data access remains protected by authentication and row-level policies.
- Use one fresh shared content/data module as the source of truth for pricing, rules, brokers, FAQs, and wallet networks.
- Record the new application structure in the project architecture notes and update the roadmap after the rewrite is verified.
