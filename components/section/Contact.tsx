"use client";

import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Send,
  User,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // =========================
    // VALIDASI
    // =========================

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Semua field wajib diisi.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      alert("Format email tidak valid.");
      return;
    }

    // =========================
    // EMAILJS CONFIG
    // =========================

    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;

    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    console.log("EMAILJS CONFIG:", {
      serviceId: serviceId || "KOSONG",
      templateId: templateId || "KOSONG",
      publicKey: publicKey ? "TERBACA" : "KOSONG",
    });

    if (!serviceId || !templateId || !publicKey) {
      console.error("EMAILJS CONFIG ERROR");

      alert(
        "Konfigurasi EmailJS belum lengkap. Periksa file .env.local."
      );

      return;
    }

    setLoading(true);

    try {
      // =========================
      // 1. SIMPAN KE SUPABASE
      // =========================

      console.log("Menyimpan pesan ke Supabase...");

      const { error: supabaseError } = await supabase
        .from("pesan_kontak")
        .insert({
          nama: name.trim(),
          email: email.trim(),
          pesan: message.trim(),
        });

      if (supabaseError) {
        console.error(
          "SUPABASE ERROR:",
          supabaseError
        );

        throw new Error(
          `Supabase: ${supabaseError.message}`
        );
      }

      console.log(
        "SUPABASE: Berhasil menyimpan pesan."
      );

      // =========================
      // 2. KIRIM EMAIL VIA EMAILJS
      // =========================

      console.log(
        "Mengirim email melalui EmailJS..."
      );

      const templateParams = {
        name: name.trim(),
        email: email.trim(),
        time: new Date().toLocaleString("id-ID"),
        message: message.trim(),
      };

      console.log(
        "EMAILJS PARAMS:",
        templateParams
      );

      const emailResult = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        {
          publicKey: publicKey,
        }
      );

      console.log(
        "EMAILJS SUCCESS:",
        emailResult
      );

      // =========================
      // 3. RESET FORM
      // =========================

      setName("");
      setEmail("");
      setMessage("");

      alert(
        "Pesan berhasil dikirim! 💌"
      );
    } catch (error) {
      console.error(
        "========== CONTACT ERROR =========="
      );

      console.error(error);

      console.error(
        "==================================="
      );

      if (
        typeof error === "object" &&
        error !== null &&
        "text" in error
      ) {
        const emailJsError = error as {
          status?: number;
          text?: string;
        };

        console.error(
          "EmailJS Status:",
          emailJsError.status
        );

        console.error(
          "EmailJS Message:",
          emailJsError.text
        );

        alert(
          `Gagal mengirim email.\n\n${
            emailJsError.text ||
            "Terjadi kesalahan pada EmailJS."
          }`
        );
      } else if (error instanceof Error) {
        alert(
          `Gagal mengirim pesan:\n${error.message}`
        );
      } else {
        alert(
          "Gagal mengirim pesan. Silakan coba lagi."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden py-20"
    >
      <div className="mx-auto w-full max-w-4xl px-6">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            Contact
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Mari Terhubung
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Punya pertanyaan, ide project, atau ingin
            bekerja sama? Kirim pesan melalui form di
            bawah ini.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAMA */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200"
              >
                <User size={16} />
                Nama
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Masukkan nama kamu"
                disabled={loading}
                required
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200"
              >
                <Mail size={16} />
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="nama@email.com"
                disabled={loading}
                required
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* PESAN */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200"
              >
                <MessageSquare size={16} />
                Pesan
              </label>

              <textarea
                id="message"
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Tulis pesan kamu..."
                rows={6}
                disabled={loading}
                required
                className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-900/20 transition duration-300 hover:scale-[1.01] hover:from-violet-500 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                  Kirim Pesan
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}