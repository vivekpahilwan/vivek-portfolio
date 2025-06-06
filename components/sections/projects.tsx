"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github, Figma } from "lucide-react"
import { Button } from "@/components/ui/button"
import { projects, featuredProjects } from "@/lib/data"

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState(projects)
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

  useEffect(() => {
    if (filter === "all") {
      setFilteredProjects(projects)
    } else if (filter === "featured") {
      setFilteredProjects(featuredProjects)
    } else {
      setFilteredProjects(projects.filter((project) => project.category === filter))
    }
  }, [filter])

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "featured", label: "Featured" },
    { id: "mobile-app", label: "Mobile Apps" },
    { id: "web-app", label: "Web Apps" },
  ]

  const getLinkIcon = (linkType: string) => {
    switch (linkType) {
      case "figma":
        return <Figma size={16} />
      case "github":
        return <Github size={16} />
      default:
        return <ExternalLink size={16} />
    }
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20 lg:py-32 bg-gray-900/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            A showcase of my design work and problem-solving approach
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === filterOption.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Project Links Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {Object.entries(project.links).map(([linkType, url]) => (
                    <a
                      key={linkType}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-black/70 rounded-full text-white hover:bg-blue-600 transition-colors"
                    >
                      {getLinkIcon(linkType)}
                    </a>
                  ))}
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">Featured</span>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-400 text-sm font-medium">{project.year}</span>
                  <span className="text-gray-500 text-sm capitalize">{project.category.replace("-", " ")}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.shortDescription}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* View Project Button */}
                <Link href={`/projects/${project.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-600 text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                  >
                    View Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        {filter !== "all" && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setFilter("all")}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              View All Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
