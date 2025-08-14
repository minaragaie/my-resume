"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Code,
  Database,
  Shield,
  FileCode,
  Terminal,
  Folder,
  ExternalLink,
  Award,
  GitBranch,
  Coffee,
} from "lucide-react"
import jsPDF from "jspdf"
import type { JSX } from "react/jsx-runtime"

interface ResumeData {
  personalInfo: {
    name: string
    linkedin: string
    location: string
    phone: string
    email: string
    profileImage: string
  }
  highlights: string
  experience: Array<{
    id: number
    title: string
    company: string
    startDate: string
    endDate: string
    type?: string
    description: string
    achievements: string[]
    technologies: string[]
  }>
  skills: {
    languages: string[]
    frameworks: string[]
    databases: string[]
    versionControl: string[]
    technologies: string[]
    methodologies: string[]
    standards: string[]
  }
  education: Array<{
    degree: string
    institution: string
    year: string
  }>
  certifications: Array<{
    name: string
    issuer: string
    status: string
    description: string
  }>
  additionalInfo: string
}

export default function ResumePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [skillsVisible, setSkillsVisible] = useState(false)
  const [currentSection, setCurrentSection] = useState("")
  const [terminalText, setTerminalText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await fetch("/api/resume")
        const data = await response.json()
        setResumeData(data)
      } catch (error) {
        console.error("Error fetching resume data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResumeData()
  }, [])

  const handleDownloadResume = async () => {
    if (!resumeData) return

    const doc = new jsPDF()

    // VSCode theme colors
    const colors = {
      background: "#1e1e1e",
      text: "#d4d4d4",
      accent: "#007acc",
      green: "#4ec9b0",
      blue: "#569cd6",
      orange: "#ce9178",
    }

    // Set background
    doc.setFillColor(30, 30, 30) // #1e1e1e
    doc.rect(0, 0, 210, 297, "F")

    let yPos = 20

    // Header with VSCode styling
    doc.setTextColor(212, 212, 212) // #d4d4d4
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text(resumeData.personalInfo.name, 20, yPos)

    // Accent line
    doc.setDrawColor(0, 122, 204) // #007acc
    doc.setLineWidth(2)
    doc.line(20, yPos + 3, 80, yPos + 3)

    yPos += 15

    // Contact info with VSCode syntax highlighting style
    doc.setFontSize(10)
    doc.setFont("courier", "normal")
    doc.setTextColor(86, 156, 214) // #569cd6 (blue)
    doc.text("const contact = {", 20, yPos)
    yPos += 5

    doc.setTextColor(206, 145, 120) // #ce9178 (orange)
    doc.text(`  linkedin: "${resumeData.personalInfo.linkedin}",`, 25, yPos)
    yPos += 4
    doc.text(`  location: "${resumeData.personalInfo.location}",`, 25, yPos)
    yPos += 4
    doc.text(`  phone: "${resumeData.personalInfo.phone}",`, 25, yPos)
    yPos += 4
    doc.text(`  email: "${resumeData.personalInfo.email}"`, 25, yPos)
    yPos += 5

    doc.setTextColor(86, 156, 214) // #569cd6
    doc.text("};", 20, yPos)
    yPos += 15

    // Highlights section
    doc.setTextColor(78, 201, 176) // #4ec9b0 (green)
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("// HIGHLIGHTS OF QUALIFICATIONS", 20, yPos)
    yPos += 8

    doc.setTextColor(212, 212, 212)
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    const splitHighlights = doc.splitTextToSize(resumeData.highlights, 170)
    doc.text(splitHighlights, 20, yPos)
    yPos += splitHighlights.length * 4 + 10

    // Professional Experience
    doc.setTextColor(78, 201, 176) // #4ec9b0
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("// PROFESSIONAL EXPERIENCE", 20, yPos)
    yPos += 10

    resumeData.experience.forEach((exp, index) => {
      if (yPos > 250) {
        doc.addPage()
        doc.setFillColor(30, 30, 30)
        doc.rect(0, 0, 210, 297, "F")
        yPos = 20
      }

      // Job title and company
      doc.setTextColor(0, 122, 204) // #007acc
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text(exp.title, 20, yPos)
      yPos += 5

      doc.setTextColor(78, 201, 176) // #4ec9b0
      doc.setFontSize(10)
      doc.setFont("courier", "normal")
      const period = `${exp.startDate} – ${exp.endDate}`
      const typeText = exp.type ? ` (${exp.type})` : ""
      doc.text(`${exp.company}${typeText} | ${period}`, 20, yPos)
      yPos += 8

      // Highlights
      doc.setTextColor(212, 212, 212)
      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      exp.achievements.slice(0, 4).forEach((achievement) => {
        const splitAchievement = doc.splitTextToSize("• " + achievement, 165)
        doc.text(splitAchievement, 25, yPos)
        yPos += splitAchievement.length * 4
      })
      yPos += 5
    })

    // Add new page for skills if needed
    if (yPos > 200) {
      doc.addPage()
      doc.setFillColor(30, 30, 30)
      doc.rect(0, 0, 210, 297, "F")
      yPos = 20
    }

    // Skills section
    doc.setTextColor(78, 201, 176) // #4ec9b0
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("// SKILLS & TECHNOLOGIES", 20, yPos)
    yPos += 10

    const skillCategories = [
      {
        title: "Languages",
        skills: resumeData.skills.languages.join(", "),
      },
      {
        title: "Frameworks & Libraries",
        skills: resumeData.skills.frameworks.join(", "),
      },
      {
        title: "Databases",
        skills: resumeData.skills.databases.join(", "),
      },
      {
        title: "Technologies & Platforms",
        skills: resumeData.skills.technologies.join(", "),
      },
    ]

    skillCategories.forEach((category) => {
      if (yPos > 270) {
        doc.addPage()
        doc.setFillColor(30, 30, 30)
        doc.rect(0, 0, 210, 297, "F")
        yPos = 20
      }

      doc.setTextColor(0, 122, 204) // #007acc
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.text(category.title + ":", 20, yPos)
      yPos += 6

      doc.setTextColor(212, 212, 212)
      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      const splitSkills = doc.splitTextToSize(category.skills, 170)
      doc.text(splitSkills, 20, yPos)
      yPos += splitSkills.length * 4 + 8
    })

    doc.save(`${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`)
  }

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

    let commandIndex = 0
    let charIndex = 0
    let currentText = ""
    let isTyping = true

    const typeTerminal = () => {
      if (!isTyping) return

      if (commandIndex < terminalCommands.length) {
        const currentCommand = terminalCommands[commandIndex]
        if (charIndex < currentCommand.length) {
          currentText += currentCommand[charIndex]
          setTerminalText(currentText)
          charIndex++
          setTimeout(typeTerminal, 80) // Slightly slower for better performance
        } else {
          currentText += "\n"
          setTerminalText(currentText)
          commandIndex++
          charIndex = 0
          setTimeout(typeTerminal, 1000)
        }
      }
    }

    const terminalTimer = setTimeout(typeTerminal, 2000)

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 600) // Slightly slower blinking

    let observerTimeout: NodeJS.Timeout
    const observer = new IntersectionObserver(
      (entries) => {
        clearTimeout(observerTimeout)
        observerTimeout = setTimeout(() => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-fade-in-up")
              setCurrentSection(entry.target.id)
            }
          })
        }, 100)
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      isTyping = false
      clearTimeout(timer)
      clearTimeout(terminalTimer)
      clearTimeout(observerTimeout)
      clearInterval(cursorInterval)
      observer.disconnect()
    }
  }, []) // Empty dependency array to prevent re-runs

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

  const experiencesData = [
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

  const getTechIcon = (tech: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      JavaScript: <span className="text-[#f7df1e]">JS</span>,
      TypeScript: <span className="text-[#3178c6]">TS</span>,
      Java: <span className="text-[#ed8b00]">☕</span>,
      HTML5: <span className="text-[#e34f26]">🌐</span>,
      CSS3: <span className="text-[#1572b6]">🎨</span>,
      SASS: <span className="text-[#cc6699]">💅</span>,
      SCSS: <span className="text-[#cc6699]">💅</span>,
      LESS: <span className="text-[#1d365d]">📝</span>,
      PHP: <span className="text-[#777bb4]">🐘</span>,
      Python: <span className="text-[#3776ab]">🐍</span>,
      Angular: <span className="text-[#dd0031]">🅰️</span>,
      React: <span className="text-[#61dafb]">⚛️</span>,
      "Node.js": <span className="text-[#339933]">🟢</span>,
      DevExtreme: <span className="text-[#ff7200]">📊</span>,
      SailsJS: <span className="text-[#14acc2]">⛵</span>,
      Ionic: <span className="text-[#3880ff]">📱</span>,
      Bootstrap: <span className="text-[#7952b3]">🅱️</span>,
      "NGX Bootstrap": <span className="text-[#7952b3]">🅱️</span>,
      jQuery: <span className="text-[#0769ad]">💲</span>,
      PostgreSQL: <span className="text-[#336791]">🐘</span>,
      MySQL: <span className="text-[#4479a1]">🗄️</span>,
      Git: <span className="text-[#f05032]">📝</span>,
      Sequelize: <span className="text-[#52b0e7]">🔗</span>,
      Flyway: <span className="text-[#cc0200]">🛫</span>,
      WordPress: <span className="text-[#21759b]">📰</span>,
      PWA: <span className="text-[#5a0fc8]">📱</span>,
      WebSockets: <span className="text-[#010101]">🔌</span>,
      Agile: <span className="text-[#0052cc]">🏃</span>,
      Scrum: <span className="text-[#0052cc]">🏉</span>,
    }
    return iconMap[tech] || <span className="text-[#58a6ff]">⚡</span>
  }

  return (
    <div className="main-container">
      {/* VSCode-style header */}
      <div className="vscode-header">
        <div className="window-controls">
          <div className="window-control red"></div>
          <div className="window-control yellow"></div>
          <div className="window-control green"></div>
        </div>
        <div className="file-tab">
          <FileCode className="w-4 h-4" />
          <span>mina-youaness-resume.tsx</span>
          <div className="status-dot"></div>
        </div>
      </div>

      {/* Hero Section with Terminal */}
      <section id="hero" className="hero-section">
        <div className="hero-grid">
          {/* Left side - Info */}
          <div className={`profile-section ${isVisible ? "visible" : "hidden"}`}>
            <div className="profile-header">
              <div className="profile-image-container">
                <div className="profile-image-wrapper">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1753407168559-PCWiZjGAS8MtQhjaIJJBeSTHaxePdY.jpeg"
                    alt="Mina Youaness - Full Stack Developer"
                    className="profile-image"
                  />
                </div>
                <div className="status-indicator">
                  <div className="status-dot-inner"></div>
                </div>
              </div>
              <div>
                <div className="profile-title">// Full Stack Developer</div>
                <h1 className="profile-name">
                  <span className="text-vscode-type">const</span>{" "}
                  <span className="text-vscode-variable">developer</span> <span style={{ color: "white" }}>=</span>{" "}
                  <span className="text-vscode-string">"Mina Youaness"</span>
                </h1>
                <div className="profile-gradient"></div>
              </div>
            </div>

            <div className="profile-details">
              <div className="profile-detail">
                <span className="text-vscode-keyword">experience:</span>
                <span className="text-vscode-string">"10+ years"</span>
              </div>
              <div className="profile-detail">
                <span className="text-vscode-keyword">specialization:</span>
                <span className="text-vscode-string">"Full-Stack Web Development"</span>
              </div>
              <div className="profile-detail">
                <span className="text-vscode-keyword">passion:</span>
                <span className="text-vscode-string">"Scalable & Secure Applications"</span>
              </div>
            </div>

            <div className="contact-grid">
              <div className="contact-item">
                <MapPin className="w-4 h-4 text-vscode-type" />
                <span>Voorhees, NJ</span>
              </div>
              <div className="contact-item">
                <Phone className="w-4 h-4 text-vscode-type" />
                <span>609.839.3558</span>
              </div>
              <div className="contact-item">
                <Mail className="w-4 h-4 text-vscode-type" />
                <span>minaragaie@hotmail.com</span>
              </div>
              <div className="contact-item">
                <Linkedin className="w-4 h-4 text-vscode-type" />
                <span>LinkedIn</span>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary" onClick={handleDownloadResume}>
                <Download className="w-4 h-4" style={{ marginRight: "0.5rem" }} />
                Download Resume
              </button>
              <button className="btn btn-outline">
                <ExternalLink className="w-4 h-4" style={{ marginRight: "0.5rem" }} />
                View Portfolio
              </button>
            </div>
          </div>

          {/* Right side - Terminal */}
          <div className="terminal">
            <div className="terminal-header">
              <Terminal className="w-4 h-4" />
              <span className="terminal-title">Terminal</span>
              <div className="terminal-controls">
                <div className="terminal-control red"></div>
                <div className="terminal-control yellow"></div>
                <div className="terminal-control green"></div>
              </div>
            </div>
            <div className="terminal-content">
              <pre className="terminal-text">
                {terminalText}
                {showCursor && <span className="terminal-cursor">█</span>}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="skills-grid">
          <div className="skills-header">
            <h2 className="skills-title">Technical Skills</h2>
            <p className="skills-description">// Comprehensive expertise built through hands-on experience</p>
          </div>
          <div className="skills-list">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <div
                  key={skill.name}
                  className={`skill-item ${skillsVisible ? "visible" : "hidden"}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="skill-icon">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="skill-info">
                    <h3 className="skill-name">{skill.name}</h3>
                    <p className="skill-level">{skill.level}%</p>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-bar-fill" style={{ width: `${skill.level}%` }}></div>
                  </div>
                  <div className="skill-code">
                    <code className="skill-syntax">{skill.syntax}</code>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience-section">
        <div className="experience-grid">
          <div className="experience-header">
            <h2 className="experience-title">Professional Experience</h2>
            <p className="experience-description">// 10+ years of innovative full-stack development</p>
          </div>
          <div className="experience-list">
            {experiencesData.map((exp, index) => (
              <div
                key={index}
                className={`experience-item ${isVisible ? "visible" : "hidden"}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="experience-file-tab">
                  <FileCode className="w-4 h-4 text-[#007acc]" />
                  <span>
                    {exp.company.toLowerCase().replace(/\s+/g, "-")}.{exp.fileType}
                  </span>
                  <Badge className="experience-badge">{exp.period}</Badge>
                </div>
                <div className="experience-content">
                  <div className="experience-header-content">
                    <div className="experience-icon">
                      <span className="experience-initial">{exp.company.charAt(0)}</span>
                    </div>
                    <div className="experience-info">
                      <h3 className="experience-job-title">{exp.title}</h3>
                      <p className="experience-company">{exp.company}</p>
                    </div>
                  </div>
                  <div className="experience-code-snippet">
                    <pre className="experience-code">
                      <code>{exp.codeSnippet}</code>
                    </pre>
                  </div>
                  <div className="experience-highlights">
                    <div className="experience-highlights-title">// Key Achievements:</div>
                    <div className="experience-highlights-list">
                      {exp.highlights.map((highlight, idx) => (
                        <div key={idx} className="experience-highlight">
                          <span className="experience-highlight-dot"></span>
                          <span className="experience-highlight-text">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="experience-technologies">
                    <div className="experience-technologies-title">// Technologies:</div>
                    <div className="experience-technologies-list">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} className="experience-technology-badge">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="technologies-section">
        <div className="technologies-grid">
          <div className="technologies-header">
            <h2 className="technologies-title">Tech Stack</h2>
          </div>
          <div className="technologies-categories">
            {techCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <div key={category.title} className="technology-category">
                  <div className="technology-folder-header">
                    <Folder className="w-4 h-4 text-[#dcb67a]" />
                    <span>{category.folder}</span>
                  </div>
                  <div className="technology-category-content">
                    <div className="technology-category-header">
                      <Icon className="w-5 h-5 text-[#4ec9b0]" />
                      <h3 className="technology-category-title">{category.title}</h3>
                    </div>
                    <div className="technology-list">
                      {category.items.map((tech, idx) => (
                        <div key={tech} className="technology-item">
                          {getTechIcon(tech)}
                          <span className="technology-name">{tech}</span>
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
      <section id="certifications" className="certifications-section">
        <div className="certifications-grid">
          <div className="certifications-header">
            <h2 className="certifications-title">Certifications</h2>
            <p className="certifications-description">
              // Professional certifications and continuous learning achievements
            </p>
          </div>
          <div className="certifications-list">
            {[
              {
                name: "Google Cybersecurity Certificate",
                issuer: "Google",
                icon: Shield,
                status: "Certified",
                description: "Comprehensive cybersecurity fundamentals, risk management, and security practices",
                color: "from-red-500 to-orange-500",
                skills: ["Security Frameworks", "Risk Assessment", "Incident Response", "Network Security"],
              },
              {
                name: "Google Mobile Web Specialist",
                issuer: "Google",
                icon: Globe,
                status: "Studied & Examined",
                description: "Advanced mobile web development, PWA, and performance optimization",
                color: "from-blue-500 to-cyan-500",
                skills: ["PWA Development", "Mobile Optimization", "Service Workers", "Web Performance"],
              },
              {
                name: "Microsoft Exam 480",
                issuer: "Microsoft",
                icon: Code,
                status: "Certified",
                description: "HTML5, JavaScript, and CSS3 programming expertise",
                color: "from-blue-600 to-indigo-600",
                skills: ["HTML5 APIs", "JavaScript ES6+", "CSS3 Advanced", "DOM Manipulation"],
              },
              {
                name: "Full-Stack Web Development",
                issuer: "Coursera",
                icon: Code,
                status: "Completed",
                description: "Comprehensive full-stack development with modern frameworks",
                color: "from-purple-500 to-pink-500",
                skills: ["MEAN Stack", "RESTful APIs", "Database Design", "Authentication"],
              },
              {
                name: ".NET Core Certificate",
                issuer: "ComIT",
                icon: Code,
                status: "Certified",
                description: "Modern .NET Core development and enterprise applications",
                color: "from-indigo-500 to-purple-600",
                skills: [".NET Core", "C# Advanced", "Entity Framework", "Web APIs"],
              },
            ].map((cert, index) => {
              const Icon = cert.icon
              return (
                <div key={index} className="certification-item">
                  <div className="certification-file-tab">
                    <FileCode className="w-4 h-4 text-[#007acc]" />
                    <span>{cert.issuer.toLowerCase()}-cert.json</span>
                    <Badge className={`certification-status ${cert.color}`}>{cert.status}</Badge>
                  </div>
                  <div className="certification-content">
                    <div className="certification-header-content">
                      <div className="certification-icon">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="certification-info">
                        <h3 className="certification-name">{cert.name}</h3>
                        <p className="certification-issuer">{cert.issuer}</p>
                      </div>
                    </div>
                    <div className="certification-description">
                      <p>{cert.description}</p>
                    </div>
                    <div className="certification-skills">
                      <div className="certification-skills-title">// Key Skills:</div>
                      <div className="certification-skills-list">
                        {cert.skills.map((skill) => (
                          <Badge key={skill} className="certification-skill-badge">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="certification-verification">
                      <Button size="sm" className="btn btn-primary">
                        <ExternalLink className="w-3 h-3" style={{ marginRight: "0.5rem" }} />
                        <span className="font-mono text-xs">verify()</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="education-section">
        <div className="education-grid">
          <div className="education-header">
            <h2 className="education-title">Education</h2>
          </div>
          <div className="education-content">
            <div className="education-degree">
              <div className="education-degree-icon">
                <Award className="w-12 h-12 text-[#4ec9b0]" />
              </div>
              <div className="education-degree-info">
                <h3 className="education-degree-name">Bachelor of Computer Science</h3>
                <p className="education-degree-institution">College of Computing & Information Technology</p>
              </div>
            </div>
            <div className="education-code-snippet">
              <code className="education-syntax">
                <span className="text-vscode-type">const</span> <span className="text-vscode-variable">education</span>{" "}
                <span style={{ color: "white" }}>=</span> <span className="text-vscode-object">{"{"}</span>
                <br />
                <span className="text-vscode-keyword">degree</span>
                <span className="text-vscode-operator">:</span>{" "}
                <span className="text-vscode-string">"Bachelor of Computer Science"</span>
                <span className="text-vscode-operator">,</span>
                <br />
                <span className="text-vscode-keyword">foundation</span>
                <span className="text-vscode-operator">:</span>{" "}
                <span className="text-vscode-string">"Strong technical fundamentals"</span>
                <br />
                <span className="text-vscode-object">{"}"}</span>
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-grid">
          <div className="contact-header">
            <h2 className="contact-title">Collaborate</h2>
            <p className="contact-description">// Ready to build something amazing together?</p>
          </div>
          <div className="contact-buttons">
            <button className="btn btn-primary">
              <Mail className="w-5 h-5" style={{ marginRight: "0.5rem" }} />
              <span className="font-mono">contact()</span>
            </button>
            <button className="btn btn-outline">
              <Linkedin className="w-5 h-5" style={{ marginRight: "0.5rem" }} />
              <span className="font-mono">connect()</span>
            </button>
          </div>
          <div className="contact-code-snippet">
            <code className="contact-syntax">
              <span className="text-vscode-console">console</span>
              <span className="text-vscode-operator">.</span>
              <span className="text-vscode-method">log</span>
              <span className="text-vscode-operator">(</span>
              <span className="text-vscode-string">"Portfolio samples available upon request"</span>
              <span className="text-vscode-operator">);</span>
            </code>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="footer">
        <div className="footer-left">
          <div className="footer-git-branch">
            <GitBranch className="w-4 h-4 text-vscode-type" />
            <span className="text-vscode-variable">main</span>
          </div>
          <div className="footer-coffee">
            <Coffee className="w-4 h-4 text-vscode-type" />
            <span className="text-vscode-string">Ready for next challenge</span>
          </div>
        </div>
        <div className="footer-right">
          <span className="text-vscode-string">© 2025 Mina Youaness</span>
        </div>
      </div>
    </div>
  )
}
