"use client"

import { useState } from "react"
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

interface CertificationsSectionProps {
  isVisible?: boolean
}

export default function CertificationsSection({ isVisible = false }: CertificationsSectionProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
  const [currentPathwayIndex, setCurrentPathwayIndex] = useState(0)
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

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
        return <CheckCircle className="w-4 h-4 text-success" />
      case "studied and attended exam":
        return <Clock className="w-4 h-4 text-warning" />
      default:
        return <Award className="w-4 h-4 text-secondary" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "badge-success"
      case "studied and attended exam":
        return "badge-warning"
      default:
        return "badge-secondary"
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8 sm:mb-16">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-base-content">
          <span className="text-primary font-mono">const</span> <span className="text-secondary">certifications</span>{" "}
          <span className="text-base-content">=</span> <span className="text-warning">[]</span>
        </h2>
        <p className="max-w-2xl mx-auto font-mono text-sm sm:text-base text-base-content/70">
          // Continuous learning and professional development
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {(resumeData.certifications as Certificate[]).map((cert, index) => (
          <div
            key={index}
            className={`relative h-[350px] sm:h-[400px] transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: `${index * 200}ms`,
              perspective: "1000px",
            }}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                flippedCards.has(index) ? "rotate-y-180" : ""
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="card bg-base-200 shadow-lg hover:shadow-xl border border-base-content/20 hover:border-primary transition-all duration-300 absolute inset-0 w-full h-full backface-hidden"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="card-body p-4 sm:p-8">
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="avatar placeholder">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-primary to-secondary rounded-lg flex-shrink-0">
                        <Award className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="card-title text-sm sm:text-lg text-base-content truncate">{cert.name}</h3>
                        {getStatusIcon(cert.status)}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3 sm:mb-4">
                        <span className="text-primary font-semibold text-xs sm:text-sm truncate">{cert.issuer}</span>
                        <div className={`badge badge-outline ${getStatusColor(cert.status)} text-xs w-fit`}>
                          {cert.status}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mockup-code bg-base-300 p-3 sm:p-4 mb-3 sm:mb-4">
                    <pre className="text-xs text-primary font-mono">// Certification Details</pre>
                    <p className="text-base-content/80 mt-2 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {cert.description}
                    </p>
                  </div>

                  {cert.skills.length > 0 && (
                    <div className="mb-3 sm:mb-4">
                      <h4 className="text-xs sm:text-sm font-semibold text-primary mb-2 font-mono">// Key Skills:</h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {cert.skills
                          .slice(0, window.innerWidth < 640 ? 4 : cert.skills.length)
                          .map((skill, skillIndex) => (
                            <div key={skillIndex} className="badge badge-outline badge-secondary text-xs px-1 sm:px-2">
                              {skill}
                            </div>
                          ))}
                        {cert.skills.length > 4 && window.innerWidth < 640 && (
                          <div className="badge badge-outline text-xs px-1">+{cert.skills.length - 4}</div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="card-actions justify-between items-center mt-auto">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-base-content/70 truncate">
                      <span className="text-primary font-mono">issuer:</span>
                      <span className="text-warning truncate">"{cert.issuer}"</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      {cert.pathway && cert.pathway.length > 0 && (
                        <button className="btn btn-outline btn-warning btn-xs" onClick={() => toggleCardFlip(index)}>
                          <RotateCcw className="w-3 h-3" />
                          <span className="font-mono text-xs hidden sm:inline">viewPathway()</span>
                        </button>
                      )}
                      {cert.verify && (
                        <button className="btn btn-outline btn-secondary btn-xs" onClick={() => handleVerify(cert)}>
                          <ExternalLink className="w-3 h-3" />
                          <span className="font-mono text-xs hidden sm:inline">verify()</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {cert.pathway && cert.pathway.length > 0 && (
                <div
                  className="card bg-gradient-to-br from-base-300 to-base-200 border border-warning shadow-lg absolute inset-0 w-full h-full backface-hidden rotate-y-180 overflow-y-auto"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="card-body p-3 sm:p-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div>
                        <h3 className="card-title text-sm sm:text-lg text-base-content mb-1">Certificate Pathway</h3>
                        <p className="text-warning text-xs sm:text-sm font-mono">{cert.pathway.length} components</p>
                      </div>
                      <button
                        className="btn btn-ghost btn-sm text-warning hover:bg-warning/10"
                        onClick={() => toggleCardFlip(index)}
                      >
                        <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    <div className="space-y-2 sm:space-y-4">
                      {cert.pathway.map((pathwayCert, pathwayIndex) => (
                        <div
                          key={pathwayIndex}
                          className="card bg-base-100 shadow-sm border border-base-content/20 hover:border-warning/50 transition-colors"
                        >
                          <div className="card-body p-3 sm:p-4">
                            <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                              <div className="avatar placeholder">
                                <div className="p-1 sm:p-2 bg-gradient-to-br from-success to-secondary rounded flex-shrink-0">
                                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs sm:text-sm font-bold text-base-content mb-1 truncate">
                                  {pathwayCert.name}
                                </h4>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                                  <span className="text-xs text-primary truncate">{pathwayCert.issuer}</span>
                                  <div
                                    className={`badge badge-outline ${getStatusColor(pathwayCert.status)} text-xs w-fit`}
                                  >
                                    {pathwayCert.status}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <p className="text-xs text-base-content/80 mb-2 sm:mb-3 line-clamp-2">
                              {pathwayCert.description}
                            </p>

                            {pathwayCert.skills.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                                {pathwayCert.skills.slice(0, 2).map((skill, skillIndex) => (
                                  <div
                                    key={skillIndex}
                                    className="badge badge-outline badge-secondary text-xs px-1 py-0"
                                  >
                                    {skill}
                                  </div>
                                ))}
                                {pathwayCert.skills.length > 2 && (
                                  <div className="badge badge-outline text-xs px-1 py-0">
                                    +{pathwayCert.skills.length - 2}
                                  </div>
                                )}
                              </div>
                            )}

                            {pathwayCert.verify && (
                              <div className="card-actions justify-end">
                                <button
                                  className="btn btn-ghost btn-xs text-secondary hover:bg-secondary/10"
                                  onClick={() => handleVerify(pathwayCert)}
                                >
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  verify
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedCert && selectedCert.pathway && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center p-2 sm:p-4 z-[100000]"
          style={{ isolation: "isolate" }}
        >
          <div className="bg-gradient-to-br from-[#252526] to-[#2d2d30] border border-[#007acc] rounded-xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-[#007acc] to-[#4ec9b0] p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-2xl font-bold truncate">{selectedCert.name}</h3>
                  <p className="text-blue-100 mt-1 text-sm sm:text-base">
                    Certificate Pathway ({selectedCert.pathway.length} components)
                  </p>
                </div>
                <button
                  onClick={closePathwayModal}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0 ml-2"
                >
                  <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 bg-[#2d2d30] border-b border-[#3e3e42]">
              <button
                onClick={prevPathway}
                disabled={currentPathwayIndex === 0}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-[#3e3e42] hover:bg-[#4e4e52] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-mono text-white hidden sm:inline">Previous</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-white font-mono text-xs sm:text-sm">
                  {currentPathwayIndex + 1} / {selectedCert.pathway.length}
                </span>
                <div className="flex gap-1">
                  {selectedCert.pathway.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                        index === currentPathwayIndex ? "bg-[#007acc]" : "bg-[#3e3e42]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={nextPathway}
                disabled={currentPathwayIndex === selectedCert.pathway.length - 1}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-[#3e3e42] hover:bg-[#4e4e52] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <span className="text-xs sm:text-sm font-mono text-white hidden sm:inline">Next</span>
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>

            <div className="p-3 sm:p-6 overflow-y-auto max-h-[60vh]">
              {selectedCert.pathway[currentPathwayIndex] && (
                <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded-lg p-4 sm:p-6">
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

      <div className="mt-8 sm:mt-12 text-center">
        <div className="card bg-base-200 shadow-lg border border-base-content/20 max-w-4xl mx-auto">
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-warning" />
              <h3 className="card-title text-base sm:text-lg text-base-content">Additional Information</h3>
            </div>
            <p className="text-base-content/80 leading-relaxed text-sm sm:text-base">{resumeData.additionalInfo}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
