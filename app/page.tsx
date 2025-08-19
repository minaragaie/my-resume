"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/components/HeroSection"
import ProjectsSection from "@/components/ProjectsSection"
import ExperienceSection from "@/components/ExperienceSection"
import TechnologiesSection from "@/components/TechnologiesSection"
import EducationSection from "@/components/EducationSection"
import CertificationsSection from "@/components/CertificationsSection"
import ContactSection from "@/components/ContactSection"
import StatusBar from "@/components/StatusBar"
import LogoLoader from "@/components/LogoLoader"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"

export default function Resume() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState("")
  const [status, setStatus] = useState("Ready for next challenge")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [animationStates, setAnimationStates] = useState({
    hero: true, // Hero starts visible since it's above the fold
    projects: false,
    experience: false,
    technologies: false,
    education: false,
    certifications: false,
    contact: false,
  })

  useEffect(() => {
    const handleThemeChange = () => {
      // Force a re-render to apply new theme variables
      setCurrentSection((prev) => prev)
    }

    window.addEventListener("themeChange", handleThemeChange)
    return () => window.removeEventListener("themeChange", handleThemeChange)
  }, [])

  useEffect(() => {
    if (isLoading) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id as keyof typeof animationStates

          if (entry.isIntersecting) {
            setCurrentSection(sectionId)
            setAnimationStates((prev) => ({ ...prev, [sectionId]: true }))
          }
        })
      },
      {
        threshold: 0.1, // Lower threshold to trigger earlier
        rootMargin: "-10% 0px -10% 0px", // Trigger when section is 10% into viewport
      },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [isLoading])

  const handleLoadComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LogoLoader onLoadComplete={handleLoadComplete} />
  }

  return (
    <div className="min-h-screen bg-[var(--vscode-bg)] text-[var(--vscode-text)] flex transition-colors duration-300">
      <div className="main-container w-full flex flex-row">
        <Sidebar
          currentSection={currentSection}
          onSectionClick={setCurrentSection}
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <div className="flex-1 h-screen flex flex-col transition-all duration-300`">
          <Header />  
          <main className={`flex-1  flex flex-col overflow-auto transition-all duration-300`}>
            {/* <div className="bg-[var(--vscode-sidebar)] border-b border-[var(--vscode-border)] px-4 py-2 flex items-center gap-4 flex-shrink-0 transition-colors duration-300"> */}
              {/* <Header /> */}

            {/* </div> */}

            <div className="flex-1 overflow-y-auto">
              <section id="hero" className="py-20 px-4 bg-[var(--bg-primary)] transition-colors duration-300">
                <HeroSection isVisible={animationStates.hero} />
              </section>

              <section id="projects" className="py-20 px-4 bg-[var(--bg-secondary)] transition-colors duration-300">
                <ProjectsSection isVisible={animationStates.projects} />
              </section>

              <section id="experience" className="py-20 px-4 bg-[var(--bg-primary)] transition-colors duration-300">
                <ExperienceSection isVisible={animationStates.experience} />
              </section>

              <section id="technologies" className="py-20 px-4 bg-[var(--bg-secondary)] transition-colors duration-300">
                <TechnologiesSection isVisible={animationStates.technologies} />
              </section>

              <section id="education" className="py-20 px-4 bg-[var(--bg-primary)] transition-colors duration-300">
                <EducationSection isVisible={animationStates.education} />
              </section>

              <section id="certifications" className="py-20 px-4 bg-[var(--bg-secondary)] transition-colors duration-300">
                <CertificationsSection isVisible={animationStates.certifications} />
              </section>

              <section id="contact" className="py-20 px-4 bg-[var(--bg-primary)] transition-colors duration-300">
                <ContactSection isVisible={animationStates.contact} onStatusChange={setStatus} />
              </section>
            </div>
          </main>
        </div>
        
      </div>

      <StatusBar status={status} onStatusChange={setStatus} sidebarCollapsed={sidebarCollapsed} />
    </div>
  )
}
