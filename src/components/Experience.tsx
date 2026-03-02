"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ---------------------------------------------------------------------------
// SVG Icons
// ---------------------------------------------------------------------------

function TeaCupIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gold"
    >
      {/* Steam wisps */}
      <path
        d="M12 8C12 8 13 4 12 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M16 7C16 7 17 3 16 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M20 8C20 8 21 4 20 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Cup body */}
      <path
        d="M6 14H26V22C26 26.4183 22.4183 30 18 30H14C9.58172 30 6 26.4183 6 22V14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Handle */}
      <path
        d="M26 17H28C30.2091 17 32 18.7909 32 21V21C32 23.2091 30.2091 25 28 25H26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Saucer */}
      <path
        d="M4 30H28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Tea liquid */}
      <path
        d="M9 19C11 17.5 15 20 18 18C21 16 23 19 23 19"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

function SoundWaveIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gold"
    >
      {/* Bowl base */}
      <path
        d="M8 22C8 22 8 28 18 28C28 28 28 22 28 22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bowl rim */}
      <path
        d="M6 22H30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Sound waves emanating upward */}
      <path
        d="M18 20V18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13 16C13 16 15.5 13 18 13C20.5 13 23 16 23 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M10 12C10 12 13 8 18 8C23 8 26 12 26 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M7 8C7 8 11 3 18 3C25 3 29 8 29 8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gold"
    >
      <path
        d="M18 31S5 23 5 14.5C5 10.36 8.36 7 12.5 7C14.54 7 16.47 7.99 18 9.5C19.53 7.99 21.46 7 23.5 7C27.64 7 31 10.36 31 14.5C31 23 18 31 18 31Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 25S10 20 10 15C10 12.79 11.79 11 14 11C15.11 11 16.12 11.53 18 12.5C19.88 11.53 20.89 11 22 11C24.21 11 26 12.79 26 15C26 20 18 25 18 25Z"
        fill="currentColor"
        opacity="0.2"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Step data
// ---------------------------------------------------------------------------

const stepKeys = ["arrive", "session", "after"] as const;
const stepIcons = [TeaCupIcon, SoundWaveIcon, HeartIcon];

// ---------------------------------------------------------------------------
// Animation config
// ---------------------------------------------------------------------------

type Ease = [number, number, number, number];
const smoothEase: Ease = [0.25, 0.46, 0.45, 0.94];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Experience() {
  const t = useTranslations();

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.2 });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="grain relative overflow-hidden bg-cream py-24 md:py-32 lg:py-40"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-rose-light/15 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-rose/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="mb-6 flex justify-center"
        >
          <span className="inline-block rounded-full border border-rose/30 bg-white/60 px-5 py-2 text-sm font-medium tracking-wide text-rose-dark backdrop-blur-sm">
            {t("experience.badge")}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: smoothEase }}
          className="mx-auto mb-8 max-w-4xl text-center font-heading text-4xl font-bold italic leading-tight tracking-tight text-deep-blue md:text-5xl lg:text-6xl xl:text-7xl"
        >
          {t("experience.title")}
        </motion.h2>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
          className="mx-auto mb-10 flex items-center justify-center gap-3"
        >
          <span className="block h-px w-12 bg-gold/50" />
          <span className="block h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="block h-px w-12 bg-gold/50" />
        </motion.div>

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: smoothEase }}
          className="mx-auto mb-8 max-w-3xl text-center text-lg leading-relaxed text-deep-blue/75 md:text-xl md:leading-relaxed"
        >
          {t("experience.intro")}
        </motion.p>

        {/* No experience callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
          className="mx-auto mb-20 max-w-2xl md:mb-24"
        >
          <div className="rounded-xl bg-rose-light/25 px-6 py-4 text-center backdrop-blur-sm md:px-8 md:py-5">
            <p className="text-base font-semibold leading-relaxed text-deep-blue/85 md:text-lg">
              {t("experience.noExperience")}
            </p>
          </div>
        </motion.div>

        {/* Timeline / Steps */}
        <div ref={stepsRef} className="relative">
          {/* Horizontal connecting line (desktop only) */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={stepsInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: smoothEase }}
            className="absolute top-[72px] left-[16.67%] right-[16.67%] hidden origin-left md:block"
          >
            <div
              className="h-0 w-full border-t-2 border-dashed border-gold/40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent, transparent 8px, transparent 8px, transparent 16px)",
              }}
            />
          </motion.div>

          {/* Step cards */}
          <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
            {stepKeys.map((key, index) => {
              const Icon = stepIcons[index];
              const stepNumber = String(index + 1).padStart(2, "0");

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 40 }}
                  animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + index * 0.2,
                    ease: smoothEase,
                  }}
                  className="flex flex-col items-center"
                >
                  {/* Step number */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={stepsInView ? { opacity: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.2,
                      ease: smoothEase,
                    }}
                    className="mb-3 text-sm font-semibold tracking-widest text-gold"
                  >
                    {stepNumber}
                  </motion.span>

                  {/* Icon circle */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={stepsInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.25 + index * 0.2,
                      ease: smoothEase,
                    }}
                    className="relative z-10 mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white shadow-md shadow-deep-blue/5 ring-4 ring-cream"
                  >
                    <Icon />
                  </motion.div>

                  {/* Card */}
                  <div className="group w-full rounded-2xl bg-white p-7 shadow-[0_2px_24px_rgba(30,38,109,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(196,162,101,0.12)] md:p-8">
                    <h3 className="mb-3 text-center font-heading text-xl font-semibold text-deep-blue">
                      {t(`experience.steps.${key}.title`)}
                    </h3>
                    <p className="text-center text-[15px] leading-relaxed text-deep-blue/70 font-body">
                      {t(`experience.steps.${key}.description`)}
                    </p>

                    {/* Bottom accent line */}
                    <div className="mx-auto mt-6 h-0.5 w-10 rounded-full bg-gold/30 transition-all duration-300 group-hover:w-16 group-hover:bg-gold/60" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
