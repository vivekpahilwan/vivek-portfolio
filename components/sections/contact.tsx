"use client"

import { useState, useEffect, useRef } from "react"
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from "lucide-react"
import { personal } from "@/lib/data"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: personal.phone,
      href: `tel:${personal.phone}`,
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: personal.location,
      href: null,
    },
  ]

  const socialLinks = [
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      href: personal.social.linkedin,
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      href: personal.social.github,
    },
    {
      icon: <ExternalLink className="h-5 w-5" />,
      label: "Behance",
      href: personal.social.behance,
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 lg:py-32 bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Let's Work Together</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Get in touch and let's discuss how we can bring your
            ideas to life.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Get In Touch</h3>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {contactInfo.map((info, index) => (
                <div
                  key={info.label}
                  className={`text-center transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${500 + index * 200}ms` }}
                >
                  <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 mx-auto mb-4">
                    {info.icon}
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{info.label}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-white hover:text-blue-400 transition-colors font-medium text-lg"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-white font-medium text-lg">{info.value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-6">Follow Me</h4>
              <div className="flex justify-center gap-6 mb-8">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${800 + index * 100}ms` }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div
              className={`max-w-md mx-auto p-6 bg-green-500/10 border border-green-500/20 rounded-lg text-center transition-all duration-1000 delay-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium text-lg">{personal.availability}</span>
              </div>
              <p className="text-gray-400 text-sm">Ready to take on new projects and collaborations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
