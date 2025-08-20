import type React from "react"
import { FileCode } from "lucide-react"

const Header: React.FC = () => {
  return (
    <div className="navbar bg-base-200 border-b border-base-300 px-4 py-2 flex items-center gap-4 flex-shrink-0 transition-colors duration-300 z-[9999] fixed w-full">
      {/* Traffic lights */}
      <div className="flex gap-2" role="group" aria-label="Window controls">
        <button className="w-3 h-3 bg-error rounded-full" aria-label="Close window" />
        <button className="w-3 h-3 bg-warning rounded-full" aria-label="Minimize window" />
        <button className="w-3 h-3 bg-success rounded-full" aria-label="Maximize window" />
      </div>

      {/* File info */}
      <div className="flex items-center gap-2 text-sm text-base-content">
        <FileCode className="w-4 h-4" aria-hidden="true" />
        <span>mina-youaness-resume.tsx</span>
        <div className="w-2 h-2 bg-primary rounded-full" role="status" aria-label="File synced" />
      </div>
    </div>
  )
}

export default Header
