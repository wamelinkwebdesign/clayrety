"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Session data: keys & images
// ---------------------------------------------------------------------------

const sessionKeys = [
  "group",
  "private",
  "fullMoon",
  "cacao",
  "massage",
  "drumCircle",
] as const;

const sessionImages: Record<(typeof sessionKeys)[number], string> = {
  group:
    "https://clayrety.nl/wp-content/uploads/2025/10/1000445140-214x300.jpg",
  private:
    "https://clayrety.nl/wp-content/uploads/2021/03/foto2-300x228.jpg",
  fullMoon:
    "https://clayrety.nl/wp-content/uploads/2021/03/full-moon-e1616266089218.png",
  cacao:
    "https://clayrety.nl/wp-content/uploads/2025/10/1000445141-212x300.jpg",
  massage:
    "https://clayrety.nl/wp-content/uploads/2025/01/massage-1.png",
  drumCircle:
    "https://clayrety.nl/wp-content/uploads/2025/01/gong.png",
};

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

type Ease = [number, number, number, number];
const luxuryEase: Ease = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: luxuryEase },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: luxuryEase },
  }),
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Sessions() {
  const t = useTranslations();

  return (
    <section id="sessions" className="relative overflow-hidden bg-white py-24 md:py-32 lg:py-40">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-cream/60 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 rounded-full bg-rose/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ---------------------------------------------------------------- */}
        {/* Header: Badge, Title, Subtitle                                   */}
        {/* ---------------------------------------------------------------- */}
        <div className="mb-16 text-center lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-block rounded-full border border-rose/30 bg-cream/60 px-5 py-2 text-sm font-medium tracking-wide text-rose-dark backdrop-blur-sm"
          >
            {t("sessions.badge")}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.1}
            className="mt-4 font-heading text-3xl font-bold tracking-tight text-deep-blue md:text-4xl lg:text-5xl lg:leading-tight"
          >
            {t("sessions.title")}
          </motion.h2>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mt-5 mb-6 h-0.5 w-16 origin-center rounded-full bg-rose"
          />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.25}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-deep-blue/60"
          >
            {t("sessions.subtitle")}
          </motion.p>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Session Cards Grid                                               */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {sessionKeys.map((key, index) => (
            <motion.div
              key={key}
              variants={cardVariants}
              className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_-4px_rgba(30,38,109,0.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_-8px_rgba(223,139,163,0.22)]${index === 0 ? " sm:col-span-2" : ""}`}
            >
              {/* Rose accent bottom border on hover */}
              <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-rose to-rose-light transition-transform duration-500 group-hover:scale-x-100" />

              {/* Image */}
              <div className={`relative w-full overflow-hidden bg-cream ${key === "group" ? "h-64" : "h-56"}`}>
                <Image
                  src={sessionImages[key]}
                  alt={t(`sessions.items.${key}.title`)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle overlay for text legibility on the image */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/20 via-transparent to-transparent" />

                {/* Category label */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block rounded-full bg-white/90 px-3.5 py-1 text-xs font-semibold tracking-wide text-deep-blue shadow-sm backdrop-blur-sm">
                    {t(`sessions.items.${key}.category`)}
                  </span>
                </div>

                {/* Most Popular badge */}
                {key === "group" && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-block rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide text-white shadow-sm" style={{ backgroundColor: "#C4A265" }}>
                      {t("sessions.popular")}
                    </span>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-6">
                {/* Session title */}
                <h3 className="font-heading text-xl font-bold tracking-tight text-deep-blue">
                  {t(`sessions.items.${key}.title`)}
                </h3>

                {/* Price & Duration row */}
                <div className="mt-3 flex items-baseline gap-4">
                  {/* Price */}
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-rose">
                      &euro;
                    </span>
                    <span className="ml-0.5 font-heading text-3xl font-bold text-deep-blue">
                      {t(`sessions.items.${key}.price`)}
                    </span>
                    <span className="ml-1.5 text-sm text-deep-blue/50">
                      {t("sessions.perPerson")}
                    </span>
                  </div>
                </div>

                {/* Duration & max persons */}
                <div className="mt-3 flex items-center gap-3 text-sm text-deep-blue/55">
                  {/* Clock icon */}
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="h-4 w-4 text-rose/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <span>
                      {t(`sessions.items.${key}.duration`)} {t("sessions.duration")}
                    </span>
                  </div>

                  <span className="text-deep-blue/20">|</span>

                  {/* Persons icon */}
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="h-4 w-4 text-rose/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    <span>
                      {t("sessions.maxPersons", {
                        count: t(`sessions.items.${key}.maxPersons`),
                      })}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4 h-px bg-cream-dark/60" />

                {/* Description */}
                <p className="flex-1 text-sm leading-relaxed text-deep-blue/65">
                  {t(`sessions.items.${key}.description`)}
                </p>

                {/* CTA Button */}
                <motion.a
                  href="#booking"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-300 ${key === "group" ? "bg-gradient-to-r from-rose to-rose-dark" : "bg-deep-blue hover:bg-rose"}`}
                >
                  <span>{t("sessions.bookNow")}</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
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
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* Notice & Cancellation                                            */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-16 max-w-3xl space-y-4"
        >
          {/* Notice */}
          <div className="flex gap-3 rounded-xl border border-rose/20 bg-cream/50 p-5 backdrop-blur-sm">
            <div className="mt-0.5 flex-shrink-0">
              <svg
                className="h-5 w-5 text-rose"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            <p className="text-sm leading-relaxed text-deep-blue/70">
              {t("sessions.notice")}
            </p>
          </div>

          {/* Cancellation */}
          <div className="flex gap-3 rounded-xl border border-deep-blue/10 bg-white p-5">
            <div className="mt-0.5 flex-shrink-0">
              <svg
                className="h-5 w-5 text-deep-blue/40"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
            </div>
            <p className="text-sm leading-relaxed text-deep-blue/60">
              {t("sessions.cancellation")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
