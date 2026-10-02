import {createFileRoute} from '@tanstack/react-router'
import {Overview} from '@/components/vexo/dashboard-pages'
export const Route=createFileRoute('/_authenticated/dashboard/')({head:()=>({meta:[{title:'Overview — VEXO FUNDED'},{name:'description',content:'Secure VEXO FUNDED customer area.'},{property:'og:title',content:'Overview — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED customer area.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:Overview})
