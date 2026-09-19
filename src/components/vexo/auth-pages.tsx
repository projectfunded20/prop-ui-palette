import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { CheckCircle2, Loader2, Mail } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { lovable } from '@/integrations/lovable/index'
import { AuthShell } from './layouts'
import { Button, Field } from './ui'

function Alert({ message }: { message: string }) {
  return <p className="rounded-md border border-error/30 bg-error/10 p-3 text-sm text-error">{message}</p>
}

function Divider() {
  return (
    <div className="my-6 flex items-center gap-3">
      <i className="h-px flex-1 bg-line" />
      <span className="text-xs text-dim">or continue with</span>
      <i className="h-px flex-1 bg-line" />
    </div>
  )
}

function safePath(value: unknown): string | null {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : null
}

function useGoogle(setError: (value: string) => void) {
  const [busy, setBusy] = useState(false)
  return {
    busy,
    run: async () => {
      setBusy(true)
      setError('')
      const result = await lovable.auth.signInWithOAuth('google', { redirect_uri: window.location.origin })
      if (result.error) {
        setError('Google sign-in could not be completed. Please try again.')
        setBusy(false)
        return
      }
      if (result.redirected) return
      window.location.assign('/dashboard')
    },
  }
}

export function Login() {
  const nav = useNavigate()
  const search = useSearch({ strict: false }) as { redirect?: string }
  const target = safePath(search.redirect) ?? '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const google = useGoogle(setError)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (authError) {
      setError(authError.message === 'Invalid login credentials' ? 'That email and password combination does not match an account.' : authError.message)
      return
    }
    nav({ to: target })
  }

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to reach your accounts, orders and support desk.">
      <form className="space-y-5" onSubmit={submit}>
        {error && <Alert message={error} />}
        <Field label="Email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field label="Password" type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex justify-end text-sm">
          <Link to="/forgot-password" className="text-brand">Forgot password?</Link>
        </div>
        <Button type="submit" className="w-full" disabled={busy}>{busy ? <Loader2 className="animate-spin" size={16} /> : null}Sign In</Button>
      </form>
      <Divider />
      <Button variant="secondary" className="w-full" onClick={google.run} disabled={google.busy}>Continue with Google</Button>
      <p className="mt-7 text-center text-sm text-muted">Don't have an account? <Link to="/signup" className="text-brand">Get funded</Link></p>
    </AuthShell>
  )
}

export function Signup() {
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', country: 'United States' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const google = useGoogle(setError)
  const set = (key: keyof typeof form) => (event: { target: { value: string } }) => setForm({ ...form, [key]: event.target.value })

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (form.password !== form.confirm) { setError('Both password fields must match.'); return }
    setBusy(true)
    setError('')
    const { error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { emailRedirectTo: window.location.origin, data: { full_name: form.name, country: form.country } },
    })
    setBusy(false)
    if (authError) { setError(authError.message); return }
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
    if (signInError) { setError(signInError.message); return }
    nav({ to: '/dashboard' })
  }

  return (
    <AuthShell title="Create your account" subtitle="Open an evaluation or instant account in a few minutes.">
      <form className="space-y-4" onSubmit={submit}>
        {error && <Alert message={error} />}
        <Field label="Full Name" placeholder="Your legal name" required value={form.name} onChange={set('name')} />
        <Field label="Email" type="email" placeholder="you@example.com" required value={form.email} onChange={set('email')} />
        <Field label="Password" type="password" placeholder="At least 8 characters" required value={form.password} onChange={set('password')} />
        <Field label="Confirm Password" type="password" placeholder="Repeat your password" required value={form.confirm} onChange={set('confirm')} />
        <label className="block text-sm text-copy">Country
          <select value={form.country} onChange={set('country')} className="mt-1.5 w-full rounded-lg border border-line bg-surface px-4 py-3">
            <option>United States</option><option>United Kingdom</option><option>United Arab Emirates</option><option>Pakistan</option><option>India</option><option>Other</option>
          </select>
        </label>
        <label className="flex gap-2 text-xs text-muted"><input type="checkbox" required /> I agree to the Terms &amp; Agreement and Risk Disclosure.</label>
        <Button className="w-full" type="submit" disabled={busy}>{busy ? <Loader2 className="animate-spin" size={16} /> : null}Create Account</Button>
      </form>
      <Divider />
      <Button variant="secondary" className="w-full" onClick={google.run} disabled={google.busy}>Continue with Google</Button>
      <p className="mt-6 text-center text-sm text-muted">Already have an account? <Link to="/login" className="text-brand">Sign in</Link></p>
    </AuthShell>
  )
}

export function Forgot() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` })
    setBusy(false)
    if (authError) { setError(authError.message); return }
    setSent(true)
  }

  return (
    <AuthShell title="Reset your password" subtitle="We'll email you a secure link to set a new password.">
      {sent ? (
        <div className="rounded-xl border border-success/30 bg-success/10 p-5 text-center">
          <CheckCircle2 className="mx-auto text-success" />
          <h2 className="mt-3 font-semibold">Check your inbox</h2>
          <p className="mt-2 text-sm text-muted">If an account exists for {email}, a reset link is on its way.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          {error && <Alert message={error} />}
          <Field label="Email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button className="w-full" type="submit" disabled={busy}><Mail size={16} />Send Reset Link</Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm"><Link to="/login" className="text-brand">Back to sign in</Link></p>
    </AuthShell>
  )
}

export function ResetPassword() {
  const nav = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (password !== confirm) { setError('Both password fields must match.'); return }
    setBusy(true)
    setError('')
    const { error: authError } = await supabase.auth.updateUser({ password })
    setBusy(false)
    if (authError) { setError(authError.message); return }
    nav({ to: '/dashboard' })
  }

  return (
    <AuthShell title="Set a new password" subtitle="Choose a password you have not used on this account before.">
      <form className="space-y-5" onSubmit={submit}>
        {error && <Alert message={error} />}
        <Field label="New Password" type="password" placeholder="At least 8 characters" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <Field label="Confirm Password" type="password" placeholder="Repeat your password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <Button className="w-full" type="submit" disabled={busy}>Update Password</Button>
      </form>
      <p className="mt-6 text-center text-sm"><Link to="/login" className="text-brand">Back to sign in</Link></p>
    </AuthShell>
  )
}
