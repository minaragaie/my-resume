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
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-white">
          <span className="text-[#569cd6] font-mono">const</span> <span className="text-[#4ec9b0]">recentProjects</span>{" "}
          <span className="text-white">=</span> <span className="text-[#ce9178]">{"["}</span>
        </h2>
        <p className="text-[#d4d4d4] max-w-2xl mx-auto font-mono">
          // Showcasing innovative solutions built with modern technologies
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentProjects.map((project, projectIndex) => {
          const Icon = project.icon
          return (
            <div
              key={project.name}
              className={`bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-6 hover:border-[#007acc] transition-all duration-700 hover:shadow-lg hover:shadow-[#007acc]/20 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: `${projectIndex * 150}ms`,
                transitionProperty: "transform, opacity",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 bg-gradient-to-br ${project.color} rounded`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{project.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#4ec9b0]">{project.status}</span>
                    <span className="text-xs text-[#d4d4d4]">• {project.year}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#2d2d30] rounded p-3 mb-4">
                <p className="text-xs text-[#d4d4d4] leading-relaxed">{project.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-medium text-[#569cd6]">Technologies:</h4>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className={`text-xs px-2 py-1 bg-[#2d2d30] text-[#d4d4d4] rounded border border-[#3e3e42] hover:border-[#007acc] transition-all duration-500 ${
                        isVisible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                      }`}
                      style={{
                        transitionDelay: `${projectIndex * 150 + techIndex * 50 + 300}ms`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
