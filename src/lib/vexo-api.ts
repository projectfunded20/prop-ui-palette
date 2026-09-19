import { supabase } from '@/integrations/supabase/client'

export type OrderStatus = 'pending' | 'processing' | 'waiting_callback' | 'completed' | 'rejected'

export type OrderRow = {
  id: string
  reference: string
  account_type: 'instant' | 'challenge'
  account_size: number
  price: number | string
  broker: string
  payment_method: string
  coupon: string | null
  status: string
  decision_at: string
  created_at: string
}

/**
 * Review outcome for an order. Until an admin panel exists, every submitted
 * order is automatically declined one hour after it was placed.
 */
export function effectiveStatus(order: Pick<OrderRow, 'status' | 'decision_at'>): OrderStatus {
  if (order.status === 'pending' && Date.parse(order.decision_at) <= Date.now()) return 'rejected'
  return order.status as OrderStatus
}

export function reviewCountdown(order: Pick<OrderRow, 'status' | 'decision_at'>): string | null {
  if (effectiveStatus(order) !== 'pending') return null
  const ms = Date.parse(order.decision_at) - Date.now()
  const minutes = Math.max(0, Math.round(ms / 60000))
  return minutes >= 60 ? '60 min' : `${minutes} min`
}

export const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

export const shortTime = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })

export async function fetchOrders(): Promise<OrderRow[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('id,reference,account_type,account_size,price,broker,payment_method,coupon,status,decision_at,created_at')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as OrderRow[]
}

export async function fetchOrder(reference: string): Promise<OrderRow | null> {
  const { data, error } = await supabase
    .from('orders')
    .select('id,reference,account_type,account_size,price,broker,payment_method,coupon,status,decision_at,created_at')
    .eq('reference', reference)
    .maybeSingle()
  if (error) throw error
  return (data as OrderRow | null) ?? null
}

export async function createOrder(input: {
  account_type: 'instant' | 'challenge'
  account_size: number
  price: number
  broker: string
  payment_method: string
  coupon?: string | null
}): Promise<OrderRow> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) throw new Error('You need to be signed in to place an order.')
  const { data, error } = await supabase
    .from('orders')
    .insert({ ...input, coupon: input.coupon ?? null, user_id: auth.user.id })
    .select('id,reference,account_type,account_size,price,broker,payment_method,coupon,status,decision_at,created_at')
    .single()
  if (error) throw error
  return data as OrderRow
}

export type TicketRow = {
  id: string
  reference: string
  subject: string
  category: string
  priority: string
  status: string
  created_at: string
  updated_at: string
}

export type MessageRow = { id: string; author: string; body: string; created_at: string }

export async function fetchTickets(): Promise<TicketRow[]> {
  const { data, error } = await supabase
    .from('support_tickets')
    .select('id,reference,subject,category,priority,status,created_at,updated_at')
    .order('updated_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as TicketRow[]
}

export async function fetchTicket(reference: string) {
  const { data, error } = await supabase
    .from('support_tickets')
    .select('id,reference,subject,category,priority,status,created_at,updated_at')
    .eq('reference', reference)
    .maybeSingle()
  if (error) throw error
  if (!data) return null
  const ticket = data as TicketRow
  const { data: msgs, error: msgError } = await supabase
    .from('ticket_messages')
    .select('id,author,body,created_at')
    .eq('ticket_id', ticket.id)
    .order('created_at', { ascending: true })
  if (msgError) throw msgError
  return { ticket, messages: (msgs ?? []) as MessageRow[] }
}

export async function createTicket(input: { subject: string; category: string; priority: string; body: string }) {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) throw new Error('You need to be signed in to open a ticket.')
  const { data, error } = await supabase
    .from('support_tickets')
    .insert({ user_id: auth.user.id, subject: input.subject, category: input.category, priority: input.priority })
    .select('id,reference')
    .single()
  if (error) throw error
  const { error: msgError } = await supabase
    .from('ticket_messages')
    .insert({ ticket_id: data.id, user_id: auth.user.id, author: 'user', body: input.body })
  if (msgError) throw msgError
  return data as { id: string; reference: string }
}

export async function replyToTicket(ticketId: string, body: string) {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) throw new Error('You need to be signed in to reply.')
  const { error } = await supabase
    .from('ticket_messages')
    .insert({ ticket_id: ticketId, user_id: auth.user.id, author: 'user', body })
  if (error) throw error
  await supabase.from('support_tickets').update({ updated_at: new Date().toISOString() }).eq('id', ticketId)
}

export type ProfileRow = { id: string; full_name: string | null; email: string | null; phone: string | null; country: string | null; created_at: string }

export async function fetchProfile(): Promise<ProfileRow | null> {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return null
  const { data, error } = await supabase
    .from('profiles')
    .select('id,full_name,email,phone,country,created_at')
    .eq('id', auth.user.id)
    .maybeSingle()
  if (error) throw error
  return (data as ProfileRow | null) ?? null
}

export async function updateProfile(input: { full_name: string; phone: string; country: string }) {
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) throw new Error('Not signed in.')
  const { error } = await supabase
    .from('profiles')
    .upsert({ id: auth.user.id, email: auth.user.email ?? null, ...input, updated_at: new Date().toISOString() })
  if (error) throw error
}
