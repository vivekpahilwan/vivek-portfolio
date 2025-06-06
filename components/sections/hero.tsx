"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, ArrowDown, Github, Linkedin, ExternalLink } from "lucide-react"
import { personal } from "@/lib/data"

export default function Hero() {
  const [currentRole, setCurrentRole] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const roles = ["UI/UX Designer", "Product Designer", "Design System Expert"]

  useEffect(() => {
    const typeWriter = () => {
      const currentRoleText = roles[roleIndex]

      if (isDeleting) {
        setCurrentRole(currentRoleText.substring(0, charIndex - 1))
        setCharIndex((prev) => prev - 1)
      } else {
        setCurrentRole(currentRoleText.substring(0, charIndex + 1))
        setCharIndex((prev) => prev + 1)
      }

      if (!isDeleting && charIndex === currentRoleText.length) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }
    }

    const timer = setTimeout(typeWriter, isDeleting ? 50 : 100)
    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, roleIndex, roles])

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-black via-gray-900 to-black pt-32 lg:pt-40">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
          backgroundSize: `30px 30px`,
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 relative inline-block">
            <div className="w-48 h-48 lg:w-56 lg:h-56 mx-auto relative">
              <Image
                src={personal.profileImage || "/placeholder.svg"}
                alt={personal.name}
                fill
                className="rounded-full object-cover border-4 border-blue-500/20 shadow-2xl"
                priority
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20"></div>
            </div>
            {/* Availability Status */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="bg-green-500 text-black px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                {personal.availability}
              </div>
            </div>
          </div>

          {/* Name and Role */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight">{personal.name}</h1>

          <div className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-2 h-12 flex items-center justify-center">
            <span className="text-blue-400">{currentRole}</span>
            <span className="ml-1 animate-pulse">|</span>
          </div>

          <p className="text-lg lg:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">{personal.bio}</p>

          {/* Location */}
          <p className="text-gray-500 mb-8 flex items-center justify-center gap-2">
            <span>📍</span> {personal.location}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href={personal.resume} download>
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-12">
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
            >
              <Github size={24} />
            </a>
            <a
              href={personal.social.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform"
            >
              <ExternalLink size={24} />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ArrowDown className="mx-auto text-gray-500 h-6 w-6" />
          </div>
        </div>
      </div>
    </section>
  )
}
