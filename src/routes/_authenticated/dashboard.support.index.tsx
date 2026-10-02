import {createFileRoute} from '@tanstack/react-router'
import {SupportList} from '@/components/vexo/dashboard-pages'
export const Route=createFileRoute('/_authenticated/dashboard/support/')({head:()=>({meta:[{title:'Support — VEXO FUNDED'},{name:'description',content:'Secure VEXO FUNDED customer area.'},{property:'og:title',content:'Support — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED customer area.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:SupportList})
