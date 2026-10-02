import {createFileRoute} from '@tanstack/react-router'
import {Support} from '@/components/vexo/public-pages'
export const Route=createFileRoute('/support')({head:()=>({meta:[{title:'Support — VEXO FUNDED'},{name:'description',content:'Support at VEXO FUNDED.'},{property:'og:title',content:'Support — VEXO FUNDED'},{property:'og:description',content:'Explore support at VEXO FUNDED.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Support})
