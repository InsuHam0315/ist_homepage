export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center">
      <div className="text-center text-white px-4 max-w-4xl">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <div className="text-blue-700 text-6xl font-bold">IST</div>
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">IST Lab</h1>
        <h2 className="text-2xl md:text-3xl mb-6 opacity-90">Information Science & Technology Laboratory</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-80 leading-relaxed">
          국립군산대학교 소프트웨어학과 IST Lab은 정보과학기술 분야의 혁신적인 연구를 통해 미래 기술 발전에 기여하고
          있습니다.
        </p>
      </div>
    </section>
  )
}
