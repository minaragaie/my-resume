"use client"
import { Calendar, MapPin, ArrowDown, Briefcase, CheckCircle } from "lucide-react"
import resumeData from "@/data/resume.json"

interface ExperienceSectionProps {
  isVisible: boolean
}

export default function ExperienceSection({ isVisible }: ExperienceSectionProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section header */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-base-content">
          <span className="text-primary font-mono">class</span> <span className="text-secondary">CareerJourney</span>
        </h2>
        <p className="text-sm sm:text-base text-base-content/70 max-w-2xl mx-auto font-mono">
          // Navigating through professional milestones and growth
        </p>
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-3 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30"></div>

        <div className="space-y-10 sm:space-y-12">
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline marker */}
              <div className="absolute left-2 sm:left-6 w-3 sm:w-4 h-3 sm:h-4 bg-primary rounded-full border-2 sm:border-4 border-base-100 z-10 shadow-md shadow-primary/50"></div>

              {/* Step card */}
              <div
                className={`ml-6 sm:ml-16 card bg-base-200 shadow-lg hover:shadow-xl border border-base-content/20 hover:border-primary transition-all duration-700 transform relative ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-4 sm:translate-x-12 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 300}ms`,
                  transitionProperty: "transform, opacity",
                }}
              >
                {/* Triangle pointer */}
                <div className="absolute -left-3 sm:-left-4 top-6 sm:top-8 w-0 h-0 border-t-6 sm:border-t-8 border-b-6 sm:border-b-8 border-r-6 sm:border-r-8 border-transparent border-r-base-200"></div>

                {/* Card content */}
                <div className="card-body p-4 sm:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 sm:mb-6">
                    <div className="flex-1">
                      {/* Title + Badge */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                        <h3 className="card-title text-lg sm:text-xl text-base-content">{exp.title}</h3>
                        {exp.type && <div className="badge badge-outline badge-secondary">{exp.type}</div>}
                      </div>

                      {/* Company + Dates */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-base-content mb-3">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-semibold text-primary">{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span className="text-accent text-sm sm:text-base">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                      </div>

                      <p className="text-base-content text-sm sm:text-base mb-4">{exp.description}</p>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-primary font-mono mb-2 sm:mb-3 text-sm sm:text-base">// Journey Milestones</h4>
                    <div className="bg-base-300 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 transition-all duration-500 border border-base-content/20">
                      <ul className="space-y-2">
                        {(exp.achievements || []).map((achievement, achIndex) => (
                          <li
                            key={achIndex}
                            className="flex items-start gap-2 sm:gap-3 text-base-content text-sm sm:text-base"
                          >
                            <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-primary font-mono mb-2 sm:mb-3 text-sm sm:text-base">// Tech Stack Evolved</h4>
                    <div className="flex flex-wrap gap-1">
                      {(exp.technologies || []).map((tech, techIndex) => (
                        <div
                          key={techIndex}
                          className="badge badge-outline hover:badge-primary transition-colors text-xs sm:text-sm"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Down arrow */}
              {index < resumeData.experience.length - 1 && (
                <div className="absolute left-3 sm:left-7 -bottom-5 sm:-bottom-6 w-2 h-2">
                  <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-primary opacity-60 animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* End marker */}
        <div className="absolute left-3 sm:left-6 bottom-0 w-3 sm:w-4 h-3 sm:h-4 bg-accent rounded-full border-2 sm:border-4 border-base-100 z-10 shadow-md shadow-accent/50"></div>
      </div>
    </div>
  )
}
