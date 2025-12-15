export const runtime = "nodejs"
export const dynamic = "force-dynamic"

import { redirect } from "next/navigation"
import { getServerSupabase } from "@/lib/supabase/server"

export default async function ProtectedPage() {
  const supabase = await getServerSupabase()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect("/auth/login?message=Please%20sign%20in%20to%20continue")
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold mb-2">Protected</h1>
      <p className="text-muted-foreground">
        You are signed in as {data.user.email}.
      </p>

      <form action="/auth/logout" method="post" className="mt-6">
        <button
          formAction={async () => {
            "use server"
            const supabase = await getServerSupabase()
            await supabase.auth.signOut()
            redirect("/")
          }}
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4"
        >
          Sign out
        </button>
      </form>
    </main>
  )
}
