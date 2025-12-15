"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, AlertCircle, FileText, User, Camera, Upload, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("doctor")
  const [hospital, setHospital] = useState("")
  const [age, setAge] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string>("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError("Please upload an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB")
      return
    }

    setProfilePhoto(file)
    setError("")

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setProfilePhotoPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    setProfilePhoto(null)
    setProfilePhotoPreview("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const uploadProfilePhoto = async (userId: string): Promise<string | null> => {
    if (!profilePhoto) return null

    try {
      const fileExt = profilePhoto.name.split('.').pop()
      const fileName = `${userId}/profile.${fileExt}`
      const filePath = `profile-photos/${fileName}`

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, profilePhoto)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error("Error uploading profile photo:", error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!agreeToTerms) {
      setError("You must agree to the Terms & Conditions to create an account")
      return
    }

    setLoading(true)

    try {
      // Step 1: Sign up user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            user_type: userType,
            hospital_name: hospital,
            age: age,
            agreed_to_terms: true,
            terms_agreed_at: new Date().toISOString(),
          },
        },
      })

      if (signUpError) throw signUpError

      const user = data.user
      if (!user) throw new Error("Signup failed — no user returned")

      // Step 2: Upload profile photo if exists
      let profilePhotoUrl = null
      if (profilePhoto) {
        profilePhotoUrl = await uploadProfilePhoto(user.id)
      }

      // Step 3: Insert user data into profiles table
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          user_id: user.id,
          full_name: name,
          email: email,
          user_type: userType,
          hospital_name: hospital,
          age: age,
          profile_photo_url: profilePhotoUrl,
          agreed_to_terms: true,
          terms_agreed_at: new Date().toISOString(),
        },
      ])

      if (insertError) throw insertError

      // Step 4: Redirect to dashboard or detect page
      router.push("/detect")
    } catch (err: any) {
      console.error("Signup error:", err)
      setError(err.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Eye className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-balance">Create Account</CardTitle>
          <CardDescription>Sign up to start detecting eye diseases with AI</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Profile Photo Upload */}
            <div className="space-y-3">
              <Label>Profile Photo</Label>
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  {profilePhotoPreview ? (
                    <div className="relative">
                      <Image
                        src={profilePhotoPreview}
                        alt="Profile preview"
                        width={100}
                        height={100}
                        className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-muted border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileInput}
                    className="flex items-center gap-2"
                  >
                    <Camera className="h-4 w-4" />
                    {profilePhotoPreview ? "Change Photo" : "Upload Photo"}
                  </Button>
                  
                  {profilePhotoPreview && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={removePhoto}
                      className="text-destructive hover:text-destructive/90"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground text-center">
                  Recommended: Square image, max 5MB
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="John Doe" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                minLength={6} 
              />
            </div>

            <div className="space-y-2">
              <Label>User Type</Label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    value="doctor" 
                    checked={userType === "doctor"} 
                    onChange={(e) => setUserType(e.target.value)} 
                    className="cursor-pointer"
                  />
                  Doctor
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    value="intern" 
                    checked={userType === "intern"} 
                    onChange={(e) => setUserType(e.target.value)} 
                    className="cursor-pointer"
                  />
                  Intern
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hospital">Hospital Name</Label>
              <Input 
                id="hospital" 
                type="text" 
                placeholder="City Care Hospital" 
                value={hospital} 
                onChange={(e) => setHospital(e.target.value)} 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number" 
                placeholder="e.g. 28" 
                value={age} 
                onChange={(e) => setAge(e.target.value)} 
                min={18} 
                max={100} 
                required 
              />
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className="mt-1 cursor-pointer"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline inline-flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    Terms & Conditions
                  </Link>
                </label>
                <p className="text-xs text-muted-foreground">
                  You must agree to our terms to create an account
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || !agreeToTerms}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}