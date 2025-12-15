import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function checkSession() {
  const supabase = createClientComponentClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Session check error:', error)
    return null
  }
  
  return session
}

export async function refreshSession() {
  const supabase = createClientComponentClient()
  const { data: { session }, error } = await supabase.auth.refreshSession()
  
  if (error) {
    console.error('Session refresh error:', error)
    return null
  }
  
  return session
}