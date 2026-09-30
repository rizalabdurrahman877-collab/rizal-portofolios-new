import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rizal Abdurrakhman | Web Developer",
  description:
    "Portfolio Rizal Abdurrakhman - Web Developer and Software Engineering Student.",

  icons: {
    icon: [
      {
        url: "/icon-dark-32x32.png",
        type: "image/png",
      },
    ],
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#050816]">
        {children}
      </body>
    </html>
  );
}