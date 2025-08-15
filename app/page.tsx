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
import { resumeData as staticResumeData } from "@/lib/resume-data"

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
    fileType?: string
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

export default function Resume() {
  const [isVisible, setIsVisible] = useState(false)
  const [skillsVisible, setSkillsVisible] = useState(false)
  const [currentSection, setCurrentSection] = useState("")
  const [terminalText, setTerminalText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [loading, setLoading] = useState(true)
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)

  useEffect(() => {
    const transformedData: ResumeData = {
      ...staticResumeData,
      experience: staticResumeData.experience.map((exp, index) => ({
        id: index + 1,
        title: exp.title,
        company: exp.company,
        startDate: exp.duration?.split(" - ")[0] || "",
        endDate: exp.duration?.split(" - ")[1] || "",
        type: "",
        fileType: index === 0 ? "tsx" : index === 1 ? "js" : "ts",
        description: exp.description,
        achievements: [],
        technologies: [],
      })),
      certifications: staticResumeData.certifications.map((cert) => ({
        name: typeof cert === "string" ? cert : cert,
        issuer: "",
        status: "Active",
        description: "",
      })),
    }
    setResumeData(transformedData)
    setLoading(false)
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
          setTimeout(typeTerminal, 30) // Much faster typing speed
        } else {
          currentText += "\n"
          setTerminalText(currentText)
          commandIndex++
          charIndex = 0
          setTimeout(typeTerminal, 400) // Reduced pause between commands
        }
      }
    }

    const terminalTimer = setTimeout(typeTerminal, 1000) // Start sooner

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 800) // Slower blinking to reduce CPU usage

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
        }, 50) // Reduced debounce time
      },
      { threshold: 0.2, rootMargin: "30px" }, // Increased threshold, reduced margin
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
            <div className="flex items-center gap-6 mb-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#007acc] p-1 bg-gradient-to-br from-[#007acc] to-[#4ec9b0]">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1753407168559-PCWiZjGAS8MtQhjaIJJBeSTHaxePdY.jpeg"
                    alt="Mina Youaness - Full Stack Developer"
                    className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#28ca42] rounded-full border-2 border-[#1e1e1e] flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <div className="text-[#569cd6] text-sm mb-1 font-mono">// Full Stack Developer</div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-1">
                  <span className="text-[#4ec9b0]">const</span> <span className="text-[#9cdcfe]">developer</span>{" "}
                  <span className="text-white">=</span> <span className="text-[#ce9178]">"Mina Youaness"</span>
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-[#007acc] to-[#4ec9b0] rounded-full"></div>
              </div>
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
              <Button
                className="bg-gradient-to-r from-[#007acc] to-[#0086d4] hover:from-[#005a9e] hover:to-[#006bb3] text-white shadow-lg hover:shadow-xl border border-[#007acc]/20"
                size="lg"
                onClick={handleDownloadResume}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#007acc] text-[#007acc] hover:bg-[#007acc] hover:text-white bg-transparent/80 backdrop-blur-sm shadow-md hover:shadow-lg"
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
      {resumeData?.skills && (
        <section id="skills" className="py-20 px-4 bg-[#0d1117]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4 font-mono">
                <span className="text-[#007acc]">const</span> skills = [
              </h2>
              <p className="text-lg text-[#d4d4d4] max-w-2xl mx-auto leading-relaxed font-mono">
                // My technical expertise and proficiency levels
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Frontend Development",
                  level: 95,
                  color: "from-[#007acc] to-[#0086d4]",
                  syntax: "React.createElement('div')",
                  icon: Code,
                },
                {
                  name: "Backend Development",
                  level: 90,
                  color: "from-[#4ec9b0] to-[#5dd4b1]",
                  syntax: "app.listen(3000)",
                  icon: Database,
                },
                {
                  name: "Database Design",
                  level: 85,
                  color: "from-[#f92672] to-[#ff4081]",
                  syntax: "SELECT * FROM users",
                  icon: Database,
                },
                {
                  name: "DevOps & Cloud",
                  level: 80,
                  color: "from-[#ff9800] to-[#ffb74d]",
                  syntax: "docker run -p 3000:3000",
                  icon: Shield,
                },
                {
                  name: "UI/UX Design",
                  level: 88,
                  color: "from-[#9c27b0] to-[#ba68c8]",
                  syntax: "design.prototype()",
                  icon: Code,
                },
                {
                  name: "Mobile Development",
                  level: 75,
                  color: "from-[#00bcd4] to-[#4dd0e1]",
                  syntax: "ionic serve",
                  icon: Code,
                },
              ].map((skill, index) => {
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
                      <div className="bg-[#3e3e42] rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: skillsVisible ? `${skill.level}%` : "0%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-[#d4d4d4] mt-1 block text-right font-mono">{skill.level}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section - VSCode Theme Restored */}
      <section id="experience" className="py-20 px-4 bg-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              <span className="text-[#569cd6] font-mono">interface</span>{" "}
              <span className="text-[#4ec9b0]">ProfessionalExperience</span>
            </h2>
            <p className="text-[#d4d4d4] max-w-2xl mx-auto font-mono">
              // 10+ years of innovative full-stack development
            </p>
          </div>

          <div className="space-y-6">
            {resumeData?.experience.map((exp, index) => (
              <div
                key={index}
                className={`bg-[#252526] border border-[#3e3e42] rounded-lg overflow-hidden hover:border-[#007acc] transition-all duration-300 group hover:shadow-lg hover:shadow-[#007acc]/20 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* File tab header */}
                <div className="bg-[#2d2d30] px-4 py-2 border-b border-[#3e3e42] flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#007acc]" />
                  <span className="text-sm font-mono text-[#d4d4d4]">
                    {exp.company.toLowerCase().replace(/\s+/g, "-")}.{exp.fileType || "js"}
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    <Badge className="bg-[#007acc]/20 text-[#007acc] text-xs font-mono border-[#007acc]/30">
                      {exp.startDate} – {exp.endDate}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  {/* Job title and company */}
                  <div className="mb-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#007acc] to-[#4ec9b0] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{exp.company.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#007acc] transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-[#4ec9b0] font-mono">{exp.company}</p>
                      </div>
                    </div>
                  </div>

                  {/* Code snippet */}
                  <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded p-4 mb-6 overflow-x-auto">
                    <pre className="text-sm font-mono">
                      <code className="text-[#d4d4d4]">{exp.description}</code>
                    </pre>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <div className="text-sm text-[#569cd6] font-mono mb-3">// Key Achievements:</div>
                    <div className="space-y-2">
                      {(exp.achievements || []).map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-[#4ec9b0] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-[#d4d4d4] text-sm leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="text-sm text-[#569cd6] font-mono mb-3">// Technologies:</div>
                    <div className="flex flex-wrap gap-2">
                      {(exp.technologies || []).map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-[#007acc]/10 text-[#007acc] border-[#007acc]/20 font-mono text-xs hover:bg-[#007acc]/20 transition-colors"
                        >
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

      {/* Technologies Section - File Explorer Style */}
      <section className="py-20 px-4 bg-[#0d1117]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              <span className="text-[#569cd6] font-mono">const</span> techStack = {"{"}
            </h2>
            <p className="text-lg text-[#d4d4d4] max-w-2xl mx-auto leading-relaxed font-mono">
              // Technologies and tools I work with
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Frontend", folder: "src/frontend/", items: resumeData?.skills?.frameworks || [], icon: Code },
              { title: "Backend", folder: "src/backend/", items: resumeData?.skills?.languages || [], icon: Database },
              {
                title: "Database",
                folder: "src/database/",
                items: resumeData?.skills?.databases || [],
                icon: Database,
              },
              { title: "DevOps", folder: "src/devops/", items: resumeData?.skills?.technologies || [], icon: Shield },
              {
                title: "Version Control",
                folder: "src/git/",
                items: resumeData?.skills?.versionControl || [],
                icon: GitBranch,
              },
              {
                title: "Methodologies",
                folder: "src/process/",
                items: resumeData?.skills?.methodologies || [],
                icon: Coffee,
              },
            ].map((category) => {
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
                          {getTechIcon(tech)}
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
      {resumeData?.certifications && (
        <div className="py-20 px-4 bg-[#1e1e1e]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-white">
                <span className="text-[#569cd6] font-mono">const</span>{" "}
                <span className="text-[#4ec9b0]">certifications</span> <span className="text-white">=</span>{" "}
                <span className="text-[#ce9178]">[]</span>
              </h2>
              <p className="text-lg text-[#d4d4d4] max-w-2xl mx-auto leading-relaxed font-mono">
                // Professional certifications and continuous learning achievements
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "AWS Certified Developer",
                  issuer: "Amazon Web Services",
                  date: "2023",
                  status: "Active",
                  color: "from-[#ff9900] to-[#ffb84d]",
                  skills: ["AWS", "Cloud Computing", "Lambda"],
                  icon: Award,
                },
                {
                  name: "Google Analytics Certified",
                  issuer: "Google",
                  date: "2023",
                  status: "Active",
                  color: "from-[#4285f4] to-[#5a9df8]",
                  skills: ["Analytics", "Data Analysis", "Reporting"],
                  icon: Award,
                },
              ].map((cert, index) => {
                const Icon = cert.icon
                return (
                  <div
                    key={index}
                    className="bg-[#252526] border border-[#3e3e42] rounded-lg overflow-hidden hover:border-[#007acc] transition-all duration-300 group hover:shadow-lg hover:shadow-[#007acc]/20"
                  >
                    {/* Certificate Header */}
                    <div className="bg-[#2d2d30] px-4 py-3 border-b border-[#3e3e42] flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-[#007acc]" />
                      <span className="text-sm font-mono text-[#d4d4d4]">{cert.name.toLowerCase()}-cert.json</span>
                      <div className="ml-auto">
                        <Badge className={`bg-gradient-to-r ${cert.color} text-white text-xs`}>{cert.status}</Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Icon and Title */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 bg-gradient-to-br ${cert.color} rounded-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1">{cert.name}</h3>
                          <p className="text-sm text-[#d4d4d4] mb-2">{cert.issuer}</p>
                          <p className="text-xs text-[#007acc] font-mono">Issued: {cert.date}</p>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-4">
                        <p className="text-xs text-[#d4d4d4] mb-2 font-mono">// Skills covered:</p>
                        <div className="flex flex-wrap gap-1">
                          {(cert.skills || []).map((skill, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs bg-[#1e1e1e] text-[#d4d4d4] border border-[#3e3e42]"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Verify Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-gradient-to-r from-[#007acc]/10 to-[#007acc]/5 hover:from-[#007acc] hover:to-[#0086d4] text-[#007acc] hover:text-white border-2 border-[#007acc]/30 hover:border-[#007acc] transition-all shadow-md hover:shadow-lg backdrop-blur-sm"
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        <span className="font-mono text-xs">verify()</span>
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Education - Enhanced */}
      <div className="py-20 px-4 bg-[#1e1e1e]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              <span className="text-[#569cd6] font-mono">const</span> <span className="text-[#4ec9b0]">education</span>{" "}
              <span className="text-white">=</span> <span className="text-[#ce9178]">[]</span>
            </h2>
            <p className="text-lg text-[#d4d4d4] max-w-2xl mx-auto leading-relaxed font-mono">
              // My educational background
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {resumeData?.education.map((edu, index) => (
              <div
                key={index}
                className="bg-[#252526] border border-[#3e3e42] rounded-lg overflow-hidden hover:border-[#4ec9b0] transition-all duration-300 group hover:shadow-lg hover:shadow-[#4ec9b0]/20"
              >
                {/* Education Header */}
                <div className="bg-[#2d2d30] px-6 py-3 border-b border-[#3e3e42] flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#4ec9b0]" />
                  <span className="text-sm font-mono text-[#d4d4d4]">{edu.degree.toLowerCase()}</span>
                </div>

                <div className="p-8">
                  <div className="p-4 bg-[#4ec9b0]/10 rounded-full w-fit mx-auto mb-6">
                    <Award className="w-12 h-12 text-[#4ec9b0]" />
                  </div>
                  <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-[#4ec9b0] transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-[#d4d4d4] font-mono mb-4">{edu.institution}</p>

                  {/* Code snippet for education */}
                  <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded p-4 text-left">
                    <code className="text-sm font-mono">
                      <span className="text-[#569cd6]">const</span> <span className="text-[#9cdcfe]">education</span>{" "}
                      <span className="text-white">=</span> <span className="text-white">{"{"}</span>
                      <br />
                      <span className="ml-4 text-[#9cdcfe]">degree</span>
                      <span className="text-white">:</span> <span className="text-[#ce9178]">"{edu.degree}"</span>
                      <span className="text-white">,</span>
                      <br />
                      <span className="ml-4 text-[#9cdcfe]">institution</span>
                      <span className="text-white">:</span> <span className="text-[#ce9178]">"{edu.institution}"</span>
                      <br />
                      <span className="ml-4 text-[#9cdcfe]">year</span>
                      <span className="text-white">:</span> <span className="text-[#ce9178]">"{edu.year}"</span>
                      <br />
                      <span className="text-white">{"}"}</span>
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
            <Button
              className="bg-gradient-to-r from-[#007acc] to-[#0086d4] hover:from-[#005a9e] hover:to-[#006bb3] text-white shadow-lg hover:shadow-xl border border-[#007acc]/20"
              size="lg"
            >
              <Mail className="w-5 h-5 mr-3" />
              <span className="font-mono">contact()</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-[#007acc] text-[#007acc] hover:bg-[#007acc] hover:text-white bg-transparent/80 backdrop-blur-sm shadow-md hover:shadow-lg"
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
