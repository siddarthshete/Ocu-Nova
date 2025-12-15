"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, RotateCw, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ARExperiencePage() {
  const [resetKey, setResetKey] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [activeModel, setActiveModel] = useState<"normal" | "cataract" | "dr">("normal")

  useEffect(() => {
    setIsClient(true)
  }, [])

  // ✅ Helper: Hide all Sketchfab UI elements (including “View on Sketchfab”)
  const embedUrl = (id: string) =>
    `https://sketchfab.com/models/${id}/embed?ui_infos=0&ui_watermark=0&ui_hint=0&ui_controls=0&ui_stop=0&autostart=1&ui_annotations=0&ui_settings=0&ui_help=0&ui_ar=0&ui_fullscreen=0&dnt=1`

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-12 px-4">
        <div className="container max-w-6xl mx-auto space-y-8">
          {/* ✅ Header Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-primary/10">
                <Eye className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance">
              3D Eye Model Experience
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Explore the anatomy of the human eye in 3D. Rotate, zoom, and learn about
              different eye structures and diseases.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* ✅ 3D Model Viewer */}
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <CardTitle className="text-balance">
                      Interactive 3D Model
                    </CardTitle>

                    <div className="flex items-center gap-2">
                      <div className="hidden md:flex rounded-md border p-0.5">
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            "bg-transparent",
                            activeModel === "normal" &&
                              "bg-primary text-primary-foreground"
                          )}
                          onClick={() => setActiveModel("normal")}
                        >
                          Normal
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            "bg-transparent",
                            activeModel === "cataract" &&
                              "bg-primary text-primary-foreground"
                          )}
                          onClick={() => setActiveModel("cataract")}
                        >
                          Cataract
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            "bg-transparent",
                            activeModel === "dr" &&
                              "bg-primary text-primary-foreground"
                          )}
                          onClick={() => setActiveModel("dr")}
                        >
                          Diabetic Retinopathy
                        </Button>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                        onClick={() => setResetKey((k) => k + 1)}
                        aria-label="Reset 3D view"
                        title="Reset 3D view"
                      >
                        <RotateCw className="h-4 w-4 mr-2" /> Reset View
                      </Button>
                    </div>
                  </div>

                  <CardDescription className="text-balance">
                    Click and drag to rotate • Scroll to zoom • Double-click to reset
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden bg-muted shadow-md">
                    {/* ✅ Solid Top Bar — No Transparency, Slightly Taller */}
                    <div className="absolute top-0 left-0 w-full z-10 bg-blue-700 text-white text-center text-base font-semibold py-3 shadow-md rounded-t-lg">
                      {activeModel === "normal"
                        ? "Normal Eye (VR)"
                        : activeModel === "cataract"
                        ? "Cataract (VR)"
                        : "Diabetic Retinopathy (VR)"}
                    </div>

                    {isClient ? (
                      <div className="h-full w-full">
                        <iframe
                          key={`${activeModel}-${resetKey}`}
                          title={
                            activeModel === "normal"
                              ? "Human Eye (animated, photorealistic textures)"
                              : activeModel === "cataract"
                              ? "Cataract Eye / PBR"
                              : "Diabetes eye diseases labelled detailed"
                          }
                          src={
                            activeModel === "normal"
                              ? embedUrl("6adbd6538cd146d484c9ad950be69aa5")
                              : activeModel === "cataract"
                              ? embedUrl("a3f7ec5eee63414191d40af8e99f01cc")
                              : embedUrl("24a1efa00d484074b74dd86f06aed55f")
                          }
                          frameBorder="0"
                          allow="autoplay; fullscreen; xr-spatial-tracking"
                          allowFullScreen
                          className="h-full w-full"
                        />
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                        Loading 3D model...
                      </div>
                    )}
                  </div>

                  {/* Controls Info */}
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="space-y-1 text-sm">
                        <p className="font-medium text-sm text-balance">
                          How to interact:
                        </p>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Click and drag to rotate the model</li>
                          <li>• Use mouse wheel or pinch to zoom in/out</li>
                          <li>• Double-click to reset camera view</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ✅ Educational Info Card */}
            <div className="space-y-4">
              <Card className="border-2 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-sm text-balance">
                    Did You Know?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-balance leading-relaxed">
                    The human eye can distinguish nearly 10 million colors and can detect
                    a single photon of light in total darkness. AR technology helps
                    visualize eye diseases in an interactive way.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ✅ Informational Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg text-balance">Cornea</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-balance leading-relaxed">
                  The cornea is the clear, dome-shaped surface that covers the front of
                  the eye and helps focus vision.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg text-balance">Retina</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-balance leading-relaxed">
                  The retina is a thin tissue layer at the back of the eye that captures
                  light and sends visual information to the brain.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg text-balance">Optic Nerve</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-balance leading-relaxed">
                  The optic nerve transmits signals from the retina to the brain, enabling
                  you to see clearly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
