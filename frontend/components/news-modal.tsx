"use client"

import { X } from "lucide-react"

interface NewsItem {
  id: number
  title: string
  summary: string
  date: string
  author: string
  category: string
  featured: boolean
  content?: string
  image?: string
}

interface NewsModalProps {
  isOpen: boolean
  onClose: () => void
  newsItem: NewsItem | null
}

export default function NewsModal({ isOpen, onClose, newsItem }: NewsModalProps) {
  if (!isOpen || !newsItem) return null

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
          <div className="flex-1 pr-4">
            <div className="flex items-center mb-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium mr-3 ${getCategoryColor(newsItem.category)}`}
              >
                {newsItem.category}
              </span>
              <span className="text-sm text-gray-500">{newsItem.date}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{newsItem.title}</h2>
            <p className="text-sm text-gray-600">작성자: {newsItem.author}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* News Image */}
          {newsItem.image && (
            <div className="mb-6">
              <img
                src={newsItem.image || "/placeholder.svg"}
                alt={newsItem.title}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="prose max-w-none">
            {/* 본문 내용 출력 */}
            {newsItem.content ? (
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">{newsItem.content}</div>
            ) : (
              <div className="text-gray-400 italic">내용이 없습니다.</div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
