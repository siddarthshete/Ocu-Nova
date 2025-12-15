"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getBrowserSupabase } from "@/lib/supabase/client"

export default function SignUpPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState("")
  const [hospital, setHospital] = useState("")
  const [role, setRole] = useState("Doctor")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = getBrowserSupabase()

      // 1️⃣ Create the user account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            age,
            hospital,
            role,
          },
        },
      })

      if (error) throw error

      const user = data.user

      // 2️⃣ Insert into 'profiles' table manually
      if (user) {
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            user_id: user.id,
            full_name: fullName,
            age: parseInt(age),
            hospital_name: hospital,
            user_type: role,
          },
        ])

        if (insertError) {
          console.error("Profile insert failed:", insertError)
          throw new Error("Could not save profile details.")
        }
      }

      // 3️⃣ Redirect after success
      router.push("/detect")
    } catch (err: any) {
      console.error("Signup error:", err)
      setError(err.message ?? "Failed to sign up. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-border">
        <h1 className="text-2xl font-bold text-center mb-6 text-primary">Create Your Account</h1>

        {error && <p className="mb-3 text-red-600 text-sm text-center">{error}</p>}

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
            />
          </div>

          {/* Age & Role */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Age</label>
              <input
                type="number"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="25"
                className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
              >
                <option value="Doctor">Doctor</option>
                <option value="Intern">Intern</option>
              </select>
            </div>
          </div>

          {/* Hospital */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Hospital Name</label>
            <input
              type="text"
              required
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              placeholder="City Eye Hospital"
              className="w-full border rounded-md px-3 py-2 bg-background text-foreground"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 inline-flex items-center justify-center rounded-md bg-primary text-white h-10 px-4 font-medium hover:bg-primary/90 transition"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-primary hover:underline">
            Log in
          </a>
        </p>
      </div>
    </main>
  )
}
