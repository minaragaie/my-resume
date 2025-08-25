"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Linkedin, Send, MessageSquare } from "lucide-react"
import resumeData from "@/data/resume.json"
import TerminalWindow from "./TerminalWindow"

interface ContactSectionProps {
  onStatusChange?: (status: string) => void
  isVisible?: boolean
}

export default function ContactSection({ onStatusChange, isVisible = false }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [terminalCommands, setTerminalCommands] = useState<string[]>([])
  const [showTerminal, setShowTerminal] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addTerminalCommand = (msg: string) => {
    setTerminalCommands((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setShowTerminal(true)
    setTerminalCommands([])

    try {
      onStatusChange?.("Sending message...")
      addTerminalCommand(`connect --to "Mina Youaness"`)
      await new Promise((res) => setTimeout(res, 800))

      addTerminalCommand("[✔] Secure channel established")
      await new Promise((res) => setTimeout(res, 600))

      addTerminalCommand("[✔] Handshake completed")
      await new Promise((res) => setTimeout(res, 500))

      addTerminalCommand("[✔] Contact form initialized")
      await new Promise((res) => setTimeout(res, 500))

      onStatusChange?.("Encrypting message...")
      addTerminalCommand(`[✔] Encrypting message from <${formData.email}>...`)
      await new Promise((res) => setTimeout(res, 700))

      onStatusChange?.("Transmitting...")
      addTerminalCommand("[✔] Transmitting data packets...")
      await new Promise((res) => setTimeout(res, 600))

      addTerminalCommand("[✔] Signal received by Mina's inbox")
      await new Promise((res) => setTimeout(res, 500))

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()


    if (response.ok && !data.error) {
        onStatusChange?.("Message sent successfully!")
        addTerminalCommand("------------------------------------------")
        addTerminalCommand(`👋 Hello ${formData.name} (<${formData.email}>)`)
        addTerminalCommand("   Welcome to my terminal. Your message has successfully")
        addTerminalCommand("   reached Mina Youaness.")
        addTerminalCommand("")
        addTerminalCommand("   ⚡ Transmission complete. Mina will review your request")
        addTerminalCommand("      and get back to you as soon as possible.")
        addTerminalCommand("")
        addTerminalCommand("------------------------------------------")
        await new Promise((res) => setTimeout(res, 1000))
        addTerminalCommand("exit")
        addTerminalCommand("Session closed. Thank you for reaching out!")

        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => onStatusChange?.("Ready for next challenge"), 5000)
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      onStatusChange?.("Failed to send message - Please try again")
      addTerminalCommand("✗ Error: Failed to send message")
      addTerminalCommand("✗ Please try again or contact directly")
      setTimeout(() => onStatusChange?.("Ready for next challenge"), 5000)
    } finally {
      setIsSubmitting(false)
      addTerminalCommand("Process completed.")
    }
  }

  return (
    <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            <span className="text-[#569cd6] font-mono">function</span>{" "}
            <span className="text-[#4ec9b0]">getInTouch</span>
            <span style={{ color: "var(--text-primary)" }}>()</span>
          </h2>
          <p className="max-w-2xl mx-auto font-mono" style={{ color: "var(--text-secondary)" }}>
            // Ready to collaborate on your next project
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-[#4ec9b0]" /> Let's Connect
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-[#2d2d30] rounded-lg hover:bg-[#3e3e42] transition-colors">
                  <div className="p-2 bg-gradient-to-br from-[#007acc] to-[#4ec9b0] rounded">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[#569cd6] font-mono text-sm">email:</p>
                    <p className="text-white">{resumeData.personalInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#2d2d30] rounded-lg hover:bg-[#3e3e42] transition-colors">
                  <div className="p-2 bg-gradient-to-br from-[#28ca42] to-[#4ec9b0] rounded">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[#569cd6] font-mono text-sm">phone:</p>
                    <p className="text-white">{resumeData.personalInfo.phone}</p>
                    </div>
                    </div>

                <div className="flex items-center gap-4 p-4 bg-[#2d2d30] rounded-lg hover:bg-[#3e3e42] transition-colors">
                  <div className="p-2 bg-gradient-to-br from-[#dcb67a] to-[#4ec9b0] rounded">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[#569cd6] font-mono text-sm">location:</p>
                    <p className="text-white">{resumeData.personalInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#2d2d30] rounded-lg hover:bg-[#3e3e42] transition-colors">
                  <div className="p-2 bg-gradient-to-br from-[#0077b5] to-[#4ec9b0] rounded">
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[#569cd6] font-mono text-sm">linkedin:</p>
                    <a
                      href={resumeData.personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#007acc] hover:text-[#4ec9b0] transition-colors"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-6">
              <div className="bg-[#2d2d30] rounded p-4">
                <code className="text-xs text-[#569cd6] font-mono block mb-2">// Available for opportunities</code>
                <code className="text-xs text-[#ce9178] font-mono block">const status = "Open to new challenges";</code>
                <code className="text-xs text-[#4ec9b0] font-mono block">const responseTime = "Within 24 hours";</code>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Send className="w-5 h-5 text-[#4ec9b0]" /> Send Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {["name", "email"].map((field) => (
                <div key={field}>
                  <label className="block text-[#569cd6] font-mono text-sm mb-2">{field}:</label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleInputChange}
                    placeholder={field === "email" ? "your.email@example.com" : "Your name"}
                    className="w-full bg-[#2d2d30] border border-[#3e3e42] rounded px-4 py-3 text-white focus:border-[#007acc] focus:outline-none transition-colors"
                    required
                  />
                </div>
              ))}

              <div>
                <label className="block text-[#569cd6] font-mono text-sm mb-2">message:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="w-full bg-[#2d2d30] border border-[#3e3e42] rounded px-4 py-3 text-white focus:border-[#007acc] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#007acc] to-[#4ec9b0] hover:from-[#005a9e] hover:to-[#3a9d8a] text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Terminal Window */}
      {showTerminal && (
        <div className="fixed bottom-4 right-4 w-96 z-50">
          <TerminalWindow title="Message Sender" 
          commands={terminalCommands} 
          isProcessing={isSubmitting} 
          cursorBlinkSpeed={isSubmitting ? 500 : 0}
          autoCloseAfter={14000} 
          onClose={() => setShowTerminal(false)} // remove terminal from DOM
          />
        </div>
      )}
    </div>
  )
}
