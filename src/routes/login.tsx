import {createFileRoute} from '@tanstack/react-router'
import {Login} from '@/components/vexo/auth-pages'
export const Route=createFileRoute('/login')({head:()=>({meta:[{title:'Sign In — VEXO FUNDED'},{name:'description',content:'Sign In securely with VEXO FUNDED.'},{property:'og:title',content:'Sign In — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED account access.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:Login})
