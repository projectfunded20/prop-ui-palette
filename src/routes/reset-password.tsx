import {createFileRoute} from '@tanstack/react-router'
import {ResetPassword} from '@/components/vexo/auth-pages'
export const Route=createFileRoute('/reset-password')({head:()=>({meta:[{title:'Choose New Password — VEXO FUNDED'},{name:'description',content:'Choose New Password securely with VEXO FUNDED.'},{property:'og:title',content:'Choose New Password — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED account access.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:ResetPassword})
