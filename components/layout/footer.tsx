"use client"
import { Heart, ArrowUp } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { personal } from "@/lib/data"

export default function Footer() {
  const router = useRouter()
  const pathname = usePathname()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navigateToSection = (href: string) => {
    // If we're not on the main page, navigate to main page first
    if (pathname !== "/") {
      router.push(`/${href}`)
    } else {
      // If we're on the main page, scroll to section
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">{personal.name}</h3>
            <p className="text-gray-400 mb-4">
              {personal.role} passionate about creating meaningful digital experiences.
            </p>
            <p className="text-gray-500 text-sm">📍 {personal.location}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {[
                { href: "#about", label: "About" },
                { href: "#experience", label: "Experience" },
                { href: "#projects", label: "Projects" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <button
                  key={link.href}
                  onClick={() => navigateToSection(link.href)}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <div className="space-y-2">
              <a href={`mailto:${personal.email}`} className="block text-gray-400 hover:text-white transition-colors">
                {personal.email}
              </a>
              <a href={`tel:${personal.phone}`} className="block text-gray-400 hover:text-white transition-colors">
                {personal.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        {/* <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500" fill="currentColor" /> by {personal.name}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            Back to top <ArrowUp className="h-4 w-4" />
          </button>
        </div> */}
      </div>
    </footer>
  )
}
