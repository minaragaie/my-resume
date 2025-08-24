import { resumeData } from "@/lib/resume-data"
import { GraduationCap, Calendar, Building } from "lucide-react"

interface EducationSectionProps {
  isVisible: boolean
}

export default function EducationSection({ isVisible }: EducationSectionProps) {
  return (<div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-[var(--vscode-text)]">
          <span className="font-mono text-[var(--vscode-blue)]">class</span>{" "}
          <span className="text-[var(--vscode-green)]">Education</span>
        </h2>
        <p className="max-w-2xl mx-auto font-mono text-[var(--vscode-text-muted)]">
          // Academic foundation in computer science and technology
        </p>
      </div>

      <div className="grid gap-8">
        {resumeData.education.map((edu, index) => (
          <div
            key={index}
            className={`rounded-lg p-8 border transition-all duration-300 group ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--vscode-border)",
              transitionDelay: `${index * 200}ms`,
              transitionDuration: "600ms",
            }}
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(to bottom right, var(--vscode-blue), var(--vscode-green))`,
                  }}
                >
                  <GraduationCap className="w-8 h-8 text-[var(--vscode-text)]" />
                </div>
              </div>

              <div className="flex-1">
                <h3
                  className="text-2xl font-bold mb-2 group-hover:text-[var(--vscode-green)] transition-colors duration-300"
                  style={{ color: "var(--vscode-text)" }}
                >
                  {edu.degree}
                </h3>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-[var(--vscode-text-muted)]">
                    <Building className="w-4 h-4 text-[var(--vscode-blue)]" />
                    <span>{edu.institution}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--vscode-text-muted)]">
                    <Calendar className="w-4 h-4 text-[var(--vscode-green)]" />
                    <span>{edu.year}</span>
                  </div>
                </div>

                <div className="leading-relaxed text-[var(--vscode-text-muted)]">
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
  )
}
