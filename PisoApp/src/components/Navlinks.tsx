import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Navlinks() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path
  
  return (
    <nav className="flex gap-x-1 sm:gap-x-2 lg:gap-x-3">
      <Link 
        to="/" 
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          isActive('/') 
            ? 'bg-[#1E4E79] text-white shadow-sm' 
            : 'text-gray-700 hover:bg-blue-50 hover:text-[#1E4E79]'
        }`}
      >
        Home
      </Link>
      <Link 
        to="/about" 
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          isActive('/projects') 
            ? 'bg-[#1E4E79] text-white shadow-sm' 
            : 'text-gray-700 hover:bg-blue-50 hover:text-[#1E4E79]'
        }`}
      >
        About
      </Link>
      <Link 
        to="/projects" 
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          isActive('/projects') 
            ? 'bg-[#1E4E79] text-white shadow-sm' 
            : 'text-gray-700 hover:bg-blue-50 hover:text-[#1E4E79]'
        }`}
      >
        Projects
      </Link>
    </nav>
  )
}
