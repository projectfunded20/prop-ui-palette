import {createFileRoute} from '@tanstack/react-router'
import {DashboardLayout} from '@/components/vexo/layouts'
export const Route=createFileRoute('/_authenticated/dashboard')({head:()=>({meta:[{title:'DashboardLayout — VEXO FUNDED'},{name:'description',content:'Secure VEXO FUNDED customer area.'},{property:'og:title',content:'DashboardLayout — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED customer area.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:DashboardLayout})
