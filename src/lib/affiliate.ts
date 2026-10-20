import {supabase} from '@/integrations/supabase/client'
export const PURCHASES_PER_REWARD=3
export const REWARD_LABEL='$5,000 Instant account'
export function rewardProgress(successful:number){const s=Math.max(0,Math.floor(successful));return{earned:Math.floor(s/PURCHASES_PER_REWARD),towardNext:s%PURCHASES_PER_REWARD,remaining:PURCHASES_PER_REWARD-(s%PURCHASES_PER_REWARD)}}
export type Referral={referral_name:string;joined_at:string;purchases:number;successful_purchases:number}
export async function fetchAffiliate(){const{data:auth}=await supabase.auth.getUser();if(!auth.user)throw new Error('Not signed in.');const[{data:p,error:e1},{data:r,error:e2}]=await Promise.all([supabase.from('profiles').select('referral_code').eq('id',auth.user.id).maybeSingle(),supabase.rpc('my_affiliate_referrals')]);if(e1)throw e1;if(e2)throw e2;return{code:(p?.referral_code as string|null)??null,referrals:(r??[]) as Referral[]}}
