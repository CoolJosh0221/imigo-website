import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
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
                <a
                  href="#volunteer"
                  className="text-center px-8 py-4 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  立即加入志工
                </a>
                <a
                  href="#about"
                  className="text-center px-8 py-4 border-2 border-orange-500 text-orange-600 rounded-lg font-semibold hover:bg-orange-50 transition-all"
                >
                  了解更多
                </a>
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

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">關於 iMigo</h2>
            <p className="text-lg sm:text-xl text-gray-600">i = intelligent + international | Migo = Amigo (朋友)</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
              <div className="text-4xl sm:text-5xl mb-4">🌏</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">我們的使命</h3>
              <p className="text-gray-600 leading-relaxed">
                建立連結台灣與世界的橋樑,透過科技與實際行動,
                幫助來自世界各地的朋友更好地融入台灣生活。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
              <div className="text-4xl sm:text-5xl mb-4">💡</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">我們的理念</h3>
              <p className="text-gray-600 leading-relaxed">
                善用科技並尊重多元文化,放下距離先成為朋友,
                用開放的心胸和創新的思維提供實質協助與溫暖友誼。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
              <div className="text-4xl sm:text-5xl mb-4">🚀</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">我們的願景</h3>
              <p className="text-gray-600 leading-relaxed">
                讓 iMigo 成為移工朋友在台灣的第一個朋友,
                台灣青年參與國際服務的平台,跨文化交流的重要橋樑。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">我們的服務</h2>
            <p className="text-lg sm:text-xl text-gray-600">科技 + 溫度的完美結合</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">AI 智能助理</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                24/7 多語言 LINE 聊天機器人,提供即時生活協助、翻譯服務與資訊查詢
              </p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">志工媒合平台</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                智能配對系統,連結台灣青年志工與移工朋友,提供就醫陪伴、生活協助
              </p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">多語資源中心</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                整合醫療、法律、交通等生活資訊,提供中英印越泰菲六種語言服務
              </p>
            </div>

            {/* Service Card 4 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg card-hover">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4">文化交流活動</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                定期舉辦文化體驗、語言交換、節慶慶祝等活動,促進跨文化理解
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">核心團隊</h2>
            <p className="text-lg sm:text-xl text-gray-600">五位改變世界的高中生</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg card-hover">
              <div className="w-20 h-20 sm:w-24 sm:h-24 gradient-bg rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                J
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Josh</h3>
              <div className="text-orange-600 font-semibold mb-3 text-sm sm:text-base">技術總監</div>
              <p className="text-xs sm:text-sm text-gray-600">AI 開發 | APCS 滿級分</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg card-hover">
              <div className="w-20 h-20 sm:w-24 sm:h-24 gradient-bg rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                M
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Max</h3>
              <div className="text-orange-600 font-semibold mb-3 text-sm sm:text-base">創新工程師</div>
              <p className="text-xs sm:text-sm text-gray-600">硬體整合 | 跨域專長</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg card-hover">
              <div className="w-20 h-20 sm:w-24 sm:h-24 gradient-bg rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                C
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">COCO</h3>
              <div className="text-orange-600 font-semibold mb-3 text-sm sm:text-base">溝通策略長</div>
              <p className="text-xs sm:text-sm text-gray-600">國際辯論 | 權益保護</p>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg card-hover">
              <div className="w-20 h-20 sm:w-24 sm:h-24 gradient-bg rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                P
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Phil</h3>
              <div className="text-orange-600 font-semibold mb-3 text-sm sm:text-base">產品設計師</div>
              <p className="text-xs sm:text-sm text-gray-600">UX設計 | 法律諮詢</p>
            </div>

            {/* Team Member 5 */}
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg card-hover">
              <div className="w-20 h-20 sm:w-24 sm:h-24 gradient-bg rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                Q
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Quentin</h3>
              <div className="text-orange-600 font-semibold mb-3 text-sm sm:text-base">營運總監</div>
              <p className="text-xs sm:text-sm text-gray-600">商業策略 | 用戶研究</p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="py-20 px-4 gradient-bg">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            準備好成為改變的力量了嗎?
          </h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90">
            加入 iMigo,用青春的力量為世界帶來溫度
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-10 py-4 bg-white text-orange-600 rounded-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              成為志工夥伴
            </Link>
            <a
              href="#about"
              className="px-10 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition-all"
            >
              了解更多
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            還有其他問題?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            歡迎透過電子郵件或社群媒體與我們聯繫
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 gradient-bg text-white rounded-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            聯絡我們
          </Link>
        </div>
      </section>
    </main>
  );
}
