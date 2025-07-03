import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TL</span>
              </div>
              <span className="font-bold text-xl text-primary">TaskLink</span>
            </div>
            <p className="text-muted-foreground">
              Connecting verified skilled professionals with customers across Africa. Find trusted services quickly and
              safely.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/services" className="block text-muted-foreground hover:text-primary">
                Services
              </Link>
              <Link href="/workers" className="block text-muted-foreground hover:text-primary">
                Find Workers
              </Link>
              <Link href="/how-it-works" className="block text-muted-foreground hover:text-primary">
                How It Works
              </Link>
              <Link href="/become-worker" className="block text-muted-foreground hover:text-primary">
                Become a Worker
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-muted-foreground hover:text-primary">
                Help Center
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>support@tasklinkafrica.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+234 800 TASKLINK</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 TaskLink Africa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


