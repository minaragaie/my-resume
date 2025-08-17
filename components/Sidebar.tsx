"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronRight,
  User,
  Briefcase,
  Code,
  GraduationCap,
  Award,
  Mail,
  FolderOpen,
  Search,
  GitBranch,
  Settings,
  ExpandIcon as Extensions,
  Folder,
  FileText,
} from "lucide-react"

import { staticResumeData } from "@/lib/resume-data"

interface SidebarProps {
  currentSection: string
  onSectionClick: (sectionId: string) => void
  isCollapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ currentSection, onSectionClick, isCollapsed, onToggle }: SidebarProps) {
  const [isExplorerOpen, setIsExplorerOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("explorer")
  const [expandedDirs, setExpandedDirs] = useState<Record<string, boolean>>({
    skills: false,
    experience: false,
    education: false,
    certifications: false,
  })

  const generateFileStructure = () => {
    const structure = [{ id: "hero", name: "hero.tsx", icon: User, color: "#007acc", type: "file" }]

    const skillsChildren = Object.entries(staticResumeData.skills).map(([category, skills]) => ({
      id: `skills-${category}`,
      name: `${category}.ts`,
      icon: FileText,
      color: "#4ec9b0",
      parent: "skills",
    }))

    structure.push({
      id: "skills",
      name: "skills/",
      icon: Folder,
      color: "#dcb67a",
      type: "directory",
      children: skillsChildren,
    })

    const experienceChildren = staticResumeData.experience.map((exp) => ({
      id: `experience-${exp.id}`,
      name: `${exp.company.toLowerCase().replace(/[^a-z0-9]/g, "-")}.tsx`,
      icon: Briefcase,
      color: "#dcdcaa",
      parent: "experience",
    }))

    structure.push({
      id: "experience",
      name: "experience/",
      icon: Folder,
      color: "#dcb67a",
      type: "directory",
      children: experienceChildren,
    })

    structure.push({ id: "technologies", name: "technologies.tsx", icon: Code, color: "#9cdcfe", type: "file" })

    const educationChildren = staticResumeData.education.map((edu, index) => ({
      id: `education-${index}`,
      name: `${(edu.degree || "unknown-degree").toLowerCase().replace(/[^a-z0-9]/g, "-")}.tsx`,
      icon: GraduationCap,
      color: "#c586c0",
      parent: "education",
    }))

    structure.push({
      id: "education",
      name: "education/",
      icon: Folder,
      color: "#dcb67a",
      type: "directory",
      children: educationChildren,
    })

    const certificationsChildren = staticResumeData.certifications.map((cert, index) => ({
      id: `certifications-${index}`,
      name: `${(cert.name || "unknown-certificate").toLowerCase().replace(/[^a-z0-9]/g, "-")}.tsx`,
      icon: Award,
      color: "#ce9178",
      parent: "certifications",
    }))

    structure.push({
      id: "certifications",
      name: "certifications/",
      icon: Folder,
      color: "#dcb67a",
      type: "directory",
      children: certificationsChildren,
    })

    structure.push({ id: "contact", name: "contact.tsx", icon: Mail, color: "#b5cea8", type: "file" })

    return structure
  }

  const fileStructure = generateFileStructure()

  const getTotalFileCount = () => {
    let count = 3 // hero, technologies, contact
    count += Object.keys(staticResumeData.skills).length
    count += staticResumeData.experience.length
    count += staticResumeData.education.length
    count += staticResumeData.certifications.length
    return count
  }

  const toggleDirectory = (dirId: string) => {
    setExpandedDirs((prev) => ({
      ...prev,
      [dirId]: !prev[dirId],
    }))
  }

  const scrollToSection = (sectionId: string) => {
    const parentSection = sectionId.includes("-") ? sectionId.split("-")[0] : sectionId
    const element = document.getElementById(parentSection)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    onSectionClick(parentSection)
  }

  const sidebarTabs = [
    { id: "explorer", icon: FolderOpen, tooltip: "Explorer" },
    { id: "search", icon: Search, tooltip: "Search" },
    { id: "git", icon: GitBranch, tooltip: "Source Control" },
    { id: "extensions", icon: Extensions, tooltip: "Extensions" },
    { id: "settings", icon: Settings, tooltip: "Settings" },
  ]

  return (
    <>
      {/* Activity Bar - Always visible */}
      <div className="w-12 h-full bg-[#2c2c2c] border-r border-[#3e3e42] flex flex-col z-50 min-h-screen">
        <div className="flex flex-col py-2">
          {sidebarTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === "explorer") {
                    if (activeTab === "explorer" && !isCollapsed) {
                      onToggle() // Close sidebar if explorer is active and open
                    } else {
                      setActiveTab(tab.id)
                      if (isCollapsed) {
                        onToggle() // Open sidebar if closed
                      }
                    }
                  } else {
                    setActiveTab(tab.id)
                    if (isCollapsed) {
                      onToggle() // Open sidebar for other tabs
                    }
                  }
                }}
                className={`w-12 h-12 flex items-center justify-center transition-colors relative group ${
                  isActive && !isCollapsed
                    ? "text-white bg-[#094771]"
                    : "text-[#858585] hover:text-white hover:bg-[#2a2d2e]"
                }`}
                title={tab.tooltip}
              >
                <Icon size={20} />
                {isActive && !isCollapsed && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white"></div>}
              </button>
            )
          })}
        </div>

        <div className="mt-auto mb-2">
          <button
            onClick={onToggle}
            className="w-12 h-12 flex items-center justify-center text-[#858585] hover:text-white hover:bg-[#2a2d2e] transition-colors"
            title={isCollapsed ? "Show Sidebar" : "Hide Sidebar"}
          >
            <ChevronRight
              size={16}
              className={`transition-transform duration-200 ${isCollapsed ? "rotate-0" : "rotate-180"}`}
            />
          </button>
        </div>
      </div>

      {/* Sidebar Panel - Toggleable */}
      {!isCollapsed && (
        <div className={`w-64 bg-[#252526] border-r border-[#3e3e42] transition-all duration-300 z-40 min-h-screen`}>
          {activeTab === "explorer" && (
            <>
              <div className="h-9 bg-[#252526] flex items-center px-3 text-xs text-[#cccccc] font-medium border-b border-[#3e3e42] uppercase tracking-wide">
                Explorer
              </div>

              {/* File Explorer */}
              <div className="p-2">
                <div className="mb-2">
                  <button
                    onClick={() => setIsExplorerOpen(!isExplorerOpen)}
                    className="flex items-center gap-2 text-xs text-[#cccccc] hover:text-white transition-colors w-full py-1 px-2 hover:bg-[#2a2d2e] rounded"
                  >
                    {isExplorerOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    <FolderOpen size={14} className="text-[#dcb67a]" />
                    <span className="font-medium uppercase tracking-wide">Resume-Portfolio</span>
                  </button>
                </div>

                {isExplorerOpen && (
                  <div className="ml-4 space-y-0.5">
                    {fileStructure.map((item) => {
                      if (item.type === "directory") {
                        const Icon = item.icon
                        const isExpanded = expandedDirs[item.id]
                        const isActive = currentSection === item.id

                        return (
                          <div key={item.id}>
                            <button
                              onClick={() => toggleDirectory(item.id)}
                              className={`flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded transition-colors ${
                                isActive
                                  ? "bg-[#094771] text-white"
                                  : "text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white"
                              }`}
                            >
                              {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                              <Icon size={14} style={{ color: item.color }} />
                              <span>{item.name}</span>
                            </button>

                            {isExpanded && item.children && (
                              <div className="ml-6 space-y-0.5 mt-1">
                                {item.children.map((child) => {
                                  const ChildIcon = child.icon
                                  const isChildActive = currentSection === child.parent

                                  return (
                                    <button
                                      key={child.id}
                                      onClick={() => scrollToSection(child.id)}
                                      className={`flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded transition-colors ${
                                        isChildActive
                                          ? "bg-[#094771] text-white"
                                          : "text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white"
                                      }`}
                                    >
                                      <ChildIcon size={14} style={{ color: child.color }} />
                                      <span>{child.name}</span>
                                      {isChildActive && <div className="ml-auto w-1 h-1 bg-white rounded-full"></div>}
                                    </button>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      } else {
                        const Icon = item.icon
                        const isActive = currentSection === item.id

                        return (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`flex items-center gap-2 w-full px-2 py-1.5 text-xs rounded transition-colors ${
                              isActive
                                ? "bg-[#094771] text-white"
                                : "text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white"
                            }`}
                          >
                            <Icon size={14} style={{ color: item.color }} />
                            <span>{item.name}</span>
                            {isActive && <div className="ml-auto w-1 h-1 bg-white rounded-full"></div>}
                          </button>
                        )
                      }
                    })}
                  </div>
                )}
              </div>

              <div className="p-3 border-t border-[#3e3e42] bg-[#252526]">
                <div className="text-xs text-[#858585] space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{getTotalFileCount()} files • Portfolio v1.0</span>
                  </div>
                  <div className="text-[#6a6a6a]">Last modified: Just now</div>
                </div>
              </div>
            </>
          )}

          {activeTab === "search" && (
            <div className="p-4">
              <div className="text-xs text-[#cccccc] uppercase tracking-wide mb-4">Search</div>
              <div className="text-xs text-[#858585]">Search functionality coming soon...</div>
            </div>
          )}

          {activeTab === "git" && (
            <div className="p-4">
              <div className="text-xs text-[#cccccc] uppercase tracking-wide mb-4">Source Control</div>
              <div className="text-xs text-[#858585]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Clean working tree</span>
                </div>
                <div>Branch: main</div>
              </div>
            </div>
          )}

          {activeTab === "extensions" && (
            <div className="p-4">
              <div className="text-xs text-[#cccccc] uppercase tracking-wide mb-4">Extensions</div>
              <div className="text-xs text-[#858585]">No extensions installed</div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="p-4">
              <div className="text-xs text-[#cccccc] uppercase tracking-wide mb-4">Settings</div>
              <div className="text-xs text-[#858585]">Portfolio settings</div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
