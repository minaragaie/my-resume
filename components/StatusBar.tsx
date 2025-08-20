"use client"

import { GitBranch, Coffee, X } from "lucide-react"

interface StatusBarProps {
  status?: string
  isVisible?: boolean
  onStatusChange?: (status: string) => void
  sidebarCollapsed?: boolean
}

export default function StatusBar({
  status = "Ready for next challenge",
  isVisible = true,
  onStatusChange,
  sidebarCollapsed = false,
}: StatusBarProps) {
  if (!isVisible) return null

  const handleCloseStatus = () => {
    onStatusChange?.("Ready for next challenge")
  }

  const showCloseButton =
    status !== "Ready for next challenge" && !status.includes("Ready") && !status.includes("challenge")

  return (
    <div className="footer bg-base-300 border-t border-base-content/20 px-4 py-3 flex items-center justify-between text-sm z-50 fixed bottom-0 left-0 right-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-success" />
          <span className="text-base-content font-mono">main</span>
        </div>
        <div className="flex items-center gap-2">
          <Coffee className="w-4 h-4 text-warning" />
          <span className="text-base-content font-mono">{status}</span>
          {showCloseButton && (
            <button
              onClick={handleCloseStatus}
              className="btn btn-ghost btn-xs ml-2 p-1 hover:bg-base-content/10 rounded transition-colors min-h-6"
              title="Dismiss message"
            >
              <X className="w-3 h-3 text-base-content hover:text-base-content" />
            </button>
          )}
        </div>
      </div>
      <div className="text-base-content font-mono">© 2025 Mina Youaness</div>
    </div>
  )
}
