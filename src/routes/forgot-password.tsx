import {createFileRoute} from '@tanstack/react-router'
import {Forgot} from '@/components/vexo/auth-pages'
export const Route=createFileRoute('/forgot-password')({head:()=>({meta:[{title:'Reset Password — VEXO FUNDED'},{name:'description',content:'Reset Password securely with VEXO FUNDED.'},{property:'og:title',content:'Reset Password — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED account access.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:Forgot})
