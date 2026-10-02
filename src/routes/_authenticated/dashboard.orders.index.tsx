import {createFileRoute} from '@tanstack/react-router'
import {Orders} from '@/components/vexo/dashboard-pages'
export const Route=createFileRoute('/_authenticated/dashboard/orders/')({head:()=>({meta:[{title:'Orders — VEXO FUNDED'},{name:'description',content:'Secure VEXO FUNDED customer area.'},{property:'og:title',content:'Orders — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED customer area.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:Orders})
