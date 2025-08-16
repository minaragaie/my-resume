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

export default function Resume() {
  const [currentSection, setCurrentSection] = useState("")
  const [status, setStatus] = useState("Ready for next challenge")
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
  }, [])

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] pb-12">
      <HeroSection isVisible={animationStates.hero} />
      <SkillsSection isVisible={animationStates.skills} />
      <ExperienceSection isVisible={animationStates.experience} />
      <TechnologiesSection isVisible={animationStates.technologies} />
      <EducationSection isVisible={animationStates.education} />
      <CertificationsSection isVisible={animationStates.certifications} />
      <ContactSection isVisible={animationStates.contact} onStatusChange={setStatus} />

      <StatusBar status={status} onStatusChange={setStatus} />
    </div>
  )
}
