export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          {/* Lab Info */}
          <div className="mb-6">
            <div className="text-2xl font-bold mb-4">IST Lab</div>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-blue-200">
              <span>Information Science & Technology Laboratory</span>
              <span>•</span>
              <span>국립군산대학교 소프트웨어학과</span>
              <span>•</span>
              <span>정보과학기술 분야 연구</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-blue-200">
              <span>전북특별자치도 군산시 대학로 558</span>
              <span>•</span>
              <span>디지털정보관 1층 151-107</span>
              <span>•</span>
              <span>Tel: 063-469-8912</span>
              <span>•</span>
              <span>Email: istlab@kunsan.ac.kr</span>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-8 pt-8 text-center text-sm text-blue-200">
          <p>
            Copyright © 2025 Information Science & Technology Laboratory, Kunsan National University. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
