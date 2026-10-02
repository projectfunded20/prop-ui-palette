import {createFileRoute} from '@tanstack/react-router'
import {Thanks} from '@/components/vexo/public-pages'
export const Route=createFileRoute('/thank-you')({head:()=>({meta:[{title:'Thank You — VEXO FUNDED'},{name:'description',content:'Thank You at VEXO FUNDED.'},{property:'og:title',content:'Thank You — VEXO FUNDED'},{property:'og:description',content:'Explore thank you at VEXO FUNDED.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Thanks})
