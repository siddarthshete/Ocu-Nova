"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { 
  LogOut, 
  X, 
  Stethoscope, 
  Calendar, 
  Building2,
  Menu,
  ChevronDown
} from "lucide-react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"

interface UserProfile {
  full_name: string
  email: string
  user_type: string
  hospital_name?: string
  age?: number
  profile_photo_url?: string
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const supabase = createClient()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserProfile()
    } else {
      // Reset profile when user logs out
      setUserProfile(null)
      setProfileError(null)
    }
  }, [isAuthenticated, user])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // Close profile dropdown if click is outside
      if (profileOpen && !target.closest('.profile-dropdown')) {
        setProfileOpen(false)
      }
      // Close mobile menu if click is outside
      if (menuOpen && !target.closest('.mobile-menu')) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileOpen, menuOpen])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      setProfileError(null)
      
      console.log('Fetching profile for user:', user?.id)
      
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('full_name, email, user_type, hospital_name, age, profile_photo_url')
        .eq('user_id', user?.id)
        .single()

      if (error) {
        console.error('Profile fetch error:', error)
        
        // Check if it's a "not found" error
        const errorString = JSON.stringify(error).toLowerCase()
        if (errorString.includes('not found') || errorString.includes('404') || errorString.includes('pgrst116')) {
          console.log('Profile not found, creating basic profile from auth data')
          const basicProfile: UserProfile = {
            full_name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User',
            email: user?.email || '',
            user_type: user?.user_metadata?.user_type || 'patient',
            hospital_name: user?.user_metadata?.hospital_name,
            age: user?.user_metadata?.age,
            profile_photo_url: user?.user_metadata?.avatar_url
          }
          setUserProfile(basicProfile)
          setProfileError(null)
          return
        }
        
        throw new Error(error.message || 'Failed to fetch profile')
      }

      console.log('Profile fetched successfully:', profileData)
      setUserProfile(profileData)
    } catch (error: unknown) {
      console.error('Error fetching user profile:')
      
      if (error instanceof Error) {
        setProfileError(error.message)
      } else if (typeof error === 'string') {
        setProfileError(error)
      } else {
        setProfileError('Failed to load profile data')
      }
      
      // Always create a basic profile as fallback
      console.log('Creating fallback profile from auth data')
      const basicProfile: UserProfile = {
        full_name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User',
        email: user?.email || '',
        user_type: user?.user_metadata?.user_type || 'patient',
        hospital_name: user?.user_metadata?.hospital_name,
        age: user?.user_metadata?.age,
        profile_photo_url: user?.user_metadata?.avatar_url
      }
      setUserProfile(basicProfile)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      setProfileOpen(false)
      setMenuOpen(false)
      setUserProfile(null)
      setProfileError(null)
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/eye-information", label: "Eye Information" },
    { href: "/detect", label: "Detect" },
    { href: "/ar-experience", label: "3D Experience" },
    { href: "/videos", label: "Videos" },
  ]

  const getUserInitials = (nameOrEmail: string | undefined) => {
    if (!nameOrEmail) return "U"
    if (nameOrEmail.includes("@")) return nameOrEmail.substring(0, 2).toUpperCase()
    const parts = nameOrEmail.trim().split(" ")
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const toggleProfile = () => {
    setProfileOpen(!profileOpen)
  }

  const closeMenus = () => {
    setMenuOpen(false)
    setProfileOpen(false)
  }

  const getUserTypeDisplay = (userType: string) => {
    const types: { [key: string]: { label: string, color: string } } = {
      doctor: { label: "👨‍⚕️ Doctor", color: "text-blue-600 dark:text-blue-400" },
      intern: { label: "🎓 Intern", color: "text-green-600 dark:text-green-400" },
      patient: { label: "👤 Patient", color: "text-purple-600 dark:text-purple-400" }
    }
    return types[userType] || { label: userType, color: "text-gray-600 dark:text-gray-400" }
  }

  // Get display name for user
  const getDisplayName = () => {
    if (userProfile?.full_name) return userProfile.full_name
    if (user?.email) return user.email.split('@')[0]
    return 'User'
  }

  // Get display email
  const getDisplayEmail = () => {
    return userProfile?.email || user?.email || ''
  }

  // Get user type for display
  const getDisplayUserType = () => {
    return userProfile?.user_type || user?.user_metadata?.user_type || 'user'
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-gray-700/80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo + Title */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={closeMenus}
        >
          <div className="relative">
            <Image
              src="/eyeDiseaseLogo.jpg"
              alt="OcuNova Logo"
              width={42}
              height={42}
              className="rounded-full object-cover border-2 border-primary/20 shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -inset-1 bg-primary/10 rounded-full blur-sm group-hover:blur-md transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent tracking-tight">
              OcuNova
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Eye Health AI</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                ${pathname === item.href 
                  ? "text-primary bg-primary/10" 
                  : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                }
                group/nav
              `}
            >
              {item.label}
              <span className={`
                absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary rounded-full 
                transition-all duration-300 group-hover/nav:w-4/5 group-hover/nav:left-1/2 group-hover/nav:-translate-x-1/2
                ${pathname === item.href ? "w-4/5 left-1/2 -translate-x-1/2" : ""}
              `}></span>
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* User Profile Dropdown */}
              <div className="relative profile-dropdown">
                <button
                  onClick={toggleProfile}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group/profile border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                  disabled={loading}
                >
                  {userProfile?.profile_photo_url ? (
                    <div className="relative">
                      <img
                        src={userProfile.profile_photo_url}
                        alt={getDisplayName()}
                        className="w-9 h-9 rounded-full object-cover border-2 border-primary/20 shadow-sm group-hover/profile:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute -inset-1 bg-primary/10 rounded-full blur-sm opacity-0 group-hover/profile:opacity-100 transition-all duration-300"></div>
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold uppercase flex items-center justify-center text-sm shadow-sm group-hover/profile:scale-110 transition-transform duration-300 border border-primary/10">
                      {getUserInitials(getDisplayName())}
                    </div>
                  )}
                  <div className="hidden sm:block text-left min-w-0">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[120px]">
                      {getDisplayName()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <span className="truncate max-w-[100px]">
                        {getUserTypeDisplay(getDisplayUserType()).label}
                      </span>
                      <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {profileOpen && (
                  <div className="absolute right-0 top-14 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50 animate-in fade-in-0 zoom-in-95 backdrop-blur-xl">
                    {/* User Info Header */}
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-t-2xl">
                      <div className="flex items-center gap-4">
                        {userProfile?.profile_photo_url ? (
                          <div className="relative">
                            <img
                              src={userProfile.profile_photo_url}
                              alt={getDisplayName()}
                              className="w-14 h-14 rounded-full object-cover border-3 border-primary/20 shadow-lg"
                            />
                            <div className="absolute -inset-2 bg-primary/10 rounded-full blur-xl opacity-50"></div>
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold uppercase flex items-center justify-center text-lg border-3 border-primary/10 shadow-lg">
                            {getUserInitials(getDisplayName())}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg truncate">
                            {getDisplayName()}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate mb-1">
                            {getDisplayEmail()}
                          </p>
                          <div className="flex items-center gap-2">
                            <Stethoscope className="h-3 w-3 text-gray-400" />
                            <span className={`text-xs font-medium ${getUserTypeDisplay(getDisplayUserType()).color}`}>
                              {getUserTypeDisplay(getDisplayUserType()).label}
                            </span>
                          </div>
                          {profileError && (
                            <p className="text-xs text-yellow-600 mt-1">
                              Using basic profile data
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="p-4 space-y-3 bg-white dark:bg-gray-900">
                      {userProfile?.hospital_name && (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                          <Building2 className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{userProfile.hospital_name}</span>
                        </div>
                      )}
                      {userProfile?.age && (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                          <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{userProfile.age} years old</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-2 bg-white dark:bg-gray-900 rounded-b-2xl">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 p-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 hover:text-red-700 transition-all duration-300 group/btn"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                        <span className="font-medium">Logout</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                asChild 
                className="text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-primary/5 transition-all duration-300 rounded-lg"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button 
                size="sm" 
                asChild 
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group/menu border border-transparent hover:border-gray-200 dark:hover:border-gray-700 mobile-menu"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <X className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover/menu:scale-110 transition-transform duration-300" />
            ) : (
              <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover/menu:scale-110 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Fixed Mobile Dropdown Menu - Simplified */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" 
            onClick={closeMenus}
          />
          
          {/* Mobile Menu */}
          <div className="fixed top-16 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg lg:hidden mobile-menu">
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      px-4 py-3 rounded-lg text-base font-medium transition-all duration-200
                      hover:bg-primary/10 hover:text-primary
                      ${pathname === item.href 
                        ? 'text-primary bg-primary/10' 
                        : 'text-gray-700 dark:text-gray-300'
                      }
                    `}
                    onClick={closeMenus}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile User Info for authenticated users */}
                {isAuthenticated && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                      {userProfile?.profile_photo_url ? (
                        <img
                          src={userProfile.profile_photo_url}
                          alt={getDisplayName()}
                          className="w-10 h-10 rounded-full object-cover border-2 border-primary/20 shadow-sm"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold uppercase flex items-center justify-center border-2 border-primary/10 shadow-sm">
                          {getUserInitials(getDisplayName())}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 dark:text-white truncate text-sm">
                          {getDisplayName()}
                        </div>
                        <div className={`text-xs font-medium ${getUserTypeDisplay(getDisplayUserType()).color}`}>
                          {getUserTypeDisplay(getDisplayUserType()).label}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300"
                        onClick={() => {
                          closeMenus()
                          handleLogout()
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}