import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const alt = `${SITE_NAME} | Web Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const domain = SITE_URL.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "white",
          backgroundColor: "#050816",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(37,99,235,0.45), transparent 55%), radial-gradient(circle at 10% 95%, rgba(6,182,212,0.28), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            color: "#60a5fa",
            textTransform: "uppercase",
          }}
        >
          Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 42,
              color: "#22d3ee",
            }}
          >
            Pengembang Web Kreatif
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 30,
              color: "#94a3b8",
            }}
          >
            Next.js · React · Tailwind CSS
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#94a3b8" }}>
          {domain}
        </div>
      </div>
    ),
    { ...size }
  );
}