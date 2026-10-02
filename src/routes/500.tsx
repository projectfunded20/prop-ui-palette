import {createFileRoute} from '@tanstack/react-router'
import {StatusPage} from '@/components/vexo/legal-status'
export const Route=createFileRoute('/500')({head:()=>({meta:[{title:'Server Status — VEXO FUNDED'},{name:'description',content:'VEXO FUNDED service status.'},{property:'og:title',content:'Server Status — VEXO FUNDED'},{property:'og:description',content:'VEXO FUNDED service status.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:()=> <StatusPage kind="500"/>})
