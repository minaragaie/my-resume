"use client"
import { Building2, Users, GraduationCap, Stethoscope, Calendar, MessageCircle } from "lucide-react"

const recentProjects = [
  {
    name: "Turris ERP System",
    description:
      "Comprehensive enterprise resource planning system for managing day-to-day business activities with real-time data processing and advanced reporting capabilities.",
    technologies: ["Angular", "DevExtreme", "Node.js", "PostgreSQL", "WebSockets", "TypeScript"],
    icon: Building2,
    color: "from-blue-400 to-cyan-500",
    status: "Production",
    year: "2023-2025",
  },
  {
    name: "EntityConnect Platform",
    description:
      "Entity management & communications app with membership management, event registration, online donations, and workflow automation for organizations.",
    technologies: ["Angular", "Kendo UI", "SailsJS", "Node.js", "MySQL", "PWA"],
    icon: Users,
    color: "from-green-400 to-emerald-500",
    status: "Live",
    year: "2018-2022",
  },
  {
    name: "Abgadya Learning Platform",
    description:
      "Progressive Web App for high school students providing educational content through interactive books, videos, lessons, and exercises with offline capabilities.",
    technologies: ["Angular 10", "Ionic", "PHP", "Laravel", "PWA", "WordPress"],
    icon: GraduationCap,
    color: "from-purple-400 to-violet-500",
    status: "Active",
    year: "2018-2021",
  },
  {
    name: "Medical Rep Management System",
    description:
      "Healthcare industry solution helping pharmaceutical companies manage sales teams and medical representatives with real-time tracking and reporting.",
    technologies: ["Ionic", "Angular 7-10", "Bootstrap", "PHP", "MySQL", "Cross-platform"],
    icon: Stethoscope,
    color: "from-red-400 to-pink-500",
    status: "Deployed",
    year: "2016-2018",
  },
  {
    name: "WordPress Booking Engine",
    description:
      "Custom WordPress plugin featuring a fully functional reservation system with payment integration, calendar management, and automated notifications.",
    technologies: ["WordPress", "PHP", "JavaScript", "MySQL", "Bootstrap", "Payment APIs"],
    icon: Calendar,
    color: "from-orange-400 to-red-500",
    status: "Plugin",
    year: "2020-2021",
  },
  {
    name: "Real-time Communication Suite",
    description:
      "WebSocket-based communication platform enabling real-time messaging, notifications, and data synchronization across multiple client applications.",
    technologies: ["WebSockets", "Node.js", "React", "TypeScript", "Redis", "Socket.io"],
    icon: MessageCircle,
    color: "from-indigo-400 to-blue-500",
    status: "Framework",
    year: "2022-2024",
  },
]

interface ProjectsSectionProps {
  isVisible: boolean
}

export default function ProjectsSection({ isVisible }: ProjectsSectionProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <h2 className="text-4xl font-bold mb-4 text-base-content">
          <span className="text-primary font-mono">const</span> <span className="text-secondary">recentProjects</span>{" "}
          <span className="text-base-content">=</span> <span className="text-warning">{"["}</span>
        </h2>
        <p className="text-base-content/70 max-w-2xl mx-auto font-mono">
          // Showcasing innovative solutions built with modern technologies
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentProjects.map((project, projectIndex) => {
          const Icon = project.icon
          return (
            <div
              key={project.name}
              className={`card bg-base-200 shadow-lg hover:shadow-xl border border-base-content/20 hover:border-primary transition-all duration-700 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: `${projectIndex * 150 + 200}ms`,
                transitionProperty: "transform, opacity, border-color, box-shadow, scale",
              }}
            >
              <div className="card-body p-6">
                <div
                  className={`flex items-center gap-3 mb-4 transition-all duration-500 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${projectIndex * 150 + 400}ms`,
                  }}
                >
                  <div
                    className={`p-2 bg-gradient-to-br ${project.color} rounded transition-transform duration-300 hover:rotate-12`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="card-title text-base-content text-sm">{project.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="badge badge-success badge-sm">{project.status}</span>
                      <span className="text-xs text-base-content/70">• {project.year}</span>
                    </div>
                  </div>
                </div>

                <div
                  className={`bg-base-300 rounded p-3 mb-4 transition-all duration-500 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${projectIndex * 150 + 600}ms`,
                  }}
                >
                  <p className="text-xs text-base-content/80 leading-relaxed">{project.description}</p>
                </div>

                <div
                  className={`space-y-2 transition-all duration-500 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${projectIndex * 150 + 800}ms`,
                  }}
                >
                  <h4 className="text-xs font-medium text-primary">Technologies:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className={`badge badge-outline badge-sm hover:badge-primary transition-all duration-500 ${
                          isVisible ? "translate-x-0 opacity-100 scale-100" : "translate-x-4 opacity-0 scale-95"
                        }`}
                        style={{
                          transitionDelay: `${projectIndex * 150 + techIndex * 50 + 1000}ms`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
