"use client"

import { useState } from "react"
import { GitBranch, GitCommitIcon, GitMerge, Plus, ChevronRight, ChevronDown } from "lucide-react"
import { staticResumeData } from "@/lib/resume-data"

interface CareerCommit {
  hash: string
  message: string
  author: string
  date: string
  type: "feat" | "refactor" | "merge" | "docs"
  changes: {
    additions: string[]
    removals: string[]
  }
  branch: string
}

interface CareerGitHistoryProps {
  onNavigate: (sectionId: string) => void
}

export default function CareerGitHistory({ onNavigate }: CareerGitHistoryProps) {
  const [selectedCommit, setSelectedCommit] = useState<string | null>(null)
  const [expandedCommit, setExpandedCommit] = useState<string | null>(null)

  const generateCareerCommits = (): CareerCommit[] => {
    const commits: CareerCommit[] = []

    const parseResumeDate = (dateStr: string): string => {
      if (!dateStr) return "2020-01-01"

      // Handle "Month Year" format like "April 2025", "Jan 2020"
      const monthYearMatch = dateStr.match(/(\w+)\s+(\d{4})/)
      if (monthYearMatch) {
        const [, month, year] = monthYearMatch
        const monthMap: { [key: string]: string } = {
          January: "01",
          Jan: "01",
          February: "02",
          Feb: "02",
          March: "03",
          Mar: "03",
          April: "04",
          Apr: "04",
          May: "05",
          June: "06",
          Jun: "06",
          July: "07",
          Jul: "07",
          August: "08",
          Aug: "08",
          September: "09",
          Sep: "09",
          October: "10",
          Oct: "10",
          November: "11",
          Nov: "11",
          December: "12",
          Dec: "12",
        }

        const monthNum = monthMap[month] || "01"
        return `${year}-${monthNum}-01`
      }

      // Fallback for any other format
      return "2020-01-01"
    }

    // Initial commit
    commits.push({
      hash: "a1b2c3d",
      message: "Initial commit: Started career journey",
      author: "Mina Youaness",
      date: "2016-04-01",
      type: "feat",
      changes: {
        additions: ["Computer Science Foundation", "Problem Solving Skills"],
        removals: [],
      },
      branch: "main",
    })

    // Experience commits
    staticResumeData.experience.forEach((exp, index) => {
      const startDate = parseResumeDate(exp.startDate)

      commits.push({
        hash: `${Math.random().toString(36).substr(2, 7)}`,
        message: `feat: joined ${exp.company} as ${exp.title}`,
        author: "Mina Youaness",
        date: startDate,
        type: "feat",
        changes: {
          additions: exp.technologies || [],
          removals: index > 0 ? ["Previous Role Responsibilities"] : [],
        },
        branch: "career",
      })

      if (exp.endDate && exp.endDate !== "April 2025") {
        const endDate = parseResumeDate(exp.endDate)

        commits.push({
          hash: `${Math.random().toString(36).substr(2, 7)}`,
          message: `refactor: completed tenure at ${exp.company}`,
          author: "Mina Youaness",
          date: endDate,
          type: "refactor",
          changes: {
            additions: ["Enhanced Experience", "New Achievements"],
            removals: [],
          },
          branch: "career",
        })
      }
    })

    // Skill merges
    const skillMergeDates = {
      languages: "2017-06-15",
      frameworks: "2018-08-20",
      databases: "2019-03-10",
      versionControl: "2017-01-15",
      technologies: "2020-09-05",
      methodologies: "2018-11-12",
      standards: "2021-07-18",
    }

    Object.entries(staticResumeData.skills).forEach(([category, skills]) => {
      commits.push({
        hash: `${Math.random().toString(36).substr(2, 7)}`,
        message: `merge: integrated ${category} expertise into main skillset`,
        author: "Mina Youaness",
        date: skillMergeDates[category as keyof typeof skillMergeDates] || "2020-06-15",
        type: "merge",
        changes: {
          additions: Array.isArray(skills) ? skills : [],
          removals: [],
        },
        branch: `feature/${category}`,
      })
    })

    // Certification commits
    const certificationDates = [
      "2018-03-15", // HTML, CSS and JavaScript
      "2019-08-22", // Full Stack Developer
      "2020-11-10", // Microsoft Exam 480
      "2021-05-18", // .NET Core
      "2022-09-25", // AI For Everyone
      "2023-12-08", // Google Cybersecurity (started)
      "2024-06-15", // Google Cybersecurity (completed)
      "2020-01-20", // WES Verification
    ]

    staticResumeData.certifications.forEach((cert, index) => {
      commits.push({
        hash: `${Math.random().toString(36).substr(2, 7)}`,
        message: `docs: earned ${cert.name} certification`,
        author: "Mina Youaness",
        date: certificationDates[index] || "2022-01-01",
        type: "docs",
        changes: {
          additions: [cert.name, `Issued by ${cert.issuer}`],
          removals: [],
        },
        branch: "certifications",
      })
    })

    return commits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const commits = generateCareerCommits()

  const getCommitIcon = (type: string) => {
    switch (type) {
      case "feat":
        return <GitCommitIcon size={14} className="text-green-400" />
      case "merge":
        return <GitMerge size={14} className="text-purple-400" />
      case "refactor":
        return <GitBranch size={14} className="text-blue-400" />
      case "docs":
        return <GitCommitIcon size={14} className="text-yellow-400" />
      default:
        return <GitCommitIcon size={14} className="text-gray-400" />
    }
  }

  const getBranchColor = (branch: string) => {
    switch (branch) {
      case "main":
        return "text-green-400"
      case "career":
        return "text-blue-400"
      case "certifications":
        return "text-yellow-400"
      default:
        return "text-purple-400"
    }
  }

  const getBranchBadgeStyle = (branch: string) => {
    switch (branch) {
      case "main":
        return "bg-green-500/20 text-green-300 border border-green-500/30"
      case "career":
        return "bg-blue-500/20 text-blue-300 border border-blue-500/30"
      case "certifications":
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
      default:
        return "bg-purple-500/20 text-purple-300 border border-purple-500/30"
    }
  }

  const handleCommitNavigation = (commit: CareerCommit) => {
    if (commit.message.includes("joined") || commit.message.includes("completed tenure")) {
      onNavigate("experience")
    } else if (commit.message.includes("certification") || commit.message.includes("earned")) {
      onNavigate("certifications")
    } else if (commit.message.includes("skillset") || commit.message.includes("expertise")) {
      onNavigate("skills")
    } else if (commit.message.includes("education") || commit.message.includes("degree")) {
      onNavigate("education")
    } else if (commit.message.includes("Initial commit") || commit.message.includes("career journey")) {
      onNavigate("hero")
    } else {
      // Default to experience for career-related commits
      onNavigate("experience")
    }
  }

  return (
    <div className="flex flex-col bg-[#1e1e1e] h-full text-xs">
      <div className="h-8 bg-gradient-to-r from-[#007acc] to-[#005a9e] flex items-center px-2 text-white border-b border-[#007acc]/30">
        <GitBranch size={12} className="text-white mr-2" />
        <div className="text-xs font-semibold">SOURCE CONTROL</div>
      </div>

      <div className="p-2 border-b border-[#3e3e42] bg-[#252526]">
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div className="bg-[#1a1a1a] rounded p-2 border border-[#3e3e42] text-center">
            <div className="text-green-400 font-mono text-xs">{commits.length}</div>
            <div className="text-[#858585] text-xs">commits</div>
          </div>
          <div className="bg-[#1a1a1a] rounded p-2 border border-[#3e3e42] text-center">
            <div className="text-blue-400 font-mono text-xs">main</div>
            <div className="text-[#858585] text-xs">branch</div>
          </div>
          <div className="bg-[#1a1a1a] rounded p-2 border border-[#3e3e42] text-center">
            <div className="text-purple-400 font-mono text-xs">live</div>
            <div className="text-[#858585] text-xs">status</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {commits.slice(0, 8).map((commit, index) => (
            <div key={commit.hash} className="group">
              <div
                className={`flex items-center gap-2 p-2 rounded hover:bg-[#2a2d2e] cursor-pointer transition-all ${
                  selectedCommit === commit.hash ? "bg-[#094771] border border-[#007acc]/50" : ""
                }`}
                onClick={() => {
                  setSelectedCommit(commit.hash)
                  setExpandedCommit(expandedCommit === commit.hash ? null : commit.hash)
                  handleCommitNavigation(commit)
                }}
              >
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-[#2d2d30] border border-current flex items-center justify-center">
                    {getCommitIcon(commit.type)}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white truncate mb-1 group-hover:text-[#007acc]">{commit.message}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-[#007acc] text-xs">{commit.hash}</span>
                    <span className="text-[#858585]">•</span>
                    <span className="text-[#858585] text-xs">
                      {new Date(commit.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                    <div className={`px-1 py-0.5 rounded text-xs ${getBranchBadgeStyle(commit.branch)}`}>
                      {commit.branch}
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {expandedCommit === commit.hash ? (
                    <ChevronDown size={12} className="text-[#007acc]" />
                  ) : (
                    <ChevronRight size={12} className="text-[#858585]" />
                  )}
                </div>
              </div>

              {expandedCommit === commit.hash && (
                <div className="ml-6 mt-1 mb-2 p-2 bg-[#1a1a1a] rounded border border-[#007acc]/30">
                  {commit.changes.additions.length > 0 && (
                    <div className="mb-2">
                      <div className="text-xs text-green-400 mb-1 flex items-center gap-1">
                        <Plus size={10} />+{commit.changes.additions.length}
                      </div>
                      {commit.changes.additions.slice(0, 3).map((addition, index) => (
                        <div key={index} className="text-xs text-green-300 ml-3 truncate">
                          {addition}
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCommitNavigation(commit)
                    }}
                    className="text-xs px-2 py-1 bg-[#007acc] text-white rounded hover:bg-[#1177bb] transition-colors"
                  >
                    View →
                  </button>
                </div>
              )}

              {index < commits.slice(0, 8).length - 1 && <div className="ml-4 w-px h-2 bg-[#3e3e42]"></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 border-t border-[#3e3e42] bg-[#252526]">
        <div className="flex items-center justify-between text-xs text-[#858585]">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Live</span>
          </div>
          <div className="text-[#007acc] font-mono">HEAD → main</div>
        </div>
      </div>
    </div>
  )
}
