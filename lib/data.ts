import personalData from "@/data/personal.json"
import projectsData from "@/data/projects.json"
import experienceData from "@/data/experience.json"
import skillsData from "@/data/skills.json"

export const personal = personalData
export const projects = projectsData.projects
export const experience = experienceData.experience
export const skills = skillsData.skills

export const featuredProjects = projects.filter((project) => project.featured)

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.id === slug)
}
