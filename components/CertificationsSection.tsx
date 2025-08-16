"use client"

import { useState, useEffect } from "react"
import { Award, CheckCircle, Clock, ExternalLink, RotateCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import resumeData from "@/data/resume.json"
import { Button } from "./ui/button"

interface Certificate {
  name: string
  issuer: string
  status: string
  description: string
  color: string
  skills: string[]
  icon: string
  verify?: string
  pathway?: Certificate[]
}

export default function CertificationsSection() {
  const [certsVisible, setCertsVisible] = useState(false)
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
  const [currentPathwayIndex, setCurrentPathwayIndex] = useState(0)
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

  useEffect(() => {
    const timer = setTimeout(() => setCertsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleVerify = (cert: any) => {
    if (cert.verify) {
      window.open(cert.verify, "_blank")
      console.log(`Verifying certification: ${cert.name}`)
    } else {
      console.warn(`No verification link available for: ${cert.name}`)
    }
  }

  const openPathwayModal = (cert: Certificate) => {
    setSelectedCert(cert)
    setCurrentPathwayIndex(0)
  }

  const closePathwayModal = () => {
    setSelectedCert(null)
    setCurrentPathwayIndex(0)
  }

  const nextPathway = () => {
    if (selectedCert?.pathway && currentPathwayIndex < selectedCert.pathway.length - 1) {
      setCurrentPathwayIndex(currentPathwayIndex + 1)
    }
  }

  const prevPathway = () => {
    if (currentPathwayIndex > 0) {
      setCurrentPathwayIndex(currentPathwayIndex - 1)
    }
  }

  const toggleCardFlip = (index: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

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
            <span className="text-[#569cd6] font-mono">const</span>{" "}
            <span className="text-[#4ec9b0]">certifications</span> <span className="text-white">=</span>{" "}
            <span className="text-[#ce9178]">[]</span>
          </h2>
          <p className="text-[#d4d4d4] max-w-2xl mx-auto font-mono">
            // Continuous learning and professional development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {(resumeData.certifications as Certificate[]).map((cert, index) => (
            <div
              key={index}
              className={`relative h-[400px] ${certsVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{
                animationDelay: `${index * 200}ms`,
                perspective: "1000px",
              }}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  flippedCards.has(index) ? "rotate-y-180" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front of card - Original certificate */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#252526] border border-[#3e3e42] rounded-lg p-8 hover:border-[#007acc] transition-all duration-300 hover:shadow-lg hover:shadow-[#007acc]/10 backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
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

                  {cert.skills.length > 0 && (
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

                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-[#d4d4d4]">
                        <span className="text-[#569cd6] font-mono">issuer:</span>
                        <span className="text-[#ce9178]">"{cert.issuer}"</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {cert.pathway && cert.pathway.length > 0 && (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-[#dcb67a]/10 to-[#dcb67a]/5 hover:from-[#dcb67a] hover:to-[#f0c674] text-[#dcb67a] hover:text-black border-2 border-[#dcb67a]/30 hover:border-[#dcb67a] transition-all shadow-md hover:shadow-lg backdrop-blur-sm"
                            onClick={() => toggleCardFlip(index)}
                          >
                            <RotateCcw className="w-3 h-3 mr-2" />
                            <span className="font-mono text-xs">viewPathway()</span>
                          </Button>
                        )}
                        {cert.verify && (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-[#4ec9b0]/10 to-[#4ec9b0]/5 hover:from-[#4ec9b0] hover:to-[#0086d4] text-[#4ec9b0] hover:text-white border-2 border-[#4ec9b0]/30 hover:border-[#4ec9b0] transition-all shadow-md hover:shadow-lg backdrop-blur-sm"
                            onClick={() => handleVerify(cert)}
                          >
                            <ExternalLink className="w-3 h-3 mr-2" />
                            <span className="font-mono text-xs">verify()</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {cert.pathway && cert.pathway.length > 0 && (
                  <div
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#2d2d30] to-[#252526] border border-[#dcb67a] rounded-lg p-6 backface-hidden rotate-y-180 overflow-y-auto"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">Certificate Pathway</h3>
                        <p className="text-[#dcb67a] text-sm font-mono">{cert.pathway.length} components</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-[#dcb67a] hover:bg-[#dcb67a]/10"
                        onClick={() => toggleCardFlip(index)}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {cert.pathway.map((pathwayCert, pathwayIndex) => (
                        <div
                          key={pathwayIndex}
                          className="bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-4 hover:border-[#dcb67a]/50 transition-colors"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="p-2 bg-gradient-to-br from-[#28ca42] to-[#4ec9b0] rounded">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-white mb-1 truncate">{pathwayCert.name}</h4>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs text-[#007acc]">{pathwayCert.issuer}</span>
                                <Badge variant="outline" className={`text-xs ${getStatusColor(pathwayCert.status)}`}>
                                  {pathwayCert.status}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-[#d4d4d4] mb-3 line-clamp-2">{pathwayCert.description}</p>

                          {pathwayCert.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {pathwayCert.skills.slice(0, 3).map((skill, skillIndex) => (
                                <Badge
                                  key={skillIndex}
                                  variant="outline"
                                  className="text-xs text-[#4ec9b0] border-[#4ec9b0] bg-[#1e1e1e] px-2 py-0"
                                >
                                  {skill}
                                </Badge>
                              ))}
                              {pathwayCert.skills.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs text-[#666] border-[#666] bg-[#1e1e1e] px-2 py-0"
                                >
                                  +{pathwayCert.skills.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}

                          {pathwayCert.verify && (
                            <div className="flex justify-end">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs text-[#4ec9b0] hover:bg-[#4ec9b0]/10 p-1 h-auto"
                                onClick={() => handleVerify(pathwayCert)}
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                verify
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedCert && selectedCert.pathway && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 z-[100000]"
            style={{ isolation: "isolate" }}
          >
            <div className="bg-gradient-to-br from-[#252526] to-[#2d2d30] border border-[#007acc] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#007acc] to-[#4ec9b0] p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedCert.name}</h3>
                    <p className="text-blue-100 mt-1">Certificate Pathway ({selectedCert.pathway.length} components)</p>
                  </div>
                  <button onClick={closePathwayModal} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <RotateCcw className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between p-4 bg-[#2d2d30] border-b border-[#3e3e42]">
                <button
                  onClick={prevPathway}
                  disabled={currentPathwayIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-[#3e3e42] hover:bg-[#4e4e52] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-sm font-mono text-white">Previous</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-white font-mono">
                    {currentPathwayIndex + 1} / {selectedCert.pathway.length}
                  </span>
                  <div className="flex gap-1">
                    {selectedCert.pathway.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentPathwayIndex ? "bg-[#007acc]" : "bg-[#3e3e42]"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={nextPathway}
                  disabled={currentPathwayIndex === selectedCert.pathway.length - 1}
                  className="flex items-center gap-2 px-4 py-2 bg-[#3e3e42] hover:bg-[#4e4e52] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <span className="text-sm font-mono text-white">Next</span>
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Current Pathway Certificate */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {selectedCert.pathway[currentPathwayIndex] && (
                  <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-[#28ca42] to-[#4ec9b0] rounded-lg">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-bold text-white">
                            {selectedCert.pathway[currentPathwayIndex].name}
                          </h4>
                          {getStatusIcon(selectedCert.pathway[currentPathwayIndex].status)}
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[#007acc] font-semibold">
                            {selectedCert.pathway[currentPathwayIndex].issuer}
                          </span>
                          <Badge
                            variant="outline"
                            className={getStatusColor(selectedCert.pathway[currentPathwayIndex].status)}
                          >
                            {selectedCert.pathway[currentPathwayIndex].status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#2d2d30] rounded p-4 mb-4">
                      <code className="text-xs text-[#569cd6] font-mono">// Component Description</code>
                      <p className="text-[#d4d4d4] mt-2 leading-relaxed">
                        {selectedCert.pathway[currentPathwayIndex].description}
                      </p>
                    </div>

                    {selectedCert.pathway[currentPathwayIndex].skills.length > 0 && (
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-[#569cd6] mb-2 font-mono">// Skills:</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedCert.pathway[currentPathwayIndex].skills.map((skill, skillIndex) => (
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

                    {selectedCert.pathway[currentPathwayIndex].verify && (
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#4ec9b0]/10 to-[#4ec9b0]/5 hover:from-[#4ec9b0] hover:to-[#0086d4] text-[#4ec9b0] hover:text-white border-2 border-[#4ec9b0]/30 hover:border-[#4ec9b0] transition-all shadow-md hover:shadow-lg backdrop-blur-sm"
                          onClick={() => handleVerify(selectedCert.pathway![currentPathwayIndex])}
                        >
                          <ExternalLink className="w-3 h-3 mr-2" />
                          <span className="font-mono text-xs">verify()</span>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

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
