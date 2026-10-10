import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

import LuxuryDigitalStorm from "@/components/3d/LuxuryDigitalStorm";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const TITLE = "Rizal Abdurrahman Wakhid | Web Developer";

const DESCRIPTION =
  "Portfolio Rizal Abdurrahman Wakhid, Web Developer dan siswa Rekayasa Perangkat Lunak SMKN 1 Pasuruan.";

const GOOGLE_VERIFICATION = "4KtIvzpV2KoTGv6WsrTsWV5gsKo4PpFNwCkM-kGgSyM";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: TITLE,
    template: "%s | Rizal Abdurrahman Wakhid",
  },

  description: DESCRIPTION,

  keywords: [
    "Rizal Abdurrahman Wakhid",
    "Rizal Abdurrahman",
    "Rizal Wakhid",
    "Rizal Portofolio",
    "Web Developer Pasuruan",
    "Frontend Developer Pasuruan",
    "Siswa RPL SMKN 1 Pasuruan",
    "Portofolio Siswa SMK",
    "Web Developer SMK",
    "Next.js Developer",
    "React Developer Indonesia",
    "Supabase Developer",
    "Tailwind CSS Developer",
  ],

  authors: [{ name: "Rizal Abdurrahman Wakhid" }],
  creator: "Rizal Abdurrahman Wakhid",
  publisher: "Rizal Abdurrahman Wakhid",
  category: "technology",

  alternates: {
    canonical: SITE_URL,
  },

  verification: {
    google: GOOGLE_VERIFICATION,
  },

  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Rizal Portfolio",
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050816",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="relative isolate min-h-screen overflow-x-clip bg-[#050816] text-slate-100">
        <LuxuryDigitalStorm />
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
