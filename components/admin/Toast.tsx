"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";

export default function Toast() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const success = searchParams.get("success");
  const error = searchParams.get("error");

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!success && !error) return;

    setVisible(true);

    const timer = setTimeout(() => {
      handleClose();
    }, 3500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);

  const handleClose = () => {
    setVisible(false);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("success");
    params.delete("error");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const isSuccess = Boolean(success);
  const message = success || error;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-100 flex justify-center px-4 sm:justify-end sm:pr-6">
      <AnimatePresence>
        {visible && message && (
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className={`pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-sm ${
              isSuccess
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {isSuccess ? (
              <motion.span
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 14,
                }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white"
              >
                <CheckCircle2 className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 400 }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500 text-white"
              >
                <XCircle className="h-5 w-5" />
              </motion.span>
            )}

            <p className="text-sm font-semibold leading-snug">{message}</p>

            <button
              type="button"
              onClick={handleClose}
              aria-label="Tutup notifikasi"
              className="ml-1 shrink-0 rounded-full p-1 text-current/70 transition hover:bg-black/5"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
