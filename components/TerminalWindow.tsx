"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Terminal } from "lucide-react"

export default function TerminalWindow() {
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
      if (!isTyping || commandIndex >= terminalCommands.length) return

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

  return (
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
  )
}
