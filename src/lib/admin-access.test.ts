import { expect, test } from 'bun:test'
import postgres from 'postgres'

test('assigned administrator has order review and customer read policies without public access', async () => {
  const url = process.env.SUPABASE_DB_URL
  if (!url) throw new Error('Database test connection is required')
  const sql = postgres(url, { max: 1, prepare: false })
  try {
    const policies = await sql<{tablename:string;cmd:string;roles:string[];qual:string;with_check:string|null}[]>`select tablename, cmd, roles, qual, with_check from pg_policies where schemaname='public' and policyname in ('admins read orders','admins review orders','admins read profiles')`
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