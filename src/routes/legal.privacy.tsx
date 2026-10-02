import {createFileRoute} from '@tanstack/react-router'
import {LegalPage} from '@/components/vexo/legal-status'
export const Route=createFileRoute('/legal/privacy')({head:()=>({meta:[{title:'Privacy Policy — VEXO FUNDED'},{name:'description',content:'Read the VEXO FUNDED Privacy Policy.'},{property:'og:title',content:'Privacy Policy — VEXO FUNDED'},{property:'og:description',content:'Official VEXO FUNDED Privacy Policy.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:()=> <LegalPage kind="privacy"/>})
