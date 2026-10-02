import {createFileRoute} from '@tanstack/react-router'
import {Accounts} from '@/components/vexo/public-pages'
export const Route=createFileRoute('/accounts')({head:()=>({meta:[{title:'Trading Accounts — VEXO FUNDED'},{name:'description',content:'Trading Accounts at VEXO FUNDED.'},{property:'og:title',content:'Trading Accounts — VEXO FUNDED'},{property:'og:description',content:'Explore trading accounts at VEXO FUNDED.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Accounts})
