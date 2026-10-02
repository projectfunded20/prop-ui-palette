import {createFileRoute} from '@tanstack/react-router'
import {Security} from '@/components/vexo/dashboard-pages'
export const Route=createFileRoute('/_authenticated/dashboard/security')({head:()=>({meta:[{title:'Security — VEXO FUNDED'},{name:'description',content:'Secure VEXO FUNDED customer area.'},{property:'og:title',content:'Security — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED customer area.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:Security})
