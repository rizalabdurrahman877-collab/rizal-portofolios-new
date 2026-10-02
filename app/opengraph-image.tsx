import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #050816 0%, #11142e 55%, #31206b 100%)",
          color: "white",
          fontFamily: "Arial",
          padding: "70px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#b37dff",
            marginBottom: 22,
            fontWeight: 700,
          }}
        >
          RIZAL PORTFOLIO
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: "-2px",
            textAlign: "center",
          }}
        >
          Rizal Abdurrakhman Wakhid
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#c4c0d3",
            marginTop: 24,
          }}
        >
          Web Developer • Next.js • Supabase • TypeScript • Tailwind CSS
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#90e8c0",
            marginTop: 34,
          }}
        >
          SMKN 1 Pasuruan
        </div>
      </div>
    ),
    { ...size }
  );
}
