"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Question } from "../_data/types";
import { i18n, type Lang } from "../_data/i18n";
import { easyQuestionsZH } from "../_data/easy-zh";
import { easyQuestionsEN } from "../_data/easy-en";
import { hardQuestionsZH } from "../_data/hard-zh";
import { hardQuestionsEN } from "../_data/hard-en";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Crypto-grade Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    const j = buf[0] % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Prepared question with randomised option order */
type PreparedQuestion = Question & {
  optA: string;
  optB: string;
  /** Which displayed option ("a" | "b") is correct */
  correctOpt: "a" | "b";
};

// Track recently used indices to avoid repetition across games
let recentEasyIdxs: number[] = [];
let recentHardIdxs: number[] = [];
const RECENT_EASY_MEMORY = 20;
const RECENT_HARD_MEMORY = 30;

function prepareQuestions(
  easyBank: Question[],
  hardBank: Question[],
): PreparedQuestion[] {
  // Pick 3 from easy bank, preferring fresh questions
  const easyIndices = easyBank.map((_, i) => i);
  const freshEasy = easyIndices.filter((i) => !recentEasyIdxs.includes(i));
  const staleEasy = easyIndices.filter((i) => recentEasyIdxs.includes(i));
  const selectedEasyIdx =
    freshEasy.length >= 3
      ? shuffle(freshEasy).slice(0, 3)
      : [...shuffle(freshEasy), ...shuffle(staleEasy)].slice(0, 3);

  // Pick 7 from hard bank, preferring fresh questions
  const hardIndices = hardBank.map((_, i) => i);
  const freshHard = hardIndices.filter((i) => !recentHardIdxs.includes(i));
  const staleHard = hardIndices.filter((i) => recentHardIdxs.includes(i));
  const selectedHardIdx =
    freshHard.length >= 7
      ? shuffle(freshHard).slice(0, 7)
      : [...shuffle(freshHard), ...shuffle(staleHard)].slice(0, 7);

  // Update tracking
  recentEasyIdxs = [...recentEasyIdxs, ...selectedEasyIdx].slice(
    -RECENT_EASY_MEMORY,
  );
  recentHardIdxs = [...recentHardIdxs, ...selectedHardIdx].slice(
    -RECENT_HARD_MEMORY,
  );

  const selected = [
    ...selectedEasyIdx.map((i) => easyBank[i]),
    ...selectedHardIdx.map((i) => hardBank[i]),
  ];

  return selected.map((q) => {
    const swap = Math.random() > 0.5;
    return {
      ...q,
      optA: swap ? q.wrong : q.correct,
      optB: swap ? q.correct : q.wrong,
      correctOpt: swap ? ("b" as const) : ("a" as const),
    };
  });
}

function getPrizeLabel(score: number, t: (typeof i18n)[Lang]) {
  if (score === 10) return t.special;
  if (score >= 8) return t.second;
  if (score >= 6) return t.third;
  return t.participation;
}

function getPrizeEmoji(score: number) {
  if (score === 10) return "🏆";
  if (score >= 8) return "🥈";
  if (score >= 6) return "🥉";
  return "🎁";
}

type LeaderboardEntry = {
  name: string;
  score: number;
  date: string;
  lang: Lang;
};

const STORAGE_KEY = "imigo-quiz-leaderboard";

function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToLeaderboard(entry: LeaderboardEntry): LeaderboardEntry[] {
  const board = loadLeaderboard();
  board.push(entry);
  board.sort((a, b) => b.score - a.score);
  const trimmed = board.slice(0, 50);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    /* quota exceeded — ignore */
  }
  return trimmed;
}

// ─── Reusable Sub-Components ────────────────────────────────────────────────

function Logo({ size = 80 }: { size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-full shadow-lg"
      style={{
        width: size,
        height: size,
        background:
          "linear-gradient(135deg, #4ECDC4 0%, #88D8C0 30%, #F0B8A8 65%, #E8836B 100%)",
        boxShadow: "0 4px 20px rgba(43,155,139,0.3)",
      }}
    >
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: size * 0.72,
          height: size * 0.72,
          border: `${size * 0.03}px solid rgba(255,255,255,0.8)`,
          background: "rgba(255,255,255,0.1)",
        }}
      >
        <span
          className="font-bold text-white"
          style={{ fontSize: size * 0.25, letterSpacing: -0.5 }}
        >
          iMigo
        </span>
      </div>
      {/* Speech-bubble tail */}
      <div
        className="absolute"
        style={{
          bottom: size * 0.08,
          left: size * 0.12,
          width: 0,
          height: 0,
          borderLeft: `${size * 0.08}px solid transparent`,
          borderRight: `${size * 0.06}px solid transparent`,
          borderTop: `${size * 0.1}px solid rgba(255,255,255,0.8)`,
        }}
      />
    </div>
  );
}

function Header() {
  return (
    <div className="w-full pt-6 pb-2 text-center">
      <div className="flex items-center justify-center gap-2.5 mb-1">
        <Logo size={36} />
        <span className="text-xl font-extrabold text-[#2B9B8B] tracking-tight">
          iMigo Quiz
        </span>
      </div>
      <div className="text-[11px] text-gray-400 tracking-widest">
        www.imigo.tw/quiz
      </div>
    </div>
  );
}

const GRADIENT_BG =
  "linear-gradient(135deg, #4ECDC4 0%, #88D8C0 30%, #F0B8A8 65%, #E8836B 100%)";

function Card({
  children,
  className = "",
  gradient = false,
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl shadow-lg px-7 py-8 ${wide ? "max-w-[1000px]" : "max-w-[820px]"} w-[92%] mx-auto ${className}`}
      style={{
        background: gradient
          ? GRADIENT_BG
          : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)",
      }}
    >
      {children}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-white border-none rounded-full px-10 py-3.5 text-[17px] font-bold cursor-pointer
        transition-all duration-300 hover:-translate-y-0.5 shadow-md ${className}`}
      style={{ background: GRADIENT_BG }}
    >
      {children}
    </button>
  );
}

// ─── Answer record for review ───────────────────────────────────────────────

type AnswerRecord = PreparedQuestion & {
  playerAns: "a" | "b";
  isCorrect: boolean;
};

// ─── Screens ────────────────────────────────────────────────────────────────

type Screen = "lang" | "name" | "start" | "quiz" | "review" | "results";

export default function QuizApp() {
  const [screen, setScreen] = useState<Screen>("lang");
  const [lang, setLang] = useState<Lang>("zh");
  const [playerName, setPlayerName] = useState("");
  const [questions, setQuestions] = useState<PreparedQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState<"a" | "b" | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [nameError, setNameError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = i18n[lang];

  useEffect(() => setLeaderboard(loadLeaderboard()), []);

  const startQuiz = useCallback(() => {
    const easyBank = lang === "zh" ? easyQuestionsZH : easyQuestionsEN;
    const hardBank = lang === "zh" ? hardQuestionsZH : hardQuestionsEN;
    setQuestions(prepareQuestions(easyBank, hardBank));
    setCurrentQ(0);
    setAnswers([]);
    setTotalScore(0);
    setSelectedAns(null);
    setShowFeedback(false);
    setScreen("quiz");
  }, [lang]);

  function handleAnswer(opt: "a" | "b") {
    if (showFeedback) return;
    const q = questions[currentQ];
    const isCorrect = opt === q.correctOpt;
    setSelectedAns(opt);
    setShowFeedback(true);
    setTotalScore((s) => (isCorrect ? s + 1 : s));
    setAnswers((prev) => [...prev, { ...q, playerAns: opt, isCorrect }]);
  }

  function handleNext() {
    if (currentQ < 9) {
      setCurrentQ((c) => c + 1);
      setSelectedAns(null);
      setShowFeedback(false);
    } else {
      setScreen("review");
    }
  }

  function handleContinueToResults() {
    const board = saveToLeaderboard({
      name: playerName,
      score: totalScore,
      date: new Date().toISOString(),
      lang,
    });
    setLeaderboard(board);
    setScreen("results");
  }

  // ─── Background shell ─────────────────────────────────────────────────────

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center overflow-auto"
      style={{ background: GRADIENT_BG, fontFamily: "'Nunito', 'Manrope', sans-serif" }}
    >
      {children}
      <div className="py-3 text-center text-[11px] text-white/40">
        © 2025 iMigo Volunteer Club
      </div>
    </div>
  );

  // ─── Language Screen ──────────────────────────────────────────────────────

  if (screen === "lang") {
    return (
      <Shell>
        <div className="flex flex-1 flex-col items-center justify-center w-full p-5">
          <Card className="text-center">
            <div className="mb-6 flex justify-center">
              <Logo size={100} />
            </div>
            <h1 className="text-[28px] font-extrabold text-[#2B9B8B] mb-1 tracking-tight">
              iMigo Quiz
            </h1>
            <p className="text-[13px] text-gray-400 mb-6">
              Migrant Worker Friendly Quiz
            </p>
            <p className="text-lg font-semibold text-gray-600 mb-1">
              {i18n.zh.chooseLang}
            </p>
            <p className="text-sm text-gray-400 mb-6">{i18n.en.chooseLang}</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <PrimaryButton
                onClick={() => {
                  setLang("zh");
                  setScreen("name");
                }}
                className="min-w-[140px] !text-lg"
              >
                🇹🇼 中文
              </PrimaryButton>
              <PrimaryButton
                onClick={() => {
                  setLang("en");
                  setScreen("name");
                }}
                className="min-w-[140px] !text-lg"
              >
                🌏 English
              </PrimaryButton>
            </div>
          </Card>
        </div>
      </Shell>
    );
  }

  // ─── Name Screen ──────────────────────────────────────────────────────────

  if (screen === "name") {
    return (
      <Shell>
        <Header />
        <div className="flex flex-1 flex-col items-center justify-center w-full p-5">
          <Card className="text-center">
            <div className="flex justify-center">
              <Logo size={64} />
            </div>
            <h2 className="text-[22px] font-bold text-[#2B9B8B] my-4">
              {t.enterName}
            </h2>
            <input
              ref={inputRef}
              type="text"
              value={playerName}
              onChange={(e) => {
                setPlayerName(e.target.value);
                setNameError(false);
              }}
              placeholder={t.namePlaceholder}
              maxLength={20}
              className={`w-full px-[18px] py-3.5 text-[17px] rounded-[14px] border-2 outline-none
                transition-colors focus:border-[#2B9B8B] ${nameError ? "border-[#E8887A]" : "border-gray-200"}`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!playerName.trim()) {
                    setNameError(true);
                    return;
                  }
                  setScreen("start");
                }
              }}
              autoFocus
            />
            {nameError && (
              <p className="text-[#E8887A] text-[13px] mt-2">
                {t.nameRequired}
              </p>
            )}
            <div className="mt-6 flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => setScreen("lang")}
                className="rounded-full px-6 py-3 text-[15px] font-bold bg-gray-200 text-gray-500
                  cursor-pointer transition-all hover:-translate-y-0.5"
              >
                {t.backHome}
              </button>
              <PrimaryButton
                onClick={() => {
                  if (!playerName.trim()) {
                    setNameError(true);
                    return;
                  }
                  setScreen("start");
                }}
              >
                {t.confirm}
              </PrimaryButton>
            </div>
          </Card>
        </div>
      </Shell>
    );
  }

  // ─── Start Screen ─────────────────────────────────────────────────────────

  if (screen === "start") {
    return (
      <Shell>
        <Header />
        <div className="flex flex-1 flex-col items-center justify-center w-full p-5">
          <Card className="text-center">
            <p className="text-base text-gray-400 mb-2">{t.welcome},</p>
            <p className="text-[26px] font-extrabold text-[#2B9B8B] mb-6">
              {playerName}!
            </p>
            <div
              onClick={startQuiz}
              className="inline-block mb-6 cursor-pointer transition-transform hover:scale-105"
            >
              <Logo size={120} />
            </div>
            <p className="text-sm text-gray-400 mb-6">{t.startSub}</p>
            <PrimaryButton onClick={startQuiz} className="!text-xl !px-12 !py-4">
              🎮 {t.startGame}
            </PrimaryButton>
          </Card>
        </div>
      </Shell>
    );
  }

  // ─── Quiz Screen ──────────────────────────────────────────────────────────

  if (screen === "quiz") {
    const q = questions[currentQ];
    const progress = ((currentQ + (showFeedback ? 1 : 0)) / 10) * 100;

    return (
      <Shell>
        <Header />
        <div className="flex flex-1 flex-col items-center w-full px-5 pt-3 pb-5">
          <Card>
            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between mb-1.5">
                <span className="text-[13px] font-semibold text-[#2B9B8B]">
                  {t.questionOf} {currentQ + 1} / 10
                </span>
                <span className="text-[13px] font-semibold text-[#E8887A]">
                  {t.score}: {totalScore}
                </span>
              </div>
              <div className="h-2 bg-[#e8f0ef] rounded overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-500"
                  style={{ width: `${progress}%`, background: GRADIENT_BG }}
                />
              </div>
            </div>

            {/* Question */}
            <div
              className="rounded-2xl px-[18px] py-5 mb-4 border-l-4 border-white/60"
              style={{ background: GRADIENT_BG }}
            >
              <p className="text-base font-semibold text-white leading-relaxed drop-shadow-sm">
                {q.q}
              </p>
            </div>

            {/* Options */}
            {(["a", "b"] as const).map((opt) => {
              const text = opt === "a" ? q.optA : q.optB;
              const isSelected = selectedAns === opt;
              const isCorrect = opt === q.correctOpt;

              let borderColor = "#ddd";
              let bg = "white";
              let textColor = "#333";
              let circBg = "#f0f0f0";
              let circColor = "#666";
              let circContent = opt.toUpperCase();

              if (showFeedback) {
                if (isCorrect) {
                  bg = "#e6f9f0";
                  borderColor = "#2B9B8B";
                  textColor = "#1a7a5c";
                  circBg = "#2B9B8B";
                  circColor = "white";
                  circContent = "✓";
                } else if (isSelected) {
                  bg = "#fdeeed";
                  borderColor = "#E8887A";
                  textColor = "#c0392b";
                  circBg = "#E8887A";
                  circColor = "white";
                  circContent = "✗";
                }
              } else if (isSelected) {
                borderColor = "#2B9B8B";
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={showFeedback}
                  className="w-full px-[18px] py-4 mb-2.5 rounded-[14px] text-left text-[15px]
                    font-medium flex items-center gap-3 transition-all duration-300"
                  style={{
                    border: `2px solid ${borderColor}`,
                    background: bg,
                    color: textColor,
                    cursor: showFeedback ? "default" : "pointer",
                  }}
                >
                  <span
                    className="w-[30px] h-[30px] rounded-full flex items-center justify-center
                      font-bold text-sm shrink-0"
                    style={{ background: circBg, color: circColor }}
                  >
                    {circContent}
                  </span>
                  <span>{text}</span>
                </button>
              );
            })}

            {/* Feedback */}
            {showFeedback && (
              <div
                className="rounded-xl px-4 py-3 mt-2 mb-2"
                style={{
                  background:
                    selectedAns === q.correctOpt ? "#e6f9f0" : "#fdeeed",
                }}
              >
                <p
                  className="font-bold text-[15px] mb-1"
                  style={{
                    color:
                      selectedAns === q.correctOpt ? "#1a7a5c" : "#c0392b",
                  }}
                >
                  {selectedAns === q.correctOpt
                    ? `✅ ${t.correct}`
                    : `❌ ${t.wrong}`}
                </p>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            )}

            {/* Next */}
            {showFeedback && (
              <div className="text-center mt-3">
                <PrimaryButton onClick={handleNext}>
                  {currentQ < 9 ? t.next : t.seeResults}
                </PrimaryButton>
              </div>
            )}
          </Card>
        </div>
      </Shell>
    );
  }

  // ─── Review Screen ────────────────────────────────────────────────────────

  if (screen === "review") {
    return (
      <Shell>
        <Header />
        <div className="flex flex-1 flex-col items-center w-full px-5 pt-3 pb-5">
          <Card wide>
            <h2 className="text-center text-[22px] font-extrabold text-[#2B9B8B] mb-2">
              🎉 {t.resultTitle}
            </h2>
            <p className="text-center text-[42px] font-extrabold text-[#E8887A] mb-1">
              {totalScore}{" "}
              <span className="text-xl text-gray-400">/ 10</span>
            </p>
            <p className="text-center text-lg mb-5">
              {getPrizeEmoji(totalScore)} {getPrizeLabel(totalScore, t)}
            </p>

            <h3 className="text-base font-bold text-[#2B9B8B] mb-3">
              📋 {t.reviewTitle}
            </h3>
            <div className="max-h-[360px] overflow-y-auto pr-2 space-y-2">
              {answers.map((a, i) => (
                <div
                  key={i}
                  className="px-3.5 py-3 rounded-xl"
                  style={{
                    background: a.isCorrect ? "#f0faf5" : "#fdf2ef",
                    borderLeft: `3px solid ${a.isCorrect ? "#2B9B8B" : "#E8887A"}`,
                  }}
                >
                  <p className="text-[13px] font-semibold text-gray-600 mb-1">
                    {a.isCorrect ? "✅" : "❌"} Q{i + 1}. {a.q}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {t.correctAnswer}: {a.correct}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-5">
              <PrimaryButton onClick={handleContinueToResults}>
                {t.continue}
              </PrimaryButton>
            </div>
          </Card>
        </div>
      </Shell>
    );
  }

  // ─── Results + Leaderboard Screen ─────────────────────────────────────────

  if (screen === "results") {
    const top10 = leaderboard.slice(0, 10);
    const rankMedals = ["🥇", "🥈", "🥉"];

    const prizeRows = [
      { range: "10/10", label: lang === "zh" ? "特獎" : "Grand Prize", emoji: "🏆", active: totalScore === 10 },
      { range: "8-9/10", label: lang === "zh" ? "二獎" : "2nd Prize", emoji: "🥈", active: totalScore >= 8 && totalScore < 10 },
      { range: "6-7/10", label: lang === "zh" ? "三獎" : "3rd Prize", emoji: "🥉", active: totalScore >= 6 && totalScore < 8 },
      { range: "0-5/10", label: lang === "zh" ? "參加獎" : "Participation", emoji: "🎁", active: totalScore < 6 },
    ];

    return (
      <Shell>
        <Header />
        <div className="flex flex-1 flex-col items-center w-full px-5 pt-3 pb-5 max-w-[1200px] mx-auto">
          <div className="flex gap-5 w-full flex-wrap justify-center">
            {/* Leaderboard */}
            <Card className="!flex-1 !min-w-[280px] !max-w-[600px] !bg-white/95">
              <h3 className="text-lg font-extrabold text-[#2B9B8B] mb-4 text-center">
                🏆 {t.leaderboard}
              </h3>
              {top10.length === 0 ? (
                <p className="text-center text-gray-400 text-sm">{t.noData}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-100">
                        <th className="px-1.5 py-2 text-center text-gray-400 font-semibold text-[12px]">
                          {t.rank}
                        </th>
                        <th className="px-1.5 py-2 text-left text-gray-400 font-semibold text-[12px]">
                          {t.player}
                        </th>
                        <th className="px-1.5 py-2 text-center text-gray-400 font-semibold text-[12px]">
                          {t.scoreCol}
                        </th>
                        <th className="px-1.5 py-2 text-center text-gray-400 font-semibold text-[12px]">
                          {t.prizeCol}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {top10.map((entry, i) => {
                        const isMe =
                          entry.name === playerName &&
                          entry.score === totalScore &&
                          i ===
                            top10.findIndex(
                              (e) =>
                                e.name === playerName &&
                                e.score === totalScore,
                            );
                        return (
                          <tr
                            key={i}
                            className="border-b border-gray-50"
                            style={{
                              background: isMe
                                ? "linear-gradient(90deg, rgba(78,205,196,0.15), rgba(240,184,168,0.15))"
                                : "transparent",
                            }}
                          >
                            <td className="px-1.5 py-2.5 text-center text-base">
                              {i < 3 ? rankMedals[i] : i + 1}
                            </td>
                            <td
                              className={`px-1.5 py-2.5 text-gray-700 ${isMe ? "font-bold" : ""}`}
                            >
                              {entry.name}
                            </td>
                            <td className="px-1.5 py-2.5 text-center font-bold text-[#2B9B8B]">
                              {entry.score}/10
                            </td>
                            <td className="px-1.5 py-2.5 text-center text-[13px]">
                              {getPrizeEmoji(entry.score)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            {/* Score card */}
            <Card gradient className="!flex-1 !min-w-[280px] !max-w-[600px] text-center">
              <div className="text-[60px] mb-2">{getPrizeEmoji(totalScore)}</div>
              <h2 className="text-[22px] font-extrabold text-white mb-2 drop-shadow-sm">
                {playerName}
              </h2>
              <p className="text-5xl font-black text-white mb-1 drop-shadow-md">
                {totalScore}
                <span className="text-[22px] text-white/70">/10</span>
              </p>
              <p className="text-xl font-bold text-white/90 mb-6">
                {getPrizeLabel(totalScore, t)}
              </p>

              {/* Prize breakdown */}
              <div className="bg-white/15 rounded-xl px-4 py-3 mb-6 text-left space-y-1.5">
                {prizeRows.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 py-1"
                    style={{
                      opacity: p.active ? 1 : 0.4,
                      fontWeight: p.active ? 700 : 400,
                    }}
                  >
                    <span className="text-lg">{p.emoji}</span>
                    <span className="text-[13px] text-white/85">{p.range}</span>
                    <span className="text-[13px] text-white ml-auto">
                      {p.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-center flex-wrap">
                <PrimaryButton onClick={() => setScreen("start")}>
                  🔄 {t.playAgain}
                </PrimaryButton>
                <button
                  onClick={() => {
                    setScreen("lang");
                    setPlayerName("");
                  }}
                  className="rounded-full px-5 py-3 text-sm font-bold text-white cursor-pointer
                    bg-white/25 transition-all hover:-translate-y-0.5"
                >
                  {t.backHome}
                </button>
              </div>
            </Card>
          </div>
        </div>
      </Shell>
    );
  }

  return null;
}
