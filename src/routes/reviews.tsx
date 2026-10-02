import {createFileRoute} from '@tanstack/react-router'
import {Reviews} from '@/components/vexo/public-pages'
export const Route=createFileRoute('/reviews')({head:()=>({meta:[{title:'Trader Reviews — VEXO FUNDED'},{name:'description',content:'Trader Reviews at VEXO FUNDED.'},{property:'og:title',content:'Trader Reviews — VEXO FUNDED'},{property:'og:description',content:'Explore trader reviews at VEXO FUNDED.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Reviews})
