"use client"

import type React from "react"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Eye, 
  Brain, 
  Zap, 
  Users, 
  Shield, 
  BookOpen, 
  Stethoscope, 
  GraduationCap,
  HeartPulse,
  ArrowRight,
  Target,
  Globe,
  BarChart3,
  Video,
  CheckCircle2,
  Sparkles
} from "lucide-react"

export default function AboutPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-time Analysis",
      description: "Get comprehensive diagnostic results in under 3 seconds",
      color: "text-yellow-500"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "High Accuracy",
      description: "96.14% classification accuracy across multiple eye diseases",
      color: "text-green-500"
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Educational AR",
      description: "Interactive 3D disease visualizations for immersive learning",
      color: "text-purple-500"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "User-Friendly",
      description: "Simple drag-and-drop interface accessible from any browser",
      color: "text-blue-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Private",
      description: "Enterprise-grade data protection and privacy compliance",
      color: "text-red-500"
    }
  ]

  const targetAudience = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Trainee Doctors & Medical Students",
      description: "Enhanced learning through interactive 3D visualizations and AI-powered case studies"
    },
    {
      icon: <Stethoscope className="h-6 w-6" />,
      title: "Healthcare Providers",
      description: "Early detection tool for clinics, hospitals, and screening programs"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Medical Educators",
      description: "Modern teaching aid for ophthalmology training and curriculum development"
    },

  ]

  const capabilities = [
    {
      title: "Cataract Detection",
      accuracy: "97.2%",
      description: "Identify lens clouding and cataract stages"
    },
    {
      title: "Glaucoma Screening",
      accuracy: "95.8%",
      description: "Detect optic nerve damage and early signs"
    },
    {
      title: "Diabetic Retinopathy",
      accuracy: "96.5%",
      description: "Monitor retinal changes in diabetic patients"
    },
    {
      title: "Normal Eye Assessment",
      accuracy: "98.1%",
      description: "Confirm healthy eye conditions"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center space-y-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Revolutionizing Eye Care
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
                Transforming Eye Care Through{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI & 3D Visualization
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
                Combining cutting-edge Artificial Intelligence with immersive 3D Visualization
                to transform how eye diseases are detected and understood.
              </p>

              {/* Buttons removed from here */}
            </div>
          </div>
        </section>

        {/* Project Vision */}
        <section className="py-16 px-4 bg-white dark:bg-gray-950">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Target className="w-4 h-4 mr-2" />
                Project Vision
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Building the Future of Ophthalmology
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                We're developing an intelligent system that serves both as a diagnostic tool for early detection 
                and an educational resource for medical training.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                    <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI-Powered Diagnosis</h3>
                    <p className="text-muted-foreground">
                      Advanced deep learning models that analyze retinal images with exceptional accuracy, 
                      providing reliable diagnostic support for healthcare professionals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900">
                    <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Multi-Disease Detection</h3>
                    <p className="text-muted-foreground">
                      Simultaneously identifies Cataracts, Glaucoma, Diabetic Retinopathy, and Normal eyes 
                      through comprehensive image analysis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900">
                    <Video className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Immersive Education</h3>
                    <p className="text-muted-foreground">
                      AR visualization helps trainees understand diseases in 3D, creating engaging 
                      learning experiences that bridge theory and practice.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900">
                    <Globe className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Web Platform</h3>
                    <p className="text-muted-foreground">
                      Accessible through any modern browser, no special equipment needed. 
                      Democratizing access to advanced eye care technology.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Our Impact</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold">96.14%</div>
                        <div className="text-sm opacity-90">Accuracy Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">&lt;10s</div>
                        <div className="text-sm opacity-90">Analysis Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">3</div>
                        <div className="text-sm opacity-90">Diseases Detected</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">24/7</div>
                        <div className="text-sm opacity-90">Accessibility</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Users className="w-4 h-4 mr-2" />
                Who It's For
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Designed for Healthcare Innovation
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {targetAudience.map((audience, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto p-3 rounded-full bg-primary/10">
                      {audience.icon}
                    </div>
                    <CardTitle className="text-lg">{audience.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {audience.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 px-4 bg-white dark:bg-gray-950">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Zap className="w-4 h-4 mr-2" />
                Key Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
                Powerful Capabilities, Simple Interface
              </h2>
            </div>

            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="features">Core Features</TabsTrigger>
                <TabsTrigger value="capabilities">Disease Detection</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {features.map((feature, index) => (
                    <Card 
                      key={index} 
                      className={`cursor-pointer transition-all hover:scale-105 ${
                        activeFeature === index ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setActiveFeature(index)}
                    >
                      <CardHeader>
                        <div className={`${feature.color} mb-4`}>
                          {feature.icon}
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="capabilities">
                <div className="grid md:grid-cols-2 gap-6">
                  {capabilities.map((capability, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{capability.title}</CardTitle>
                          {/* <Badge variant="secondary" className="text-green-600">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {capability.accuracy} accuracy
                          </Badge> */}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          {capability.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Ready to Transform Eye Care?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto text-balance">
              Join the revolution in ophthalmology. Experience the power of AI and AR in eye disease detection and education.
            </p>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}