import type { Metadata } from "next";
import { Geist, Geist_Mono, Ubuntu, Baskervville } from "next/font/google";
import "../globals.css";
import Navbar from "./components/Navbar";
import { getCategories } from "@/sanity/sanity-utils";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ubuntu_bold = Ubuntu({
  variable: "--font-ubuntu-bold",
  subsets: ["latin"],
  weight: "700",
});

const ubuntu_light = Ubuntu({
  variable: "--font-ubuntu-light",
  subsets: ["latin"],
  weight: "300",
});

const baskervville = Baskervville({
  variable: "--font-baskervville",
  subsets: ["latin"],
  weight: "400",
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
  const categories = await getCategories();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ubuntu_bold.variable} ${ubuntu_light.variable} ${baskervville.variable}  antialiased`}
      >
        <Navbar categories={categories}/>
        <main className="min-h-screen max-w-3xl px-3 md:mx-auto lg:mx-auto xl:mx-auto flex flex-col gap-4">
          {children}
        </main>
      </body>
    </html>
  );
}
