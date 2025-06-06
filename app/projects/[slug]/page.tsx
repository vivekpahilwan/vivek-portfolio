import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Figma, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProjectBySlug, projects } from "@/lib/data"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ScrollToTop from "@/components/scroll-to-top"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

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

  const currentIndex = projects.findIndex((p) => p.id === slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollToTop />
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-8 sm:py-12 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 sm:mb-8"
            >
              <ArrowLeft size={20} />
              Back to Projects
            </Link>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Project Info */}
              <div className="order-2 lg:order-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                  <span className="px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-full">
                    {project.year}
                  </span>
                  <span className="px-2 sm:px-3 py-1 bg-gray-800 text-gray-300 text-xs sm:text-sm font-medium rounded-full capitalize">
                    {project.category.replace("-", " ")}
                  </span>
                  {project.featured && (
                    <span className="px-2 sm:px-3 py-1 bg-green-600 text-white text-xs sm:text-sm font-medium rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
                  {project.title}
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs sm:text-sm flex items-center gap-1"
                    >
                      <Tag size={10} className="sm:w-3 sm:h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  {Object.entries(project.links).map(([linkType, url]) => (
                    <Button
                      key={linkType}
                      asChild
                      className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                    >
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {getLinkIcon(linkType)}
                        <span className="ml-2 capitalize">{linkType}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Project Image */}
              <div className="relative order-1 lg:order-2">
                <div className="aspect-video relative rounded-xl overflow-hidden">
                  <Image
                    src={project.thumbnail || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Content */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Problem Statement */}
            <div className="mb-12 sm:mb-16">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">The Problem</h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">{project.content.problem}</p>
            </div>

            {/* Solution */}
            <div className="mb-12 sm:mb-16">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">The Solution</h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">{project.content.solution}</p>
            </div>

            {/* Design Process */}
            <div className="mb-12 sm:mb-16">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">Design Process</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.content.process.map((step, index) => (
                  <div key={step} className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                    <div className="text-blue-400 font-bold text-lg mb-2">{index + 1}</div>
                    <div className="text-white font-medium text-sm sm:text-base">{step}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-12 sm:mb-16">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {project.content.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-gray-300 text-sm sm:text-base">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-12 sm:mb-16">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">Technologies Used</h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {project.content.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 sm:px-4 py-2 bg-gray-800 text-gray-300 rounded-lg font-medium text-sm sm:text-base"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="mb-12 sm:mb-16">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">Results & Impact</h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">{project.content.results}</p>
            </div>

            {/* Project Images */}
            {project.images.length > 0 && (
              <div className="mb-12 sm:mb-16">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">Project Gallery</h2>
                <div className="grid gap-4 sm:gap-6">
                  {project.images.map((image, index) => (
                    <div key={index} className="aspect-video relative rounded-xl overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Navigation */}
        <section className="py-12 sm:py-16 bg-gray-900/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
              {/* Previous Project */}
              <div className="w-full lg:flex-1">
                {prevProject ? (
                  <Link
                    href={`/projects/${prevProject.id}`}
                    className="group flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors w-full"
                  >
                    <ArrowLeft className="text-gray-400 group-hover:text-white transition-colors flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-gray-400 text-sm">Previous Project</p>
                      <p className="text-white font-medium group-hover:text-blue-400 transition-colors truncate">
                        {prevProject.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>

              {/* Back to Projects */}
              <Link href="/#projects" className="order-first lg:order-none">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                  All Projects
                </Button>
              </Link>

              {/* Next Project */}
              <div className="w-full lg:flex-1 flex justify-end">
                {nextProject && (
                  <Link
                    href={`/projects/${nextProject.id}`}
                    className="group flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors w-full lg:w-auto"
                  >
                    <div className="text-right min-w-0 flex-1 lg:flex-none">
                      <p className="text-gray-400 text-sm">Next Project</p>
                      <p className="text-white font-medium group-hover:text-blue-400 transition-colors truncate">
                        {nextProject.title}
                      </p>
                    </div>
                    <ArrowLeft className="text-gray-400 group-hover:text-white transition-colors rotate-180 flex-shrink-0" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} - Vivek Pahilwan`,
    description: project.description,
  }
}
