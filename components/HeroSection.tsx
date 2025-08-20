"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Download, Mail, Phone, MapPin, Linkedin, ExternalLink, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import jsPDF from "jspdf"

// NOTE: The jspdf library is an external dependency that must be loaded via a <script> tag from a CDN
// in your HTML for the download functionality to work. We are removing the direct import to resolve the compilation error.

interface HeroSectionProps {
  isVisible: boolean
}

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
    const typingSpeed = 4
    const commandPause = 50

    const animate = () => {
      if (!isTyping || commandIndex >= terminalCommands.length) {
        return
      }

      const currentCommand = terminalCommands[commandIndex]
      if (charIndex < currentCommand.length) {
        currentText += currentCommand[charIndex]
        setTerminalText(currentText)
        charIndex++
        setTimeout(animate, typingSpeed)
      } else {
        currentText += "\n"
        setTerminalText(currentText)
        commandIndex++
        charIndex = 0
        setTimeout(animate, commandPause)
      }
    }

    animate()
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
      stopTyping()
      clearInterval(cursorInterval)
    }
  }, [typeTerminal])

  const handleDownloadResume = () => {
    // This assumes `jsPDF` is available on the window object from a CDN.
    if (typeof window.jsPDF !== 'undefined') {
      const doc = new window.jsPDF()
      doc.text("Mina Youaness - Full Stack Developer", 10, 10)
      doc.save("resume.pdf")
    } else {
      console.error("jsPDF is not loaded. Please add the CDN script tag to your HTML.")
      // Optional: Add a message box for the user to see
      alert("Error: Resume download is not available. The required library is missing.")
    }
  }

  return (
    <div className="relative overflow-hidden p-6 md:p-12 lg:p-16">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Info */}
        <div
          className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--vscode-blue)] p-1 bg-gradient-to-br from-[var(--vscode-blue)] to-[var(--vscode-green)]">
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
              <div className="text-[var(--vscode-keyword)] text-sm mb-1 font-mono">// Full Stack Developer</div>
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--vscode-text)] mb-1">
                <span className="text-[var(--vscode-green)]">const</span> <span className="text-[var(--vscode-keyword)]">developer</span>{" "}
                <span className="text-[var(--vscode-text)]">=</span> <span className="text-[var(--vscode-string)]">"Mina Youaness"</span>
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-[var(--vscode-blue)] to-[var(--vscode-green)] rounded-full"></div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-[var(--vscode-text-muted)]">
              <span className="text-[var(--vscode-keyword)] font-mono">experience:</span>
              <span className="text-[var(--vscode-string)]">"10+ years"</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--vscode-text-muted)]">
              <span className="text-[var(--vscode-keyword)] font-mono">specialization:</span>
              <span className="text-[var(--vscode-string)]">"Full-Stack Web Development"</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--vscode-text-muted)]">
              <span className="text-[var(--vscode-keyword)] font-mono">passion:</span>
              <span className="text-[var(--vscode-string)]">"Scalable & Secure Applications"</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-8">
            <div className="flex items-center gap-2 p-3 rounded bg-[var(--card)] hover:bg-[var(--popover)] transition-all">
              <MapPin className="w-4 h-4 text-[var(--vscode-green)]" />
              <span>Voorhees, NJ</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded bg-[var(--card)] hover:bg-[var(--popover)] transition-all">
              <Phone className="w-4 h-4 text-[var(--vscode-green)]" />
              <span>609.839.3558</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded bg-[var(--card)] hover:bg-[var(--popover)] transition-all">
              <Mail className="w-4 h-4 text-[var(--vscode-green)]" />
              <span>minaragaie@hotmail.com</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded bg-[var(--card)] hover:bg-[var(--popover)] transition-all">
              <Linkedin className="w-4 h-4 text-[var(--vscode-green)]" />
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
        <div className="bg-[var(--terminal-bg)] rounded-lg border border-[var(--vscode-border)] overflow-hidden">
          <div className="bg-[var(--terminal-title-bar)] px-4 py-2 flex items-center gap-2 border-b border-[var(--vscode-border)]">
            <Terminal className="w-4 h-4 text-[var(--vscode-text-muted)]" />
            <span className="text-sm text-[var(--vscode-text-muted)]">Terminal</span>
            <div className="ml-auto flex gap-1">
              <div className="w-3 h-3 bg-[var(--vscode-error)] rounded-full"></div>
              <div className="w-3 h-3 bg-[var(--vscode-warning)] rounded-full"></div>
              <div className="w-3 h-3 bg-[var(--vscode-green)] rounded-full"></div>
            </div>
          </div>
          <div className="p-4 font-mono text-sm h-64 overflow-hidden text-[var(--terminal-text)]">
            <pre className="whitespace-pre-wrap">
              {terminalText}
              {showCursor && <span className="bg-[var(--terminal-bg)] text-[var(--terminal-text)]">█</span>}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
