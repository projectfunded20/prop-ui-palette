import {createFileRoute} from '@tanstack/react-router'
import {Contact} from '@/components/vexo/public-pages'
export const Route=createFileRoute('/contact')({head:()=>({meta:[{title:'Contact — VEXO FUNDED'},{name:'description',content:'Contact at VEXO FUNDED.'},{property:'og:title',content:'Contact — VEXO FUNDED'},{property:'og:description',content:'Explore contact at VEXO FUNDED.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Contact})
