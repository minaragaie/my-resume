"use client"
import { Calendar, MapPin, ArrowDown, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import resumeData from "@/data/resume.json"

interface ExperienceSectionProps {
  isVisible: boolean
}

export default function ExperienceSection({ isVisible }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 px-4 bg-[var(--vscode-bg)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-[var(--vscode-text)]">
            <span className="text-[var(--vscode-keyword)] font-mono">class</span>{" "}
            <span className="text-[var(--vscode-success)]">CareerJourney</span>
          </h2>
          <p className="text-[var(--vscode-text)] max-w-2xl mx-auto font-mono">
            // Navigating through professional milestones and growth
          </p>
        </div>

        <div className="relative">
          {/* Journey path line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--vscode-accent)] via-[var(--vscode-success)] to-[var(--vscode-warning)] opacity-30"></div>

          <div className="space-y-12">
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} id={`experience-${exp.id}`} className="relative">
                {/* Journey milestone marker */}
                <div className="absolute left-6 w-4 h-4 bg-[var(--vscode-accent)] rounded-full border-4 border-[var(--vscode-bg)] z-10 shadow-lg shadow-[var(--vscode-accent)]/50"></div>

                {/* Journey step card */}
                <div
                  className={`ml-16 bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-lg p-8 hover:border-[var(--vscode-accent)] transition-all duration-700 hover:shadow-lg hover:shadow-[var(--vscode-accent)]/10 transform relative ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${index * 300}ms`,
                    transitionProperty: "transform, opacity",
                  }}
                >
                  {/* Journey step indicator */}
                  <div className="absolute -left-4 top-8 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-[var(--vscode-sidebar)]"></div>

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="w-5 h-5 text-[var(--vscode-success)]" />
                        <h3 className="text-xl font-bold text-[var(--vscode-text)]">{exp.title}</h3>
                        {exp.type && (
                          <Badge
                            variant="outline"
                            className="text-[var(--vscode-success)] border-[var(--vscode-success)]"
                          >
                            {exp.type}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-[var(--vscode-text)] mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[var(--vscode-accent)]" />
                          <span className="font-semibold text-[var(--vscode-accent)]">{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[var(--vscode-warning)]" />
                          <span className="text-[var(--vscode-warning)]">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                      </div>
                      <p className="text-[var(--vscode-text)] mb-4">{exp.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-[var(--vscode-keyword)] font-mono mb-3">// Journey Milestones</h4>
                    <ul className="space-y-2">
                      {(exp.achievements || []).map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-3 text-[var(--vscode-text)]">
                          <span className="text-[var(--vscode-success)] mt-1">🚀</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[var(--vscode-keyword)] font-mono mb-3">// Tech Stack Evolved</h4>
                    <div className="flex flex-wrap gap-2">
                      {(exp.technologies || []).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="bg-[var(--vscode-bg)] text-[var(--vscode-text)] border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)] hover:text-[var(--vscode-accent)] transition-colors"
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
                    <ArrowDown className="w-4 h-4 text-[var(--vscode-accent)] opacity-60 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Journey end marker */}
          <div className="absolute left-6 bottom-0 w-4 h-4 bg-[var(--vscode-warning)] rounded-full border-4 border-[var(--vscode-bg)] z-10 shadow-lg shadow-[var(--vscode-warning)]/50"></div>
        </div>
      </div>
    </section>
  )
}
