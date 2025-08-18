"use client"
import { Calendar, MapPin, ArrowDown, Briefcase, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import resumeData from "@/data/resume.json"

interface ExperienceSectionProps {
  isVisible: boolean
}

export default function ExperienceSection({ isVisible }: ExperienceSectionProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-[var(--text-primary)]">
          <span className="text-[var(--vscode-blue)] font-mono">class</span>{" "}
          <span className="text-[var(--vscode-green)]">CareerJourney</span>
        </h2>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto font-mono">
          // Navigating through professional milestones and growth
        </p>
      </div>

      <div className="relative">
        {/* Journey path line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--vscode-blue)] via-[var(--vscode-green)] to-[var(--vscode-yellow)] opacity-30"></div>

        <div className="space-y-12">
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Journey milestone marker */}
              <div className="absolute left-6 w-4 h-4 bg-[var(--vscode-blue)] rounded-full border-4 border-[var(--bg-primary)] z-10 shadow-lg shadow-[var(--vscode-blue)]/50"></div>

              {/* Journey step card */}
              <div
                className={`ml-16 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg p-8 hover:border-[var(--vscode-blue)] transition-all duration-700 hover:shadow-lg hover:shadow-[var(--vscode-blue)]/10 transform relative ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 300}ms`,
                  transitionProperty: "transform, opacity",
                }}
              >
                {/* Journey step indicator */}
                <div className="absolute -left-4 top-8 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-[var(--bg-tertiary)]"></div>

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase className="w-5 h-5 text-[var(--vscode-green)]" />
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">{exp.title}</h3>
                      {exp.type && (
                        <Badge variant="outline" className="text-[var(--vscode-green)] border-[var(--vscode-green)]">
                          {exp.type}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-[var(--text-primary)] mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[var(--vscode-blue)]" />
                        <span className="font-semibold text-[var(--vscode-blue)]">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[var(--vscode-yellow)]" />
                        <span className="text-[var(--vscode-yellow)]">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                    </div>
                    <p className="text-[var(--text-primary)] mb-4">{exp.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-[var(--vscode-blue)] font-mono mb-3">// Journey Milestones</h4>
                  <div className="bg-[var(--bg-primary)] rounded p-3 mb-4 transition-all duration-500 translate-y-0 opacity-100 border border-[var(--border-color)]">
                    <ul className="space-y-2">
                      {(exp.achievements || []).map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-3 text-[var(--text-primary)]">
                          <CheckCircle className="w-4 h-4 text-[var(--vscode-green)] mt-1 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-[var(--vscode-blue)] font-mono mb-3">// Tech Stack Evolved</h4>
                  <div className="flex flex-wrap gap-2">
                    {(exp.technologies || []).map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--vscode-blue)] hover:text-[var(--vscode-blue)] transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Journey continues arrow (except for last item) */}
              {index < resumeData.experience.length - 1 && (
                <div className="absolute left-7 -bottom-6 w-2 h-2">
                  <ArrowDown className="w-4 h-4 text-[var(--vscode-blue)] opacity-60 animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Journey end marker */}
        <div className="absolute left-6 bottom-0 w-4 h-4 bg-[var(--vscode-yellow)] rounded-full border-4 border-[var(--bg-primary)] z-10 shadow-lg shadow-[var(--vscode-yellow)]/50"></div>
      </div>
    </div>
  )
}
