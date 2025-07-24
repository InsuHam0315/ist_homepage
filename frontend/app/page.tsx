"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import NewsSection from "@/components/news-section"
import MembersSection from "@/components/members-section"
import PublicationsSection from "@/components/publications-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="pt-16">
        {activeSection === "home" && <HeroSection />}
        {activeSection === "about" && <AboutSection />}
        {activeSection === "news" && <NewsSection />}
        {activeSection === "members" && <MembersSection />}
        {activeSection === "publications" && <PublicationsSection />}
        {activeSection === "contact" && <ContactSection />}
      </main>

      <Footer />
    </div>
  )
}
