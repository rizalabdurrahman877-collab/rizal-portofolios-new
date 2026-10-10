"use client";

import {
  CSSProperties,
  FormEvent,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AlertCircle,
  Check,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  User,
} from "lucide-react";

type Status = { type: "success" | "error"; text: string } | null;

/** Kedalaman (translateZ) + urutan masuk untuk tiap layer kartu */
const layer = (z: number, i: number) =>
  ({ "--z": `${z}px`, "--i": i }) as CSSProperties;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [inView, setInView] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  // Kartu "masuk" saat terlihat di layar
  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pesan status hilang otomatis
  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(null), 6000);
    return () => clearTimeout(t);
  }, [status]);

  // Tombol kembali normal setelah menampilkan "Terkirim"
  useEffect(() => {
    if (!sent) return;
    const t = setTimeout(() => setSent(false), 2600);
    return () => clearTimeout(t);
  }, [sent]);

  // Tilt 3D mengikuti kursor (hanya mouse)
  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = cardRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--ry", `${(px - 0.5) * 9}deg`);
      el.style.setProperty("--rx", `${(0.5 - py) * 7}deg`);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.setProperty("--px", `${px - 0.5}`);
      el.style.setProperty("--py", `${py - 0.5}`);
    });
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    ["--rx", "--ry", "--mx", "--my", "--px", "--py"].forEach((v) =>
      el.style.removeProperty(v)
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    // VALIDASI
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", text: "Semua field wajib diisi." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus({ type: "error", text: "Format email tidak valid." });
      return;
    }

    // EMAILJS CONFIG
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EMAILJS CONFIG ERROR", {
        serviceId: serviceId || "KOSONG",
        templateId: templateId || "KOSONG",
        publicKey: publicKey ? "TERBACA" : "KOSONG",
      });
      setStatus({
        type: "error",
        text: "Konfigurasi EmailJS belum lengkap. Periksa file .env.local.",
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // Pustaka EmailJS & Supabase dimuat hanya saat form dikirim,
      // supaya tidak ikut membebani JavaScript awal halaman.
      const [{ default: emailjs }, { supabase }] = await Promise.all([
        import("@emailjs/browser"),
        import("@/lib/supabase"),
      ]);

      // 1. SIMPAN KE SUPABASE
      const { error: supabaseError } = await supabase
        .from("pesan_kontak")
        .insert({
          nama: name.trim(),
          email: email.trim(),
          pesan: message.trim(),
        });

      if (supabaseError) {
        console.error("SUPABASE ERROR:", supabaseError);
        throw new Error(`Supabase: ${supabaseError.message}`);
      }

      // 2. KIRIM EMAIL VIA EMAILJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: name.trim(),
          email: email.trim(),
          time: new Date().toLocaleString("id-ID"),
          message: message.trim(),
        },
        { publicKey }
      );

      // 3. RESET FORM
      setName("");
      setEmail("");
      setMessage("");
      setSent(true);
      setStatus({ type: "success", text: "Pesan berhasil dikirim! 💌" });
    } catch (error) {
      console.error("CONTACT ERROR:", error);

      if (typeof error === "object" && error !== null && "text" in error) {
        const emailJsError = error as { status?: number; text?: string };
        setStatus({
          type: "error",
          text: `Gagal mengirim email. ${
            emailJsError.text || "Terjadi kesalahan pada EmailJS."
          }`,
        });
      } else if (error instanceof Error) {
        setStatus({
          type: "error",
          text: `Gagal mengirim pesan: ${error.message}`,
        });
      } else {
        setStatus({
          type: "error",
          text: "Gagal mengirim pesan. Silakan coba lagi.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden py-24"
    >
      <div className="ct-glow" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
        {/* HEADER */}
        <div className="reveal-view mb-12 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-[#7dd3fc]">
            Kontak
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Mari Terhubung
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#a9b0d0] sm:text-base">
            Punya pertanyaan, ide project, atau ingin bekerja sama? Kirim
            pesan melalui form di bawah ini.
          </p>
        </div>

        {/* KARTU 3D */}
        <div className="ct-scene">
          <div
            ref={cardRef}
            className="ct-card"
            data-in={inView}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            {/* Permukaan: glare mengikuti kursor + grid (daun, di-clip sendiri) */}
            <span className="ct-surface" aria-hidden="true">
              <span className="ct-glare" />
              <span className="ct-grid" />
            </span>

            {/* Dekorasi 3D di luar tepi kartu */}
            <div className="ct-cube" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <span className="ct-ring" aria-hidden="true" />

            <form onSubmit={handleSubmit} className="ct-form space-y-6">
              {/* NAMA */}
              <div className="ct-field ct-layer ct-rise" style={layer(22, 0)}>
                <label
                  htmlFor="name"
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200"
                >
                  <User size={16} className="ct-icon" />
                  Nama
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama kamu"
                  disabled={loading}
                  required
                  className="ct-input"
                />
              </div>

              {/* EMAIL */}
              <div className="ct-field ct-layer ct-rise" style={layer(30, 1)}>
                <label
                  htmlFor="email"
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200"
                >
                  <Mail size={16} className="ct-icon" />
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  disabled={loading}
                  required
                  className="ct-input"
                />
              </div>

              {/* PESAN */}
              <div className="ct-field ct-layer ct-rise" style={layer(38, 2)}>
                <label
                  htmlFor="message"
                  className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200"
                >
                  <MessageSquare size={16} className="ct-icon" />
                  Pesan
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tulis pesan kamu..."
                  rows={6}
                  disabled={loading}
                  required
                  className="ct-input resize-none"
                />
              </div>

              {/* STATUS */}
              {status && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`ct-status ${
                    status.type === "success" ? "ct-status--ok" : "ct-status--err"
                  }`}
                >
                  {status.type === "success" ? (
                    <Check size={18} className="mt-0.5 shrink-0" />
                  ) : (
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  )}
                  <span>{status.text}</span>
                </div>
              )}

              {/* BUTTON */}
              <div className="ct-layer ct-rise" style={layer(46, 3)}>
                <button
                  type="submit"
                  disabled={loading}
                  className="ct-btn group"
                  data-state={loading ? "loading" : sent ? "sent" : "idle"}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Mengirim...
                    </>
                  ) : sent ? (
                    <>
                      <Check size={18} className="ct-pop" />
                      Terkirim
                    </>
                  ) : (
                    <>
                      <Send size={18} className="ct-send" />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}