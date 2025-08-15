"use client"

import { useState, useEffect } from "react"
import { Code, Database, Globe, Wrench, Shield, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import resumeData from "@/data/resume.json"

const techCategories = [
  {
    name: "Languages",
    icon: Code,
    color: "from-blue-400 to-cyan-500",
    items: resumeData.skills.languages,
  },
  {
    name: "Frameworks",
    icon: Globe,
    color: "from-green-400 to-emerald-500",
    items: resumeData.skills.frameworks,
  },
  {
    name: "Databases",
    icon: Database,
    color: "from-purple-400 to-violet-500",
    items: resumeData.skills.databases,
  },
  {
    name: "Tools & Technologies",
    icon: Wrench,
    color: "from-orange-400 to-red-500",
    items: [...resumeData.skills.technologies, ...resumeData.skills.versionControl],
  },
  {
    name: "Methodologies",
    icon: Zap,
    color: "from-yellow-400 to-orange-500",
    items: resumeData.skills.methodologies,
  },
  {
    name: "Standards & Best Practices",
    icon: Shield,
    color: "from-indigo-400 to-blue-500",
    items: resumeData.skills.standards,
  },
]

export default function TechnologiesSection() {
  const [techVisible, setTechVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setTechVisible(true), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="technologies" className="py-20 px-4 bg-[#252526]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            <span className="text-[#569cd6] font-mono">const</span> <span className="text-[#4ec9b0]">techStack</span>{" "}
            <span className="text-white">=</span> <span className="text-[#ce9178]">{"{"}</span>
          </h2>
          <p className="text-[#d4d4d4] max-w-2xl mx-auto font-mono">// Comprehensive technology ecosystem mastery</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={category.name}
                className={`bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-6 hover:border-[#007acc] transition-all duration-300 hover:shadow-lg hover:shadow-[#007acc]/20 ${
                  techVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 bg-gradient-to-br ${category.color} rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                    <p className="text-sm text-[#d4d4d4]">{category.items.length} technologies</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-[#2d2d30] rounded p-3 mb-4">
                    <code className="text-xs text-[#569cd6] font-mono">
                      {category.name.toLowerCase().replace(/\s+/g, "")}: [
                    </code>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, itemIndex) => (
                      <Badge
                        key={itemIndex}
                        variant="secondary"
                        className="bg-[#2d2d30] text-[#d4d4d4] border border-[#3e3e42] hover:border-[#007acc] hover:text-[#007acc] transition-colors text-xs"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
