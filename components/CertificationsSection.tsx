"use client"

import { useState, useEffect } from "react"
import { Award, CheckCircle, Clock, ExternalLink, FileCode, Icon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import resumeData from "@/data/resume.json"
import { Button } from "./ui/button"

export default function CertificationsSection() {
  const [certsVisible, setCertsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setCertsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleVerify = (cert: any) => {
  if (cert.verify) {
    // Open the verification link in a new tab
    window.open(cert.verify, "_blank");
    console.log(`Verifying certification: ${cert.name}`);
  } else {
    console.warn(`No verification link available for: ${cert.name}`);
  }
};

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-[#28ca42]" />
      case "studied and attended exam":
        return <Clock className="w-4 h-4 text-[#dcb67a]" />
      default:
        return <Award className="w-4 h-4 text-[#4ec9b0]" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-[#28ca42] border-[#28ca42]"
      case "studied and attended exam":
        return "text-[#dcb67a] border-[#dcb67a]"
      default:
        return "text-[#4ec9b0] border-[#4ec9b0]"
    }
  }

  return (
    <section id="certifications" className="py-20 px-4 bg-[#1e1e1e]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            <span className="text-[#569cd6] font-mono">const</span> <span className="text-[#4ec9b0]">certifications</span> <span className="text-white">=</span> <span className="text-[#ce9178]">[]</span> 
          </h2>
          <p className="text-[#d4d4d4] max-w-2xl mx-auto font-mono">
            // Continuous learning and professional development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {resumeData.certifications.map((cert, index) => (
            <div
              key={index}
              className={`bg-[#252526] border border-[#3e3e42] rounded-lg p-8 hover:border-[#007acc] transition-all duration-300 hover:shadow-lg hover:shadow-[#007acc]/10 ${
                certsVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-[#007acc] to-[#4ec9b0] rounded-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{cert.name}</h3>
                    {getStatusIcon(cert.status)}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#007acc] font-semibold">{cert.issuer}</span>
                    <Badge variant="outline" className={getStatusColor(cert.status)}>
                      {cert.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="bg-[#2d2d30] rounded p-4 mb-4">
                <code className="text-xs text-[#569cd6] font-mono">// Certification Details</code>
                <p className="text-[#d4d4d4] mt-2 text-sm leading-relaxed">{cert.description}</p>
              </div>

              {(cert.skills).length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#569cd6] mb-2 font-mono">// Key Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="outline"
                        className="text-xs text-[#4ec9b0] border-[#4ec9b0] bg-[#1e1e1e]"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-[#d4d4d4]">
                  <span className="text-[#569cd6] font-mono">issuer:</span>
                  <span className="text-[#ce9178]">"{cert.issuer}"</span>
                </div>
                {cert.verify && (
                  <div className="flex items-center gap-3">
                    <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-[#4ec9b0]/10 to-[#4ec9b0]/5 hover:from-[#4ec9b0] hover:to-[#0086d4] text-[#4ec9b0] hover:text-white border-2 border-[#4ec9b0]/30 hover:border-[#4ec9b0] transition-all shadow-md hover:shadow-lg backdrop-blur-sm"
                        onClick={() => handleVerify(cert)}
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        <span className="font-mono text-xs">verify()</span>
                      </Button>
                    <ExternalLink className="w-4 h-4 text-[#4ec9b0] opacity-50 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => handleVerify(cert)}/>
                  </div>
                )}  
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-[#252526] border border-[#3e3e42] rounded-lg p-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-[#dcb67a]" />
              <h3 className="text-lg font-semibold text-white">Additional Information</h3>
            </div>
            <p className="text-[#d4d4d4] leading-relaxed">{resumeData.additionalInfo}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
