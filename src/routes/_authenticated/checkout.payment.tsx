import {createFileRoute} from '@tanstack/react-router'
import {PaymentStep} from '@/components/vexo/checkout-pages'
export const Route=createFileRoute('/_authenticated/checkout/payment')({head:()=>({meta:[{title:'Payment — VEXO FUNDED'},{name:'description',content:'Secure VEXO FUNDED customer area.'},{property:'og:title',content:'Payment — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED customer area.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:PaymentStep})
