import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm font-semibold">
                用科技溫度,連結台灣與世界
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                當我們說
                <span className="gradient-text">Hello</span>,<br />
                也說
                <span className="text-blue-600">你好</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                我們是一群充滿熱情的高中生,透過 AI 科技與志工服務,
                幫助來自世界各地的朋友更好地融入台灣生活。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/volunteer"
                  className="text-center px-8 py-4 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  立即加入志工
                </Link>
                <Link
                  href="/about"
                  className="text-center px-8 py-4 border-2 border-orange-500 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-all"
                >
                  了解更多
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-80 sm:h-96 gradient-bg rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white bg-opacity-20 backdrop-blur-sm rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">iMigo</h3>
                  <p className="text-base sm:text-lg opacity-90">讓每個人都發光</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 gradient-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center text-white">
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">800+<span className="text-xl sm:text-2xl">人</span></div>
              <div className="text-sm sm:text-base md:text-lg opacity-90">服務移工人數</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">150+<span className="text-xl sm:text-2xl">人</span></div>
              <div className="text-sm sm:text-base md:text-lg opacity-90">活躍志工夥伴</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-sm sm:text-base md:text-lg opacity-90">全天候服務</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">6<span className="text-xl sm:text-2xl">種</span></div>
              <div className="text-sm sm:text-base md:text-lg opacity-90">支援語言</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links to Other Pages */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">探索更多</h2>
            <p className="text-lg sm:text-xl text-gray-600">深入了解 iMigo 的各個面向</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/about" className="bg-white rounded-2xl p-6 shadow-lg card-hover">
              <div className="text-4xl mb-4">🌏</div>
              <h3 className="text-xl font-bold mb-2">關於我們</h3>
              <p className="text-gray-600">了解 iMigo 的使命、理念與願景</p>
            </Link>
            <Link href="/services" className="bg-white rounded-2xl p-6 shadow-lg card-hover">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-2">服務內容</h3>
              <p className="text-gray-600">探索我們提供的各項志工服務</p>
            </Link>
            <Link href="/team" className="bg-white rounded-2xl p-6 shadow-lg card-hover">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2">核心團隊</h3>
              <p className="text-gray-600">認識推動 iMigo 的核心成員</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
