"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { History, Loader2, AlertCircle, Trash2 } from "lucide-react"
import Image from "next/image"

interface DetectionRecord {
  id: string
  image_url: string
  detected_condition: string
  models_used: string[]
  created_at: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<DetectionRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    fetchHistory()
  }, [isAuthenticated, user, router])

  const fetchHistory = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("detection_history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error

      setHistory(data || [])
    } catch (err: any) {
      setError(err.message || "Failed to load history")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("detection_history").delete().eq("id", id)

      if (error) throw error

      setHistory(history.filter((record) => record.id !== id))
    } catch (err: any) {
      setError(err.message || "Failed to delete record")
    }
  }

  const getDiseaseColor = (disease: string) => {
    const diseaseLower = disease.toLowerCase()
    if (diseaseLower.includes("normal")) return "text-green-500"
    if (diseaseLower.includes("glaucoma")) return "text-red-500"
    if (diseaseLower.includes("cataract")) return "text-blue-500"
    if (diseaseLower.includes("diabetic") || diseaseLower.includes("retinopathy")) return "text-orange-500"
    return "text-primary"
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-4">
        <div className="container max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-primary/10">
                <History className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Detection History</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              View your past eye disease detection results
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Empty State */}
          {!loading && !error && history.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No detection history yet</p>
                <Button asChild>
                  <a href="/detect">Start Detection</a>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* History Grid */}
          {!loading && !error && history.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {history.map((record) => (
                <Card key={record.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative w-full aspect-video bg-muted">
                      <Image
                        src={record.image_url || "/placeholder.svg"}
                        alt="Detection"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <CardTitle className={`text-lg ${getDiseaseColor(record.detected_condition)} text-balance`}>
                        {record.detected_condition}
                      </CardTitle>
                      <CardDescription className="text-xs mt-1">
                        {new Date(record.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </CardDescription>
                    </div>

                    {record.models_used && record.models_used.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {record.models_used.map((model, index) => (
                          <span key={index} className="px-2 py-0.5 bg-muted rounded text-xs">
                            {model}
                          </span>
                        ))}
                      </div>
                    )}

                    <Button variant="destructive" size="sm" className="w-full" onClick={() => handleDelete(record.id)}>
                      <Trash2 className="h-3 w-3 mr-2" />
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
