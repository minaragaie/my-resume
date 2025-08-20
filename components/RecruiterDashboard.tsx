"use client"

import { useState, useEffect } from "react"

const Settings = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
  </svg>
)

const Palette = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="13.5" cy="6.5" r=".5" />
    <circle cx="17.5" cy="10.5" r=".5" />
    <circle cx="8.5" cy="7.5" r=".5" />
    <circle cx="6.5" cy="12.5" r=".5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
)

const Zap = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
  </svg>
)

const User = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const Code = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16,18 22,12 16,6" />
    <polyline points="8,6 2,12 8,18" />
  </svg>
)

const Briefcase = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

const Award = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
  </svg>
)

const Mail = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const Rocket = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

const Target = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const Clock = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
)

type Theme =
  | "vscode-dark"
  | "light"
  | "synthwave"
  | "cyberpunk"
  | "dracula"
  | "nord"
  | "forest"
  | "aqua"
  | "lofi"
  | "pastel"
  | "fantasy"
  | "wireframe"
  | "black"
  | "luxury"
  | "cmyk"
  | "autumn"
  | "business"
  | "acid"
  | "lemonade"
  | "night"
  | "coffee"
  | "winter"
  | "dim"
  | "sunset"
  | "cupcake"
type FontSize = "small" | "medium" | "large"

interface RecruiterDashboardProps {
  onNavigate: (sectionId: string) => void
}

/* ----------------------------- Config Arrays ----------------------------- */
const SETTINGS_SECTIONS = [
  { id: "theme", label: "Theme", icon: Palette },
  { id: "quickActions", label: "Quick Actions", icon: Zap },
]

const QUICK_ACTIONS = [
  { id: "hero", label: "Profile Overview", icon: User, description: "Personal info & summary" },
  { id: "technologies", label: "Technical Skills", icon: Code, description: "Programming languages & frameworks" },
  { id: "experience", label: "Work Experience", icon: Briefcase, description: "Career journey & achievements" },
  { id: "certifications", label: "Certifications", icon: Award, description: "Professional certifications" },
  { id: "contact", label: "Contact Info", icon: Mail, description: "Get in touch" },
]

const POPULAR_SEARCHES = [
  { label: "React Experience", target: "technologies", icon: Target },
  { label: "Recent Projects", target: "experience", icon: Clock },
  { label: "Leadership Skills", target: "experience", icon: Rocket },
]

const KEYBOARD_SHORTCUTS = [
  { combo: "⌘/Ctrl + Shift + P", desc: "Command Palette" },
  { combo: "⌘/Ctrl + K", desc: "Quick Navigation" },
]

/* ----------------------------- Theme Handling ----------------------------- */
const applyTheme = (newTheme: Theme) => {
  const html = document.documentElement

  html.setAttribute("data-theme", newTheme)

  // Store theme in localStorage
  localStorage.setItem("theme", newTheme)

  // Dispatch theme change event
  window.dispatchEvent(new CustomEvent("themeChange", { detail: { theme: newTheme } }))
}

/* ----------------------------- Subcomponents ----------------------------- */

function ThemeSettings({ theme, onThemeChange }: { theme: Theme; onThemeChange: (t: Theme) => void }) {
  const handleThemeChange = (newTheme: Theme) => {
    onThemeChange(newTheme)
    applyTheme(newTheme)
  }

  const themeOptions = [
    { value: "vscode-dark", label: "VS Code Dark", desc: "Your current VSCode theme", category: "Professional" },
    { value: "light", label: "Light", desc: "Clean light theme", category: "Professional" },
    { value: "business", label: "Business", desc: "Professional dark theme", category: "Professional" },
    { value: "synthwave", label: "Synthwave", desc: "Retro neon vibes", category: "Creative" },
    { value: "cyberpunk", label: "Cyberpunk", desc: "Futuristic hacker theme", category: "Creative" },
    { value: "dracula", label: "Dracula", desc: "Popular developer theme", category: "Creative" },
    { value: "nord", label: "Nord", desc: "Arctic inspired theme", category: "Creative" },
    { value: "forest", label: "Forest", desc: "Nature inspired green", category: "Nature" },
    { value: "aqua", label: "Aqua", desc: "Ocean blue theme", category: "Nature" },
    { value: "sunset", label: "Sunset", desc: "Warm evening colors", category: "Nature" },
    { value: "lofi", label: "Lo-Fi", desc: "Chill pastel vibes", category: "Chill" },
    { value: "pastel", label: "Pastel", desc: "Soft pastel colors", category: "Chill" },
    { value: "cupcake", label: "Cupcake", desc: "Sweet and soft", category: "Chill" },
    { value: "fantasy", label: "Fantasy", desc: "Magical purple theme", category: "Fun" },
    { value: "luxury", label: "Luxury", desc: "Premium gold accents", category: "Fun" },
    { value: "acid", label: "Acid", desc: "Bright and bold", category: "Fun" },
    { value: "night", label: "Night", desc: "Deep dark theme", category: "Dark" },
    { value: "coffee", label: "Coffee", desc: "Warm brown tones", category: "Dark" },
    { value: "dim", label: "Dim", desc: "Subtle dark theme", category: "Dark" },
    { value: "black", label: "Black", desc: "Pure black theme", category: "Dark" },
  ]

  const categories = ["Professional", "Creative", "Nature", "Chill", "Fun", "Dark"]

  return (
    <div>
      <h4 className="text-xs font-medium text-base-content mb-2 flex items-center gap-1">
        <Palette size={10} />
        Color Theme
      </h4>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {categories.map((category) => (
          <div key={category}>
            <h5 className="text-xs font-medium text-base-content/70 mb-1">{category}</h5>
            <div className="space-y-1">
              {themeOptions
                .filter((option) => option.category === category)
                .map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleThemeChange(option.value as Theme)}
                    className={`btn btn-sm w-full justify-start text-left transition-colors ${
                      theme === option.value ? "btn-primary" : "btn-ghost hover:btn-outline"
                    }`}
                  >
                    <div className="text-left">
                      <div className="text-xs font-medium">{option.label}</div>
                      <div className="text-xs opacity-70">{option.desc}</div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FontSizeSettings({ fontSize, onChange }: { fontSize: FontSize; onChange: (s: FontSize) => void }) {
  const sizes: FontSize[] = ["small", "medium", "large"]

  return (
    <div>
      <h4 className="text-xs font-medium text-base-content mb-2">Font Size</h4>
      <div className="btn-group w-full">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={`btn btn-sm flex-1 capitalize ${fontSize === size ? "btn-active" : "btn-outline"}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

function QuickActionsSettings({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div>
      <h4 className="text-xs font-medium text-base-content mb-2 flex items-center gap-1">
        <Zap size={10} />
        Navigate to Section
      </h4>
      <div className="space-y-1">
        {QUICK_ACTIONS.map((action) => {
          const ActionIcon = action.icon
          return (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className="btn btn-ghost btn-sm w-full justify-start text-left hover:btn-primary group"
            >
              <ActionIcon size={12} className="text-base-content/60 group-hover:text-primary-content" />
              <div className="flex-1 text-left">
                <div className="text-xs font-medium text-base-content group-hover:text-primary-content">
                  {action.label}
                </div>
                <div className="text-xs text-base-content/60 group-hover:text-primary-content/80">
                  {action.description}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PopularSearches({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div>
      <h4 className="text-xs font-medium text-base-content mb-2 flex items-center gap-1">
        <Target size={10} />
        Popular Searches
      </h4>
      <div className="space-y-1">
        {POPULAR_SEARCHES.map((search, idx) => {
          const SearchIcon = search.icon
          return (
            <button
              key={idx}
              onClick={() => onNavigate(search.target)}
              className="btn btn-ghost btn-xs w-full justify-start text-xs hover:btn-outline"
            >
              <SearchIcon size={10} />
              <span>{search.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function KeyboardShortcuts() {
  return (
    <div className="mt-4 card bg-base-300 shadow-sm">
      <div className="card-body p-2">
        <h4 className="text-xs font-medium text-base-content mb-1">Keyboard Shortcuts</h4>
        <div className="space-y-1 text-xs text-base-content/70">
          {KEYBOARD_SHORTCUTS.map((s, i) => (
            <div key={i} className="flex justify-between">
              <span>{s.desc}</span>
              <kbd className="kbd kbd-xs">{s.combo}</kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ----------------------------- Main Component ----------------------------- */

export default function RecruiterDashboard({ onNavigate }: RecruiterDashboardProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["theme"])
  const [theme, setTheme] = useState<Theme>("vscode-dark")
  const [fontSize, setFontSize] = useState<FontSize>("medium")

  const toggleAccordionSection = (id: string) => {
    setExpandedSections((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const handleFontSizeChange = (size: FontSize) => {
    setFontSize(size)
    const sizeMap: Record<FontSize, string> = { small: "14px", medium: "16px", large: "18px" }
    document.documentElement.style.setProperty("--base-font-size", sizeMap[size])
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      applyTheme(theme) // default theme
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Settings Panel */}
      <div className="w-80 flex flex-col bg-base-200 min-h-0 flex-1 border-r border-base-content/20">
        {/* Header */}
        <div className="flex-shrink-0 h-9 bg-base-200 flex items-center px-3 text-xs text-base-content font-medium border-b border-base-content/20 uppercase tracking-wide">
          <Settings size={12} className="mr-2" />
          Settings
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {SETTINGS_SECTIONS.map((section) => {
            const Icon = section.icon
            const isExpanded = expandedSections.includes(section.id)

            return (
              <div key={section.id} className="collapse collapse-arrow border-b border-base-content/20">
                <input
                  type="checkbox"
                  checked={isExpanded}
                  onChange={() => toggleAccordionSection(section.id)}
                  className="peer"
                />
                <div className="collapse-title text-xs text-base-content hover:bg-base-300 transition-colors min-h-0 py-2 px-3">
                  <div className="flex items-center gap-2">
                    <Icon size={12} />
                    <span>{section.label}</span>
                  </div>
                </div>

                <div className="collapse-content px-3 pb-3">
                  <div className="space-y-3">
                    {section.id === "theme" && (
                      <>
                        <ThemeSettings theme={theme} onThemeChange={setTheme} />
                        <FontSizeSettings fontSize={fontSize} onChange={handleFontSizeChange} />
                      </>
                    )}
                    {section.id === "quickActions" && (
                      <>
                        <QuickActionsSettings onNavigate={onNavigate} />
                        <PopularSearches onNavigate={onNavigate} />
                        <KeyboardShortcuts />
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-base-100 overflow-y-auto">
        {/* This area can show the main portfolio content or dashboard content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-base-content mb-4">Dashboard</h2>
          <p className="text-base-content/70">
            Use the settings panel on the left to customize your theme and navigate to different sections.
          </p>
        </div>
      </div>
    </div>
  )
}
