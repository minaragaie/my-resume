"use client"

import { useState, useEffect } from "react"
import { Code, Database, Shield, Globe } from "lucide-react"

const skills = [
  {
    name: "JavaScript/TypeScript",
    level: 95,
    icon: Code,
    color: "from-yellow-400 to-orange-500",
    syntax: "const skills = 'expert';",
  },
  {
    name: "Angular",
    level: 90,
    icon: Globe,
    color: "from-red-500 to-pink-500",
    syntax: "@Component({ expert: true })",
  },
  {
    name: "React",
    level: 88,
    icon: Globe,
    color: "from-blue-400 to-cyan-500",
    syntax: "const [skill] = useState('high');",
  },
  {
    name: "Node.js",
    level: 85,
    icon: Code,
    color: "from-green-400 to-emerald-500",
    syntax: "app.listen(3000, 'expert');",
  },
  {
    name: "Database Management",
    level: 82,
    icon: Database,
    color: "from-purple-400 to-violet-500",
    syntax: "SELECT * FROM expertise;",
  },
  {
    name: "Security Practices",
    level: 88,
    icon: Shield,
    color: "from-indigo-400 to-blue-500",
    syntax: "auth.secure({ level: 'high' });",
  },
]

export default function SkillsSection() {
  const [skillsVisible, setSkillsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setSkillsVisible(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="skills" className="py-20 px-4 bg-[#252526]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            <span className="text-[#569cd6] font-mono">class</span>{" "}
            <span className="text-[#4ec9b0]">TechnicalSkills</span>
          </h2>
          <p className="text-[#d4d4d4] max-w-2xl mx-auto font-mono">
            // Comprehensive expertise built through hands-on experience
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.name}
                className={`bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-6 hover:border-[#007acc] transition-all duration-300 hover:shadow-lg hover:shadow-[#007acc]/20 ${
                  skillsVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 bg-gradient-to-br ${skill.color} rounded`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{skill.name}</h3>
                    <p className="text-sm text-[#d4d4d4]">{skill.level}%</p>
                  </div>
                </div>

                <div className="bg-[#2d2d30] rounded p-3 mb-4">
                  <code className="text-xs text-[#ce9178] font-mono">{skill.syntax}</code>
                </div>

                <div className="relative">
                  <div className="h-2 bg-[#3e3e42] rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-2000 ease-out`}
                      style={{
                        width: skillsVisible ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 150 + 500}ms`,
                      }}
                    />
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
