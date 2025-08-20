"use client"

import type React from "react"

import { useState } from "react"
const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const Linkedin = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const Send = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

const MessageSquare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
)

const Terminal = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

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
