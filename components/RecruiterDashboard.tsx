"use client"

import { useState, useEffect } from "react"
import {
  Settings,
  Palette,
  Zap,
  User,
  Code,
  Briefcase,
  Award,
  Mail,
  ChevronDown,
  ChevronRight,
  Rocket,
  Target,
  Clock,
} from "lucide-react"

interface RecruiterDashboardProps {
  onNavigate: (sectionId: string) => void
}

export default function RecruiterDashboard({ onNavigate }: RecruiterDashboardProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["theme"])
  const [theme, setTheme] = useState("dark")
  const [fontSize, setFontSize] = useState("medium")

  const settingsSections = [
    { id: "theme", label: "Theme", icon: Palette },
    { id: "quickActions", label: "Quick Actions", icon: Zap },
  ]

  const quickActions = [
    { id: "hero", label: "Profile Overview", icon: User, description: "Personal info & summary" },
    { id: "skills", label: "Technical Skills", icon: Code, description: "Programming languages & frameworks" },
    { id: "experience", label: "Work Experience", icon: Briefcase, description: "Career journey & achievements" },
    { id: "certifications", label: "Certifications", icon: Award, description: "Professional certifications" },
    { id: "contact", label: "Contact Info", icon: Mail, description: "Get in touch" },
  ]

  const popularSearches = [
    { label: "React Experience", action: () => handleNavigation("skills"), icon: Target },
    { label: "Recent Projects", action: () => handleNavigation("experience"), icon: Clock },
    { label: "Leadership Skills", action: () => handleNavigation("experience"), icon: Rocket },
  ]

  const toggleAccordionSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const handleNavigation = (sectionId: string) => {
    try {
      console.log(`[v0] Navigating to section: ${sectionId}`)
      onNavigate(sectionId)
    } catch (error) {
      console.error(`[v0] Navigation error:`, error)
    }
  }

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const applyTheme = (newTheme: string) => {
    setTheme(newTheme)
    console.log(`[v0] Applied theme: ${newTheme}`)

    const body = document.body
    body.classList.remove("theme-light", "theme-dark", "theme-high-contrast", "theme-monokai")

    switch (newTheme) {
      case "light":
        body.classList.add("theme-light")
        body.style.backgroundColor = "#ffffff"
        body.style.color = "#000000"
        break
      case "high-contrast":
        body.classList.add("theme-high-contrast")
        body.style.backgroundColor = "#000000"
        body.style.color = "#ffffff"
        break
      case "monokai":
        body.classList.add("theme-monokai")
        body.style.backgroundColor = "#272822"
        body.style.color = "#f8f8f2"
        break
      default:
        body.classList.add("theme-dark")
        body.style.backgroundColor = "#1e1e1e"
        body.style.color = "#cccccc"
    }
  }

  const handleFontSizeChange = (size: string) => {
    setFontSize(size)
    const body = document.body
    const sizeMap = { small: "14px", medium: "16px", large: "18px" }
    body.style.fontSize = sizeMap[size as keyof typeof sizeMap]
    console.log(`[v0] Applied font size: ${size}`)
  }

  return (
    <div className="flex flex-col bg-[#252526] min-h-0 flex-1">
      <div className="flex-shrink-0 h-9 bg-[#252526] flex items-center px-3 text-xs text-[#cccccc] font-medium border-b border-[#3e3e42] uppercase tracking-wide">
        <Settings size={12} className="mr-2" />
        Settings
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        {settingsSections.map((section) => {
          const Icon = section.icon
          const isExpanded = expandedSections.includes(section.id)

          return (
            <div key={section.id} className="border-b border-[#3e3e42]">
              <button
                onClick={() => toggleAccordionSection(section.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs text-[#cccccc] hover:bg-[#2a2d2e] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon size={12} />
                  <span>{section.label}</span>
                </div>
                {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>

              {isExpanded && (
                <div className="px-3 pb-3 space-y-3">
                  {section.id === "theme" && (
                    <>
                      <div>
                        <h4 className="text-xs font-medium text-[#cccccc] mb-2 flex items-center gap-1">
                          <Palette size={10} />
                          Color Theme
                        </h4>
                        <div className="space-y-2">
                          {[
                            { value: "dark", label: "Dark (Default)", desc: "VS Code dark theme" },
                            { value: "light", label: "Light", desc: "Clean light theme" },
                            { value: "high-contrast", label: "High Contrast", desc: "Enhanced accessibility" },
                            { value: "monokai", label: "Monokai", desc: "Popular developer theme" },
                          ].map((themeOption) => (
                            <button
                              key={themeOption.value}
                              onClick={() => applyTheme(themeOption.value)}
                              className={`w-full text-left p-2 rounded border transition-colors ${
                                theme === themeOption.value
                                  ? "bg-[#007acc] border-[#007acc] text-white"
                                  : "bg-[#3e3e42] border-[#464647] text-[#cccccc] hover:bg-[#4e4e4e]"
                              }`}
                            >
                              <div className="text-xs font-medium">{themeOption.label}</div>
                              <div className="text-xs opacity-70">{themeOption.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-medium text-[#cccccc] mb-2">Font Size</h4>
                        <div className="flex gap-1">
                          {["small", "medium", "large"].map((size) => (
                            <button
                              key={size}
                              onClick={() => handleFontSizeChange(size)}
                              className={`flex-1 p-1.5 text-xs rounded transition-colors capitalize ${
                                fontSize === size
                                  ? "bg-[#007acc] text-white"
                                  : "bg-[#3e3e42] hover:bg-[#4e4e4e] text-[#cccccc]"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {section.id === "quickActions" && (
                    <>
                      <div>
                        <h4 className="text-xs font-medium text-[#cccccc] mb-2 flex items-center gap-1">
                          <Zap size={10} />
                          Navigate to Section
                        </h4>
                        <div className="space-y-1">
                          {quickActions.map((action) => {
                            const ActionIcon = action.icon
                            return (
                              <button
                                key={action.id}
                                onClick={() => handleNavigation(action.id)}
                                className="w-full flex items-center gap-2 p-2 bg-[#3e3e42] hover:bg-[#007acc] rounded transition-colors text-left group"
                              >
                                <ActionIcon size={12} className="text-[#858585] group-hover:text-white" />
                                <div className="flex-1">
                                  <div className="text-xs font-medium text-[#cccccc] group-hover:text-white">
                                    {action.label}
                                  </div>
                                  <div className="text-xs text-[#858585] group-hover:text-blue-100">
                                    {action.description}
                                  </div>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-medium text-[#cccccc] mb-2 flex items-center gap-1">
                          <Target size={10} />
                          Popular Searches
                        </h4>
                        <div className="space-y-1">
                          {popularSearches.map((search, index) => {
                            const SearchIcon = search.icon
                            return (
                              <button
                                key={index}
                                onClick={search.action}
                                className="w-full flex items-center gap-2 p-1.5 text-xs text-[#cccccc] hover:text-[#007acc] hover:bg-[#2a2d2e] rounded transition-colors"
                              >
                                <SearchIcon size={10} />
                                <span>{search.label}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className="mt-4 p-2 bg-[#1e1e1e] rounded border border-[#3e3e42]">
                        <h4 className="text-xs font-medium text-[#cccccc] mb-1">Keyboard Shortcuts</h4>
                        <div className="space-y-1 text-xs text-[#858585]">
                          <div>⌘/Ctrl + Shift + P - Command Palette</div>
                          <div>⌘/Ctrl + K - Quick Navigation</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
