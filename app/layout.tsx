import type { Metadata } from "next";

import "./globals.css";
import { plexSans } from "./fonts";

export const metadata: Metadata = {
  title: "Autogram Generator: Create Custom Autograms",
  description: "Generate autograms easily and quickly. Input your desired prefix and receive a unique autogram that includes all letters of the alphabet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className={plexSans.className}>{children}</main>
      </body>
    </html>
  );
}
