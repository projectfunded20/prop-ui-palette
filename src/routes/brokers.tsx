import {createFileRoute} from '@tanstack/react-router'
import {Brokers} from '@/components/vexo/public-pages'
export const Route=createFileRoute('/brokers')({head:()=>({meta:[{title:'Broker Partners — VEXO FUNDED'},{name:'description',content:'Broker Partners at VEXO FUNDED.'},{property:'og:title',content:'Broker Partners — VEXO FUNDED'},{property:'og:description',content:'Explore broker partners at VEXO FUNDED.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Brokers})
