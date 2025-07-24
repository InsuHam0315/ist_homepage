"use client"

import { Mail, GraduationCap, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

interface Member {
  id: number
  name: string
  position: string
  research: string
  email: string
  image: string
}

export default function MembersSection() {
  const [members, setMembers] = useState<Member[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // 관리자 인증 확인
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

  // 멤버 데이터 불러오기
  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/members")
      const data = await response.json()
      setMembers(data)
    } catch (error) {
      console.error("멤버 데이터 불러오기 실패:", error)
    }
  }

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    try {
      const response = await fetch("http://localhost:5000/api/members", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        alert("멤버가 성공적으로 추가되었습니다.")
        setIsAddModalOpen(false)
        fetchMembers() // 목록 새로고침
        form.reset()
      } else {
        const result = await response.json()
        alert("추가 실패: " + result.message)
      }
    } catch (error) {
      console.error("멤버 추가 중 오류 발생:", error)
      alert("서버 오류로 추가 실패")
    }
  }

  const handleDeleteMember = async (memberId: number, memberName: string) => {
    if (!confirm(`${memberName} 멤버를 삭제하시겠습니까?`)) {
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/api/members/${memberId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        alert("멤버가 성공적으로 삭제되었습니다.")
        fetchMembers() // 목록 새로고침
      } else {
        const result = await response.json()
        alert("삭제 실패: " + result.message)
      }
    } catch (error) {
      console.error("멤버 삭제 중 오류 발생:", error)
      alert("서버 오류로 삭제 실패")
    }
  }

  const professor = {
    name: "정동원",
    title: "Professor",
    image: "profile/professor.jpg",
    research: "정보과학기술, Database",
    email: "professor@kunsan.ac.kr",
  }

  // 멤버들을 카테고리별로 분류
  const masterStudents = members.filter(m => m.position === "Master's Student")
  const undergraduateStudents = members.filter(m => m.position === "Undergraduate Researcher")
  const otherMembers = members.filter(m => m.position !== "Master's Student" && m.position !== "Undergraduate Researcher")

  const memberCategories = [
    {
      category: "Master's Students",
      people: masterStudents,
    },
    {
      category: "Undergraduate Researchers", 
      people: undergraduateStudents,
    },
    {
      category: "Other Members",
      people: otherMembers,
    },
  ].filter(category => category.people.length > 0)

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Members</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">IST Lab의 우수한 연구원들을 소개합니다.</p>
        </div>

        {/* 관리자 버튼 */}
        {isAdmin && (
          <div className="mb-6 text-right">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium flex items-center gap-2 ml-auto"
            >
              <Plus className="w-4 h-4" />
              멤버 추가
            </button>
          </div>
        )}

        {/* Professor Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-blue-700 mb-8 text-center">Professor</h3>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm">
              <div className="text-center">
                <div className="w-48 h-60 mx-auto mb-6 overflow-hidden rounded-lg">
                  <img
                    src={professor.image || "/placeholder.svg"}
                    alt={professor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">{professor.name}</h4>
                <p className="text-blue-600 font-medium mb-4">{professor.title}</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <span>
                      <strong>연구 분야:</strong> {professor.research}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{professor.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Researchers Section */}
        <div>
          <h3 className="text-2xl font-bold text-blue-700 mb-8 text-center">Researchers</h3>
          {memberCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h4 className="text-xl font-semibold text-blue-600 mb-6">{category.category}</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.people.map((person) => (
                  <div
                    key={person.id}
                    className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow relative"
                  >
                    {/* 관리자 삭제 버튼 */}
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteMember(person.id, person.name)}
                        className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                        title="멤버 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    
                    <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                      <img
                        src={person.image || "/placeholder.svg"}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h5 className="text-lg font-bold text-blue-700 mb-2">{person.name}</h5>
                    <p className="text-gray-600 mb-3">{person.position}</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        <span>
                          <strong>연구 분야:</strong> {person.research}
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{person.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Join Us Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">Join Our Team</h3>
          <p className="text-gray-700 mb-6">IST Lab에서 함께 연구하고 성장할 새로운 연구원을 모집합니다.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors">
              대학원생 모집 정보
            </button>
            <button className="border border-blue-700 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition-colors">
              학부연구생 지원
            </button>
          </div>
        </div>
      </div>

      {/* 멤버 추가 모달 */}
      {isAdmin && isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-blue-700 mb-4">멤버 추가</h3>
            <form className="space-y-4" onSubmit={handleAddMember}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
                <input 
                  name="name" 
                  type="text" 
                  required
                  placeholder="이름을 입력하세요" 
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">직책 *</label>
                <select 
                  name="position" 
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">직책을 선택하세요</option>
                  <option value="Master's Student">석사과정</option>
                  <option value="Undergraduate Researcher">학부연구생</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">연구 분야 *</label>
                <input 
                  name="research" 
                  type="text" 
                  required
                  placeholder="연구 분야를 입력하세요" 
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                <input 
                  name="email" 
                  type="email" 
                  required
                  placeholder="이메일을 입력하세요" 
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">프로필 이미지</label>
                <input 
                  name="image" 
                  type="file" 
                  accept="image/*" 
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  취소
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                >
                  추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}