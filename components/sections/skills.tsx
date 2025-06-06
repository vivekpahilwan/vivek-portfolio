"use client"

import { useState, useEffect, useRef } from "react"
import { skills } from "@/lib/data"

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedLevels, setAnimatedLevels] = useState<{ [key: string]: number }>({})
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate skill levels
          skills.forEach((category) => {
            category.items.forEach((skill) => {
              setTimeout(() => {
                setAnimatedLevels((prev) => ({
                  ...prev,
                  [skill.name]: skill.level,
                }))
              }, Math.random() * 1000)
            })
          })
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-20 lg:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Skills & Expertise</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Technologies and tools I use to bring ideas to life</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skills.map((category, categoryIndex) => (
            <div
              key={category.category}
              className={`bg-gray-900/50 rounded-xl p-6 border border-gray-800 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <h3 className="text-xl font-bold text-white mb-6 text-center">{category.category}</h3>

              <div className="space-y-4">
                {category.items.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className={`transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                    style={{ transitionDelay: `${categoryIndex * 200 + skillIndex * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                      </div>
                      <span className="text-blue-400 text-sm font-medium">{animatedLevels[skill.name] || 0}%</span>
                    </div>

                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${animatedLevels[skill.name] || 0}%`,
                          transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100) + 500}ms`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
