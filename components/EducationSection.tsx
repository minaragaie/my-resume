import { resumeData } from "@/lib/resume-data"
import { GraduationCap, Calendar, Building } from "lucide-react"

interface EducationSectionProps {
  isVisible: boolean
}

export default function EducationSection({ isVisible }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 bg-[#1e1e1e]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="text-[#007acc]">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#007acc] to-[#4ec9b0] mx-auto"></div>
        </div>

        <div className="grid gap-8">
          {resumeData.education.map((edu, index) => (
            <div
              key={index}
              className={`bg-[#252526] rounded-lg p-8 border border-[#3e3e42] hover:border-[#007acc] transition-all duration-300 group ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
                transitionDuration: "600ms",
              }}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#007acc] to-[#4ec9b0] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#4ec9b0] transition-colors">
                    {edu.degree}
                  </h3>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-[#cccccc]">
                      <Building className="w-4 h-4 text-[#007acc]" />
                      <span>{edu.institution}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#cccccc]">
                      <Calendar className="w-4 h-4 text-[#4ec9b0]" />
                      <span>{edu.year}</span>
                    </div>
                  </div>

                  <div className="text-[#cccccc] leading-relaxed">
                    <p>
                      Strong technical fundamentals in computer science, software engineering, and web development
                      technologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
