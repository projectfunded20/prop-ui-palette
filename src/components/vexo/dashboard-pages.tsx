import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Circle, Clock, Download, LifeBuoy, ListOrdered, Loader2, Paperclip, ShieldCheck, TrendingUp, XCircle } from 'lucide-react'
import { Badge, Button, Card, Field, Status, cn } from './ui'
import { money } from '@/lib/vexo-data'
import {
  createTicket, effectiveStatus, fetchOrder, fetchOrders, fetchProfile, fetchTicket, fetchTickets,
  replyToTicket, reviewCountdown, shortDate, shortTime, updateProfile, type OrderRow,
} from '@/lib/vexo-api'
import { initialsOf, nameOf, useSession } from '@/lib/session'

function Loading({ label = 'Loading' }: { label?: string }) {
  return <div className="flex items-center gap-3 rounded-md border border-line bg-card p-6 text-sm text-muted"><Loader2 className="animate-spin text-brand" size={16} />{label}…</div>
}

function Empty({ title, body, action }: { title: string; body: string; action?: { to: string; label: string } }) {
  return (
    <Card hover={false} className="p-8 text-center">
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{body}</p>
      {action && <Button to={action.to} className="mt-5">{action.label}</Button>}
    </Card>
  )
}

export function Overview() {
  const { user } = useSession()
  const orders = useQuery({ queryKey: ['orders'], queryFn: fetchOrders })
  const tickets = useQuery({ queryKey: ['tickets'], queryFn: fetchTickets })
  const rows = orders.data ?? []
  const live = rows.filter((o) => effectiveStatus(o) === 'completed').length
  const openTickets = (tickets.data ?? []).filter((t) => t.status !== 'closed').length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">{nameOf(user)}</h1>
        <p className="mt-1 text-sm text-muted">Your accounts, orders and desk activity in one place.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {([[TrendingUp, 'Live accounts', String(live)], [ListOrdered, 'Orders placed', String(rows.length)], [LifeBuoy, 'Open tickets', String(openTickets)]] as const).map(([Icon, label, value]) => (
          <Card key={label} hover={false} className="p-5">
            <div className="flex justify-between"><span className="text-xs uppercase text-muted kicker">{label}</span><Icon className="text-brand" size={16} /></div>
            <p className="num mt-3 text-2xl font-bold">{value}</p>
          </Card>
        ))}
      </div>
      <Card hover={false} className="p-6">
        <div className="flex justify-between">
          <h2 className="font-display text-lg font-semibold">Latest orders</h2>
          <Button to="/dashboard/orders" variant="ghost" size="sm">All orders <ArrowRight size={14} /></Button>
        </div>
        {orders.isLoading ? <div className="mt-5"><Loading label="Fetching your orders" /></div>
          : rows.length === 0 ? <p className="mt-5 text-sm text-muted">Nothing here yet. Pick an account size and your first order will show up in this table.</p>
          : <OrdersTable rows={rows.slice(0, 4)} />}
      </Card>
      <Card hover={false} className="flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h3 className="font-display text-lg font-semibold">Need more capital?</h3>
          <p className="mt-1 text-sm text-muted">Larger account sizes carry the same rules and the same 92% split.</p>
        </div>
        <Button to="/accounts">Browse accounts <ArrowUpRight size={16} /></Button>
      </Card>
    </div>
  )
}

function OrdersTable({ rows }: { rows: OrderRow[] }) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead><tr className="border-b border-line text-xs uppercase text-dim"><th className="pb-3">Order</th><th>Account</th><th>Route</th><th>Broker</th><th>Paid</th><th>Status</th></tr></thead>
        <tbody className="divide-y divide-line">
          {rows.map((o) => (
            <tr key={o.id} className="hover:bg-soft">
              <td className="py-4"><Link to="/dashboard/orders/$id" params={{ id: o.reference }} className="num text-brand">{o.reference}</Link><span className="block text-[11px] text-dim">{shortDate(o.created_at)}</span></td>
              <td className="num">{money(o.account_size)}</td>
              <td className="capitalize">{o.account_type}</td>
              <td>{o.broker}</td>
              <td className="num">{money(Number(o.price))}</td>
              <td><Status status={effectiveStatus(o)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Orders() {
  const [filter, setFilter] = useState('all')
  const orders = useQuery({ queryKey: ['orders'], queryFn: fetchOrders })
  const all = orders.data ?? []
  const rows = filter === 'all' ? all : all.filter((o) => effectiveStatus(o) === filter)

  return (
    <div>
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Orders</h1>
          <p className="mt-1 text-sm text-muted">Every purchase you have submitted and where it stands right now.</p>
        </div>
        <Button to="/accounts">New account</Button>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {['all', 'pending', 'completed', 'rejected'].map((x) => (
          <button key={x} onClick={() => setFilter(x)} className={cn('rounded-full border px-3 py-1.5 text-xs capitalize', filter === x ? 'border-brand bg-brand/10 text-brand' : 'border-line text-muted')}>{x}</button>
        ))}
      </div>
      <div className="mt-5">
        {orders.isLoading ? <Loading label="Fetching your orders" />
          : rows.length === 0 ? <Empty title="No orders in this view" body="Once you complete a checkout, the order lands here with its review status and full receipt." action={{ to: '/accounts', label: 'Choose an account' }} />
          : <Card hover={false} className="p-6"><OrdersTable rows={rows} /></Card>}
      </div>
    </div>
  )
}

export function OrderDetail() {
  const { id } = useParams({ strict: false }) as { id: string }
  const query = useQuery({ queryKey: ['order', id], queryFn: () => fetchOrder(id) })

  if (query.isLoading) return <Loading label={`Opening ${id}`} />
  if (!query.data) {
    return <Empty title="We could not open that order" body={`No order with reference ${id} is linked to your account. It may belong to a different login.`} action={{ to: '/dashboard/orders', label: 'Back to orders' }} />
  }

  const o = query.data
  const status = effectiveStatus(o)
  const countdown = reviewCountdown(o)
  const size = o.account_size
  const stages = ['Order submitted', 'Payment matched', 'Broker callback', 'Account delivered']
  const idx = { pending: 0, processing: 1, waiting_callback: 2, completed: 3, rejected: -1 }[status] ?? 0

  return (
    <div className="space-y-6">
      <Link to="/dashboard/orders" className="inline-flex items-center gap-2 text-sm text-muted"><ArrowLeft size={14} />Back to orders</Link>
      <div className="flex flex-wrap justify-between gap-3">
        <div>
          <h1 className="num font-display text-2xl font-semibold">{o.reference}</h1>
          <p className="mt-1 text-sm text-muted">Submitted {shortTime(o.created_at)}</p>
        </div>
        <div className="flex gap-3">
          <Status status={status} />
          <Button variant="secondary" size="sm" onClick={() => window.print()}><Download size={14} />Receipt</Button>
        </div>
      </div>

      {countdown && (
        <div className="flex items-start gap-3 rounded-md border border-warning/30 bg-warning/5 p-4 text-sm">
          <Clock className="mt-0.5 shrink-0 text-warning" size={18} />
          <p>Our desk reviews this order manually. A decision is posted within the next {countdown}; you will see the outcome on this page.</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card hover={false} className="p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold">Progress</h2>
          {status === 'rejected'
            ? <div className="mt-6 flex gap-3 rounded-md border border-error/30 bg-error/5 p-4 text-sm"><XCircle className="shrink-0 text-error" />This order was declined during review. No account was issued. Open a support ticket and the desk will explain the reason and arrange a new attempt.</div>
            : <ol className="mt-6 space-y-6">{stages.map((s, i) => (
                <li className="flex gap-4" key={s}>
                  {i <= idx ? <CheckCircle2 className="text-success" size={20} /> : <Circle className="text-dim" size={20} />}
                  <div><b className={i <= idx ? '' : 'text-dim'}>{s}</b>{i <= idx && <p className="text-xs text-dim">{shortDate(o.created_at)}</p>}</div>
                </li>
              ))}</ol>}
        </Card>
        <Card hover={false} className="p-6">
          <h2 className="font-display text-lg font-semibold">Receipt</h2>
          <dl className="mt-5 space-y-3 text-sm">
            {([['Route', o.account_type === 'instant' ? 'Instant funding' : 'Two-step evaluation'], ['Broker', o.broker], ['Account size', money(size)], ['Payment', o.payment_method], ['Coupon', o.coupon || '—'], ['Paid', money(Number(o.price))]] as const).map(([k, v]) => (
              <div className="flex justify-between gap-3 border-b border-line pb-3" key={k}><dt className="text-muted">{k}</dt><dd className="num text-right">{v}</dd></div>
            ))}
          </dl>
        </Card>
      </div>

      {status === 'completed' && (
        <Card hover={false} className="border-brand/30 bg-brand/5 p-6 sm:p-8">
          <div className="flex justify-between border-b border-line pb-6">
            <div><Badge tone="success">Account live</Badge><h2 className="mt-2 font-display text-2xl font-bold">Account details</h2></div>
            <p className="text-success">Active</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {([['Account size', money(size), 'brand'], ['Issued', shortDate(o.created_at), ''], ['Broker', o.broker, ''], ['Route', o.account_type === 'instant' ? 'Instant' : 'Two-step', ''], ['Daily loss limit', money(size * 0.05), 'error'], ['Maximum drawdown', money(size * 0.1), 'error'], ['Profit target', money(size * 0.08), 'success'], ['Profit split', '92%', 'success']] as const).map(([l, v, tone]) => (
              <div className="rounded-xl border border-line bg-surface p-4" key={l}>
                <span className="text-xs text-muted">{l}</span>
                <p className={cn('num mt-1 font-semibold', tone === 'brand' ? 'text-brand' : tone === 'error' ? 'text-error' : tone === 'success' ? 'text-success' : '')}>{v}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export function SupportList() {
  const tickets = useQuery({ queryKey: ['tickets'], queryFn: fetchTickets })
  const rows = tickets.data ?? []
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Support</h1>
          <p className="mt-1 text-sm text-muted">Payouts, rule questions and account issues — all handled here.</p>
        </div>
        <Button to="/dashboard/support/new">New ticket</Button>
      </div>
      <Card hover={false} className="mt-6 border-brand/20 bg-brand/5 p-5">
        <h2 className="font-display font-semibold">Desk hours</h2>
        <p className="mt-1 text-sm text-muted">The team is staffed 24/5 and answers most tickets within a few hours.</p>
      </Card>
      <div className="mt-6 space-y-3">
        {tickets.isLoading ? <Loading label="Loading your tickets" />
          : rows.length === 0 ? <Empty title="No tickets yet" body="When you need a hand with a rule, a payout or a broker, open a ticket and the conversation stays saved here." action={{ to: '/dashboard/support/new', label: 'Open a ticket' }} />
          : rows.map((t) => (
              <Link key={t.id} to="/dashboard/support/$id" params={{ id: t.reference }} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-card p-5 hover:border-brand/30">
                <div><p className="font-semibold">{t.subject}</p><p className="mt-1 text-xs text-dim">{t.reference} · {t.category} · Updated {shortDate(t.updated_at)}</p></div>
                <Status status={t.status} />
              </Link>
            ))}
      </div>
    </div>
  )
}

export function SupportDetail() {
  const { id } = useParams({ strict: false }) as { id: string }
  const qc = useQueryClient()
  const query = useQuery({ queryKey: ['ticket', id], queryFn: () => fetchTicket(id) })
  const [reply, setReply] = useState('')
  const send = useMutation({
    mutationFn: (body: string) => replyToTicket(query.data!.ticket.id, body),
    onSuccess: () => { setReply(''); qc.invalidateQueries({ queryKey: ['ticket', id] }) },
  })

  if (query.isLoading) return <Loading label="Opening ticket" />
  if (!query.data) return <Empty title="Ticket not available" body={`No ticket with reference ${id} belongs to this account.`} action={{ to: '/dashboard/support', label: 'Back to tickets' }} />

  const { ticket, messages } = query.data
  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/dashboard/support" className="inline-flex gap-2 text-sm text-muted"><ArrowLeft size={14} />Back to tickets</Link>
      <div className="mt-5 flex flex-wrap justify-between gap-3">
        <div><p className="num text-xs text-brand">{ticket.reference}</p><h1 className="mt-1 font-display text-2xl font-semibold">{ticket.subject}</h1></div>
        <Status status={ticket.status} />
      </div>
      <div className="mt-8 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={cn('max-w-[85%] rounded-xl p-4 text-sm', m.author === 'user' ? 'ml-auto bg-brand/10' : 'border border-line bg-card')}>
            <p className="whitespace-pre-wrap">{m.body}</p>
            <small className="mt-2 block text-dim">{m.author === 'user' ? 'You' : 'VEXO desk'} · {shortTime(m.created_at)}</small>
          </div>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if (reply.trim()) send.mutate(reply.trim()) }} className="mt-6">
        <textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Add to this conversation…" className="h-28 w-full rounded-xl border border-line bg-surface p-4" />
        <div className="mt-3 flex justify-between">
          <Button type="button" variant="ghost"><Paperclip size={16} />Attach</Button>
          <Button type="submit" disabled={send.isPending}>{send.isPending ? <Loader2 className="animate-spin" size={16} /> : null}Send reply</Button>
        </div>
      </form>
    </div>
  )
}

export function SupportNew() {
  const nav = useNavigate()
  const qc = useQueryClient()
  const [form, setForm] = useState({ subject: '', category: 'Technical', priority: 'Medium', body: '' })
  const create = useMutation({
    mutationFn: () => createTicket(form),
    onSuccess: (t) => { qc.invalidateQueries({ queryKey: ['tickets'] }); nav({ to: '/dashboard/support/$id', params: { id: t.reference } }) },
  })

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/dashboard/support" className="inline-flex gap-2 text-sm text-muted"><ArrowLeft size={14} />Back to tickets</Link>
      <h1 className="mt-5 font-display text-2xl font-semibold">Open a ticket</h1>
      <Card hover={false} className="mt-6 p-6">
        <form className="space-y-5" onSubmit={(e: FormEvent) => { e.preventDefault(); create.mutate() }}>
          {create.isError && <p className="rounded-md border border-error/30 bg-error/10 p-3 text-sm text-error">We could not save this ticket. Please try again.</p>}
          <Field label="Subject" placeholder="What do you need help with?" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          <label className="block text-sm text-copy">Category
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1.5 w-full rounded-lg border border-line bg-surface p-3">
              <option>Technical</option><option>Billing</option><option>Account</option><option>Challenge</option><option>General</option>
            </select>
          </label>
          <label className="block text-sm text-copy">Priority
            <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="mt-1.5 w-full rounded-lg border border-line bg-surface p-3">
              <option>Low</option><option>Medium</option><option>High</option>
            </select>
          </label>
          <label className="block text-sm text-copy">Message
            <textarea required value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="mt-1.5 h-36 w-full rounded-lg border border-line bg-surface p-3" placeholder="Include your order reference and what you are seeing." />
          </label>
          <Button className="w-full" type="submit" disabled={create.isPending}>{create.isPending ? <Loader2 className="animate-spin" size={16} /> : null}Submit ticket</Button>
        </form>
      </Card>
    </div>
  )
}

export function Profile() {
  const { user } = useSession()
  const qc = useQueryClient()
  const profile = useQuery({ queryKey: ['profile'], queryFn: fetchProfile })
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState<{ full_name: string; phone: string; country: string } | null>(null)
  const current = form ?? { full_name: profile.data?.full_name ?? nameOf(user), phone: profile.data?.phone ?? '', country: profile.data?.country ?? 'United States' }
  const save = useMutation({
    mutationFn: () => updateProfile(current),
    onSuccess: () => { setSaved(true); qc.invalidateQueries({ queryKey: ['profile'] }) },
  })
  const name = current.full_name

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-display text-2xl font-semibold">Profile</h1>
      {saved && <p className="rounded-lg border border-success/30 bg-success/10 p-3 text-sm text-success">Your details are up to date.</p>}
      <Card hover={false} className="p-6">
        <div className="flex items-center gap-5">
          <span className="grid h-20 w-20 place-items-center rounded-full border-2 border-brand/40 bg-brand/10 text-2xl font-bold text-brand">{initialsOf(name)}</span>
          <div><b>{name}</b><p className="text-sm text-dim">Client since {profile.data ? shortDate(profile.data.created_at) : '—'}</p></div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); save.mutate() }} className="mt-8 grid gap-5 sm:grid-cols-2">
          <Field label="Full Name" value={current.full_name} onChange={(e) => setForm({ ...current, full_name: e.target.value })} />
          <Field label="Email" type="email" value={user?.email ?? ''} disabled />
          <Field label="Phone" value={current.phone} onChange={(e) => setForm({ ...current, phone: e.target.value })} />
          <label className="text-sm text-copy">Country
            <select value={current.country} onChange={(e) => setForm({ ...current, country: e.target.value })} className="mt-1.5 w-full rounded-lg border border-line bg-surface p-3">
              <option>United States</option><option>United Kingdom</option><option>United Arab Emirates</option><option>Pakistan</option><option>India</option><option>Other</option>
            </select>
          </label>
          <Button className="sm:col-span-2 sm:w-fit" type="submit" disabled={save.isPending}>Save changes</Button>
        </form>
      </Card>
    </div>
  )
}

export function Security() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [current, setCurrent] = useState('')
  const [message, setMessage] = useState<{ tone: 'ok' | 'bad'; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setMessage({ tone: 'bad', text: 'Both new password fields must match.' }); return }
    setBusy(true)
    const { supabase } = await import('@/integrations/supabase/client')
    const { error } = await supabase.auth.updateUser({ password, ...(current ? { current_password: current } : {}) } as { password: string })
    setBusy(false)
    setMessage(error ? { tone: 'bad', text: error.message } : { tone: 'ok', text: 'Password changed. Use it next time you sign in.' })
    if (!error) { setPassword(''); setConfirm(''); setCurrent('') }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Security</h1>
        <p className="mt-1 text-sm text-muted">Keep your sign-in details current — payouts depend on this account.</p>
      </div>
      {message && <p className={cn('rounded-lg border p-3 text-sm', message.tone === 'ok' ? 'border-success/30 bg-success/10 text-success' : 'border-error/30 bg-error/10 text-error')}>{message.text}</p>}
      <Card hover={false} className="p-6">
        <h2 className="font-display text-lg font-semibold">Change password</h2>
        <form className="mt-5 space-y-4" onSubmit={submit}>
          <Field label="Current Password" type="password" placeholder="••••••••" value={current} onChange={(e) => setCurrent(e.target.value)} />
          <Field label="New Password" type="password" placeholder="At least 8 characters" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <Field label="Confirm Password" type="password" placeholder="Repeat new password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          <Button type="submit" disabled={busy}>{busy ? <Loader2 className="animate-spin" size={16} /> : null}Update password</Button>
        </form>
      </Card>
      <Card hover={false} className="flex justify-between p-6">
        <div><h3 className="font-semibold">Two-factor authentication</h3><p className="mt-1 text-sm text-muted">Coming with the next platform release.</p></div>
        <Badge>Not enabled</Badge>
      </Card>
      <Card hover={false} className="flex justify-between p-6">
        <div><h3 className="font-semibold">Session</h3><p className="mt-1 text-sm text-muted">You are signed in on this device.</p></div>
        <ShieldCheck className="text-success" />
      </Card>
    </div>
  )
}
