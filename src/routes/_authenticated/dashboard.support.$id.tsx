import {createFileRoute} from '@tanstack/react-router'
import {SupportDetail} from '@/components/vexo/dashboard-pages'
export const Route=createFileRoute('/_authenticated/dashboard/support/$id')({head:()=>({meta:[{title:'Support Detail — VEXO FUNDED'},{name:'description',content:'Secure VEXO FUNDED customer area.'},{property:'og:title',content:'Support Detail — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED customer area.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:SupportDetail})
