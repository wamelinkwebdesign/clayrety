"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

type Ease = [number, number, number, number];
const luxuryEase: Ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: luxuryEase },
  }),
};

// ---------------------------------------------------------------------------
// Star icon
// ---------------------------------------------------------------------------

function Star() {
  return (
    <svg
      className="h-4 w-4 fill-current text-gold"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Vertical divider
// ---------------------------------------------------------------------------

function Divider() {
  return (
    <div className="hidden h-10 w-px bg-white/10 md:block" />
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SocialProofStrip() {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden bg-deep-blue py-10 md:py-14">
      {/* Shimmer overlay */}
      <div className="pointer-events-none absolute inset-0 animate-shimmer" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* 2x2 grid on mobile, horizontal row on md+ */}
        <div className="grid grid-cols-2 gap-6 md:flex md:items-center md:justify-center md:gap-0">
          {/* ---- Rating ---- */}
          <motion.div
            variants={fadeUp}
            custom={0.1}
            className="flex flex-col items-center gap-2 md:px-8 lg:px-12"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} />
              ))}
              <span className="ml-2 font-heading text-xl font-bold text-gold">
                5.0
              </span>
            </div>
            <span className="text-center text-sm text-white/60">
              {t("socialProof.rating")}
            </span>
          </motion.div>

          <Divider />

          {/* ---- Sessions count ---- */}
          <motion.div
            variants={fadeUp}
            custom={0.2}
            className="flex flex-col items-center gap-2 md:px-8 lg:px-12"
          >
            <span className="font-heading text-2xl font-bold text-white">
              {t("socialProof.sessions")}
            </span>
            <span className="text-center text-sm text-white/60">
              {t("socialProof.sessionsLabel")}
            </span>
          </motion.div>

          <Divider />

          {/* ---- Featured quote ---- */}
          <motion.div
            variants={fadeUp}
            custom={0.3}
            className="flex flex-col items-center gap-2 md:px-8 lg:px-12"
          >
            <p className="max-w-xs text-center font-body text-sm italic leading-relaxed text-white">
              &ldquo;{t("socialProof.quote")}&rdquo;
            </p>
            <span className="text-center text-xs text-white/60">
              &mdash; {t("socialProof.quoteAuthor")}
            </span>
          </motion.div>

          <Divider />

          {/* ---- Trained in tradition ---- */}
          <motion.div
            variants={fadeUp}
            custom={0.4}
            className="flex flex-col items-center gap-2 md:px-8 lg:px-12"
          >
            <span className="font-heading text-2xl font-bold text-gold">
              {t("socialProof.trained")}
            </span>
            <span className="text-center text-sm text-white/60">
              {t("socialProof.trainedLabel")}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
