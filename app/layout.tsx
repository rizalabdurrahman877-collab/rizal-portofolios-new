import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://rizal-portofolios.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Rizal Abdurrakhman Wakhid | Web Developer",
    template: "%s | Rizal Abdurrakhman Wakhid",
  },

  description:
    "Portfolio Rizal Abdurrakhman Wakhid, Web Developer dan siswa Rekayasa Perangkat Lunak SMKN 1 Pasuruan.",

  keywords: [
    "Rizal Abdurrakhman Wakhid",
    "Rizal Abdurrakhman",
    "Web Developer",
    "Frontend Developer",
    "Next.js",
    "Supabase",
    "SMKN 1 Pasuruan",
    "Portfolio",
  ],

  authors: [{ name: "Rizal Abdurrakhman Wakhid" }],
  creator: "Rizal Abdurrakhman Wakhid",
  publisher: "Rizal Abdurrakhman Wakhid",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: "Rizal Abdurrakhman Wakhid | Web Developer",
    description:
      "Portfolio Rizal Abdurrakhman Wakhid, Web Developer dan siswa Rekayasa Perangkat Lunak SMKN 1 Pasuruan.",
    url: SITE_URL,
    siteName: "Rizal Portfolio",
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rizal Abdurrakhman Wakhid | Web Developer",
    description:
      "Portfolio Rizal Abdurrakhman Wakhid, Web Developer dan siswa Rekayasa Perangkat Lunak SMKN 1 Pasuruan.",
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
