import {createFileRoute} from '@tanstack/react-router'
import {BrokerStep} from '@/components/vexo/checkout-pages'
export const Route=createFileRoute('/_authenticated/checkout/details')({head:()=>({meta:[{title:'Broker — VEXO FUNDED'},{name:'description',content:'Secure VEXO FUNDED customer area.'},{property:'og:title',content:'Broker — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED customer area.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:BrokerStep})
