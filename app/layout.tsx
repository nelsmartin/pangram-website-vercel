import type { Metadata } from "next";

import "./globals.css";
import { plexSans } from "./fonts"


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
        <main className={plexSans.className}>{children}</main>
      </body>
    </html>
  );
}
