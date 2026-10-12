import { TopLoader } from "next-top-loader";
import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "سیستم امنیتی هوشمند",
    template: "%s – سیستم امنیتی هوشمند",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <TopLoader initialProgress={0} color="oklch(70.7% 0.165 254.624)" />
        <main className="min-[70rem]:w-[75%] flex items-center justify-between mx-auto p-4 pt-10">
          {children}
        </main>
      </body>
    </html>
  );
}
