import { Headphones, Send, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui'

export type LiveSupportAdapter = {
  onOpen?: () => void
  onSend?: (message: string) => void
}

export function LiveSupport({ adapter }: { adapter?: LiveSupportAdapter }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const show = () => {
    setOpen(true)
    adapter?.onOpen?.()
  }

  const send = () => {
    const next = message.trim()
    if (!next) return
    adapter?.onSend?.(next)
    setMessage('')
    setOpen(false)
  }

  return <>
    <button onClick={show} aria-label="Open live support" className="support-launcher fixed bottom-5 right-5 z-40 flex h-12 items-center gap-3 rounded-md border border-brand/40 bg-panel px-3 shadow-panel transition hover:border-brand hover:bg-panel-raised sm:px-4">
      <span className="relative grid h-7 w-7 place-items-center rounded-sm bg-action text-action-foreground"><Headphones size={15}/><i className="absolute -right-1 -top-1 h-2 w-2 rounded-full border border-panel bg-success"/></span>
      <span className="hidden text-left sm:block"><strong className="block text-xs font-semibold text-bright">Live support</strong><small className="block text-[10px] text-muted">Operations online</small></span>
    </button>
    {open&&<div className="fixed inset-0 z-50 flex items-end justify-center bg-overlay p-3 sm:items-center" onClick={()=>setOpen(false)}>
      <section role="dialog" aria-modal="true" aria-label="Live support" className="w-full max-w-md overflow-hidden rounded-md border border-line-strong bg-panel shadow-modal" onClick={event=>event.stopPropagation()}>
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-sm bg-action text-action-foreground"><Headphones size={17}/></span><div><h2 className="font-display text-base font-semibold">VEXO Support Desk</h2><p className="text-xs text-success">Online · typical reply under 5 min</p></div></div>
          <button aria-label="Close live support" onClick={()=>setOpen(false)} className="rounded-sm p-2 text-muted transition hover:bg-soft hover:text-bright"><X size={18}/></button>
        </header>
        <div className="space-y-4 p-5"><div className="max-w-[88%] rounded-sm border border-line bg-surface p-3 text-sm text-copy">Welcome to the VEXO support preview. How can our operations team help?</div><label className="block"><span className="mb-2 block text-xs font-medium uppercase text-muted">Message</span><textarea value={message} onChange={event=>setMessage(event.target.value)} className="h-28 w-full resize-none rounded-sm border border-line bg-background p-3 text-sm outline-none transition focus:border-brand" placeholder="Type your message…"/></label><Button className="w-full" onClick={send}>Send message <Send size={15}/></Button><p className="text-center text-[10px] text-dim">Preview only · provider integration ready</p></div>
      </section>
    </div>}
  </>
}
