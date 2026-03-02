"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";

export default function About() {
  const t = useTranslations();

  return (
    <section id="about" className="relative overflow-hidden bg-cream py-24 md:py-32 lg:py-40">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Soft radial glow behind portrait area */}
        <div className="absolute top-1/4 left-0 h-[500px] w-[500px] -translate-x-1/4 rounded-full bg-rose-light/20 blur-[120px]" />
        <div className="absolute right-0 bottom-1/3 h-[400px] w-[400px] translate-x-1/4 rounded-full bg-rose/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center lg:mb-20"
        >
          <span className="inline-block rounded-full border border-rose/30 bg-white/60 px-5 py-2 text-sm font-medium tracking-wide text-rose-dark backdrop-blur-sm">
            {t("about.badge")}
          </span>
        </motion.div>

        {/* Main grid: asymmetric layout */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-24">
          {/* Image column - 5 of 12 cols (~40%) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative lg:col-span-5"
          >
            {/* Decorative quote mark - positioned above image */}
            <div className="absolute -top-8 -left-2 z-10 select-none font-heading text-[120px] leading-none text-rose/15 md:-top-10 md:-left-6 md:text-[160px]">
              &ldquo;
            </div>

            {/* Image frame with rose accent */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Rose accent border element - offset behind image */}
              <div className="absolute -right-3 -bottom-3 h-full w-full rounded-2xl bg-rose/20 md:-right-4 md:-bottom-4 md:rounded-3xl" />
              <div className="absolute -right-1.5 -bottom-1.5 h-full w-full rounded-2xl border-2 border-rose/40 md:-right-2 md:-bottom-2 md:rounded-3xl" />

              {/* Main image container */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-rose/10 md:rounded-3xl">
                <Image
                  src="https://clayrety.nl/wp-content/uploads/2021/03/img_1615195935035-scaled.jpg"
                  alt="Clayret"
                  width={600}
                  height={750}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
                />

                {/* Subtle warm overlay at bottom for depth */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-deep-blue/10 to-transparent" />
              </div>
            </div>

            {/* Location indicator - floated beneath image */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 flex items-center justify-center gap-2 lg:justify-start"
            >
              <MapPinIcon className="h-4 w-4 text-rose" />
              <span className="text-sm tracking-wide text-deep-blue/60">
                {t("about.location")}
              </span>
            </motion.div>
          </motion.div>

          {/* Text column - 7 of 12 cols (~60%) */}
          <div className="lg:col-span-7">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 font-heading text-3xl font-bold tracking-tight text-deep-blue md:text-4xl lg:text-5xl lg:leading-tight"
            >
              {t("about.title")}
            </motion.h2>

            {/* Decorative line accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mb-10 h-0.5 w-16 origin-left rounded-full bg-rose"
            />

            {/* Paragraphs */}
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg leading-relaxed text-deep-blue/75 md:text-xl md:leading-relaxed"
              >
                {t("about.paragraph1")}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-lg leading-relaxed text-deep-blue/75 md:text-xl md:leading-relaxed"
              >
                {t("about.paragraph2")}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg leading-relaxed text-deep-blue/75 md:text-xl md:leading-relaxed"
              >
                {t("about.paragraph3")}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="text-lg italic leading-relaxed text-deep-blue/65 md:text-xl md:leading-relaxed"
              >
                {t("about.paragraph4")}
              </motion.p>
            </div>

            {/* Decorative closing quote accent */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-rose/40 to-transparent" />
              <span className="select-none font-heading text-4xl leading-none text-rose/25">
                &rdquo;
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
