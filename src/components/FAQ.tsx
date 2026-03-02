"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function FAQ() {
  const t = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = Array.from({ length: 6 }, (_, i) => ({
    question: t(`faq.items.${i}.question`),
    answer: t(`faq.items.${i}.answer`),
  }));

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative overflow-hidden bg-white py-24 md:py-32 lg:py-40">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-cream opacity-60 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-rose-light/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex justify-center"
        >
          <span className="inline-block rounded-full border border-rose/30 bg-white/60 px-5 py-2 text-sm font-medium tracking-wide text-rose-dark backdrop-blur-sm">
            {t("faq.badge")}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mx-auto mb-16 max-w-2xl text-center font-heading text-3xl font-bold leading-tight text-deep-blue md:text-4xl lg:text-5xl"
        >
          {t("faq.title")}
        </motion.h2>

        {/* Decorative line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-14 flex items-center justify-center gap-2"
        >
          <div className="h-px w-12 bg-rose-light/60" />
          <div className="h-1.5 w-1.5 rounded-full bg-rose" />
          <div className="h-px w-12 bg-rose-light/60" />
        </motion.div>

        {/* Accordion container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-[0_4px_40px_rgba(30,38,109,0.07)]"
        >
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const number = String(index + 1).padStart(2, "0");

            return (
              <div
                key={index}
                className={index < items.length - 1 ? "border-b border-[#f5e0db]" : ""}
              >
                <button
                  onClick={() => toggle(index)}
                  className="group flex w-full items-center gap-5 px-8 py-6 text-left transition-colors duration-200 hover:bg-cream/50"
                  aria-expanded={isOpen}
                >
                  {/* Number */}
                  <span className="flex-shrink-0 font-heading text-sm font-semibold tracking-wider text-gold">
                    {number}
                  </span>

                  {/* Question */}
                  <span className="flex-1 font-heading text-lg font-semibold text-deep-blue">
                    {item.question}
                  </span>

                  {/* Toggle icon */}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-2xl font-light leading-none text-rose"
                  >
                    +
                  </motion.span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
                        opacity: { duration: 0.25, delay: 0.1 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 pl-[4.25rem]">
                        <p className="font-body text-base leading-relaxed text-deep-blue/70">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p className="font-body text-lg text-deep-blue/70">
            {t("faq.callout")}{" "}
            <a
              href="#contact"
              className="font-heading font-semibold text-rose underline decoration-rose/30 underline-offset-4 transition-colors duration-200 hover:text-rose-dark hover:decoration-rose"
            >
              {t("faq.calloutLink")}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
