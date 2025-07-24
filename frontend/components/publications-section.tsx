"use client"

import { useState } from "react"
import { BookOpen, Award, FileText } from "lucide-react"

export default function PublicationsSection() {
  const [activeTab, setActiveTab] = useState("all")

  const publications = [
    {
      id: 1,
      type: "journal",
      title: "정보과학기술 분야의 혁신적 접근법에 관한 연구",
      authors: "정동원, 박사과정 연구원, 석사과정 연구원",
      venue: "한국정보과학회 논문지, Vol. 50, No. 12, pp. 1234-1245",
      year: "2024",
      badge: "학술지",
    },
    {
      id: 2,
      type: "conference",
      title: "AI 기반 데이터 분석 시스템 개발",
      authors: "박사과정 연구원, 정동원",
      venue: "2024 한국컴퓨터종합학술대회 (KCC 2024)",
      year: "2024",
      badge: "학회",
    },
    {
      id: 3,
      type: "project",
      title: "지능형 정보처리 시스템 및 그 방법",
      authors: "정동원, 박사과정 연구원",
      venue: "출원번호: 10-2024-0123456",
      year: "2024",
      badge: "특허",
    },
    {
      id: 4,
      type: "conference",
      title: "소프트웨어 품질 향상을 위한 새로운 방법론",
      authors: "석사과정 연구원, 정동원",
      venue: "2024 한국소프트웨어공학회 춘계학술대회",
      year: "2024",
      badge: "학회",
    },
    {
      id: 5,
      type: "journal",
      title: "빅데이터 환경에서의 효율적인 질의 처리 기법",
      authors: "정동원, 박사과정 연구원",
      venue: "IEEE Transactions on Knowledge and Data Engineering, Vol. 35, No. 8",
      year: "2023",
      badge: "국제학술지",
    },
    {
      id: 6,
      type: "project",
      title: "스마트 시티 데이터 플랫폼 구축",
      authors: "IST Lab",
      venue: "과학기술정보통신부 지원 과제",
      year: "2023-2025",
      badge: "프로젝트",
    },
  ]

  const tabs = [
    { id: "all", label: "All", icon: BookOpen },
    { id: "journal", label: "학술지", icon: FileText },
    { id: "conference", label: "Conference", icon: Award },
    { id: "project", label: "Project", icon: BookOpen },
  ]

  const filteredPublications = activeTab === "all" ? publications : publications.filter((pub) => pub.type === activeTab)

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "학술지":
        return "bg-blue-100 text-blue-800"
      case "국제학술지":
        return "bg-green-100 text-green-800"
      case "학회":
        return "bg-purple-100 text-purple-800"
      case "특허":
        return "bg-yellow-100 text-yellow-800"
      case "프로젝트":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Publications</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">IST Lab에서 발표한 논문과 연구 성과를 소개합니다.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg p-2 shadow-lg max-w-2xl mx-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id ? "bg-blue-700 text-white" : "text-gray-600 hover:text-blue-700"
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Publications List */}
        <div className="space-y-6">
          {filteredPublications.map((pub) => (
            <div key={pub.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium mr-3 ${getBadgeColor(pub.badge)}`}>
                      {pub.badge}
                    </span>
                    <span className="text-sm text-gray-500">{pub.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-700 mb-3">{pub.title}</h3>
                  <p className="text-gray-600 mb-2">
                    <strong>저자:</strong> {pub.authors}
                  </p>
                  <p className="text-gray-600">
                    <strong>게재지:</strong> {pub.venue}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                    자세히 보기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
