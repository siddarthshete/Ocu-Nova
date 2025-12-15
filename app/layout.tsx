import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { AIChatbot } from "@/components/ai-chatbot"

export const metadata: Metadata = {
  title: "OcuNova",
  description: "Advanced AI-based eye disease detection system",
  icons: { icon: "/eyeDiseaseLogo.jpg" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
          <AIChatbot />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}