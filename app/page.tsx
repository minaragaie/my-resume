"use client"

import { useState, useEffect } from "react"
import { GitBranch, Coffee } from "lucide-react"
import HeroSection from "@/components/HeroSection"
import SkillsSection from "@/components/SkillsSection"
import ExperienceSection from "@/components/ExperienceSection"
import TechnologiesSection from "@/components/TechnologiesSection"
import EducationSection from "@/components/EducationSection"
import CertificationsSection from "@/components/CertificationsSection"
import ContactSection from "@/components/ContactSection"

export default function Resume() {
  const [currentSection, setCurrentSection] = useState("")

  useEffect(() => {
    let observerTimeout: NodeJS.Timeout
    const observer = new IntersectionObserver(
      (entries) => {
        clearTimeout(observerTimeout)
        observerTimeout = setTimeout(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-fade-in-up")
              setCurrentSection(entry.target.id)
            }
          })
        }, 50)
      },
      { threshold: 0.2, rootMargin: "30px" },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      clearTimeout(observerTimeout)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4]">
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <TechnologiesSection />
      <EducationSection />
      <CertificationsSection />
      <ContactSection />

      {/* Footer */}
      <div className="bg-[#2d2d30] border-t border-[#3e3e42] px-4 py-3 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#4ec9b0]" />
            <span className="text-[#d4d4d4] font-mono">main</span>
          </div>
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-[#dcb67a]" />
            <span className="text-[#d4d4d4] font-mono">Ready for next challenge</span>
          </div>
        </div>
        <div className="text-[#d4d4d4] font-mono">© 2025 Mina Youaness</div>
      </div>
    </div>
  )
}
