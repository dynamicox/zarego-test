"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/shared/store";
import Footer from "@/components/organisms/Footer/Footer";
import HeroHeader from "@/components/organisms/HeroHeader/HeroHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <Provider store={store}>
          <HeroHeader />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
