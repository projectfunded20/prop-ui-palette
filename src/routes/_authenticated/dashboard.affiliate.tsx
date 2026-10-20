import {createFileRoute} from '@tanstack/react-router'
import {Affiliate} from '@/components/vexo/affiliate-page'
export const Route=createFileRoute('/_authenticated/dashboard/affiliate')({head:()=>({meta:[{title:'Affiliate Program — VEXO FUNDED'},{name:'description',content:'Your VEXO FUNDED referral link and rewards.'},{property:'og:title',content:'Affiliate Program — VEXO FUNDED'},{property:'og:description',content:'Your VEXO FUNDED referral link and rewards.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),component:Affiliate})
