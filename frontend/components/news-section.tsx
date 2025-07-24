"use client"

import { useEffect, useState } from "react"
import { Calendar, User, ArrowRight } from "lucide-react"
import NewsModal from "./news-modal"

interface NewsItem {
  id: number
  title: string
  summary: string
  date: string
  author: string
  category: string
  featured: boolean
  image?: string
  content: string
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("adminKey")
    const expires = localStorage.getItem("expiresAt")
    if (
      stored &&
      process.env.NEXT_PUBLIC_ADMIN_KEY &&
      stored === process.env.NEXT_PUBLIC_ADMIN_KEY &&
      expires &&
      Date.now() < parseInt(expires)
    ) {
      setIsAdmin(true)
    }
  }, [])

  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("뉴스 불러오기 실패", err))
  }, [])

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedNews(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    try {
      const response = await fetch("http://localhost:5000/api/news", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        alert("뉴스가 성공적으로 등록되었습니다.")
        setIsAddModalOpen(false)
        window.location.reload()
      } else {
        const result = await response.json()
        alert("등록 실패: " + result.message)
      }
    } catch (err) {
      console.error("등록 중 오류 발생", err)
      alert("서버 오류로 등록 실패")
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "수상":
        return "bg-yellow-100 text-yellow-800"
      case "연구":
        return "bg-blue-100 text-blue-800"
      case "논문":
        return "bg-green-100 text-green-800"
      case "행사":
        return "bg-purple-100 text-purple-800"
      case "모집":
        return "bg-red-100 text-red-800"
      case "특허":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const featuredNews = news.filter((item) => item.featured)
  const regularNews = news.filter((item) => !item.featured)

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">News & Updates</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">IST Lab의 최신 연구 성과와 소식을 확인하세요.</p>
        </div>

        {isAdmin && (
          <div className="mb-6 text-right">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
              + 뉴스 등록
            </button>
          </div>
        )}

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">주요 소식</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredNews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleNewsClick(item)}
              >
                {item.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.date}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{item.title}</h4>
                  <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      {item.author}
                    </div>
                    <button className="flex items-center text-blue-700 hover:text-blue-800 font-medium">
                      자세히 보기
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">전체 소식</h3>
          <div className="bg-white rounded-lg shadow-lg">
            {regularNews.map((item, index) => (
              <div
                key={item.id}
                className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                  index !== regularNews.length - 1 ? "border-b border-gray-200" : ""
                }`}
                onClick={() => handleNewsClick(item)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium mr-3 ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.date}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600 mb-2">{item.summary}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      {item.author}
                    </div>
                  </div>
                  {item.image && (
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full md:w-24 h-16 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button className="flex items-center text-blue-700 hover:text-blue-800 font-medium">
                      자세히 보기
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NewsModal isOpen={isModalOpen} onClose={handleCloseModal} newsItem={selectedNews} />

      {isAdmin && isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <h3 className="text-xl font-bold text-blue-700 mb-4">뉴스 등록</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input name="title" type="text" placeholder="제목" className="w-full border px-3 py-2 rounded" />
              <textarea name="summary" placeholder="요약" className="w-full border px-3 py-2 rounded" rows={3} />
              <textarea name="content" placeholder="본문 내용" className="w-full border px-3 py-2 rounded" rows={6} />
              <input name="author" type="text" placeholder="작성자" className="w-full border px-3 py-2 rounded" />
              <select name="category" className="w-full border px-3 py-2 rounded">
                <option value="">카테고리 선택</option>
                <option value="수상">수상</option>
                <option value="연구">연구</option>
                <option value="논문">논문</option>
                <option value="행사">행사</option>
                <option value="모집">모집</option>
                <option value="특허">특허</option>
              </select>
              <label className="flex items-center space-x-2">
                <input name="featured" type="checkbox" className="w-4 h-4" />
                <span className="text-sm">주요 뉴스로 등록</span>
              </label>
              <input name="image" type="file" accept="image/*" className="w-full" />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  취소
                </button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-700 text-white hover:bg-blue-800">
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
