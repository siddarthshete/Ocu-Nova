import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EyeInformationPage() {
  const anatomy = [
    {
      title: "Cornea",
      img: "/cornea-close-up-medical-illustration.jpg",
      desc: "The clear, dome-shaped surface that covers the front of the eye. It helps focus incoming light.",
    },
    {
      title: "Lens",
      img: "/eye-lens-transparent-anatomy.jpg",
      desc: "A transparent structure that changes shape to focus light onto the retina.",
    },
    {
      title: "Retina",
      img: "/retina-photoreceptors-anatomy.jpg",
      desc: "Light-sensitive tissue lining the back of the eye that converts light into neural signals.",
    },
  ]

  const diseases = [
    {
      id: "glaucoma",
      title: "Glaucoma",
      img: "/glaucoma-optic-nerve-damage-fundus-photo.jpg",
      desc: "A group of conditions that damage the optic nerve, often linked to high intraocular pressure.",
    },
    {
      id: "cataract",
      title: "Cataract",
      img: "/cataract-cloudy-lens-eye-image.jpg",
      desc: "Clouding of the eye’s lens causing blurry, dim, or yellowed vision; treated with lens replacement surgery.",
    },
    {
      id: "diabetic-retinopathy",
      title: "Diabetic Retinopathy",
      img: "/diabetic-retinopathy-retina-hemorrhages.jpg",
      desc: "Damage to retinal blood vessels from diabetes, which can lead to vision loss without treatment.",
    },
    {
      id: "normal",
      title: "Normal Eye",
      img: "/healthy-human-eye-close-up.jpg",
      desc: "A healthy eye with clear media and intact retina/optic nerve function resulting in sharp vision.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-4">
        <div className="container max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Eye Information</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Explore key parts of the eye and learn about common eye diseases with helpful images and descriptions.
            </p>
          </div>

          {/* Eye Anatomy */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-balance">Eye Anatomy Overview</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {anatomy.map((part) => (
                <Card key={part.title} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-balance">{part.title}</CardTitle>
                    <CardDescription className="text-balance leading-relaxed">{part.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={part.img || "/placeholder.svg"}
                        alt={`${part.title} image`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Diseases */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-balance">Common Eye Diseases</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {diseases.map((d) => (
                <Link
                  key={d.id}
                  href={`/eye-information/${d.id}`}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                  aria-label={`Open details for ${d.title}`}
                >
                  <Card className="border-2 group-hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-balance">{d.title}</CardTitle>
                      <CardDescription className="text-balance leading-relaxed">{d.desc}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={d.img || "/placeholder.svg?height=600&width=1067&query=disease%20image"}
                          alt={`${d.title} image`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
