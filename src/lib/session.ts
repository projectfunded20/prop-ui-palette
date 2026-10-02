import {useEffect,useState} from 'react'
import type {User} from '@supabase/supabase-js'
import {supabase} from '@/integrations/supabase/client'
export function useSession(){const[user,setUser]=useState<User|null>(null);const[ready,setReady]=useState(false);useEffect(()=>{void supabase.auth.getUser().then(({data})=>{setUser(data.user);setReady(true)});const{data}=supabase.auth.onAuthStateChange((_e,s)=>{setUser(s?.user??null);setReady(true)});return()=>data.subscription.unsubscribe()},[]);return{user,ready}}
export const displayName=(user:User|null)=>String(user?.user_metadata?.full_name||user?.email?.split('@')[0]||'Trader')
export const initials=(name:string)=>name.split(/\s+/).slice(0,2).map(v=>v[0]).join('').toUpperCase()
