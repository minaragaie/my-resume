"use client"
import { Calendar, MapPin, Code2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import resumeData from "@/data/resume.json"

interface ExperienceSectionProps {
  isVisible: boolean
}

export default function ExperienceSection({ isVisible }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 px-4 bg-[#1e1e1e]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            <span className="text-[#569cd6] font-mono">interface</span>{" "}
            <span className="text-[#4ec9b0]">WorkExperience</span>
          </h2>
          <p className="text-[#d4d4d4] max-w-2xl mx-auto font-mono">
            // Professional journey building scalable applications
          </p>
        </div>

        <div className="space-y-8">
          {resumeData.experience.map((exp, index) => (
            <div
              key={exp.id}
              className={`bg-[#252526] border border-[#3e3e42] rounded-lg p-8 hover:border-[#007acc] transition-all duration-700 hover:shadow-lg hover:shadow-[#007acc]/10 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
                transitionProperty: "transform, opacity",
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Code2 className="w-5 h-5 text-[#4ec9b0]" />
                    <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                    {exp.type && (
                      <Badge variant="outline" className="text-[#4ec9b0] border-[#4ec9b0]">
                        {exp.type}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-[#d4d4d4] mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#007acc]" />
                      <span className="font-semibold text-[#007acc]">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#dcb67a]" />
                      <span className="text-[#dcb67a]">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#d4d4d4] mb-4">{exp.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-[#569cd6] font-mono mb-3">// Key Achievements</h4>
                <ul className="space-y-2">
                  {(exp.achievements || []).map((achievement, achIndex) => (
                    <li key={achIndex} className="flex items-start gap-3 text-[#d4d4d4]">
                      <span className="text-[#4ec9b0] mt-1">▸</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[#569cd6] font-mono mb-3">// Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {(exp.technologies || []).map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-[#1e1e1e] text-[#d4d4d4] border border-[#3e3e42] hover:border-[#007acc] hover:text-[#007acc] transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
