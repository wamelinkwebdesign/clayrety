"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

function WaveIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-rose"
    >
      <path
        d="M4 16C4 16 6 10 8 10C10 10 12 22 14 22C16 22 18 10 20 10C22 10 24 22 26 22C28 22 28 16 28 16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 22C4 22 6 18 8 18C10 18 12 26 14 26C16 26 18 18 20 18C22 18 24 26 26 26C28 26 28 22 28 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
    </svg>
  );
}

function ChakraIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-rose"
    >
      <circle
        cx="16"
        cy="16"
        r="11"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="16"
        cy="16"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.7"
      />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      <line
        x1="16"
        y1="3"
        x2="16"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line
        x1="16"
        y1="25"
        x2="16"
        y2="29"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line
        x1="3"
        y1="16"
        x2="7"
        y2="16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line
        x1="25"
        y1="16"
        x2="29"
        y2="16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

function HealingIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-rose"
    >
      <path
        d="M16 28S4 20 4 12.5C4 8.36 7.36 5 11.5 5C13.54 5 15.47 5.99 16 7.5C16.53 5.99 18.46 5 20.5 5C24.64 5 28 8.36 28 12.5C28 20 16 28 16 28Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 22S9 17 9 13C9 10.79 10.79 9 13 9C14.11 9 15.12 9.53 16 10.5C16.88 9.53 17.89 9 19 9C21.21 9 23 10.79 23 13C23 17 16 22 16 22Z"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  );
}

const featureIcons = [WaveIcon, ChakraIcon, HealingIcon];
const featureKeys = ["stress", "energy", "healing"] as const;

export default function HowItWorks() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.2 });

  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.2 });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 md:py-32 lg:py-40"
    >
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top-right cream accent shape */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-cream opacity-60 blur-3xl" />
        {/* Bottom-left gradient orb */}
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-rose-light/20 blur-3xl" />
        {/* Subtle geometric line */}
        <div className="absolute top-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent via-rose-light/30 to-transparent" />
        {/* Small decorative circle */}
        <div className="absolute top-20 right-1/4 h-3 w-3 rounded-full bg-rose/30 animate-pulse-soft" />
        <div className="absolute bottom-40 left-1/3 h-2 w-2 rounded-full bg-deep-blue/10 animate-float" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 flex justify-center"
        >
          <span className="inline-block rounded-full bg-cream px-5 py-2 text-sm font-medium tracking-wide text-rose-dark">
            {t("howItWorks.badge")}
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mx-auto mb-16 max-w-2xl text-center font-heading text-3xl font-bold leading-tight text-deep-blue md:text-4xl lg:text-5xl"
        >
          {t("howItWorks.title")}
        </motion.h2>

        {/* Split layout: text + image */}
        <div
          ref={contentRef}
          className="mb-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
        >
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Decorative accent bar */}
              <div className="absolute -left-4 top-0 h-full w-1 rounded-full bg-gradient-to-b from-rose via-rose-light to-transparent" />
              <div className="space-y-6 pl-4 lg:pl-6">
                <p className="text-lg leading-relaxed text-deep-blue/80">
                  {t("howItWorks.paragraph1")}
                </p>
                <p className="text-lg leading-relaxed text-deep-blue/70">
                  {t("howItWorks.paragraph2")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Decorative frame behind image */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-cream via-rose-light/20 to-cream" />
              <div className="absolute -inset-1 rounded-xl bg-white" />
              <div className="relative overflow-hidden rounded-xl shadow-lg shadow-deep-blue/10">
                <Image
                  src="https://clayrety.nl/wp-content/uploads/2021/03/img_1568080970759-1-scaled.jpg"
                  alt="Sound bowl session"
                  width={640}
                  height={480}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Subtle gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/5 to-transparent" />
              </div>
              {/* Small floating decorative element near image */}
              <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-cream opacity-80 blur-md" />
            </div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <div ref={cardsRef} className="grid gap-8 md:grid-cols-3">
          {featureKeys.map((key, index) => {
            const Icon = featureIcons[index];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.15 * index,
                  ease: "easeOut",
                }}
              >
                <div className="group relative h-full rounded-2xl border border-rose-light/40 bg-cream/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose/10">
                  {/* Card decorative corner accent */}
                  <div className="absolute right-0 top-0 h-16 w-16 overflow-hidden rounded-tr-2xl">
                    <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-rose/5 transition-all duration-300 group-hover:bg-rose/10" />
                  </div>

                  {/* Icon container */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm shadow-rose/10 transition-shadow duration-300 group-hover:shadow-md group-hover:shadow-rose/15">
                    <Icon />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 font-heading text-xl font-semibold text-deep-blue">
                    {t(`howItWorks.features.${key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="leading-relaxed text-deep-blue/70">
                    {t(`howItWorks.features.${key}.description`)}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-6 h-0.5 w-12 rounded-full bg-rose-light transition-all duration-300 group-hover:w-20 group-hover:bg-rose" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
