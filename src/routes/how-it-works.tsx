import {createFileRoute} from '@tanstack/react-router'
import {How} from '@/components/vexo/public-pages'
export const Route=createFileRoute('/how-it-works')({head:()=>({meta:[{title:'How It Works — VEXO FUNDED'},{name:'description',content:'How It Works at VEXO FUNDED.'},{property:'og:title',content:'How It Works — VEXO FUNDED'},{property:'og:description',content:'Explore how it works at VEXO FUNDED.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:How})
