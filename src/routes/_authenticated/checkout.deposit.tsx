import {createFileRoute} from '@tanstack/react-router'
import {DepositStep} from '@/components/vexo/checkout-pages'
export const Route=createFileRoute('/_authenticated/checkout/deposit')({head:()=>({meta:[{title:'Deposit — VEXO FUNDED'},{name:'description',content:'Secure VEXO FUNDED customer area.'},{property:'og:title',content:'Deposit — VEXO FUNDED'},{property:'og:description',content:'Secure VEXO FUNDED customer area.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:DepositStep})
