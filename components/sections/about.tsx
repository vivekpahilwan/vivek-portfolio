"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { personal } from "@/lib/data"

export default function About() {
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

  const highlights = ["UI/UX Design", "Design Systems", "User Research", "Prototyping", "Mobile Design", "Web Design"]

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                <Image
                  src={personal.profileImage || "/placeholder.svg"}
                  alt={`${personal.name} - About`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-cyan-500/20"></div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">About Me</h2>

            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                I'm a passionate UI/UX designer currently pursuing my B.Tech at Vishwakarma Institute of Information
                Technology, Pune. With over {personal.yearsOfExperience} years of experience in design, I specialize in
                creating intuitive and engaging digital experiences.
              </p>

              <p>
                My journey in design started with a curiosity about how users interact with digital products. This led
                me to dive deep into user research, design systems, and creating solutions that not only look great but
                also solve real problems.
              </p>

              <p>
                I believe in the power of good design to transform businesses and improve lives. Whether it's designing
                a mobile app or building a comprehensive design system, I approach every project with empathy,
                creativity, and attention to detail.
              </p>
            </div>

            {/* Skills Highlights */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">What I Do</h3>
              <div className="flex flex-wrap gap-3">
                {highlights.map((skill, index) => (
                  <span
                    key={skill}
                    className={`px-4 py-2 bg-gray-800 text-blue-400 rounded-full text-sm font-medium transition-all duration-500 hover:bg-blue-600 hover:text-white cursor-default ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${800 + index * 100}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-blue-400 mb-1">2+</div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-cyan-400 mb-1">10+</div>
                <div className="text-gray-400 text-sm">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
