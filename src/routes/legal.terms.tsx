import {createFileRoute} from '@tanstack/react-router'
import {LegalPage} from '@/components/vexo/legal-status'
export const Route=createFileRoute('/legal/terms')({head:()=>({meta:[{title:'Terms & Agreement — VEXO FUNDED'},{name:'description',content:'Read the VEXO FUNDED Terms & Agreement.'},{property:'og:title',content:'Terms & Agreement — VEXO FUNDED'},{property:'og:description',content:'Official VEXO FUNDED Terms & Agreement.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:()=> <LegalPage kind="terms"/>})
