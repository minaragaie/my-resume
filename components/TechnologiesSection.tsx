"use client"
const Code = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const Database = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="m3 5v14c0 3 4 6 9 6s9-3 9-6V5"></path>
    <path d="m3 12c0 3 4 6 9 6s9-3 9-6"></path>
  </svg>
)

const Globe = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
)

const Wrench = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
  </svg>
)

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
