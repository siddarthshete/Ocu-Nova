import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-gradient-to-b from-background to-muted/20">
      <div className="container py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4 lg:col-span-2">
            <Link 
              href="/" 
              className="flex items-center gap-3 group transition-all duration-300"
            >
              <div className="relative">
                <Image
                  src="/eyeDiseaseLogo.jpg"
                  alt="OcuNova Logo"
                  width={50}
                  height={50}
                  className="rounded-full object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                />
                <div className="absolute inset-0 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                OcuNova
              </span>
            </Link>
            <p className="text-base text-muted-foreground text-balance leading-relaxed max-w-md">
              Revolutionizing eye care through AI-powered disease detection and augmented reality education 
              for early diagnosis and better healthcare outcomes.
            </p>
            
            {/* Social Links */}
            {/* <div className="flex items-center gap-4 pt-4">
              <Link 
                href="#" 
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link 
                href="#" 
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="#" 
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link 
                href="mailto:contact@ocunova.com" 
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/eye-information", label: "Eye Information" },
                { href: "/detect", label: "Detection" },
                { href: "/ar-experience", label: "3D Experience" },
                { href: "/videos", label: "Educational Videos" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-primary/0 group-hover:bg-primary rounded-full transition-all duration-300 group-hover:w-2 group-hover:h-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Contact Info
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3 transition-colors hover:text-primary">
                <Mail className="h-4 w-4" />
                <span>ocunovas@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 transition-colors hover:text-primary">
                <div className="h-4 w-4 flex items-center justify-center">
                  <div className="h-2 w-2 bg-current rounded-full" />
                </div>
                <span>24/7 Support Available</span>
              </div>
              <div className="flex items-center gap-3 transition-colors hover:text-primary">
                <div className="h-4 w-4 flex items-center justify-center">
                  <div className="h-2 w-2 bg-current rounded-full" />
                </div>
                <span>Medical Professionals</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            {/* <div className="pt-4">
              <p className="text-sm font-medium mb-3">Stay Updated</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                  Join
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/60">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} OcuNova. All rights reserved. 
              <span className="hidden sm:inline"> Transforming eye care through innovation.</span>
            </p>
            
            <div className="flex items-center gap-6 text-xs">
              <Link href="/privacy" className="hover:text-primary transition-colors duration-300">
                Privacy Policy
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}