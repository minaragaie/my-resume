import { resumeData } from "@/lib/resume-data"
import { GraduationCap, Calendar, Building } from "lucide-react"

interface EducationSectionProps {
  isVisible: boolean
}

export default function EducationSection({ isVisible }: EducationSectionProps) {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-base-content">
          <span className="text-primary font-mono">class</span> <span className="text-secondary">Education</span>
        </h2>
        <p className="text-base-content/70 max-w-2xl mx-auto font-mono">
          // Academic foundation in computer science and technology
        </p>
      </div>

      <div className="grid gap-8">
        {resumeData.education.map((edu, index) => (
          <div
            key={index}
            className={`card bg-base-200 shadow-lg hover:shadow-xl border border-base-content/20 hover:border-primary transition-all duration-300 group ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: `${index * 200}ms`,
              transitionDuration: "600ms",
            }}
          >
            <div className="card-body p-8">
              <div className="flex items-start gap-6">
                <div className="avatar placeholder">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="card-title text-2xl text-base-content mb-2 group-hover:text-secondary transition-colors">
                    {edu.degree}
                  </h3>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-base-content/80">
                      <Building className="w-4 h-4 text-primary" />
                      <span>{edu.institution}</span>
                    </div>
                    <div className="flex items-center gap-2 text-base-content/80">
                      <Calendar className="w-4 h-4 text-secondary" />
                      <span>{edu.year}</span>
                    </div>
                  </div>

                  <div className="text-base-content/80 leading-relaxed">
                    <p>
                      Strong technical fundamentals in computer science, software engineering, and web development
                      technologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
