import type { Metadata } from "next";
import Link from 'next/link'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Autogram Generator",
  description: "Generate custom autograms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className="antialiased">
        <nav className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center px-4 py-3">
        <div className="flex items-center gap-6 text-lg font-semibold">
          <Link href="/">Autogram Generator</Link>

          <Link
            href="/autogramList"
            className="text-lg font-normal text-gray-600 hover:text-black transition"
          >
            See Pangrams
          </Link>
        </div>
      </div>
    </nav>


        <main>{children}</main>
      </body>
    </html>
  );
}
