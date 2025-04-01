import type { Metadata } from "next";
import { Geist, Geist_Mono, Ubuntu, Baskervville, Anton } from "next/font/google";
import "../globals.css";
import Navbar from "./components/Navbar";
import { getCategories, getNavigationItems } from "@/sanity/sanity-utils";
import Footer from "./components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', 
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', 
  adjustFontFallback: false,
});

const ubuntu_bold = Ubuntu({
  variable: "--font-ubuntu-bold",
  subsets: ["latin"],
  weight: "700",
  display: 'swap', 
  adjustFontFallback: false,
});

const ubuntu_light = Ubuntu({
  variable: "--font-ubuntu-light",
  subsets: ["latin"],
  weight: "300",
  display: 'swap', 
  adjustFontFallback: false,
});

const baskervville = Baskervville({
  variable: "--font-baskervville",
  subsets: ["latin"],
  weight: "400",
  display: 'swap', 
  adjustFontFallback: false,
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: 'swap', 
  adjustFontFallback: false,
});


export const metadata: Metadata = {
  title: "FAT",
  description: "Rollende Unterforderung · Mobilität für alle: Volkswagen gibt mit ID. · die Legende kehrt zurück in Form des allerersten elektrischen „Mini-Supersportwagens“.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getNavigationItems();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ubuntu_bold.variable} ${ubuntu_light.variable} ${baskervville.variable} ${anton.variable} antialiased min-h-screen`}
      >
        <Navbar navigationItems={categories}/>
        <main className="flex-grow max-w-3xl px-3 md:mx-auto lg:mx-auto xl:mx-auto flex flex-col gap-4 mb-5">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
