"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { experience } from "@/lib/data"

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-20 lg:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Work Experience</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">My professional journey in design and development</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {experience.map((job, index) => (
            <div
              key={job.id}
              className={`relative transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Timeline Line */}
              {index < experience.length - 1 && (
                <div className="absolute left-6 top-20 w-0.5 h-32 bg-gradient-to-b from-blue-500 to-transparent"></div>
              )}

              <div className="flex gap-6 mb-12">
                {/* Company Logo */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border-2 border-blue-500/30">
                    <Image
                      src={job.logo || "/placeholder.svg"}
                      alt={`${job.company} logo`}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{job.role}</h3>
                      <p className="text-blue-400 font-medium mb-2">{job.company}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {job.duration}
                        </span>
                        <span className="px-2 py-1 bg-gray-800 rounded text-xs">{job.type}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">{job.description}</p>

                  {/* Achievements */}
                  <div className="mb-4">
                    <button
                      onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                      className="text-blue-400 hover:text-blue-300 font-medium text-sm mb-3 transition-colors"
                    >
                      {expandedId === job.id ? "Hide" : "Show"} Key Achievements
                    </button>

                    {expandedId === job.id && (
                      <ul className="space-y-2 text-gray-300 text-sm">
                        {job.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
