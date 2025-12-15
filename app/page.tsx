import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Shield, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10 py-20 px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            <span>AI-Powered Detection</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
            Advanced Eye Disease
            <span className="block text-primary mt-2">Detection System</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Harness the power of artificial intelligence to detect Glaucoma, Cataract, and Diabetic Retinopathy with
            precision and speed. Early detection saves vision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" asChild className="text-base">
              <Link href="/detect">
                Start Detection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
              <Link href="/eye-information">Eye Information</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Why Choose Our Platform?</h2>
            <p className="text-muted-foreground text-lg text-balance max-w-2xl mx-auto">
              State-of-the-art AI technology combined with medical expertise for accurate diagnosis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-balance">AI-Powered Analysis</CardTitle>
                <CardDescription className="text-balance leading-relaxed">
                  Advanced machine learning models trained on thousands of eye images for accurate disease detection
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="p-3 rounded-lg bg-accent/10 w-fit mb-4">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-balance">Instant Results</CardTitle>
                <CardDescription className="text-balance leading-relaxed">
                  Get your diagnosis in seconds with confidence scores and detailed analysis of detected conditions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="p-3 rounded-lg bg-secondary/10 w-fit mb-4">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-balance">Secure & Private</CardTitle>
                <CardDescription className="text-balance leading-relaxed">
                  Your medical data is processed securely with industry-standard encryption and privacy protection
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
