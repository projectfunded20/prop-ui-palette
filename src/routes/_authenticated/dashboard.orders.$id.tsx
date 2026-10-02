import {createFileRoute} from '@tanstack/react-router'
import {OrderDetail} from '@/components/vexo/dashboard-pages'
export const Route=createFileRoute('/_authenticated/dashboard/orders/$id')({head:()=>({meta:[{title:'Order Detail — VEXO FUNDED'},{name:'description',content:'Secure VEXO FUNDED customer area.'},{property:'og:title',content:'Order Detail — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED customer area.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:OrderDetail})
