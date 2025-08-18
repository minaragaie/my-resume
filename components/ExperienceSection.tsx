"use client"
import { Calendar, MapPin, ArrowDown, Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import resumeData from "@/data/resume.json"

interface ExperienceSectionProps {
  isVisible: boolean
}

export default function ExperienceSection({ isVisible }: ExperienceSectionProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 text-[var(--text-primary)]">
          <span className="text-[#569cd6] font-mono">class</span> <span className="text-[#4ec9b0]">CareerJourney</span>
        </h2>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto font-mono">
          // Navigating through professional milestones and growth
        </p>
      </div>

      <div className="relative">
        {/* Journey path line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#007acc] via-[#4ec9b0] to-[#dcb67a] opacity-30"></div>

        <div className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="relative group">
              {/* Journey milestone marker */}
              <div className="absolute left-6 w-4 h-4 bg-[#007acc] rounded-full border-4 border-[var(--bg-primary)] z-10 shadow-lg shadow-[#007acc]/50 group-hover:scale-125 transition-transform duration-300"></div>

              <div
                className={`ml-16 bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-6 hover:border-[#007acc] transition-all duration-700 hover:shadow-2xl hover:shadow-[#007acc]/20 transform relative backdrop-blur-sm ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 300}ms`,
                  transitionProperty: "transform, opacity",
                }}
              >
                <div className="absolute -left-4 top-8 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-[var(--bg-tertiary)] drop-shadow-lg"></div>

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-[#4ec9b0]/10 rounded-lg border border-[#4ec9b0]/20">
                        <Briefcase className="w-5 h-5 text-[#4ec9b0]" />
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">{exp.title}</h3>
                      {exp.type && (
                        <Badge
                          variant="outline"
                          className="text-[#4ec9b0] border-[#4ec9b0] bg-[#4ec9b0]/5 hover:bg-[#4ec9b0]/10 transition-colors"
                        >
                          {exp.type}
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-[#d4d4d4] mb-3">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#007acc]/10 rounded-lg border border-[#007acc]/20">
                        <MapPin className="w-4 h-4 text-[#007acc]" />
                        <span className="font-semibold text-[#007acc]">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#dcb67a]/10 rounded-lg border border-[#dcb67a]/20">
                        <Calendar className="w-4 h-4 text-[#dcb67a]" />
                        <span className="text-[#dcb67a] font-medium">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[var(--bg-primary)]/30 rounded-lg p-4 border-l-4 border-[#007acc] mb-4">
                      <p className="text-[#d4d4d4] leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-[#569cd6] rounded-full"></div>
                    <h4 className="text-[#569cd6] font-mono font-semibold">Journey Milestones</h4>
                    <div className="flex-1 h-px bg-gradient-to-r from-[#569cd6]/30 to-transparent"></div>
                  </div>
                  <div className="space-y-1.5">
                    {(exp.achievements || []).map((achievement, achIndex) => (
                      <div
                        key={achIndex}
                        className="flex items-start gap-3 p-2.5 bg-gradient-to-r from-[var(--bg-primary)]/40 to-[var(--bg-primary)]/10 rounded-md border-l-3 border-[#4ec9b0] hover:border-l-[#007acc] hover:bg-gradient-to-r hover:from-[#007acc]/10 hover:to-[#4ec9b0]/5 transition-all duration-300 group"
                      >
                        <div className="w-1.5 h-1.5 bg-[#4ec9b0] rounded-full mt-2 group-hover:bg-[#007acc] transition-colors flex-shrink-0"></div>
                        <span className="text-[#d4d4d4] leading-relaxed text-sm font-medium group-hover:text-white transition-colors">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-[#569cd6] rounded-full"></div>
                    <h4 className="text-[#569cd6] font-mono font-semibold">Tech Stack Evolution</h4>
                    <div className="flex-1 h-px bg-gradient-to-r from-[#569cd6]/30 to-transparent"></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(exp.technologies || []).map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-gradient-to-r from-[#1e1e1e] to-[#2d2d30] text-[#d4d4d4] border border-[#3e3e42] hover:border-[#007acc] hover:text-[#007acc] hover:shadow-lg hover:shadow-[#007acc]/20 transition-all duration-300 px-3 py-1.5 font-medium"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Journey continues arrow (except for last item) */}
              {index < resumeData.experience.length - 1 && (
                <div className="absolute left-7 -bottom-3 w-2 h-2">
                  <ArrowDown className="w-4 h-4 text-[#007acc] opacity-60 animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Journey end marker */}
        <div className="absolute left-6 bottom-0 w-4 h-4 bg-[#dcb67a] rounded-full border-4 border-[var(--bg-primary)] z-10 shadow-lg shadow-[#dcb67a]/50"></div>
      </div>
    </div>
  )
}
