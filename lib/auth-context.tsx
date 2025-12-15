"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createClient } from '@/lib/supabase/client'
import type { User, Session } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  isAuthenticated: boolean
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const refreshAuth = async () => {
    try {
      const { data: { session: newSession }, error } = await supabase.auth.getSession()
      if (error) throw error
      
      console.log('🔐 Auth refreshed - Session:', newSession ? 'Exists' : 'None')
      setSession(newSession)
      setUser(newSession?.user ?? null)
    } catch (error) {
      console.error('❌ Auth refresh error:', error)
      setSession(null)
      setUser(null)
    }
  }

  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        console.log('🔄 Initializing auth...')
        const { data: { session: initialSession }, error } = await supabase.auth.getSession()
        
        if (!mounted) return

        if (error) {
          console.error('❌ Initial auth error:', error)
          if (mounted) {
            setSession(null)
            setUser(null)
            setLoading(false)
          }
          return
        }

        console.log('✅ Initial session:', initialSession ? `User: ${initialSession.user?.email}` : 'No session')
        
        if (mounted) {
          setSession(initialSession)
          setUser(initialSession?.user ?? null)
          setLoading(false)
        }
      } catch (error) {
        console.error('❌ Auth initialization error:', error)
        if (mounted) {
          setSession(null)
          setUser(null)
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted) return

        console.log('🔄 Auth state changed:', event, 'User:', currentSession?.user?.email)
        
        setSession(currentSession)
        setUser(currentSession?.user ?? null)
        
        if (event === 'SIGNED_IN') {
          console.log('✅ User signed in successfully')
        } else if (event === 'SIGNED_OUT') {
          console.log('🚪 User signed out')
          setLoading(false)
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('🔄 Token refreshed')
        } else if (event === 'USER_UPDATED') {
          console.log('👤 User updated')
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  const value = {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    refreshAuth
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}