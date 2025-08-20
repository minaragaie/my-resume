"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import jsPDF from "jspdf"

interface HeroSectionProps {
  isVisible: boolean
}

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7,10 12,15 17,10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
)

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
)

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15,3 21,3 21,9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
)

const TerminalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4,17 10,11 4,5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
)

export default function HeroSection({ isVisible }: HeroSectionProps) {
  const [terminalText, setTerminalText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  const terminalCommands = useMemo(
    () => [
      "$ whoami",
      "> Mina Youaness - Full Stack Developer",
      "$ cat experience.txt",
      "> 10+ years of innovative web development",
      "$ ls skills/",
      "> Angular React Node.js TypeScript...",
      "$ git log --oneline",
      "> Ready for next challenge! 🚀",
    ],
    [],
  )

  const typeTerminal = useCallback(() => {
    let commandIndex = 0
    let charIndex = 0
    let currentText = ""
    let isTyping = true
    let lastTime = 0
    const typingSpeed = 4
    const commandPause = 50

    const animate = (currentTime: number) => {
      if (!isTyping) return

      if (currentTime - lastTime >= typingSpeed) {
        if (commandIndex < terminalCommands.length) {
          const currentCommand = terminalCommands[commandIndex]
          if (charIndex < currentCommand.length) {
            currentText += currentCommand[charIndex]
            setTerminalText(currentText)
            charIndex++
            lastTime = currentTime
          } else {
            setTimeout(() => {
              currentText += "\n"
              setTerminalText(currentText)
              commandIndex++
              charIndex = 0
              lastTime = 0
              if (commandIndex < terminalCommands.length) {
                requestAnimationFrame(animate)
              }
            }, commandPause)
            return
          }
        }
        lastTime = currentTime
      }

      if (commandIndex < terminalCommands.length) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
    return () => {
      isTyping = false
    }
  }, [terminalCommands])

  useEffect(() => {
    const stopTyping = typeTerminal()

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 400)

    return () => {
      stopTyping?.()
      clearInterval(cursorInterval)
    }
  }, [typeTerminal])

  const handleDownloadResume = () => {
    const doc = new jsPDF()
    doc.text("Mina Youaness - Full Stack Developer", 10, 10)
    doc.save("resume.pdf")
  }

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Info */}
        <div
          className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="avatar relative group">
              <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1753407168559-PCWiZjGAS8MtQhjaIJJBeSTHaxePdY.jpeg"
                  alt="Mina Youaness - Full Stack Developer"
                  className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
                <div className="w-2 h-2 bg-base-100 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <div className="text-primary text-sm mb-1 font-mono">// Full Stack Developer</div>
              <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-1">
                <span className="text-secondary">const</span> <span className="text-accent">developer</span>{" "}
                <span className="text-base-content">=</span> <span className="text-warning">"Mina Youaness"</span>
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-base-content">
              <span className="text-primary font-mono">experience:</span>
              <span className="text-warning">"10+ years"</span>
            </div>
            <div className="flex items-center gap-3 text-base-content">
              <span className="text-primary font-mono">specialization:</span>
              <span className="text-warning">"Full-Stack Web Development"</span>
            </div>
            <div className="flex items-center gap-3 text-base-content">
              <span className="text-primary font-mono">passion:</span>
              <span className="text-warning">"Scalable & Secure Applications"</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-8">
            <div className="card bg-base-200 shadow-sm hover:shadow-md transition-all">
              <div className="card-body p-3 flex-row items-center gap-2">
                <MapPinIcon />
                <span>Voorhees, NJ</span>
              </div>
            </div>
            <div className="card bg-base-200 shadow-sm hover:shadow-md transition-all">
              <div className="card-body p-3 flex-row items-center gap-2">
                <PhoneIcon />
                <span>609.839.3558</span>
              </div>
            </div>
            <div className="card bg-base-200 shadow-sm hover:shadow-md transition-all">
              <div className="card-body p-3 flex-row items-center gap-2">
                <MailIcon />
                <span>minaragaie@hotmail.com</span>
              </div>
            </div>
            <div className="card bg-base-200 shadow-sm hover:shadow-md transition-all">
              <div className="card-body p-3 flex-row items-center gap-2">
                <LinkedinIcon />
                <span>LinkedIn</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="btn btn-primary btn-lg shadow-lg hover:shadow-xl" onClick={handleDownloadResume}>
              <DownloadIcon />
              Download Resume
            </button>
            <button className="btn btn-outline btn-primary btn-lg shadow-md hover:shadow-lg">
              <ExternalLinkIcon />
              View Portfolio
            </button>
          </div>
        </div>

        {/* Right side - Terminal */}
        <div className="mockup-code bg-base-300 shadow-xl">
          <div className="flex items-center gap-2 px-4 py-2 bg-base-200 border-b border-base-content/20">
            <TerminalIcon />
            <span className="text-sm text-base-content/60">Terminal</span>
            <div className="ml-auto flex gap-1">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <div className="w-3 h-3 bg-success rounded-full"></div>
            </div>
          </div>
          <div className="p-4 font-mono text-sm h-64 overflow-hidden">
            <pre className="text-primary whitespace-pre-wrap">
              {terminalText}
              {showCursor && <span className="bg-primary text-base-100">█</span>}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
