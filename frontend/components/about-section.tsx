import { Target, Lightbulb, Globe } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">About IST Lab</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            정보과학기술 분야의 선도적 연구를 통해 미래를 만들어가는 연구실입니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">IST Lab 소개</h3>
              <p className="text-lg mb-4 text-gray-700">
                Information Science & Technology Laboratory (IST Lab)는 국립군산대학교 소프트웨어학과 소속 연구실로,
                정보과학기술 분야의 다양한 연구를 수행하고 있습니다.
              </p>
              <p className="mb-6 text-gray-700">
                우리 연구실은 현장 중심의 실용적인 연구를 통해 기술 혁신과 R&D 전략 수립에 기여하며, 지적재산권 보호와
                새로운 비즈니스 모델 개발에도 힘쓰고 있습니다.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">2005</div>
                  <div className="text-sm text-gray-600">설립년도</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">19년</div>
                  <div className="text-sm text-gray-600">연구 경험</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-700 text-white p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <Lightbulb className="w-6 h-6 mr-3" />
                <h4 className="text-xl font-bold">연구 철학</h4>
              </div>
              <p>실용적이고 현장 중심적인 연구를 통해 사회에 기여하는 기술 개발</p>
            </div>
            <div className="bg-blue-500 text-white p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <Target className="w-6 h-6 mr-3" />
                <h4 className="text-xl font-bold">연구 목표</h4>
              </div>
              <p>정보과학기술 분야의 혁신적 솔루션 개발 및 기술 사업화</p>
            </div>
            <div className="bg-blue-800 text-white p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <Globe className="w-6 h-6 mr-3" />
                <h4 className="text-xl font-bold">비전</h4>
              </div>
              <p>미래 기술을 선도하는 글로벌 연구실로 성장</p>
            </div>
          </div>
        </div>

        {/* Research Areas */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">주요 연구 분야</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-8 h-8 bg-blue-700 rounded"></div>
              </div>
              <h4 className="font-semibold mb-2">데이터베이스</h4>
              <p className="text-sm text-gray-600">Database Systems & Management</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-8 h-8 bg-blue-700 rounded-full"></div>
              </div>
              <h4 className="font-semibold mb-2">인공지능</h4>
              <p className="text-sm text-gray-600">AI & Machine Learning</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-8 h-8 bg-blue-700 rounded-lg transform rotate-45"></div>
              </div>
              <h4 className="font-semibold mb-2">소프트웨어공학</h4>
              <p className="text-sm text-gray-600">Software Engineering</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-8 h-8 bg-blue-700 rounded-full"></div>
              </div>
              <h4 className="font-semibold mb-2">정보보안</h4>
              <p className="text-sm text-gray-600">Information Security</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
