'use client'
import SectionTitle from '@/components/SectionTitle'
import { PROJECTS } from '@/data'
import { cn } from '@/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useEffect, useRef, useState, MouseEvent } from 'react'
import Project from './Project'
import { ensureGsapScrollTrigger } from '~/utils/gsapClient'

const ProjectList = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const projectListRef = useRef<HTMLDivElement>(null)
  const imageContainer = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(PROJECTS[0].slug)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let mounted = true
    ensureGsapScrollTrigger().then((ok) => mounted && setReady(ok))
    return () => {
      mounted = false
    }
  }, [])

  useGSAP(
    (_context, contextSafe) => {
      if (!ready) return

      if (window.innerWidth < 768) {
        setSelectedProject(null)
        return
      }

      const handleMouseMove = contextSafe?.((e: MouseEvent) => {
        if (!containerRef.current || !imageContainer.current) return

        if (window.innerWidth < 768) {
          setSelectedProject(null)
          return
        }

        const containerRect = containerRef.current.getBoundingClientRect()
        const imageRect = imageContainer.current.getBoundingClientRect()
        const offsetTop = e.clientY - containerRect.y

        if (
          containerRect.y > e.clientY ||
          containerRect.bottom < e.clientY ||
          containerRect.x > e.clientX ||
          containerRect.right < e.clientX
        ) {
          return gsap.to(imageContainer.current, { duration: 0.3, opacity: 0 })
        }

        gsap.to(imageContainer.current, {
          y: offsetTop - imageRect.height / 2,
          duration: 1,
          opacity: 1,
        })
      }) as any

      window.addEventListener('mousemove', handleMouseMove)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    },
    { scope: containerRef, dependencies: [ready, containerRef.current] }
  )

  useGSAP(
    () => {
      if (!ready) return
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'top 80%',
          toggleActions: 'restart none none reverse',
          scrub: 1,
        },
      })
      tl.from(containerRef.current, { y: 150, opacity: 0 })
    },
    { scope: containerRef, dependencies: [ready] }
  )

  const handleMouseEnter = (slug: string) => {
    if (window.innerWidth < 768) {
      setSelectedProject(null)
      return
    }
    setSelectedProject(slug)
  }

  return (
    <section className="pb-section mb-64" id="selected-projects">
      <div className="container">
        <SectionTitle title="SELECTED PROJECTS" />
        <div className="group/projects relative" ref={containerRef}>
          {selectedProject !== null && (
            <div
              className="max-md:hidden absolute right-0 top-0 z-[1] pointer-events-none w-[200px] xl:w-[350px] aspect-[3/4] overflow-hidden opacity-0"
              ref={imageContainer}
            >
              {PROJECTS.map((project) => (
                <img
                  src={project.thumbnail}
                  alt="Project"
                  width="400"
                  height="500"
                  className={cn(
                    'absolute inset-0 transition-all duration-500 w/full h/full object-cover'.replace(
                      '/full',
                      '/full'
                    ), // garde la classe telle quelle
                    { 'opacity-0': project.slug !== selectedProject }
                  )}
                  ref={imageRef}
                  key={project.slug}
                />
              ))}
            </div>
          )}

          <div className="flex flex-col max-md:gap-10" ref={projectListRef}>
            {PROJECTS.map((project, index) => (
              <Project
                index={index}
                projet={project}
                selectedProject={selectedProject}
                onMouseEnter={handleMouseEnter}
                key={project.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectList
