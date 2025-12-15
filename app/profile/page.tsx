"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, User, Mail, Building2, Calendar, Edit, AlertCircle, Stethoscope, FileText, ArrowLeft, Home } from "lucide-react"
import Link from 'next/link'

interface UserProfile {
  id: string
  user_id: string
  full_name: string
  email: string
  user_type: string
  hospital_name: string
  age: number
  profile_photo_url: string | null
  agreed_to_terms: boolean
  terms_agreed_at: string
  created_at: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkAuthAndLoadProfile()
  }, [])

  const checkAuthAndLoadProfile = async () => {
    try {
      setLoading(true)
      setError("")
      
      // Direct session check - bypass auth context
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        console.error('Session error:', sessionError)
        throw new Error('Authentication error')
      }

      if (!session) {
        console.log('No session found, redirecting to login')
        router.push('/login?redirect=/profile')
        return
      }

      // Load profile data
      await loadUserProfile(session.user.id)
      
    } catch (err: any) {
      console.error('Profile load error:', err)
      setError(err.message || 'Failed to load profile')
      setLoading(false)
    }
  }

  const loadUserProfile = async (userId: string) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (profileError) {
        console.error('Profile fetch error:', profileError)
        throw profileError
      }

      setProfile(profileData)
    } catch (err: any) {
      console.error('Error loading profile:', err)
      setError('Failed to load user profile')
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = async () => {
    setError("")
    setLoading(true)
    await checkAuthAndLoadProfile()
  }

  const handleRefresh = async () => {
    // Refresh the session
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await loadUserProfile(session.user.id)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getUserTypeBadge = (userType: string) => {
    const types: { [key: string]: { label: string, variant: "default" | "secondary" | "outline" } } = {
      doctor: { label: "👨‍⚕️ Doctor", variant: "default" },
      intern: { label: "🎓 Intern", variant: "secondary" },
      patient: { label: "👤 Patient", variant: "outline" }
    }
    
    return types[userType] || { label: userType, variant: "outline" as const }
  }

  if (loading) {
    return <ProfileLoading />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unable to Load Profile</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleRetry} variant="default" className="flex-1">
              Try Again
            </Button>
            <Button onClick={handleRefresh} variant="outline" className="flex-1">
              Refresh Session
            </Button>
            <Button asChild variant="ghost" className="flex-1">
              <Link href="/" className="flex items-center gap-2 justify-center">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Profile not found. Please try logging in again.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const userTypeInfo = getUserTypeBadge(profile.user_type)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="flex items-center gap-2 hover:bg-primary/10"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              User Profile
            </h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>
          <div className="w-20"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 border-2 border-primary/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    {profile.profile_photo_url ? (
                      <img
                        src={profile.profile_photo_url}
                        alt={profile.full_name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-4 border-primary/20 flex items-center justify-center shadow-lg">
                        <User className="h-12 w-12 text-primary/60" />
                      </div>
                    )}
                  </div>
                </div>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">
                  {profile.full_name}
                </CardTitle>
                <Badge variant={userTypeInfo.variant} className="text-sm mt-2">
                  {userTypeInfo.label}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 transition-all duration-300"
                  onClick={() => router.push('/profile/edit')}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Member since {formatDate(profile.created_at)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <InfoCard
              title="Personal Information"
              description="Your basic profile information"
              icon={<User className="h-5 w-5" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  label="Full Name"
                  value={profile.full_name}
                  icon={<User className="h-4 w-4" />}
                />
                <InfoItem
                  label="Email"
                  value={profile.email}
                  icon={<Mail className="h-4 w-4" />}
                />
                <InfoItem
                  label="Age"
                  value={profile.age ? `${profile.age} years` : 'Not specified'}
                  icon={<Calendar className="h-4 w-4" />}
                />
                <InfoItem
                  label="User Type"
                  value={profile.user_type.charAt(0).toUpperCase() + profile.user_type.slice(1)}
                  icon={<Stethoscope className="h-4 w-4" />}
                />
              </div>
            </InfoCard>

            {/* Professional Information */}
            {profile.hospital_name && (
              <InfoCard
                title="Professional Information"
                description="Your professional details"
                icon={<Building2 className="h-5 w-5" />}
              >
                <InfoItem
                  label="Hospital/Institution"
                  value={profile.hospital_name}
                  icon={<Building2 className="h-4 w-4" />}
                />
              </InfoCard>
            )}

            {/* Account Information */}
            <InfoCard
              title="Account Information"
              description="Your account status and preferences"
              icon={<Eye className="h-5 w-5" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  label="Terms Accepted"
                  value={profile.agreed_to_terms ? "Yes" : "No"}
                  icon={<FileText className="h-4 w-4" />}
                />
                <InfoItem
                  label="Accepted On"
                  value={formatDate(profile.terms_agreed_at)}
                  icon={<Calendar className="h-4 w-4" />}
                />
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  )
}

// Reusable Info Card Component
function InfoCard({ 
  title, 
  description, 
  icon, 
  children 
}: { 
  title: string
  description: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Card className="border-2 border-primary/5 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:border-primary/10 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

// Info Item Component
function InfoItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/10 hover:border-primary/20 transition-all duration-300">
      <div className="text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-muted-foreground">{label}</div>
        <div className="text-base font-semibold text-gray-900 dark:text-white">{value}</div>
      </div>
    </div>
  )
}

// Loading Component
function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="h-10 w-64 bg-gradient-to-r from-primary/10 to-primary/5 rounded mx-auto mb-2 animate-pulse"></div>
          <div className="h-5 w-96 bg-gradient-to-r from-primary/10 to-primary/5 rounded mx-auto animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column Loading */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-primary/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-32 h-32 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full mx-auto mb-4 animate-pulse"></div>
                <div className="h-8 w-48 bg-gradient-to-r from-primary/10 to-primary/5 rounded mx-auto mb-2 animate-pulse"></div>
                <div className="h-6 w-24 bg-gradient-to-r from-primary/10 to-primary/5 rounded mx-auto animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-10 w-full bg-gradient-to-r from-primary/10 to-primary/5 rounded mb-4 animate-pulse"></div>
                <div className="h-4 w-32 bg-gradient-to-r from-primary/10 to-primary/5 rounded mx-auto animate-pulse"></div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column Loading */}
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="border-2 border-primary/10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="h-6 w-48 bg-gradient-to-r from-primary/10 to-primary/5 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-64 bg-gradient-to-r from-primary/10 to-primary/5 rounded animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((subItem) => (
                      <div key={subItem} className="h-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded animate-pulse"></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}