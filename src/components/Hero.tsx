"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

type Ease = [number, number, number, number];
const luxuryEase: Ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: luxuryEase },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, delay, ease: luxuryEase },
  }),
};

const pulseRing = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1.8, delay, ease: luxuryEase },
  }),
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Hero() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: shift the background image slightly as user scrolls
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Background image with parallax                                      */}
      {/* ------------------------------------------------------------------ */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Image
          src="https://clayrety.nl/wp-content/uploads/2021/03/Untitled-3-scaled.jpg"
          alt="Himalayan sound bowls in a serene setting"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center scale-110"
        />
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* Gradient overlay for depth & legibility                             */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{ opacity: overlayOpacity }}
      >
        {/* Primary deep-blue gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(30,38,109,0.82) 0%, rgba(30,38,109,0.60) 40%, rgba(30,38,109,0.78) 100%)",
          }}
        />
        {/* Subtle warm vignette from bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 110%, rgba(223,139,163,0.18) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* Decorative elements                                                 */}
      {/* ------------------------------------------------------------------ */}

      {/* Large soft ring (top-right) */}
      <motion.div
        variants={pulseRing}
        initial="hidden"
        animate="visible"
        custom={0.6}
        className="absolute -top-32 -right-32 z-[2] h-[420px] w-[420px] rounded-full border border-rose-light/20 md:h-[600px] md:w-[600px]"
        style={{ filter: "blur(1px)" }}
      />

      {/* Medium ring (bottom-left) */}
      <motion.div
        variants={pulseRing}
        initial="hidden"
        animate="visible"
        custom={0.9}
        className="absolute -bottom-24 -left-24 z-[2] h-[300px] w-[300px] rounded-full border border-rose-light/15 md:h-[450px] md:w-[450px]"
        style={{ filter: "blur(1px)" }}
      />

      {/* Small floating accent circle */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        custom={1.2}
        className="absolute top-1/4 right-[12%] z-[2] hidden md:block"
      >
        <div className="h-3 w-3 rounded-full bg-rose-light/40 animate-float" />
      </motion.div>

      {/* Another floating dot */}
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        custom={1.4}
        className="absolute bottom-1/3 left-[8%] z-[2] hidden md:block"
      >
        <div
          className="h-2 w-2 rounded-full bg-rose-light/30 animate-float"
          style={{ animationDelay: "2s" }}
        />
      </motion.div>

      {/* Subtle wave / arc decoration */}
      <motion.svg
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        custom={1.0}
        className="absolute bottom-[15%] left-[5%] z-[2] hidden w-40 opacity-[0.12] lg:block"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 80 Q50 10 100 50 T190 30"
          stroke="#f0b5c7"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 90 Q60 30 110 60 T190 40"
          stroke="#f0b5c7"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* ------------------------------------------------------------------ */}
      {/* Content                                                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center sm:px-10 lg:px-16">
        {/* Small label / eyebrow */}
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mb-6 inline-block rounded-full border border-white/20 bg-white/5 px-5 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm sm:text-xs"
        >
          Clayrety
        </motion.span>

        {/* Main heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          <span className="block">{t("hero.title")}</span>
        </motion.h1>

        {/* Decorative divider line */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="my-7 flex items-center gap-3 sm:my-9"
        >
          <span className="block h-px w-10 bg-rose/50 sm:w-14" />
          <span className="block h-1.5 w-1.5 rounded-full bg-rose" />
          <span className="block h-px w-10 bg-rose/50 sm:w-14" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.7}
          className="mx-auto max-w-xl font-body text-base leading-relaxed text-white/80 sm:text-lg md:max-w-2xl md:text-xl"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.95}
          className="mt-10 sm:mt-12"
        >
          <motion.a
            href="#sessions"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-rose px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-rose/25 transition-colors duration-300 hover:bg-rose-dark sm:px-10 sm:py-4 sm:text-base"
          >
            {/* Sheen effect on hover */}
            <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/15 transition-transform duration-700 group-hover:translate-x-full" />

            <span className="relative">{t("hero.cta")}</span>

            {/* Arrow icon */}
            <svg
              className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Scroll indicator                                                    */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 sm:bottom-10"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            className="h-5 w-5 text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
