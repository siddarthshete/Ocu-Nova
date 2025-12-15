"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { getBrowserSupabase } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(params.get("message"))

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const supabase = getBrowserSupabase()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push("/") // redirect after login
    } catch (err: any) {
      setError(err.message ?? "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4 text-pretty">Sign in</h1>
      {error && <p className="mb-3 text-red-600 text-sm">{error}</p>}
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            required
            className="border rounded-md px-3 py-2 bg-background text-foreground"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            required
            className="border rounded-md px-3 py-2 bg-background text-foreground"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="text-sm text-muted-foreground mt-4">
        Don&apos;t have an account?{" "}
        <a className="underline" href="/auth/sign-up">
          Sign up
        </a>
      </p>
    </main>
  )
}
