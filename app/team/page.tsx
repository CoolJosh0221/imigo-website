import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '核心團隊 - iMigo 志工平台',
  description: '認識推動 iMigo 的五位核心成員 - 充滿熱情的高中生團隊。',
};

export default function Team() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            核心<span className="gradient-text">團隊</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-4">
            五位改變世界的高中生
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            我們來自不同背景,擁有不同專長,但懷抱著相同的夢想 - 用青春的力量,為世界帶來溫暖。
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Team Member 1: Josh */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg card-hover">
              <div className="w-32 h-32 gradient-bg rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                J
              </div>
              <h2 className="text-2xl font-bold mb-2">Josh</h2>
              <div className="text-orange-600 font-semibold mb-4 text-lg">技術總監</div>
              <p className="text-gray-600 mb-4">AI 開發 | APCS 滿級分</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                負責 AI 聊天機器人開發與技術架構設計,致力於用科技解決社會問題。
              </p>
            </div>

            {/* Team Member 2: Max */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg card-hover">
              <div className="w-32 h-32 gradient-bg rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                M
              </div>
              <h2 className="text-2xl font-bold mb-2">Max</h2>
              <div className="text-orange-600 font-semibold mb-4 text-lg">創新工程師</div>
              <p className="text-gray-600 mb-4">硬體整合 | 跨域專長</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                擅長軟硬體整合與創新方案設計,為團隊帶來多元視角與創意思維。
              </p>
            </div>

            {/* Team Member 3: COCO */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg card-hover">
              <div className="w-32 h-32 gradient-bg rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                C
              </div>
              <h2 className="text-2xl font-bold mb-2">COCO</h2>
              <div className="text-orange-600 font-semibold mb-4 text-lg">溝通策略長</div>
              <p className="text-gray-600 mb-4">國際辯論 | 權益保護</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                擁有豐富的國際辯論經驗,專注於移工權益保護與跨文化溝通。
              </p>
            </div>

            {/* Team Member 4: Phil */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg card-hover">
              <div className="w-32 h-32 gradient-bg rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                P
              </div>
              <h2 className="text-2xl font-bold mb-2">Phil</h2>
              <div className="text-orange-600 font-semibold mb-4 text-lg">產品設計師</div>
              <p className="text-gray-600 mb-4">UX設計 | 法律諮詢</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                負責使用者體驗設計與法律諮詢服務,確保平台友善且符合法規。
              </p>
            </div>

            {/* Team Member 5: Quentin */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg card-hover">
              <div className="w-32 h-32 gradient-bg rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                Q
              </div>
              <h2 className="text-2xl font-bold mb-2">Quentin</h2>
              <div className="text-orange-600 font-semibold mb-4 text-lg">營運總監</div>
              <p className="text-gray-600 mb-4">商業策略 | 用戶研究</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                負責商業策略規劃與用戶研究,確保服務真正滿足移工朋友的需求。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">我們的團隊文化</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">勇於創新</h3>
              <p className="text-gray-600 leading-relaxed">
                我們不害怕嘗試新事物,勇於挑戰現狀,用創新思維解決社會問題。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">團隊合作</h3>
              <p className="text-gray-600 leading-relaxed">
                我們相信團隊的力量大於個人,透過協作創造更大的影響力。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-bold mb-3">持續學習</h3>
              <p className="text-gray-600 leading-relaxed">
                我們保持謙卑,不斷學習成長,從每次經驗中吸取養分。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold mb-3">以人為本</h3>
              <p className="text-gray-600 leading-relaxed">
                我們始終將服務對象放在第一位,用同理心理解他們的需求。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold mb-3">追求卓越</h3>
              <p className="text-gray-600 leading-relaxed">
                我們對自己的工作充滿熱情,追求卓越,力求做到最好。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🌈</div>
              <h3 className="text-xl font-bold mb-3">多元包容</h3>
              <p className="text-gray-600 leading-relaxed">
                我們擁抱多元文化,尊重每個人的獨特性,創造包容的環境。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 px-4 gradient-bg">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            想加入我們的團隊嗎?
          </h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90">
            我們持續尋找充滿熱情、願意付出的志工夥伴
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/volunteer"
              className="px-10 py-4 bg-white text-orange-600 rounded-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              立即加入志工
            </Link>
            <Link
              href="/about"
              className="px-10 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition-all"
            >
              了解更多
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
