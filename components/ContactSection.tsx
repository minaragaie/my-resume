"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Linkedin, Send, MessageSquare, Terminal } from "lucide-react"
import resumeData from "@/data/resume.json"

interface ContactSectionProps {
  onStatusChange?: (status: string) => void
  isVisible?: boolean
}

export default function ContactSection({ onStatusChange, isVisible = false }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [terminalLogs, setTerminalLogs] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const addTerminalLog = (message: string) => {
    setTerminalLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setShowTerminal(true)
    setTerminalLogs([])

    try {
      onStatusChange?.("Sending message...")
      addTerminalLog("Initializing message transmission...")
      await new Promise((resolve) => setTimeout(resolve, 800))

      onStatusChange?.("Validating data...")
      addTerminalLog("Validating form data...")
      await new Promise((resolve) => setTimeout(resolve, 600))

      onStatusChange?.("Establishing connection...")
      addTerminalLog("Establishing secure connection...")
      await new Promise((resolve) => setTimeout(resolve, 700))

      onStatusChange?.("Encrypting message...")
      addTerminalLog("Encrypting message content...")
      await new Promise((resolve) => setTimeout(resolve, 500))

      onStatusChange?.("Transmitting...")
      addTerminalLog("Sending message to server...")

      // Simulate API call - replace with actual email service
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        onStatusChange?.("Message sent successfully!")
        addTerminalLog("✓ Message sent successfully!")
        addTerminalLog("✓ Notification delivered to recipient")
        setFormData({ name: "", email: "", message: "" })

        setTimeout(() => {
          onStatusChange?.("Ready for next challenge")
        }, 5000)
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      onStatusChange?.("Failed to send message - Please try again")
      addTerminalLog("✗ Error: Failed to send message")
      addTerminalLog("✗ Please try again or contact directly")

      setTimeout(() => {
        onStatusChange?.("Ready for next challenge")
      }, 5000)
    } finally {
      setIsSubmitting(false)
      addTerminalLog("Process completed.")
    }
  }

  return (
    <section
      id="contact"
      className={`py-20 px-4 bg-[#252526] relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            <span className="text-[#569cd6] font-mono">function</span>{" "}
            <span className="text-[#4ec9b0]">getInTouch</span>
            <span className="text-white">()</span>
          </h2>
          <p className="text-[#d4d4d4] max-w-2xl mx-auto font-mono">// Ready to collaborate on your next project</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-[#4ec9b0]" />
                Let's Connect
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
              <Send className="w-5 h-5 text-[#4ec9b0]" />
              Send Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#569cd6] font-mono text-sm mb-2">name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-[#2d2d30] border border-[#3e3e42] rounded px-4 py-3 text-white focus:border-[#007acc] focus:outline-none transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-[#569cd6] font-mono text-sm mb-2">email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-[#2d2d30] border border-[#3e3e42] rounded px-4 py-3 text-white focus:border-[#007acc] focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-[#569cd6] font-mono text-sm mb-2">message:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full bg-[#2d2d30] border border-[#3e3e42] rounded px-4 py-3 text-white focus:border-[#007acc] focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
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
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {showTerminal && (
        <div className="fixed bottom-4 right-4 w-96 bg-[#1e1e1e] border border-[#3e3e42] rounded-lg shadow-2xl z-50">
          {/* Terminal Header */}
          <div className="flex items-center justify-between bg-[#2d2d30] px-4 py-2 rounded-t-lg">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#4ec9b0]" />
              <span className="text-white text-sm font-mono">Message Sender</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-3 h-3 bg-[#ffbd2e] rounded-full hover:bg-[#ffbd2e]/80" />
              <button className="w-3 h-3 bg-[#28ca42] rounded-full hover:bg-[#28ca42]/80" />
              <button
                onClick={() => setShowTerminal(false)}
                className="w-3 h-3 bg-[#ff5f56] rounded-full hover:bg-[#ff5f56]/80"
              />
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-4 h-64 overflow-y-auto bg-[#1e1e1e] rounded-b-lg">
            <div className="font-mono text-xs space-y-1">
              {terminalLogs.map((log, index) => (
                <div key={index} className="text-[#d4d4d4]">
                  <span className="text-[#569cd6]">$</span> {log}
                </div>
              ))}
              {isSubmitting && (
                <div className="flex items-center gap-2 text-[#4ec9b0]">
                  <div className="w-2 h-2 bg-[#4ec9b0] rounded-full animate-pulse" />
                  <span>Processing...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
