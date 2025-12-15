import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, ExternalLink, Eye, Video as VideoIcon } from "lucide-react"

export default function VideosPage() {
  const videos = [
    {
      title: "Cataract Disease — Awareness Video",
      driveId: "15UwlK0OpFhmUWrFez_Fsf9mHaZ9WKgPr",
      description: "Learn about cataract symptoms, causes, and treatment options through this comprehensive educational video.",
      duration: "4:30",
    },
    {
      title: "Diabetic Retinopathy — Awareness Video",
      driveId: "1n4naeFZtCtpwP6wvkU1AyXPCBXClDD6U",
      description: "Understand how diabetes affects your eyes and the importance of regular screening for diabetic retinopathy.",
      duration: "3:45",

    },
    {
      title: "Glaucoma — Awareness Video",
      driveId: "149oIJ1S1mcr5cZ_lrMO1QUwQREnHkL81",
      description: "Discover the silent thief of sight - learn about glaucoma detection, risk factors, and prevention strategies.",
      duration: "5:15",

    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Navbar />

      <main className="flex-1 py-16 px-4">
        <div className="container max-w-7xl mx-auto space-y-16">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                <VideoIcon className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Eye Care & Awareness
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Watch informative videos about eye health, disease prevention, and early detection techniques. 
              Enhance your knowledge with our curated educational content.
            </p>
          </div>

          {/* Videos Grid */}
          <div className="grid gap-8 lg:gap-10">
            {videos.map((video, index) => (
              <Card 
                key={video.driveId}
                className="group relative overflow-hidden border-0 bg-gradient-to-br from-card to-card/80 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-2xl font-bold text-pretty text-foreground/90 group-hover:text-foreground transition-colors duration-300">
                      {video.title}
                    </CardTitle>

                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed mt-2">
                    {video.description}
                  </p>
                </CardHeader>

                <CardContent className="relative z-10 space-y-4">
                  {/* Video Player */}
                  <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-muted/80 shadow-inner border">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Play className="h-6 w-6 text-white ml-1" />
                      </div>
                    </div>
                    <iframe
                      title={video.title}
                      src={`https://drive.google.com/file/d/${video.driveId}/preview`}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>

                  {/* Video Info and Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
                        <Play className="h-3 w-3" />
                        <span>{video.duration}</span>
                      </div>
                      <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                        Educational
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <a
                        href={`https://drive.google.com/file/d/${video.driveId}/view`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Open in Drive
                      </a>
                    </div>
                  </div>

                  {/* Fallback Message */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground bg-muted/30 px-4 py-2 rounded-lg">
                      Hover over the video to play, or{" "}
                      <a
                        href={`https://drive.google.com/file/d/${video.driveId}/view`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 underline transition-colors duration-200 font-medium"
                      >
                        open directly on Google Drive
                      </a>
                    </p>
                  </div>
                </CardContent>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/5 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
              </Card>
            ))}
          </div>

          {/* Additional Resources Section */}
          <div className="text-center space-y-6 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm text-muted-foreground">
              <VideoIcon className="h-4 w-4" />
              More educational content coming soon
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay tuned for more videos on eye health, surgical procedures, and patient testimonials.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}