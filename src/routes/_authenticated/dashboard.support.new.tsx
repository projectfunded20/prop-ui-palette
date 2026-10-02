import {createFileRoute} from '@tanstack/react-router'
import {SupportNew} from '@/components/vexo/dashboard-pages'
export const Route=createFileRoute('/_authenticated/dashboard/support/new')({head:()=>({meta:[{title:'New Ticket — VEXO FUNDED'},{name:'description',content:'Secure VEXO FUNDED customer area.'},{property:'og:title',content:'New Ticket — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED customer area.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:SupportNew})
