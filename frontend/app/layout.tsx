import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getGlobalData, getGlobalPageMetadata } from "@/data/loaders";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetaData(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();
  return{
    title: metadata?.title,
    description: metadata?.description,
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="bottom-center"/>
         <Header data={globalData.data.header} />
        {children}
        <Footer data={globalData.data.footer} />
      </body>
    </html>
  );
}
