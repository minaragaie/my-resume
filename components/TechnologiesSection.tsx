"use client"
import { Code, Database, Globe, Wrench, Shield, Zap } from "lucide-react"
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

interface TechnologiesSectionProps {
  isVisible: boolean
}

export default function TechnologiesSection({ isVisible }: TechnologiesSectionProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-base-content">
          <span className="text-primary font-mono">const</span> <span className="text-secondary">techStack</span>{" "}
          <span className="text-base-content">=</span> <span className="text-warning">{"{"}</span>
        </h2>
        <p className="text-base-content/70 max-w-2xl mx-auto font-mono">
          // Comprehensive technology ecosystem mastery
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {techCategories.map((category, index) => {
          const Icon = category.icon
          return (
            <div
              key={category.name}
              className={`card bg-base-200 shadow-lg hover:shadow-xl border border-base-content/20 hover:border-primary transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                transitionDuration: "600ms",
              }}
            >
              <div className="card-body p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 bg-gradient-to-br ${category.color} rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="card-title text-lg text-base-content">{category.name}</h3>
                    <p className="text-sm text-base-content/70">{category.items.length} technologies</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="mockup-code bg-base-300 p-3 mb-4">
                    <pre className="text-xs text-primary font-mono">
                      {category.name.toLowerCase().replace(/\s+/g, "")}: [
                    </pre>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="badge badge-outline hover:badge-primary transition-colors text-xs"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
