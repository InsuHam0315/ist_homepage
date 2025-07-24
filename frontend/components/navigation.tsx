"use client"

import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "news", label: "News" },
    { id: "members", label: "Members" },
    { id: "publications", label: "Publications" },
    { id: "contact", label: "Contact" },
  ]

  // 🔐 관리자 인증 상태
  const [adminKey, setAdminKey] = useState("")
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("adminKey")
    const expires = localStorage.getItem("expiresAt")
    if (stored && expires && Date.now() < parseInt(expires)) {
      setAdminKey(stored)
      setIsAuthorized(true)
    }
  }, [])

  const handleAdminLogin = () => {
    const validKey = process.env.NEXT_PUBLIC_ADMIN_KEY || ""
    if (adminKey === validKey) {
      localStorage.setItem("adminKey", adminKey)
      localStorage.setItem("expiresAt", (Date.now() + 1000 * 60 * 30).toString()) // 30분
      setIsAuthorized(true)
      alert("관리자 인증 성공")
    } else {
      alert("잘못된 관리자 키입니다")
    }
  }

  return (
    <nav className="fixed top-0 w-full bg-blue-700 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setActiveSection("home")}
              className="text-xl font-bold hover:text-blue-200 transition-colors"
            >
              IST Lab
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id ? "text-white font-bold" : "text-blue-200 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* 관리자 키 입력 or 관리자 모드 표시 */}
          <div className="hidden md:flex items-center space-x-2">
            {!isAuthorized ? (
              <>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="관리자 키"
                  className="px-2 py-1 rounded-md text-sm text-black bg-white border"
                />
                <button
                  onClick={handleAdminLogin}
                  className="bg-white text-blue-700 px-2 py-1 rounded-md text-sm hover:bg-gray-100"
                >
                  인증
                </button>
              </>
            ) : (
              <div className="text-sm opacity-70">✅ 관리자 모드</div>
            )}
          </div>

          {/* University Info */}
          <div className="hidden md:block text-right ml-4">
            <div className="text-sm">Kunsan National University</div>
            <div className="text-xs opacity-80">Software Department</div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  setIsMobileMenuOpen(false)
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeSection === item.id ? "text-white font-bold" : "text-blue-200 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* 관리자 키 입력 (모바일용) */}
            {!isAuthorized && (
              <div className="pt-2 space-y-2">
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="관리자 키"
                  className="w-full px-2 py-1 rounded-md text-sm text-black bg-white border"
                />
                <button
                  onClick={handleAdminLogin}
                  className="w-full bg-white text-blue-700 px-2 py-1 rounded-md text-sm hover:bg-gray-100"
                >
                  인증
                </button>
              </div>
            )}

            {isAuthorized && <div className="text-sm text-white">✅ 관리자 모드</div>}
          </div>
        )}
      </div>
    </nav>
  )
}
