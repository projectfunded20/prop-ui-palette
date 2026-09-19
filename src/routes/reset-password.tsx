import { createFileRoute } from '@tanstack/react-router'
import { ResetPassword } from '@/components/vexo/auth-pages'

export const Route = createFileRoute('/reset-password')({
  ssr: false,
  head: () => ({
    meta: [
      { title: 'Set a New Password — VEXO FUNDED' },
      { name: 'description', content: 'Choose a new password for your VEXO FUNDED account.' },
      { property: 'og:title', content: 'Set a New Password — VEXO FUNDED' },
      { property: 'og:description', content: 'Choose a new password for your VEXO FUNDED account.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: ResetPassword,
})
