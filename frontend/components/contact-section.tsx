"use client"

import { MapPin, Phone, Mail, Clock, GraduationCap, Users, Briefcase } from "lucide-react"
import { useEffect, useRef } from "react"
import Script from "next/script"

export default function ContactSection() {
  const mapRef = useRef<HTMLDivElement>(null)

  const initializeMap = () => {
    if (mapRef.current && window.naver && window.naver.maps) {
      // 기존 좌표 (잘못된 위치)
      // const location = new window.naver.maps.LatLng(35.9676, 126.737)

      // 군산대학교 디지털정보관 정확한 좌표로 변경
      const location = new window.naver.maps.LatLng(35.94467188450771, 126.68290730277084)

      // 만약 여전히 정확하지 않다면 다음 좌표들을 시도해보세요:

      // 옵션 1: 군산대학교 메인 캠퍼스
      // const location = new window.naver.maps.LatLng(35.9676, 126.7370)

      // 옵션 2: 조금 더 정확한 디지털정보관 위치
      // const location = new window.naver.maps.LatLng(35.9680, 126.7375)

      const map = new window.naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 16,
        mapTypeControl: true,
      })

      // 마커 추가
      const marker = new window.naver.maps.Marker({
        position: location,
        map: map,
        title: "IST 연구실",
      })

      // 정보창 추가
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `
          <div style="padding: 10px; font-size: 12px;">
            <strong>IST 연구실</strong><br/>
            전북특별자치도 군산시 대학로 558<br/>
            디지털정보관 1층 151-107
          </div>
        `,
      })

      // 마커 클릭 시 정보창 표시
      window.naver.maps.Event.addListener(marker, "click", () => {
        if (infoWindow.getMap()) {
          infoWindow.close()
        } else {
          infoWindow.open(map, marker)
        }
      })
    }
  }

  useEffect(() => {
    // 스크립트가 이미 로드되어 있다면 바로 초기화
    if (window.naver && window.naver.maps) {
      initializeMap()
    }
  }, [])

  return (
    <>
      {/* 🔥 변경된 부분: ncpClientId → ncpKeyId */}
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        onLoad={initializeMap}
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">Contact</h2>
            <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              IST Lab에 문의사항이 있으시면 언제든지 연락해 주세요.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Contact Information */}
            <div>
              <div className="bg-white rounded-lg shadow-xl p-8 h-full">
                <h3 className="text-2xl font-bold text-blue-700 mb-6">연락처 정보</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">주소</h4>
                      <p className="text-gray-600">
                        전북특별자치도 군산시 대학로 558(미룡동)
                        <br />
                        디지털정보관 1층 151-107 IST 연구실
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">전화번호</h4>
                      <p className="text-gray-600">063-469-8912</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">이메일</h4>
                      <p className="text-gray-600">istlab@kunsan.ac.kr</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">운영시간</h4>
                      <p className="text-gray-600">평일 09:00 - 21:00</p>
                    </div>
                  </div>
                </div>

                {/* Naver Map */}
                <div className="mt-8">
                  <div
                    ref={mapRef}
                    className="w-full h-96 bg-gray-200 rounded-lg"
                    style={{ minHeight: "384px", aspectRatio: "1/1" }}
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-xl p-8 h-full">
                <h3 className="text-2xl font-bold text-blue-700 mb-6">문의하기</h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="이름을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="이메일을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">소속/직책</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="소속이나 직책을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">제목 *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="제목을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">내용 *</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                      placeholder="문의 내용을 입력하세요"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-3 px-6 rounded-lg hover:bg-blue-800 transition-colors font-medium"
                  >
                    메시지 보내기
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Quick Contact Cards */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">대학원 입학 문의</h4>
              <p className="text-gray-600 text-sm mb-4">석사/박사 과정 입학에 관한 문의사항</p>
              <button className="text-blue-700 font-medium hover:text-blue-800">자세히 보기 →</button>
            </div>

            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">연구 협력 문의</h4>
              <p className="text-gray-600 text-sm mb-4">산학협력 및 공동연구에 관한 문의사항</p>
              <button className="text-green-600 font-medium hover:text-green-700">자세히 보기 →</button>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">기술 자문 문의</h4>
              <p className="text-gray-600 text-sm mb-4">기술 자문 및 컨설팅에 관한 문의사항</p>
              <button className="text-purple-600 font-medium hover:text-purple-700">자세히 보기 →</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// TypeScript 타입 선언
declare global {
  interface Window {
    naver: any
  }
}
