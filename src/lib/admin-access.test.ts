import { expect, test } from 'bun:test'
import postgres from 'postgres'

test('assigned administrator has order review and customer read policies without public access', async () => {
  const url = process.env.SUPABASE_DB_URL
  if (!url) throw new Error('Database test connection is required')
  const sql = postgres(url, { max: 1, prepare: false })
  try {
    const [roles] = await sql`select public.has_role('7e6b8822-5c1c-4acb-8c2a-ddea00d9c049'::uuid, 'admin') as assigned, public.has_role('00000000-0000-0000-0000-000000000000'::uuid, 'admin') as unassigned`
    expect(roles?.assigned).toBe(true)
    expect(roles?.unassigned).toBe(false)
    const policies = await sql`select tablename, cmd, roles, qual, with_check from pg_policies where schemaname='public' and policyname in ('admins read orders','admins review orders','admins read profiles')`
    expect(policies).toHaveLength(3)
    for (const policy of policies) {
      expect(policy.roles).toContain('authenticated')
      expect(policy.roles).not.toContain('anon')
      expect(policy.qual).toContain("has_role(auth.uid(), 'admin'")
      if (policy.cmd === 'UPDATE') expect(policy.with_check).toContain("has_role(auth.uid(), 'admin'")
    }
    expect(policies.some(p => p.tablename === 'orders' && p.cmd === 'UPDATE')).toBe(true)
    expect(policies.some(p => p.tablename === 'profiles' && p.cmd === 'SELECT')).toBe(true)
  } finally {
    await sql.end()
  }
})