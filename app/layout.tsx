import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "iMigo 志工平台 - 用科技溫度,連結台灣與世界",
  description: "iMigo志工平台 - 透過 AI 科技與志工服務,幫助來自世界各地的朋友更好地融入台灣生活。",
  keywords: ["志工", "移工", "台灣", "AI", "志工服務", "跨文化交流"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="smooth-scroll">
      <body className="antialiased bg-gradient-to-b from-orange-50 via-white to-blue-50">
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
