import {createFileRoute} from '@tanstack/react-router'
import {Home} from '@/components/vexo/public-pages'
export const Route=createFileRoute('/')({head:()=>({meta:[{title:'Home — VEXO FUNDED'},{name:'description',content:'Home at VEXO FUNDED.'},{property:'og:title',content:'Home — VEXO FUNDED'},{property:'og:description',content:'Explore home at VEXO FUNDED.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Home})
