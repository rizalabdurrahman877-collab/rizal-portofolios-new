import type { Metadata, Viewport } from "next";
import "./globals.css";

// Perbaikan 1 & 2: URL disesuaikan dengan domain yang terverifikasi + hapus trailing slash
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://rizalportofolio.vercel.app"
).replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    // Perbaikan 3: Ejaan nama disesuaikan
    default: "Rizal Abdurrahman Wakhid | Web Developer",
    template: "%s | Rizal Abdurrahman Wakhid",
  },

  description:
    "Portfolio Rizal Abdurrahman Wakhid, Web Developer dan siswa Rekayasa Perangkat Lunak SMKN 1 Pasuruan.",

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
    title: "Rizal Abdurrahman Wakhid | Web Developer",
    description:
      "Portfolio Rizal Abdurrahman Wakhid, Web Developer dan siswa Rekayasa Perangkat Lunak SMKN 1 Pasuruan.",
    url: SITE_URL,
    siteName: "Rizal Portfolio",
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rizal Abdurrahman Wakhid | Web Developer",
    description:
      "Portfolio Rizal Abdurrahman Wakhid, Web Developer dan siswa Rekayasa Perangkat Lunak SMKN 1 Pasuruan.",
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
    <html lang="id">
      <body className="min-h-screen bg-[#050816]">{children}</body>
    </html>
  );
}