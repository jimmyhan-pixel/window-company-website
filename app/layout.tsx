import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import PageViewTracker from "@/components/analytics/PageViewTracker";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "City Windows / 华美门窗 - Quality Windows for Your Home",
  description: "Professional window installation and replacement services in New York",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <PageViewTracker />
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
