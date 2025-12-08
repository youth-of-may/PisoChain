import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path
  
  return (
    <>
      <div className="w-full border-b border-gray-200 bg-white shadow-sm mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#1E4E79] to-[#2980B9] bg-clip-text text-transparent">
                PisoChain
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-[#1E4E79] text-white' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-[#1E4E79]'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/projects"
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive('/projects') 
                    ? 'bg-[#1E4E79] text-white' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-[#1E4E79]'
                }`}
              >
                Projects
              </Link>
              <Link 
                to="/about"
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive('/about') 
                    ? 'bg-[#1E4E79] text-white' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-[#1E4E79]'
                }`}
              >
                About
              </Link>
            </div>
            
            {/* Mobile menu button */}
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
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-1">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-[#1E4E79] text-white' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-[#1E4E79]'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/projects"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/projects') 
                    ? 'bg-[#1E4E79] text-white' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-[#1E4E79]'
                }`}
              >
                Projects
              </Link>
              <Link 
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive('/about') 
                    ? 'bg-[#1E4E79] text-white' 
                    : 'text-gray-700 hover:bg-blue-50 hover:text-[#1E4E79]'
                }`}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}