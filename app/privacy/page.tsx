"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Mail, User, Database, Lock, Cookie, Users, Calendar, FileText } from "lucide-react"

export default function PrivacyPolicy() {
  const contactTeam = [
    {
      name: "Pravin Balasaheb Patil",
      email: "pbpatil370122@kkwagh.edu.in"
    },
    {
      name: "Siddarth Sudhir Shete",
      email: "ssshete370122@kkwagh.edu.in"
    },
    {
      name: "Yash Sunil Rathi",
      email: "ysrathi370122@kkwagh.edu.in"
    },
    {
      name: "Devendra Dinkar Sonawane",
      email: "ddsonawane370122@kkwagh.edu.in"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/10">
      <Navbar />

      <main className="flex-1 py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="flex justify-center">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Privacy Policy
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
                  <FileText className="h-6 w-6 text-primary" />
                  1. Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Welcome to <strong>OcuNova</strong>, a web application developed for educational and research purposes by students of K. K. Wagh Institute of Engineering Education & Research.
                </p>
                <p>
                  Our platform allows users to upload eye images for disease prediction using artificial intelligence.
                </p>
                <p>
                  We are committed to protecting your privacy and ensuring that your personal data is handled responsibly and transparently in compliance with applicable data protection laws, including the Digital Personal Data Protection Act, 2023 (India).
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Database className="h-6 w-6 text-primary" />
                  2. Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3">a. Personal Information</h4>
                  <p className="text-muted-foreground mb-2">
                    If you contact us or provide details voluntarily, we may collect:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Name</li>
                    <li>Email address</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">b. Uploaded Data</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Eye images that you upload for disease detection</li>
                    <li>AI-generated prediction results</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">c. Technical Information</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Browser type, device type, operating system, and IP address (for analytics or debugging)</li>
                    <li>Usage information such as pages visited and time spent</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <User className="h-6 w-6 text-primary" />
                  3. How We Use the Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We use the collected information to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Analyze uploaded images and generate disease predictions</li>
                  <li>Improve the accuracy and performance of our AI model</li>
                  <li>Respond to user queries and provide support</li>
                  <li>Conduct research and educational analysis (only using anonymized data)</li>
                  <li>Ensure the website&apos;s security and reliability</li>
                </ul>
                <p className="text-muted-foreground mt-4 font-semibold">
                  We do not sell, rent, or trade user data to any third parties.
                </p>
              </CardContent>
            </Card>

            {/* Data Storage and Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Lock className="h-6 w-6 text-primary" />
                  4. Data Storage and Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Uploaded images are processed securely and, unless otherwise stated, deleted automatically after analysis.
                </p>
                <p>
                  Personal information (e.g., emails) is stored only as long as necessary for communication or research purposes.
                </p>
                <p>
                  We use secure servers and encryption measures to protect your data from unauthorized access or misuse.
                </p>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Calendar className="h-6 w-6 text-primary" />
                  5. Data Retention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We retain data only for as long as necessary to fulfill the purpose for which it was collected.
                </p>
                <p>For example:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Uploaded images are typically deleted after prediction</li>
                  <li>Logs or analytics data may be retained for up to 30 days to improve service performance</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Users className="h-6 w-6 text-primary" />
                  6. Data Sharing and Third Parties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We do not share your personal or uploaded data with third parties, except:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With trusted service providers (e.g., cloud storage or hosting) that help us operate the website</li>
                  <li>When required by law or for academic review purposes, with proper anonymization</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  7. User Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>As a user, you have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access the data you provided</li>
                  <li>Request correction or deletion of your personal information</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p>
                  To exercise these rights, contact us at{" "}
                  <a href="mailto:ocunovaa@gmail.com" className="text-primary hover:underline">
                    ocunovaa@gmail.com
                  </a>{" "}
                  (or one of the team emails below).
                </p>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Cookie className="h-6 w-6 text-primary" />
                  8. Cookies and Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  We may use cookies or analytical tools to improve user experience and understand website traffic.
                  You can disable cookies in your browser settings at any time.
                </p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  9. Children&apos;s Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  Our services are not intended for individuals under 18 years of age.
                  We do not knowingly collect data from minors.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Mail className="h-6 w-6 text-primary" />
                  10. Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  For any questions or privacy-related requests, please contact:
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Project Team – Eye Disease Detection</h4>
                  <div className="grid gap-3">
                    {contactTeam.map((member, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{member.name}</p>
                          <a 
                            href={`mailto:${member.email}`}
                            className="text-primary hover:underline text-sm"
                          >
                            {member.email}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  11. Updates to This Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time.
                  Any changes will be reflected on this page with an updated &ldquo;Effective Date&rdquo;.
                  Users are encouraged to review this page periodically.
                </p>
              </CardContent>
            </Card>

            {/* Consent */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  12. Consent
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p className="font-semibold">
                  By using our website or uploading images, you consent to the collection and use of information in accordance with this Privacy Policy.
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