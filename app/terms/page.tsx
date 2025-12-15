"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Shield, AlertTriangle, BookOpen, UserCheck, Lock, Mail } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/10">
      <Navbar />

      <main className="flex-1 py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="flex justify-center">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <BookOpen className="h-6 w-6 text-primary" />
                  1. Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Welcome to <strong>OcuNova</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing or using our eye disease detection platform, you agree to be bound by these Terms and Conditions.
                </p>
                <p>
                  This platform is developed for educational and research purposes by students of K. K. Wagh Institute of Engineering Education & Research.
                </p>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <UserCheck className="h-6 w-6 text-primary" />
                  2. User Accounts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>To use our services, you must:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Be at least 18 years of age</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your password</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                </ul>
                <p>
                  We reserve the right to suspend or terminate accounts that violate these terms.
                </p>
              </CardContent>
            </Card>

            {/* Service Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  3. Service Description
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  OcuNova provides AI-powered eye disease detection for educational and research purposes. Our service includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Uploading and analyzing eye images</li>
                  <li>Providing AI-generated predictions for eye diseases</li>
                  <li>Educational resources about eye health</li>
                  <li>Augmented reality visualization tools</li>
                </ul>
                <p className="font-semibold text-amber-600">
                  Important: Our AI predictions are for educational purposes only and should not replace professional medical diagnosis.
                </p>
              </CardContent>
            </Card>

            {/* Medical Disclaimer */}
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                  4. Medical Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="font-semibold">
                  OcuNova is an educational tool and NOT a substitute for professional medical advice, diagnosis, or treatment.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Always seek the advice of qualified healthcare providers with medical questions</li>
                  <li>Never disregard professional medical advice because of AI-generated predictions</li>
                  <li>Our predictions are based on AI models and may not be accurate</li>
                  <li>We are not liable for any medical decisions made based on our predictions</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  5. User Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Upload images that violate privacy rights or intellectual property</li>
                  <li>Use the service for any illegal purposes</li>
                  <li>Attempt to reverse engineer or hack our platform</li>
                  <li>Share inappropriate or harmful content</li>
                  <li>Use the service to make critical medical decisions without professional consultation</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Lock className="h-6 w-6 text-primary" />
                  6. Data Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We respect your privacy and handle your data according to our Privacy Policy. By using our service, you acknowledge that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Uploaded images may be used for research and model improvement (anonymized)</li>
                  <li>Personal information is protected and not shared with third parties without consent</li>
                  <li>You can request deletion of your data at any time</li>
                </ul>
                <p>
                  Please review our <strong>Privacy Policy</strong> for detailed information.
                </p>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  7. Intellectual Property
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  All content, features, and functionality on OcuNova are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  You may not copy, modify, distribute, or use any content without our explicit permission.
                </p>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Shield className="h-6 w-6 text-primary" />
                  8. Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="font-semibold">
                  To the fullest extent permitted by law, OcuNova shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
                </p>
                <p>This includes, but is not limited to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Medical decisions made based on AI predictions</li>
                  <li>Loss of data or privacy breaches beyond our reasonable control</li>
                  <li>Service interruptions or technical issues</li>
                  <li>Accuracy of AI-generated predictions</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Mail className="h-6 w-6 text-primary" />
                  9. Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  For questions about these Terms & Conditions, please contact us at:
                </p>
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border">
                  <p className="font-semibold">OcuNova Team</p>
                  <a href="mailto:ocunovaa@gmail.com" className="text-primary hover:underline">
                    ocunovas@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  10. Changes to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of significant changes via email or platform notifications. Continued use of our services after changes constitutes acceptance of the new terms.
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