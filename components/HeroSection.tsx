"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Download, Mail, Phone, MapPin, Linkedin, ExternalLink, Terminal } from "lucide-react"
import jsPDF from "jspdf"

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
    <>
      {/* Hero Section with Terminal */}
      <section id="hero" className="relative bg-[var(--vscode-bg)] py-20 px-4 overflow-hidden">
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
    </>
  )
}
