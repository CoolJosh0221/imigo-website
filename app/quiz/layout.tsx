import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "iMigo Quiz - 移工友善知識挑戰",
  description:
    "Test your knowledge about migrant worker culture, rights, and daily life in Taiwan.",
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
