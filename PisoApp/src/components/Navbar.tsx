import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Navlinks } from "./Navlinks"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <>
      <div className="mb-16 sm:mb-20 lg:mb-24 w-full">
        <div className="flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#1E4E79] to-[#2980B9] bg-clip-text text-transparent">
              PisoChain
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <Navlinks />
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-[#1E4E79] transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/projects"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-[#1E4E79] transition-colors"
              >
                Projects
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}