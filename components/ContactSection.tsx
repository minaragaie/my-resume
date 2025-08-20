"use client"

import type React from "react"

import { useState } from "react"
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
      addTerminalLog(`connect --to "Mina Youaness"`)
      await new Promise((resolve) => setTimeout(resolve, 800))

      addTerminalLog("[✔] Secure channel established")
      await new Promise((resolve) => setTimeout(resolve, 600))

      addTerminalLog("[✔] Handshake completed")
      await new Promise((resolve) => setTimeout(resolve, 500))

      addTerminalLog("[✔] Contact form initialized")
      await new Promise((resolve) => setTimeout(resolve, 500))

      onStatusChange?.("Encrypting message...")
      addTerminalLog(`[✔] Encrypting message from <${formData.email}>...`)
      await new Promise((resolve) => setTimeout(resolve, 700))

      onStatusChange?.("Transmitting...")
      addTerminalLog("[✔] Transmitting data packets...")
      await new Promise((resolve) => setTimeout(resolve, 600))

      addTerminalLog("[✔] Signal received by Mina's inbox")
      await new Promise((resolve) => setTimeout(resolve, 500))

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
        addTerminalLog("------------------------------------------")
        addTerminalLog(`👋 Hello ${formData.name} (<${formData.email}>)`)
        addTerminalLog("   Welcome to my terminal. Your message has successfully")
        addTerminalLog("   reached Mina Youaness.")
        addTerminalLog("")
        addTerminalLog("   ⚡ Transmission complete. Mina will review your request")
        addTerminalLog("      and get back to you as soon as possible.")
        addTerminalLog("")
        addTerminalLog("------------------------------------------")
        await new Promise((resolve) => setTimeout(resolve, 1000))
        addTerminalLog("exit")
        addTerminalLog("Session closed. Thank you for reaching out!")

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
    <div
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-base-content">
            <span className="text-primary font-mono">function</span> <span className="text-secondary">getInTouch</span>
            <span className="text-base-content">()</span>
          </h2>
          <p className="max-w-2xl mx-auto font-mono text-base-content/70">
            // Ready to collaborate on your next project
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="card bg-base-200 shadow-lg border border-base-content/20">
              <div className="card-body p-8">
                <h3 className="card-title text-xl text-base-content mb-6 flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                  Let's Connect
                </h3>

                <div className="space-y-6">
                  <div className="card bg-base-300 shadow-sm hover:shadow-md transition-all">
                    <div className="card-body p-4 flex-row items-center gap-4">
                      <div className="avatar placeholder">
                        <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-primary font-mono text-sm">email:</p>
                        <p className="text-base-content">{resumeData.personalInfo.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-base-300 shadow-sm hover:shadow-md transition-all">
                    <div className="card-body p-4 flex-row items-center gap-4">
                      <div className="avatar placeholder">
                        <div className="p-2 bg-gradient-to-br from-success to-secondary rounded">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-primary font-mono text-sm">phone:</p>
                        <p className="text-base-content">{resumeData.personalInfo.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-base-300 shadow-sm hover:shadow-md transition-all">
                    <div className="card-body p-4 flex-row items-center gap-4">
                      <div className="avatar placeholder">
                        <div className="p-2 bg-gradient-to-br from-warning to-secondary rounded">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-primary font-mono text-sm">location:</p>
                        <p className="text-base-content">{resumeData.personalInfo.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-base-300 shadow-sm hover:shadow-md transition-all">
                    <div className="card-body p-4 flex-row items-center gap-4">
                      <div className="avatar placeholder">
                        <div className="p-2 bg-gradient-to-br from-info to-secondary rounded">
                          <Linkedin className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-primary font-mono text-sm">linkedin:</p>
                        <a
                          href={resumeData.personalInfo.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-primary hover:link-secondary transition-colors"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg border border-base-content/20">
              <div className="card-body p-6">
                <div className="mockup-code bg-base-300">
                  <pre data-prefix="//">
                    <code className="text-primary">Available for opportunities</code>
                  </pre>
                  <pre data-prefix="1">
                    <code className="text-warning">const status = "Open to new challenges";</code>
                  </pre>
                  <pre data-prefix="2">
                    <code className="text-secondary">const responseTime = "Within 24 hours";</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card bg-base-200 shadow-lg border border-base-content/20">
            <div className="card-body p-8">
              <h3 className="card-title text-xl text-base-content mb-6 flex items-center gap-3">
                <Send className="w-5 h-5 text-secondary" />
                Send Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-primary font-mono">name:</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input input-bordered bg-base-300 focus:input-primary"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-primary font-mono">email:</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input input-bordered bg-base-300 focus:input-primary"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-primary font-mono">message:</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="textarea textarea-bordered bg-base-300 focus:textarea-primary resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg w-full shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showTerminal && (
        <div className="fixed bottom-4 right-4 w-96 card bg-base-200 shadow-2xl z-50 border border-base-content/20">
          {/* Terminal Header */}
          <div className="card-body p-0">
            <div className="flex items-center justify-between bg-base-300 px-4 py-2 rounded-t-lg">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-secondary" />
                <span className="text-base-content text-sm font-mono">Message Sender</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-warning rounded-full hover:opacity-80 cursor-pointer" />
                <div className="w-3 h-3 bg-success rounded-full hover:opacity-80 cursor-pointer" />
                <button
                  onClick={() => setShowTerminal(false)}
                  className="w-3 h-3 bg-error rounded-full hover:opacity-80"
                />
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-4 h-64 overflow-y-auto bg-base-100 rounded-b-lg">
              <div className="font-mono text-xs space-y-1">
                {terminalLogs.map((log, index) => (
                  <div key={index} className="text-base-content/80">
                    <span className="text-primary">$</span> {log}
                  </div>
                ))}
                {isSubmitting && (
                  <div className="flex items-center gap-2 text-secondary">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    <span>Processing...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
