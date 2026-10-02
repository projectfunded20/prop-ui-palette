import {createFileRoute} from '@tanstack/react-router'
import {StatusPage} from '@/components/vexo/legal-status'
export const Route=createFileRoute('/maintenance')({head:()=>({meta:[{title:'Maintenance — VEXO FUNDED'},{name:'description',content:'VEXO FUNDED service status.'},{property:'og:title',content:'Maintenance — VEXO FUNDED'},{property:'og:description',content:'VEXO FUNDED service status.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:()=> <StatusPage kind="maintenance"/>})
