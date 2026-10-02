import {createFileRoute} from '@tanstack/react-router'
import {LegalPage} from '@/components/vexo/legal-status'
export const Route=createFileRoute('/legal/refund')({head:()=>({meta:[{title:'Refund Policy — VEXO FUNDED'},{name:'description',content:'Read the VEXO FUNDED Refund Policy.'},{property:'og:title',content:'Refund Policy — VEXO FUNDED'},{property:'og:description',content:'Official VEXO FUNDED Refund Policy.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:()=> <LegalPage kind="refund"/>})
