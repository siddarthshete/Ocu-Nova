import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { diseases } from "@/lib/diseases"

// Type guard to safely access diseases
function getDisease(slug: string) {
  const diseaseKeys = ['glaucoma', 'cataract', 'diabetic-retinopathy', 'normal'] as const
  if (diseaseKeys.includes(slug as any)) {
    return diseases[slug as keyof typeof diseases]
  }
  return null
}

export default function DiseaseDetailPage({ params }: { params: { slug: string } }) {
  const disease = getDisease(params.slug)

  if (!disease) return notFound()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-4">
        <div className="container max-w-6xl mx-auto space-y-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li>
                <Link href="/eye-information" className="hover:text-primary transition-colors">
                  Eye Information
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">
                {disease.title}
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">{disease.title}</h1>
            <p className="text-lg text-muted-foreground text-balance leading-relaxed">{disease.shortDesc}</p>
          </header>

          {/* Hero Image */}
          <section>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted">
              <Image
                src={disease.heroImg || "/placeholder.svg"}
                alt={`${disease.title} hero image`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </section>

          {/* Key Facts */}
          <section className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 text-center p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg">Prevalence</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-2xl font-bold text-primary">{disease.prevalence}</p>
                <p className="text-sm text-muted-foreground mt-2">People affected</p>
              </CardContent>
            </Card>

            <Card className="border-2 text-center p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg">Risk Level</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-2xl font-bold text-primary">{disease.riskLevel}</p>
                <p className="text-sm text-muted-foreground mt-2">Severity</p>
              </CardContent>
            </Card>

            <Card className="border-2 text-center p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg">Age Group</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-2xl font-bold text-primary">{disease.ageGroup}</p>
                <p className="text-sm text-muted-foreground mt-2">Most common</p>
              </CardContent>
            </Card>
          </section>

          {/* Overview + Lists */}
          <section className="grid gap-6 md:grid-cols-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-balance">Overview</CardTitle>
                <CardDescription className="text-balance leading-relaxed">{disease.overview}</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Symptoms</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 leading-relaxed">
                    {disease.symptoms.map((s) => (
                      <li key={s} className="text-pretty">
                        {s}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Causes & Risk Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 leading-relaxed">
                    {disease.causes.map((c) => (
                      <li key={c} className="text-pretty">
                        {c}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Diagnosis Methods */}
            <Card className="border-2 md:col-span-2">
              <CardHeader>
                <CardTitle>Diagnosis Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {disease.diagnosisMethods?.map((method) => (
                    <div key={method.name} className="space-y-2">
                      <h4 className="font-semibold">{method.name}</h4>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 md:col-span-2">
              <CardHeader>
                <CardTitle>Treatment Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disease.treatmentOptions?.map((option) => (
                    <div key={option.type} className="space-y-2">
                      <h4 className="font-semibold">{option.type}</h4>
                      <ul className="list-disc pl-5 text-sm">
                        {option.methods.map((method) => (
                          <li key={method}>{method}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 md:col-span-2">
              <CardHeader>
                <CardTitle>Prevention & Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 leading-relaxed">
                  {disease.prevention.map((p) => (
                    <li key={p} className="text-pretty">
                      {p}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Prognosis */}
            <Card className="border-2 md:col-span-2">
              <CardHeader>
                <CardTitle>Prognosis & Outlook</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p>{disease.prognosis?.description}</p>
                  {disease.prognosis?.factors && (
                    <div>
                      <h4 className="font-semibold mb-2">Factors affecting prognosis:</h4>
                      <ul className="list-disc pl-5">
                        {disease.prognosis.factors.map((factor) => (
                          <li key={factor}>{factor}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Gallery */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-balance">Clinical Images</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {disease.images.map((img) => (
                <figure key={img.src} className="rounded-xl overflow-hidden border bg-muted">
                  <div className="relative w-full aspect-video">
                    <Image
                      src={img.src || "/placeholder.svg"}
                      alt={img.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {img.caption ? (
                    <figcaption className="px-4 py-3 text-sm text-muted-foreground">{img.caption}</figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </section>

          {/* Back link */}
          <div>
            <Link href="/eye-information" className="text-primary hover:underline">
              ← Back to Eye Information
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}