"use client";

import dynamic from "next/dynamic";

// Disable SSR — the quiz is fully client-side (localStorage, crypto, etc.)
const QuizApp = dynamic(() => import("./_components/QuizApp"), { ssr: false });

export default function QuizPage() {
  return <QuizApp />;
}
