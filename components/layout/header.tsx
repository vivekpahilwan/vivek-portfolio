"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ]

  const scrollToSection = (href: string) => {
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
    setIsMenuOpen(false)
  }

  const handleLogoClick = () => {
    if (pathname !== "/") {
      router.push("/")
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-gray-800" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="text-xl lg:text-2xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            Vivek Pahilwan
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            >
              Get In Touch
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-blue-400 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <nav className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("#contact")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
              >
                Get In Touch
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
