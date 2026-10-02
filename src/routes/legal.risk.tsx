import {createFileRoute} from '@tanstack/react-router'
import {LegalPage} from '@/components/vexo/legal-status'
export const Route=createFileRoute('/legal/risk')({head:()=>({meta:[{title:'Risk Disclosure — VEXO FUNDED'},{name:'description',content:'Read the VEXO FUNDED Risk Disclosure.'},{property:'og:title',content:'Risk Disclosure — VEXO FUNDED'},{property:'og:description',content:'Official VEXO FUNDED Risk Disclosure.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:()=> <LegalPage kind="risk"/>})
