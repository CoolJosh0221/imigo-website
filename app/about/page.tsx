import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '關於我們 - iMigo 志工平台',
  description: '了解 iMigo 的使命、理念與願景。我們透過科技與志工服務,連結台灣與世界。',
};

export default function About() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            關於 <span className="gradient-text">iMigo</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-4">
            i = intelligent + international | Migo = Amigo (朋友)
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            我們是一群充滿熱情的高中生,相信科技可以帶來溫度,相信每個人都值得被關懷與尊重。
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg card-hover">
              <div className="text-5xl mb-6">🌏</div>
              <h2 className="text-2xl font-bold mb-4 text-orange-600">我們的使命</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                建立連結台灣與世界的橋樑,透過科技與實際行動,
                幫助來自世界各地的朋友更好地融入台灣生活。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg card-hover">
              <div className="text-5xl mb-6">💡</div>
              <h2 className="text-2xl font-bold mb-4 text-orange-600">我們的理念</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                善用科技並尊重多元文化,放下距離先成為朋友,
                用開放的心胸和創新的思維提供實質協助與溫暖友誼。
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg card-hover">
              <div className="text-5xl mb-6">🚀</div>
              <h2 className="text-2xl font-bold mb-4 text-orange-600">我們的願景</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                讓 iMigo 成為移工朋友在台灣的第一個朋友,
                台灣青年參與國際服務的平台,跨文化交流的重要橋樑。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">我們的故事</h2>
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg">
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                <strong className="text-orange-600">iMigo</strong> 的誕生源於一個簡單的觀察:
                在台灣有數十萬來自世界各地的移工朋友,他們為台灣的經濟發展貢獻良多,
                卻常常面臨語言障礙、文化隔閡,以及缺乏支援系統等挑戰。
              </p>
              <p>
                身為高中生的我們,雖然年輕,卻懷抱著改變世界的熱情。我們相信,
                科技不應該只是冰冷的工具,而應該成為連結人與人之間的溫暖橋樑。
                於是,我們結合 AI 技術、志工服務,創立了 iMigo。
              </p>
              <p>
                從最初的 LINE 聊天機器人,到現在涵蓋就醫陪伴、生活協助、文化交流等多元服務,
                我們已經服務超過 800 位移工朋友,並建立了一個由 150 多位志工組成的溫暖社群。
              </p>
              <p className="text-orange-600 font-semibold">
                我們相信,當我們放下距離,真心成為朋友,這個世界會變得更美好。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">核心價值</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg card-hover text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">同理心</h3>
              <p className="text-gray-600">設身處地理解他人需求</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg card-hover text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-2">尊重</h3>
              <p className="text-gray-600">珍視每個文化的獨特性</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg card-hover text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💪</span>
              </div>
              <h3 className="text-xl font-bold mb-2">行動力</h3>
              <p className="text-gray-600">不只說,更要實際去做</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg card-hover text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-xl font-bold mb-2">創新</h3>
              <p className="text-gray-600">用科技解決社會問題</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-bg">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            想更深入了解我們的服務嗎?
          </h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90">
            探索 iMigo 如何透過科技與溫度,改變世界
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="px-10 py-4 bg-white text-orange-600 rounded-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              查看服務內容
            </Link>
            <Link
              href="/volunteer"
              className="px-10 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition-all"
            >
              加入我們
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
