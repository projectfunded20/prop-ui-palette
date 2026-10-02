import {useEffect,useRef} from 'react'
import {MessageCircle} from 'lucide-react'
import {Button} from './ui'

type TawkApi={
  onLoad?:()=>void
  onChatMinimized?:()=>void
  hideWidget?:()=>void
  showWidget?:()=>void
  maximize?:()=>void
}

declare global {
  interface Window {
    Tawk_API?:TawkApi
    Tawk_LoadStart?:Date
  }
}

const TAWK_SCRIPT_ID='vexo-tawk-chat'
const TAWK_SCRIPT_URL='https://embed.tawk.to/6abec63f94972634491fef03/1k3sjcqp6'

export function LiveSupport(){
  const pendingOpen=useRef(false)

  useEffect(()=>{
    const api=window.Tawk_API??{}
    window.Tawk_API=api
    window.Tawk_LoadStart=window.Tawk_LoadStart??new Date()

    const hideLauncher=()=>api.hideWidget?.()
    api.onLoad=()=>{
      hideLauncher()
      if(pendingOpen.current){
        pendingOpen.current=false
        api.showWidget?.()
        api.maximize?.()
      }
    }
    api.onChatMinimized=hideLauncher

    if(api.hideWidget)hideLauncher()
    if(!document.getElementById(TAWK_SCRIPT_ID)){
      const script=document.createElement('script')
      script.id=TAWK_SCRIPT_ID
      script.async=true
      script.src=TAWK_SCRIPT_URL
      script.charset='UTF-8'
      script.crossOrigin='anonymous'
      document.head.appendChild(script)
    }

    return()=>{
      pendingOpen.current=false
    }
  },[])

  const openChat=()=>{
    const api=window.Tawk_API
    if(api?.maximize){
      api.showWidget?.()
      api.maximize()
      return
    }
    pendingOpen.current=true
  }

  return <div className="fixed bottom-4 right-4 z-50"><Button aria-label="Open live support" onClick={openChat} className="shadow-modal"><MessageCircle size={18}/><span className="hidden sm:inline">Live support</span></Button></div>
}
