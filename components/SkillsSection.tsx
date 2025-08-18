"use client"
import { Code, Database, Globe, GitBranch, Wrench, Target, Award } from "lucide-react"
import { staticResumeData } from "@/lib/resume-data"

const skillIcons: { [key: string]: string } = {
  // Languages
  JavaScript: "🟨",
  Java: "☕",
  TypeScript: "🔷",
  HTML5: "🌐",
  CSS3: "🎨",
  PHP: "🐘",
  Python: "🐍",
  // Frameworks
  Angular: "🅰️",
  React: "⚛️",
  "Node.js": "🟢",
  Bootstrap: "🅱️",
  jQuery: "💙",
  // Databases
  PostgreSQL: "🐘",
  MySQL: "🐬",
  // Version Control
  Git: "📦",
  Sequelize: "🔗",
  // Technologies
  WordPress: "📝",
  PWA: "📱",
  // Default
  default: "⚡",
}

const skillCategories = [
  {
    name: "Languages",
    icon: Code,
    color: "from-yellow-400 to-orange-500",
    skills: staticResumeData.skills.languages,
    syntax: "const languages = ['expert'];",
  },
  {
    name: "Frameworks",
    icon: Globe,
    color: "from-blue-400 to-cyan-500",
    skills: staticResumeData.skills.frameworks,
    syntax: "import { frameworks } from 'expertise';",
  },
  {
    name: "Databases",
    icon: Database,
    color: "from-purple-400 to-violet-500",
    skills: staticResumeData.skills.databases,
    syntax: "SELECT * FROM knowledge;",
  },
  {
    name: "Version Control",
    icon: GitBranch,
    color: "from-green-400 to-emerald-500",
    skills: staticResumeData.skills.versionControl,
    syntax: "git commit -m 'expert level';",
  },
  {
    name: "Technologies",
    icon: Wrench,
    color: "from-indigo-400 to-blue-500",
    skills: staticResumeData.skills.technologies,
    syntax: "tech.implement({ level: 'advanced' });",
  },
  {
    name: "Methodologies",
    icon: Target,
    color: "from-red-400 to-pink-500",
    skills: staticResumeData.skills.methodologies,
    syntax: "methodology.apply('agile');",
  },
  {
    name: "Standards",
    icon: Award,
    color: "from-orange-400 to-red-500",
    skills: staticResumeData.skills.standards,
    syntax: "standards.comply({ wcag: '2.1' });",
  },
]

interface SkillsSectionProps {
  isVisible: boolean
}

export default function SkillsSection({ isVisible }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-20 px-4 bg-[var(--vscode-sidebar)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[var(--vscode-text)]">
            <span className="text-[var(--vscode-keyword)] font-mono">class</span>{" "}
            <span className="text-[var(--vscode-success)]">TechnicalSkills</span>
          </h2>
          <p className="text-[var(--vscode-text)] max-w-2xl mx-auto font-mono">
            // Comprehensive expertise built through hands-on experience
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon
            return (
              <div
                key={category.name}
                id={`skill-${category.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className={`bg-[var(--vscode-bg)] border border-[var(--vscode-border)] rounded-lg p-6 hover:border-[var(--vscode-accent)] transition-all duration-700 hover:shadow-lg hover:shadow-[var(--vscode-accent)]/20 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${categoryIndex * 150}ms`,
                  transitionProperty: "transform, opacity",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 bg-gradient-to-br ${category.color} rounded`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--vscode-text)]">{category.name}</h3>
                    <p className="text-sm text-[var(--vscode-text)]">{category.skills.length} skills</p>
                  </div>
                </div>

                <div className="bg-[var(--vscode-sidebar)] rounded p-3 mb-4">
                  <code className="text-xs text-[var(--vscode-string)] font-mono">{category.syntax}</code>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill}
                      className={`flex items-center gap-2 text-xs text-[var(--vscode-text)] bg-[var(--vscode-sidebar)] px-2 py-1.5 rounded hover:bg-[var(--vscode-border)] transition-all duration-500 ${
                        isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                      }`}
                      style={{
                        transitionDelay: `${categoryIndex * 150 + skillIndex * 50 + 300}ms`,
                      }}
                    >
                      <span className="text-sm">{skillIcons[skill] || skillIcons.default}</span>
                      <span className="truncate">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
