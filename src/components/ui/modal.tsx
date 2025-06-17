import * as React from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className="relative z-50 w-full max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-background rounded-lg shadow-lg p-0 border-4 border-transparent bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 animate-gradient-x">
          <div className="relative z-10 bg-background rounded-lg overflow-hidden">
            
            {/* X Button - Top Right */}
            <button
              onClick={onClose}
              className="absolute p-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 animate-gradient-x hover:scale-110 transition-transform z-[100] text-white shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
