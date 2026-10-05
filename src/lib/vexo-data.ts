import pocket from '@/assets/broker-pocketoption.png'
import quotex from '@/assets/broker-quotex.png'
import binomo from '@/assets/broker-binomo.png'
import olymp from '@/assets/broker-olymptrade.png'
import tradowix from '@/assets/broker-tradowix.jpg'
import xprime from '@/assets/broker-xprime.png.asset.json'
import btc from '@/assets/crypto-btc.png'
import eth from '@/assets/crypto-eth.png'
import usdt from '@/assets/crypto-usdt.png'

export type Plan = { type:'instant'|'challenge'; size:number; price:number; dailyLoss:number; split:number; profitTarget?:number; drawdown?:number; popular?:boolean }
export const instantPlans:Plan[] = [
  {type:'instant',size:3000,price:70,dailyLoss:700,split:92},{type:'instant',size:5000,price:116,dailyLoss:1167,split:92},{type:'instant',size:8000,price:186,dailyLoss:1867,split:92},{type:'instant',size:11000,price:256,dailyLoss:2567,split:92},{type:'instant',size:15000,price:349,dailyLoss:3500,split:92},{type:'instant',size:20000,price:466,dailyLoss:4667,split:92,popular:true},{type:'instant',size:25000,price:582,dailyLoss:5833,split:92},{type:'instant',size:35000,price:815,dailyLoss:8167,split:92},{type:'instant',size:50000,price:1165,dailyLoss:11667,split:92},
]
export const challengePlans:Plan[] = [
  {type:'challenge',size:3000,price:48,profitTarget:1200,dailyLoss:900,drawdown:2000,split:92},{type:'challenge',size:5000,price:81,profitTarget:2000,dailyLoss:1500,drawdown:3333,split:92},{type:'challenge',size:8000,price:129,profitTarget:3200,dailyLoss:2400,drawdown:5333,split:92,popular:true},{type:'challenge',size:11000,price:178,profitTarget:4400,dailyLoss:3300,drawdown:7333,split:92},{type:'challenge',size:25000,price:311,profitTarget:10000,dailyLoss:7500,drawdown:16667,split:92},{type:'challenge',size:50000,price:484,profitTarget:20000,dailyLoss:15000,drawdown:33333,split:92},
]
export const brokers = [
  {name:'Pocket Option',logo:pocket,note:'Fast execution, wide instrument range'},{name:'Quotex',logo:quotex,note:'Low-latency order routing'},{name:'Binomo',logo:binomo,note:'Clean charting, mobile-first'},{name:'Olymp Trade',logo:olymp,note:'Established platform, deep liquidity'},{name:'Tradowix',logo:tradowix,note:'Institutional grade speed, high reliability'},
]
export const crypto = [
  {id:'USDT ERC20',network:'Ethereum Network (ERC-20)',logo:usdt,address:'0x3a34eEf262eb473384271BCae800ad064FaCabf4'},
  {id:'USDT TRC20',network:'TRON Network (TRC-20)',logo:usdt,address:'TNto6htwqih9tuLXn5A1gJy5KHqcKPNTY7'},
  {id:'USDT BEP20',network:'BNB Smart Chain (BEP-20)',logo:usdt,address:'0x3a34eEf262eb473384271BCae800ad064FaCabf4'},
  {id:'Bitcoin',network:'Bitcoin Mainnet',logo:btc,address:'bc1qng02vsgrv68n63alucr24kd8uegsgdh58080gd'},
  {id:'Ethereum',network:'Ethereum Mainnet',logo:eth,address:'0x3a34eEf262eb473384271BCae800ad064FaCabf4'},
]
export const howItWorks = [
  ['Choose your account','Pick Instant funding for immediate access, or take the lower-cost Challenge path.'],['Trade within the rules','Work toward your objective while respecting the daily loss and drawdown limits.'],['Complete verification','We review your trading history against the published account rules.'],['Receive funding','Qualified traders receive account access and retain up to 92% of eligible payouts.'],
]
export const faqs = [
  ['Accounts','How do I receive my account confirmation?','After payment is confirmed, credentials are sent to your account email and the order status updates in your dashboard.'],['Challenge','What rules apply to Challenge accounts?','Each plan lists its profit target, daily loss limit and maximum drawdown. All three conditions remain active during evaluation.'],['Risk Rules','How does the Daily Loss Limit work?','The Daily Loss Limit resets at the platform server day. Open and closed losses both count toward it.'],['Brokers','Which brokers are supported?','Accounts currently support Pocket Option, Quotex, Binomo, Olymp Trade and Tradowix.'],['Payouts','How are payouts handled?','Eligible funded traders can request payouts on the available cycle. Approved requests are normally processed within 24–48 hours.'],['Accounts','Can I scale to a larger account?','Yes. Scaling eligibility is based on consistency and payout history for the current tier.'],
]
export const reviews = [
  ['Mohammed K.','UAE','Dashboard is clean and payouts are reliable. Best prop firm experience I’ve had.'],['Sarah P.','UK','Passed my evaluation in two weeks and got funded. The 92% split is real, no hidden fees.'],['Ahmed L.','Pakistan','Payments are fast and secure. Highly recommend VEXO FUNDED for serious traders.'],['James R.','USA','Tracking drawdown and targets live made a real difference. Professional setup.'],
]
export const money = (value:number) => `$${value.toLocaleString('en-US')}`
export function resolvePlan(key?:string){const [kind,size] = String(key ?? 'instant-20000').split('-'); const list=kind==='challenge'?challengePlans:instantPlans; return list.find((p)=>p.size===Number(size)) ?? instantPlans[5]}
