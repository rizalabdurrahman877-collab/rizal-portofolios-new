import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    // ==========================================
    // VALIDASI INPUT
    // ==========================================

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Semua field wajib diisi.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // VALIDASI EMAIL
    // ==========================================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Format email tidak valid.",
        },
        { status: 400 }
      );
    }

    // ==========================================
    // ENVIRONMENT VARIABLES
    // ==========================================

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY belum diatur.");

      return NextResponse.json(
        {
          success: false,
          message: "Konfigurasi email belum tersedia.",
        },
        { status: 500 }
      );
    }

    if (!contactEmail) {
      console.error("CONTACT_EMAIL belum diatur.");

      return NextResponse.json(
        {
          success: false,
          message: "Email tujuan belum dikonfigurasi.",
        },
        { status: 500 }
      );
    }

    // ==========================================
    // 1. SIMPAN PESAN KE SUPABASE
    // ==========================================

    const { error: supabaseError } = await supabase
      .from("pesan_kontak")
      .insert({
        nama: name,
        email: email,
        pesan: message,
      });

    if (supabaseError) {
      console.error("SUPABASE CONTACT ERROR:", supabaseError);

      return NextResponse.json(
        {
          success: false,
          message: "Pesan gagal disimpan ke database.",
        },
        { status: 500 }
      );
    }

    // ==========================================
    // 2. KIRIM EMAIL DENGAN RESEND
    // ==========================================

    const resend = new Resend(resendApiKey);

    const { data: resendData, error: resendError } =
      await resend.emails.send({
        from: "Portfolio Rizal <noreply@update-portofolio.com>",
        to: [contactEmail],
        replyTo: email,
        subject: `Pesan baru dari ${name}`,
        html: `
          <!DOCTYPE html>
          <html lang="id">
            <head>
              <meta charset="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <title>Pesan Baru dari Portfolio</title>
            </head>

            <body
              style="
                margin: 0;
                padding: 0;
                background: #080a16;
                font-family: Arial, Helvetica, sans-serif;
                color: #ffffff;
              "
            >
              <div
                style="
                  max-width: 600px;
                  margin: 40px auto;
                  padding: 30px;
                  background: #111426;
                  border-radius: 18px;
                  border: 1px solid #272c48;
                "
              >
                <h1
                  style="
                    margin: 0 0 15px;
                    font-size: 24px;
                    color: #8d7cff;
                  "
                >
                  Pesan Baru dari Portfolio
                </h1>

                <p
                  style="
                    color: #b8bdd4;
                    line-height: 1.6;
                  "
                >
                  Seseorang mengirim pesan melalui website portfolio kamu.
                </p>

                <div
                  style="
                    margin-top: 25px;
                    padding: 20px;
                    background: #080a16;
                    border-radius: 14px;
                    border: 1px solid #272c48;
                  "
                >
                  <p style="line-height: 1.6;">
                    <strong>Nama</strong><br />
                    ${escapeHtml(name)}
                  </p>

                  <p style="line-height: 1.6;">
                    <strong>Email</strong><br />
                    ${escapeHtml(email)}
                  </p>

                  <p style="line-height: 1.6;">
                    <strong>Pesan</strong><br />
                    ${escapeHtml(message).replace(/\n/g, "<br />")}
                  </p>
                </div>

                <p
                  style="
                    margin-top: 25px;
                    font-size: 13px;
                    color: #777d98;
                  "
                >
                  Email ini dikirim otomatis dari website portfolio Rizal.
                </p>
              </div>
            </body>
          </html>
        `,
      });

    // ==========================================
    // 3. CEK ERROR RESEND
    // ==========================================

    if (resendError) {
      console.error("========== RESEND ERROR ==========");
      console.error("NAME:", resendError.name);
      console.error("MESSAGE:", resendError.message);
      console.error("STATUS:", resendError.statusCode);
      console.error("FULL ERROR:", resendError);
      console.error("==================================");

      return NextResponse.json(
        {
          success: false,
          saved: true,
          message:
            resendError.message ||
            "Pesan sudah tersimpan di database, tetapi email gagal dikirim.",
          error: {
            name: resendError.name,
            statusCode: resendError.statusCode,
          },
        },
        { status: 500 }
      );
    }

    // ==========================================
    // 4. BERHASIL
    // ==========================================

    console.log("EMAIL BERHASIL DIKIRIM:", resendData);

    return NextResponse.json({
      success: true,
      message: "Pesan berhasil dikirim.",
      emailId: resendData?.id || null,
    });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server.",
      },
      { status: 500 }
    );
  }
}

// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}