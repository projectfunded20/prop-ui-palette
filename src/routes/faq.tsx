import {createFileRoute} from '@tanstack/react-router'
import {FAQ} from '@/components/vexo/public-pages'
export const Route=createFileRoute('/faq')({head:()=>({meta:[{title:'Frequently Asked Questions — VEXO FUNDED'},{name:'description',content:'Frequently Asked Questions at VEXO FUNDED.'},{property:'og:title',content:'Frequently Asked Questions — VEXO FUNDED'},{property:'og:description',content:'Explore frequently asked questions at VEXO FUNDED.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:FAQ})
