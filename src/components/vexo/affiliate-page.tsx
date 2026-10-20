import {useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {Check,Copy,Gift,Loader2,ShoppingBag,UserPlus} from 'lucide-react'
import {Button,Card} from './ui'
import {fetchAffiliate,PURCHASES_PER_REWARD,REWARD_LABEL,rewardProgress} from '@/lib/affiliate'
import {shortDate} from '@/lib/vexo-api'
export function Affiliate(){
  const q=useQuery({queryKey:['affiliate'],queryFn:fetchAffiliate})
  const[copied,setCopied]=useState(false)
  if(q.isLoading)return <div className="flex items-center gap-2 rounded-lg border border-line bg-card p-5 text-sm text-muted"><Loader2 size={16} className="animate-spin text-brand"/>Loading…</div>
  if(q.error||!q.data)return <Card className="p-8 text-center text-sm text-muted">Affiliate details could not be loaded. Please refresh.</Card>
  const{code,referrals}=q.data
  const link=code&&typeof window!=='undefined'?`${window.location.origin}/signup?ref=${code}`:''
  const successful=referrals.reduce((a,r)=>a+r.successful_purchases,0)
  const purchases=referrals.reduce((a,r)=>a+r.purchases,0)
  const prog=rewardProgress(successful)
  const copy=async()=>{if(!link)return;await navigator.clipboard.writeText(link);setCopied(true);setTimeout(()=>setCopied(false),1800)}
  return <div className="space-y-7">
    <div><h1 className="font-display text-3xl font-bold">Affiliate program</h1><p className="mt-1 text-muted">Share your link. For every {PURCHASES_PER_REWARD} successful purchases, you receive one funded {REWARD_LABEL}.</p></div>
    <Card className="p-6"><h2 className="font-bold">Your referral link</h2><div className="mt-4 flex flex-col gap-3 sm:flex-row"><input readOnly value={link} className="min-w-0 flex-1 rounded-md border border-line bg-ink px-4 py-2.5 font-mono text-sm text-copy"/><Button onClick={copy} type="button">{copied?<Check size={16}/>:<Copy size={16}/>}{copied?'Copied':'Copy link'}</Button></div><p className="mt-3 text-xs text-dim">Referral code: <span className="font-mono text-brand">{code}</span></p></Card>
    <div className="grid gap-4 sm:grid-cols-3">{([[UserPlus,'Registered',referrals.length],[ShoppingBag,'Purchases',purchases],[Gift,'Accounts earned',prog.earned]] as const).map(([I,l,v])=><Card className="p-5" key={l}><div className="flex justify-between text-muted"><span className="text-xs font-bold uppercase">{l}</span><I size={17} className="text-brand"/></div><p className="num mt-3 text-3xl font-bold">{v}</p></Card>)}</div>
    <Card className="p-6"><div className="flex flex-wrap items-end justify-between gap-2"><h2 className="font-bold">Next reward</h2><span className="text-sm text-muted">{prog.towardNext}/{PURCHASES_PER_REWARD} successful purchases</span></div><div className="mt-4 grid grid-cols-3 gap-2">{Array.from({length:PURCHASES_PER_REWARD}).map((_,i)=><div key={i} className={i<prog.towardNext?'h-2 rounded-full bg-brand':'h-2 rounded-full bg-soft'}/>)}</div><p className="mt-3 text-sm text-muted">{prog.remaining} more successful {prog.remaining===1?'purchase':'purchases'} to unlock a {REWARD_LABEL}. A purchase counts once the desk approves the order.</p></Card>
    <Card className="p-6"><h2 className="font-bold">Your referrals</h2>{referrals.length?<div className="mt-5 overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><thead className="border-b border-line text-xs uppercase text-dim"><tr><th className="py-3">Trader</th><th>Joined</th><th>Purchases</th><th>Successful</th></tr></thead><tbody>{referrals.map((r,i)=><tr key={i} className="border-b border-line"><td className="py-4">{r.referral_name}</td><td className="text-muted">{shortDate(r.joined_at)}</td><td>{r.purchases}</td><td className="text-brand">{r.successful_purchases}</td></tr>)}</tbody></table></div>:<p className="mt-4 text-sm text-muted">No one has registered with your link yet.</p>}</Card>
  </div>
}
