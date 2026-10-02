import {createFileRoute} from '@tanstack/react-router'
import {Signup} from '@/components/vexo/auth-pages'
export const Route=createFileRoute('/signup')({head:()=>({meta:[{title:'Create Account — VEXO FUNDED'},{name:'description',content:'Create Account securely with VEXO FUNDED.'},{property:'og:title',content:'Create Account — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED account access.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:Signup})
