"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

// ---------------------------------------------------------------------------
// Animation helpers
// ---------------------------------------------------------------------------

type Ease = [number, number, number, number];
const luxuryEase: Ease = [0.22, 1, 0.36, 1];
const softEase: Ease = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: luxuryEase },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay, ease: softEase },
  }),
};

// ---------------------------------------------------------------------------
// Animated counter hook
// ---------------------------------------------------------------------------

function useAnimatedCounter(
  target: number,
  inView: boolean,
  duration = 2000,
  decimals = 0,
): string {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    }

    requestAnimationFrame(tick);
  }, [target, duration]);

  useEffect(() => {
    if (inView) {
      animate();
    }
  }, [inView, animate]);

  return decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toString();
}

// ---------------------------------------------------------------------------
// Star icon (larger, with optional glow)
// ---------------------------------------------------------------------------

function Star({ glow = false }: { glow?: boolean }) {
  return (
    <svg
      className={`h-5 w-5 fill-current text-gold ${glow ? "drop-shadow-[0_0_6px_rgba(196,162,101,0.6)]" : ""}`}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Vertical divider (taller for the new layout)
// ---------------------------------------------------------------------------

function Divider() {
  return (
    <motion.div
      variants={scaleIn}
      custom={0.3}
      className="hidden h-20 w-px md:block"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Concentric circle background pattern
// ---------------------------------------------------------------------------

function ConcentricPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Left cluster */}
      <svg
        className="absolute -left-32 top-1/2 -translate-y-1/2 h-[500px] w-[500px] opacity-[0.04]"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[60, 100, 140, 180, 220].map((r) => (
          <circle
            key={r}
            cx="250"
            cy="250"
            r={r}
            fill="none"
            stroke="white"
            strokeWidth="0.75"
          />
        ))}
      </svg>

      {/* Right cluster */}
      <svg
        className="absolute -right-24 top-1/2 -translate-y-1/2 h-[400px] w-[400px] opacity-[0.03]"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[40, 80, 120, 160, 200].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="white"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SocialProofStrip() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Animated values
  const sessionsCount = useAnimatedCounter(500, isInView, 2200);
  const ratingValue = useAnimatedCounter(5.0, isInView, 1800, 1);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-deep-blue py-16 md:py-20"
    >
      {/* Shimmer overlay */}
      <div className="pointer-events-none absolute inset-0 animate-shimmer" />

      {/* Concentric circle background texture */}
      <ConcentricPattern />

      {/* Subtle top/bottom gradient edges for depth */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16"
        style={{
          background:
            "linear-gradient(180deg, rgba(30,38,109,0.5) 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
        style={{
          background:
            "linear-gradient(0deg, rgba(30,38,109,0.5) 0%, transparent 100%)",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative mx-auto max-w-7xl px-6 lg:px-8"
      >
        {/* 2x2 grid on mobile, horizontal row on md+ */}
        <div className="grid grid-cols-2 gap-10 md:flex md:items-center md:justify-center md:gap-0">
          {/* ---------------------------------------------------------------- */}
          {/* Rating                                                           */}
          {/* ---------------------------------------------------------------- */}
          <motion.div
            variants={fadeUp}
            custom={0.1}
            className="flex flex-col items-center gap-3 md:px-10 lg:px-14"
          >
            {/* Animated rating number */}
            <motion.span
              className="font-heading text-5xl font-bold text-gold drop-shadow-[0_0_12px_rgba(196,162,101,0.35)]"
              animate={
                isInView
                  ? {
                      textShadow: [
                        "0 0 12px rgba(196,162,101,0.3)",
                        "0 0 24px rgba(196,162,101,0.5)",
                        "0 0 12px rgba(196,162,101,0.3)",
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {ratingValue}
            </motion.span>

            {/* Stars */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  custom={0.3 + i * 0.08}
                >
                  <Star glow />
                </motion.div>
              ))}
            </div>

            <span className="mt-1 text-center text-sm font-medium tracking-wide text-white/50">
              {t("socialProof.rating")} rating
            </span>
          </motion.div>

          <Divider />

          {/* ---------------------------------------------------------------- */}
          {/* Sessions count                                                   */}
          {/* ---------------------------------------------------------------- */}
          <motion.div
            variants={fadeUp}
            custom={0.2}
            className="flex flex-col items-center gap-3 md:px-10 lg:px-14"
          >
            <span className="font-heading text-5xl font-bold text-white">
              {sessionsCount}
              <span className="text-rose-light">+</span>
            </span>
            <span className="mt-1 text-center text-sm font-medium tracking-wide text-white/50">
              {t("socialProof.sessionsLabel")}
            </span>
          </motion.div>

          <Divider />

          {/* ---------------------------------------------------------------- */}
          {/* Featured quote                                                   */}
          {/* ---------------------------------------------------------------- */}
          <motion.div
            variants={fadeUp}
            custom={0.3}
            className="col-span-2 flex flex-col items-center gap-4 md:col-span-1 md:px-10 lg:px-14"
          >
            {/* Decorative open-quote mark */}
            <motion.span
              variants={scaleIn}
              custom={0.4}
              className="font-heading text-4xl leading-none text-rose-light/30"
              aria-hidden="true"
            >
              &ldquo;
            </motion.span>

            <p className="max-w-sm text-center font-heading text-lg italic leading-relaxed text-white md:text-xl">
              {t("socialProof.quote")}
            </p>

            <span className="text-center text-sm font-medium tracking-wide text-white/50">
              {t("socialProof.quoteAuthor")}
            </span>
          </motion.div>

          <Divider />

          {/* ---------------------------------------------------------------- */}
          {/* Trained in Nepal                                                 */}
          {/* ---------------------------------------------------------------- */}
          <motion.div
            variants={fadeUp}
            custom={0.4}
            className="flex flex-col items-center gap-3 md:px-10 lg:px-14"
          >
            {/* Mountain icon */}
            <motion.svg
              variants={scaleIn}
              custom={0.5}
              className="mb-1 h-8 w-8 text-gold opacity-80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 20L9 8l4 6 2-3 6 9H3z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 11l2-3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </motion.svg>

            <span className="font-heading text-2xl font-bold text-gold md:text-3xl">
              {t("socialProof.trained")}
            </span>
            <span className="mt-1 text-center text-sm font-medium tracking-wide text-white/50">
              {t("socialProof.trainedLabel")}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
