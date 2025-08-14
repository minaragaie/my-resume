"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Code,
  Database,
  Shield,
  Globe,
  Award,
  Calendar,
  ExternalLink,
  Download,
  Terminal,
  FileCode,
  Folder,
  Play,
  GitBranch,
  Coffee,
} from "lucide-react"

export default function Resume() {
  const [isVisible, setIsVisible] = useState(false)
  const [skillsVisible, setSkillsVisible] = useState(false)
  const [currentSection, setCurrentSection] = useState("")
  const [terminalText, setTerminalText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  const terminalCommands = [
    "$ whoami",
    "> Mina Youaness - Full Stack Developer",
    "$ cat experience.txt",
    "> 10+ years of innovative web development",
    "$ ls skills/",
    "> Angular React Node.js TypeScript...",
    "$ git log --oneline",
    "> Ready for next challenge! 🚀",
  ]

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => setSkillsVisible(true), 1500)

    // Terminal typing effect
    let commandIndex = 0
    let charIndex = 0
    const typeTerminal = () => {
      if (commandIndex < terminalCommands.length) {
        if (charIndex < terminalCommands[commandIndex].length) {
          setTerminalText((prev) => prev + terminalCommands[commandIndex][charIndex])
          charIndex++
          setTimeout(typeTerminal, 50)
        } else {
          setTerminalText((prev) => prev + "\n")
          commandIndex++
          charIndex = 0
          setTimeout(typeTerminal, 800)
        }
      }
    }
    setTimeout(typeTerminal, 2000)

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setCurrentSection(entry.target.id)
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      clearTimeout(timer)
      clearInterval(cursorInterval)
      observer.disconnect()
    }
  }, [])

  const skills = [
    {
      name: "JavaScript/TypeScript",
      level: 95,
      icon: Code,
      color: "from-yellow-400 to-orange-500",
      syntax: "const skills = 'expert';",
    },
    {
      name: "Angular",
      level: 90,
      icon: Globe,
      color: "from-red-500 to-pink-500",
      syntax: "@Component({ expert: true })",
    },
    {
      name: "React",
      level: 88,
      icon: Globe,
      color: "from-blue-400 to-cyan-500",
      syntax: "const [skill] = useState('high');",
    },
    {
      name: "Node.js",
      level: 85,
      icon: Code,
      color: "from-green-400 to-emerald-500",
      syntax: "app.listen(3000, 'expert');",
    },
    {
      name: "Database Management",
      level: 82,
      icon: Database,
      color: "from-purple-400 to-violet-500",
      syntax: "SELECT * FROM expertise;",
    },
    {
      name: "Security Practices",
      level: 88,
      icon: Shield,
      color: "from-indigo-400 to-blue-500",
      syntax: "auth.secure({ level: 'high' });",
    },
  ]

  const experiences = [
    {
      title: "Full-Stack Web Developer",
      company: "HARPLABS INC.",
      period: "Feb 2023 – April 2025",
      fileType: "tsx",
      highlights: [
        "Led frontend projects using Angular, React, Material components, and PWA for seamless user experiences",
        "Designed and implemented RESTful APIs with Spring Boot and Node.js, ensuring seamless front-end-backend integration",
        "Implemented WebSockets for real-time communication, enhancing application dynamics",
        "Ensured secure development practices, including data validation and protection of sensitive user information",
      ],
      technologies: ["Angular", "React", "Node.js", "Spring Boot", "PostgreSQL", "PWA"],
      codeSnippet: `// Turris ERP Project Lead
const projectLead = {
  frameworks: ['Angular', 'React'],
  backend: ['Node.js', 'Spring Boot'],
  database: 'PostgreSQL',
  security: 'enterprise-grade'
};`,
    },
    {
      title: "Full-Stack Web Developer (Contract)",
      company: "TURRIS GROUP",
      period: "May 2022 – April 2025",
      fileType: "js",
      highlights: [
        "Developed Turris ERP System, a comprehensive web app managing day-to-day business activities",
        "Collaborated on designing secure ERP systems, emphasizing role-based access control and encryption",
        "Translated client requirements into efficient and scalable technical solutions for industrial applications",
      ],
      technologies: ["ERP Systems", "Security", "Role-based Access", "Encryption"],
      codeSnippet: `// ERP System Architecture
class ERPSystem {
  constructor() {
    this.security = 'role-based';
    this.encryption = 'AES-256';
    this.scalability = 'enterprise';
  }
}`,
    },
    {
      title: "Full-Stack Web Developer",
      company: "QUAENET",
      period: "May 2018 – April 2022",
      fileType: "ts",
      highlights: [
        "Built EntityConnect - comprehensive entity management & communications app with focus on end user experience",
        "Used Angular & Kendo UI for frontend, SailsJS (Node.js framework) for backend architecture",
        "Supervised and led a team of junior software engineers during robust upgrade, improving user experience",
        "Applied Agile & Scrum principles for high-volume online service development prioritization",
      ],
      technologies: ["Angular", "Kendo UI", "SailsJS", "Team Leadership", "Agile"],
      codeSnippet: `// EntityConnect Platform
interface EntityManager {
  membership: ChurchMembership;
  events: EventRegistration;
  donations: OnlineDonations;
  leadership: TeamManagement;
}`,
    },
    {
      title: "Full-Stack Web Developer",
      company: "ASQUERA",
      period: "May 2018 – April 2021 (Part Time)",
      fileType: "php",
      highlights: [
        "Developed Abgadya - alphabetic online learning platform PWA for high school students",
        "Provided educational content through books, videos, lessons, and exercises",
        "Built booking engine WordPress plugin with fully functional reservation system",
      ],
      technologies: ["Angular 10", "Ionic", "PHP Laravel", "WordPress", "PWA"],
      codeSnippet: `// Learning Platform PWA
$platform = new LearningPlatform([
  'framework' => 'Angular 10 + Ionic',
  'backend' => 'PHP Laravel',
  'type' => 'PWA',
  'target' => 'high school students'
]);`,
    },
    {
      title: "Full-Stack Web Developer (Freelance)",
      company: "CADUCEUS LANE",
      period: "April 2016 – April 2018",
      fileType: "js",
      highlights: [
        "Specialized in marketing solutions for healthcare industries",
        "Built Medical Rep App helping pharmaceutical companies manage sales teams and medical representatives",
        "Created dynamic, user-friendly websites with effective frontend and fluent backend integration",
        "Provided guidance to junior development staff and mentored new employees",
      ],
      technologies: ["Ionic", "Angular 7-10", "Bootstrap", "PHP", "Healthcare Solutions"],
      codeSnippet: `// Healthcare Solutions
const medicalApp = {
  industry: 'pharmaceutical',
  purpose: 'sales team management',
  stack: ['Ionic', 'Angular', 'PHP'],
  mentorship: 'junior developers'
};`,
    },
  ]

  const certifications = [
    { name: "Google Cybersecurity Certificate", issuer: "Google", icon: Shield },
    { name: "Google Mobile Web Specialist", issuer: "Google", icon: Globe },
    { name: "Microsoft Exam 480 HTML5, JavaScript, CSS3", issuer: "Microsoft", icon: Code },
    { name: "Full-Stack Web Development", issuer: "Coursera", icon: Code },
    { name: ".NET Core Certificate", issuer: "ComIT", icon: Code },
  ]

  const techCategories = [
    {
      title: "Languages",
      icon: Code,
      items: ["JavaScript", "TypeScript", "HTML5", "CSS3", "SASS", "SCSS", "LESS", "PHP", "Python", "Java"],
      folder: "src/languages/",
    },
    {
      title: "Frameworks & Libraries",
      icon: Globe,
      items: ["Angular", "React", "Node.js", "DevExtreme", "SailsJS", "Ionic", "Bootstrap", "NGX Bootstrap", "jQuery"],
      folder: "src/frameworks/",
    },
    {
      title: "Databases & Tools",
      icon: Database,
      items: ["PostgreSQL", "MySQL", "T-SQL", "Git", "Sequelize", "Flyway", "WordPress", "PWA", "WebSockets"],
      folder: "src/tools/",
    },
    {
      title: "Standards & Security",
      icon: Shield,
      items: ["WCAG 2.1", "ARIA", "OWASP Top Ten", "TDD", "BDD", "ESLint", "Agile", "Scrum"],
      folder: "src/standards/",
    },
  ]

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4]">
      {/* VSCode-style header */}
      <div className="bg-[#2d2d30] border-b border-[#3e3e42] px-4 py-2 flex items-center gap-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-[#ff5f57] rounded-full"></div>
          <div className="w-3 h-3 bg-[#ffbd2e] rounded-full"></div>
          <div className="w-3 h-3 bg-[#28ca42] rounded-full"></div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FileCode className="w-4 h-4" />
          <span>mina-youaness-resume.tsx</span>
          <div className="w-2 h-2 bg-white rounded-full ml-2"></div>
        </div>
      </div>

      {/* Hero Section with Terminal */}
      <section id="hero" className="relative bg-[#1e1e1e] py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Info */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
          >
            <div className="mb-6">
              <div className="text-[#569cd6] text-sm mb-2 font-mono">// Full Stack Developer</div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
                <span className="text-[#4ec9b0]">const</span> <span className="text-[#9cdcfe]">developer</span>{" "}
                <span className="text-white">=</span> <span className="text-[#ce9178]">"Mina Youaness"</span>
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-[#007acc] to-[#4ec9b0] rounded-full"></div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-[#d4d4d4]">
                <span className="text-[#569cd6] font-mono">experience:</span>
                <span className="text-[#ce9178]">"10+ years"</span>
              </div>
              <div className="flex items-center gap-3 text-[#d4d4d4]">
                <span className="text-[#569cd6] font-mono">specialization:</span>
                <span className="text-[#ce9178]">"Full-Stack Web Development"</span>
              </div>
              <div className="flex items-center gap-3 text-[#d4d4d4]">
                <span className="text-[#569cd6] font-mono">passion:</span>
                <span className="text-[#ce9178]">"Scalable & Secure Applications"</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-8">
              <div className="flex items-center gap-2 p-3 rounded bg-[#2d2d30] hover:bg-[#3e3e42] transition-all">
                <MapPin className="w-4 h-4 text-[#4ec9b0]" />
                <span>Voorhees, NJ</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded bg-[#2d2d30] hover:bg-[#3e3e42] transition-all">
                <Phone className="w-4 h-4 text-[#4ec9b0]" />
                <span>609.839.3558</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded bg-[#2d2d30] hover:bg-[#3e3e42] transition-all">
                <Mail className="w-4 h-4 text-[#4ec9b0]" />
                <span>minaragaie@hotmail.com</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded bg-[#2d2d30] hover:bg-[#3e3e42] transition-all">
                <Linkedin className="w-4 h-4 text-[#4ec9b0]" />
                <span>LinkedIn</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="bg-[#007acc] hover:bg-[#005a9e] text-white">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
              <Button
                variant="outline"
                className="border-[#007acc] text-[#007acc] hover:bg-[#007acc] hover:text-white bg-transparent"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Portfolio
              </Button>
            </div>
          </div>

          {/* Right side - Terminal */}
          <div className="bg-[#0d1117] rounded-lg border border-[#30363d] overflow-hidden">
            <div className="bg-[#21262d] px-4 py-2 flex items-center gap-2 border-b border-[#30363d]">
              <Terminal className="w-4 h-4 text-[#7d8590]" />
              <span className="text-sm text-[#7d8590]">Terminal</span>
              <div className="ml-auto flex gap-1">
                <div className="w-3 h-3 bg-[#ff6b6b] rounded-full"></div>
                <div className="w-3 h-3 bg-[#ffd93d] rounded-full"></div>
                <div className="w-3 h-3 bg-[#6bcf7f] rounded-full"></div>
              </div>
            </div>
            <div className="p-4 font-mono text-sm h-64 overflow-hidden">
              <pre className="text-[#58a6ff] whitespace-pre-wrap">
                {terminalText}
                {showCursor && <span className="bg-[#58a6ff] text-[#0d1117]">█</span>}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-[#252526]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              <span className="text-[#569cd6] font-mono">class</span>{" "}
              <span className="text-[#4ec9b0]">TechnicalSkills</span>
            </h2>
            <p className="text-[#d4d4d4] max-w-2xl mx-auto font-mono">
              // Comprehensive expertise built through hands-on experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <div
                  key={skill.name}
                  className={`bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-6 hover:border-[#007acc] transition-all duration-300 hover:shadow-lg hover:shadow-[#007acc]/20 ${
                    skillsVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 bg-gradient-to-br ${skill.color} rounded`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{skill.name}</h3>
                      <p className="text-sm text-[#d4d4d4]">{skill.level}%</p>
                    </div>
                  </div>

                  <div className="bg-[#2d2d30] rounded p-3 mb-4">
                    <code className="text-xs text-[#ce9178] font-mono">{skill.syntax}</code>
                  </div>

                  <div className="relative">
                    <div className="h-2 bg-[#3e3e42] rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-2000 ease-out`}
                        style={{
                          width: skillsVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 150 + 500}ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experience Section - VSCode File Explorer Style */}
      <section id="experience" className="py-20 px-4 bg-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              <span className="text-[#569cd6] font-mono">interface</span>{" "}
              <span className="text-[#4ec9b0]">ProfessionalExperience</span>
            </h2>
            <p className="text-[#d4d4d4] max-w-2xl mx-auto font-mono">// A decade of building innovative solutions</p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`bg-[#252526] border border-[#3e3e42] rounded-lg overflow-hidden hover:border-[#007acc] transition-all duration-300 ${
                  isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-10"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* File Tab */}
                <div className="bg-[#2d2d30] px-4 py-2 border-b border-[#3e3e42] flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#007acc]" />
                  <span className="text-sm font-mono text-[#d4d4d4]">
                    {exp.company.toLowerCase().replace(/\s+/g, "-")}.{exp.fileType}
                  </span>
                  <div className="ml-auto flex items-center gap-2 text-xs text-[#d4d4d4]">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <p className="text-[#4ec9b0] font-semibold">{exp.company}</p>
                    </div>
                    <Button size="sm" className="bg-[#007acc] hover:bg-[#005a9e] text-white">
                      <Play className="w-3 h-3 mr-1" />
                      Run
                    </Button>
                  </div>

                  {/* Code snippet */}
                  <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded p-4 mb-6">
                    <pre className="text-sm font-mono text-[#d4d4d4] overflow-x-auto">
                      <code>{exp.codeSnippet}</code>
                    </pre>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-3 mb-6">
                    {exp.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-[#569cd6] font-mono text-sm mt-1">//</span>
                        <span className="text-[#d4d4d4] text-sm leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-[#007acc]/10 text-[#007acc] border-[#007acc]/20 hover:bg-[#007acc]/20 font-mono text-xs"
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

      {/* Technologies Section - File Explorer Style */}
      <section id="technologies" className="py-20 px-4 bg-[#252526]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              <span className="text-[#569cd6] font-mono">export</span> <span className="text-[#4ec9b0]">TechStack</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <div
                  key={category.title}
                  className="bg-[#1e1e1e] border border-[#3e3e42] rounded-lg overflow-hidden hover:border-[#007acc] transition-all duration-300"
                >
                  {/* Folder header */}
                  <div className="bg-[#2d2d30] px-4 py-3 border-b border-[#3e3e42] flex items-center gap-2">
                    <Folder className="w-4 h-4 text-[#dcb67a]" />
                    <span className="text-sm font-mono text-[#d4d4d4]">{category.folder}</span>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="w-5 h-5 text-[#4ec9b0]" />
                      <h3 className="font-semibold text-white">{category.title}</h3>
                    </div>

                    <div className="space-y-2">
                      {category.items.map((tech, idx) => (
                        <div key={tech} className="flex items-center gap-2 text-sm">
                          <FileCode className="w-3 h-3 text-[#007acc]" />
                          <span className="text-[#d4d4d4] font-mono">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-20 px-4 bg-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              <span className="text-[#569cd6] font-mono">const</span>{" "}
              <span className="text-[#4ec9b0]">certifications</span> <span className="text-white">=</span>{" "}
              <span className="text-[#ce9178]">[]</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {certifications.map((cert, index) => {
              const Icon = cert.icon
              return (
                <div
                  key={index}
                  className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 hover:border-[#007acc] transition-all duration-300 text-center"
                >
                  <div className="p-4 bg-[#007acc]/10 rounded-full w-fit mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#007acc]" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{cert.name}</h3>
                  <p className="text-sm text-[#d4d4d4] font-mono">{cert.issuer}</p>
                </div>
              )
            })}
          </div>

          {/* Education */}
          <div className="text-center">
            <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-8 inline-block hover:border-[#007acc] transition-all duration-300">
              <div className="p-4 bg-[#4ec9b0]/10 rounded-full w-fit mx-auto mb-4">
                <Award className="w-10 h-10 text-[#4ec9b0]" />
              </div>
              <h3 className="font-bold text-xl text-white mb-2">Bachelor of Computer Science</h3>
              <p className="text-[#d4d4d4] font-mono">College of Computing & Information Technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-[#252526]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">
              <span className="text-[#569cd6] font-mono">function</span>{" "}
              <span className="text-[#dcdcaa]">collaborate</span>
              <span className="text-white">()</span>
            </h2>
            <p className="text-lg text-[#d4d4d4] max-w-2xl mx-auto leading-relaxed font-mono">
              // Ready to build something amazing together?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button className="bg-[#007acc] hover:bg-[#005a9e] text-white text-lg px-8 py-6">
              <Mail className="w-5 h-5 mr-3" />
              <span className="font-mono">contact()</span>
            </Button>
            <Button
              variant="outline"
              className="border-[#007acc] text-[#007acc] hover:bg-[#007acc] hover:text-white text-lg px-8 py-6 bg-transparent"
            >
              <Linkedin className="w-5 h-5 mr-3" />
              <span className="font-mono">connect()</span>
            </Button>
          </div>

          <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded p-4 inline-block">
            <code className="text-sm font-mono text-[#569cd6]">
              <span className="text-[#c586c0]">console</span>
              <span className="text-white">.</span>
              <span className="text-[#dcdcaa]">log</span>
              <span className="text-white">(</span>
              <span className="text-[#ce9178]">"Portfolio samples available upon request"</span>
              <span className="text-white">);</span>
            </code>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-[#2d2d30] border-t border-[#3e3e42] px-4 py-3 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#4ec9b0]" />
            <span className="text-[#d4d4d4] font-mono">main</span>
          </div>
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-[#dcb67a]" />
            <span className="text-[#d4d4d4] font-mono">Ready for next challenge</span>
          </div>
        </div>
        <div className="text-[#d4d4d4] font-mono">© 2025 Mina Youaness</div>
      </div>
    </div>
  )
}
