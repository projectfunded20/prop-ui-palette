import {createFileRoute} from '@tanstack/react-router'
import {Profile} from '@/components/vexo/dashboard-pages'
export const Route=createFileRoute('/_authenticated/dashboard/profile')({head:()=>({meta:[{title:'Profile — VEXO FUNDED'},{name:'description',content:'Secure VEXO FUNDED customer area.'},{property:'og:title',content:'Profile — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED customer area.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:Profile})
