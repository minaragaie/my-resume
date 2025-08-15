"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Linkedin, Send, MessageSquare } from "lucide-react"
import resumeData from "@/data/resume.json"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" className="py-20 px-4 bg-[#252526]">
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
                className="w-full bg-gradient-to-r from-[#007acc] to-[#4ec9b0] hover:from-[#005a9e] hover:to-[#3a9d8a] text-white shadow-lg hover:shadow-xl"
                size="lg"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
