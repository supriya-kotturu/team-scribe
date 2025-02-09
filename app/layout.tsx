import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ModeToggle } from "@/components/ui/mode-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team Scribe",
  description: "A collaborative note-taking app for teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          {/* TODO: move this to header component */}
          <div className="container w-full max-w-3xl mx-auto px-4 p-6 flex justify-between items-center">
            <header>
              <h1 className="text-secondary">Team Scribe</h1>
            </header>
            <ModeToggle/>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
