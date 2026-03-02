"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function StickyBookCTA() {
  const t = useTranslations();
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  // Show the CTA after scrolling past ~100vh
  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = typeof window !== "undefined" ? window.innerHeight : 800;
    setIsVisible(latest > threshold);
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="#booking"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 22,
            mass: 0.8,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="fixed bottom-4 left-4 right-4 z-40 md:bottom-6 md:left-auto md:right-6"
        >
          {/* Pulse ring — plays once on appear */}
          <motion.span
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 rounded-full bg-rose/30"
          />

          {/* Button pill */}
          <span
            className="relative flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-rose/40 md:inline-flex md:w-auto"
            style={{
              background: "linear-gradient(135deg, #DF8BA3 0%, #c76f8a 100%)",
            }}
          >
            <span>{t("stickyCta.label")}</span>
            <span className="text-white/70">&middot;</span>
            <span className="text-xs font-normal text-white/80">
              {t("stickyCta.price")}
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
