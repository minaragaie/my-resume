"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/components/HeroSection"
import SkillsSection from "@/components/SkillsSection"
import ExperienceSection from "@/components/ExperienceSection"
import TechnologiesSection from "@/components/TechnologiesSection"
import EducationSection from "@/components/EducationSection"
import CertificationsSection from "@/components/CertificationsSection"
import ContactSection from "@/components/ContactSection"
import StatusBar from "@/components/StatusBar"
import LogoLoader from "@/components/LogoLoader"
import Sidebar from "@/components/Sidebar"

export default function Resume() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState("")
  const [status, setStatus] = useState("Ready for next challenge")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [animationStates, setAnimationStates] = useState({
    hero: true, // Hero starts visible since it's above the fold
    skills: false,
    experience: false,
    technologies: false,
    education: false,
    certifications: false,
    contact: false,
  })

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
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] flex">
      <Sidebar
        currentSection={currentSection}
        onSectionClick={setCurrentSection}
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className={`flex-1 h-screen flex flex-col transition-all duration-300`}>
        <div className="flex-1 overflow-y-auto pb-16">
          <section id="hero">
            <HeroSection isVisible={animationStates.hero} />
          </section>
          <section id="skills">
            <SkillsSection isVisible={animationStates.skills} />
          </section>
          <section id="experience">
            <ExperienceSection isVisible={animationStates.experience} />
          </section>
          <section id="technologies">
            <TechnologiesSection isVisible={animationStates.technologies} />
          </section>
          <section id="education">
            <EducationSection isVisible={animationStates.education} />
          </section>
          <section id="certifications">
            <CertificationsSection isVisible={animationStates.certifications} />
          </section>
          <section id="contact">
            <ContactSection isVisible={animationStates.contact} onStatusChange={setStatus} />
          </section>
        </div>
      </div>

      <StatusBar status={status} onStatusChange={setStatus} sidebarCollapsed={sidebarCollapsed} />
    </div>
  )
}
