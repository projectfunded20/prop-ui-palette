import {createFileRoute} from '@tanstack/react-router'
import {LegalPage} from '@/components/vexo/legal-status'
export const Route=createFileRoute('/legal/cookies')({head:()=>({meta:[{title:'Cookies Policy — VEXO FUNDED'},{name:'description',content:'Read the VEXO FUNDED Cookies Policy.'},{property:'og:title',content:'Cookies Policy — VEXO FUNDED'},{property:'og:description',content:'Official VEXO FUNDED Cookies Policy.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:()=> <LegalPage kind="cookies"/>})
