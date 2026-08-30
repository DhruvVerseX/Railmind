import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RailMind AI",
  description: "AI-powered railway traffic control dashboard"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
