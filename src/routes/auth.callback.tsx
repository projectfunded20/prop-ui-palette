import {createFileRoute} from '@tanstack/react-router'
import {AuthCallback} from '@/components/vexo/auth-pages'

export const Route=createFileRoute('/auth/callback')({
  head:()=>({meta:[{title:'Completing Sign In — VEXO FUNDED'},{name:'description',content:'Completing your secure VEXO FUNDED sign in.'},{property:'og:title',content:'Completing Sign In — VEXO FUNDED'},{property:'og:description',content:'Completing your secure VEXO FUNDED sign in.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
  component:AuthCallback,
})