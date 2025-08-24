import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Activity Aggregator",
  description: "Turn what you already do into a simple timeline - music, runs, commits, films.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}