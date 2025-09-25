import projects, { Project } from '../../../data/projects'
import { PROJECT_IMAGE_MAP } from '../../../data/content/projectImages'
import { ParsedUrlQuery } from 'querystring'
import ProjectDetailClient from './ProjectDetailClient'
import { notFound } from 'next/navigation'

interface PageParams extends ParsedUrlQuery {
  slug: string | string[]
}

export async function generateMetadata({ params }: { params: PageParams }) {
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const project = projects.find((p) => p.slug === slug)
  return {
    title: project ? `${project.title} 丨 JiangYu` : 'JiangYu',
  }
}

export default function ProjectDetailPage({ params }: { params: PageParams }) {
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const project: Project | undefined = projects.find((p) => p.slug === slug)
  const projectContent = slug ? PROJECT_IMAGE_MAP[slug] : undefined

  if (!project) {
    notFound()
  }

  return (
    <ProjectDetailClient
      slug={slug}
      project={project}
      projectContent={projectContent}
    />
  )
}
