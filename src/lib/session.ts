import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'

export function useSession() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    return () => { active = false; subscription.unsubscribe() }
  }, [])

  return { user, loading }
}

export function nameOf(user: User | null): string {
  const meta = (user?.user_metadata ?? {}) as { full_name?: string; name?: string }
  return meta.full_name || meta.name || user?.email?.split('@')[0] || 'Trader'
}

export function initialsOf(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join('') || 'V'
}
