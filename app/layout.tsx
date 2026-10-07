import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

// Font dimuat lewat next/font: self-hosted, tanpa render-blocking request.
// Variabel --font-inter dipakai di globals.css (--font-sans).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const TITLE = "Rizal Abdurrahman Wakhid | Web Developer";
const DESCRIPTION =
  "Portfolio Rizal Abdurrahman Wakhid, Web Developer dan siswa Rekayasa Perangkat Lunak SMKN 1 Pasuruan.";

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
    "Web Developer",
    "Frontend Developer",
    "Next.js",
    "Supabase",
    "SMKN 1 Pasuruan",
    "Portfolio",
  ],

  authors: [{ name: "Rizal Abdurrahman Wakhid" }],
  creator: "Rizal Abdurrahman Wakhid",
  publisher: "Rizal Abdurrahman Wakhid",

  alternates: {
    canonical: SITE_URL,
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
    },
  },

  icons: {
    icon: [
      {
        url: "/icon-dark-32x32.png",
        type: "image/png",
      },
    ],
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
      <body className="min-h-screen bg-[#050816]">{children}</body>
    </html>
  );
}