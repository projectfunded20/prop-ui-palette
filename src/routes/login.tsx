import { createFileRoute } from '@tanstack/react-router'
import { Login } from '@/components/vexo/auth-pages'

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } =>
    typeof search['redirect'] === 'string' ? { redirect: search['redirect'] } : {},
  head: () => ({
    meta: [
      { title: 'Sign In — VEXO FUNDED' },
      { name: 'description', content: 'Sign in to your VEXO FUNDED client area to track orders, accounts and support tickets.' },
      { property: 'og:title', content: 'Sign In — VEXO FUNDED' },
      { property: 'og:description', content: 'Sign in to your VEXO FUNDED client area to track orders, accounts and support tickets.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Login,
})
