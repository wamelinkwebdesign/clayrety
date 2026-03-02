"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const sessionKeys = [
  "group",
  "private",
  "fullMoon",
  "cacao",
  "massage",
  "drumCircle",
] as const;

export default function Booking() {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);
  const [selectedSession, setSelectedSession] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const session = formData.get("session") as string;
    const date = formData.get("date") as string;
    const message = formData.get("message") as string;

    const subject = encodeURIComponent(`Booking Request: ${session}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSession: ${session}\nPreferred Date: ${date}\n\nMessage:\n${message}`
    );

    window.open(`mailto:info@clayrety.nl?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  const inputClasses =
    "w-full px-4 py-3.5 bg-cream/60 border border-cream-dark/60 rounded-xl text-deep-blue placeholder:text-deep-blue/40 focus:outline-none focus:border-deep-blue/40 focus:ring-2 focus:ring-deep-blue/10 transition-all duration-300 font-body text-[15px]";

  return (
    <section id="booking" className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-light/40 to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cream/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-light/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cream/20 rounded-full blur-3xl" />
      </div>

      {/* Decorative dots pattern */}
      <div className="absolute top-20 right-12 opacity-[0.04] pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 120 120">
          {Array.from({ length: 36 }).map((_, i) => (
            <circle
              key={i}
              cx={15 + (i % 6) * 20}
              cy={15 + Math.floor(i / 6) * 20}
              r="2"
              fill="#1E266D"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <span className="inline-block px-5 py-2 bg-rose/10 text-rose text-sm font-medium rounded-full mb-5 tracking-wide">
            {t("booking.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-deep-blue mb-4 text-balance">
            {t("booking.title")}
          </h2>
          <p className="text-deep-blue/60 text-lg max-w-xl mx-auto">
            {t("booking.subtitle")}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <div className="relative bg-white rounded-3xl shadow-[0_8px_60px_-12px_rgba(30,38,109,0.08)] border border-cream-dark/30 p-8 md:p-12">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-3xl pointer-events-none">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-rose-light/20 to-cream/30 rounded-full" />
            </div>
            <div className="absolute bottom-0 left-0 w-24 h-24 overflow-hidden rounded-bl-3xl pointer-events-none">
              <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-gradient-to-tr from-cream/40 to-rose-light/10 rounded-full" />
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  {/* Success checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 bg-gradient-to-br from-rose to-rose-light rounded-full flex items-center justify-center mb-6 shadow-lg shadow-rose/20"
                  >
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-deep-blue text-lg font-medium max-w-md leading-relaxed"
                  >
                    {t("booking.form.success")}
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    onClick={() => setSubmitted(false)}
                    className="mt-8 px-6 py-2.5 text-sm text-rose hover:text-rose-dark border border-rose/30 hover:border-rose/60 rounded-full transition-all duration-300"
                  >
                    {t("booking.form.submit")}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Name & Email row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label
                        htmlFor="booking-name"
                        className="block text-sm font-medium text-deep-blue/70 ml-1"
                      >
                        {t("booking.form.name")}
                      </label>
                      <input
                        id="booking-name"
                        name="name"
                        type="text"
                        required
                        className={inputClasses}
                        placeholder={t("booking.form.name")}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="booking-email"
                        className="block text-sm font-medium text-deep-blue/70 ml-1"
                      >
                        {t("booking.form.email")}
                      </label>
                      <input
                        id="booking-email"
                        name="email"
                        type="email"
                        required
                        className={inputClasses}
                        placeholder={t("booking.form.email")}
                      />
                    </div>
                  </div>

                  {/* Phone & Session row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label
                        htmlFor="booking-phone"
                        className="block text-sm font-medium text-deep-blue/70 ml-1"
                      >
                        {t("booking.form.phone")}
                      </label>
                      <input
                        id="booking-phone"
                        name="phone"
                        type="tel"
                        required
                        className={inputClasses}
                        placeholder={t("booking.form.phone")}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="booking-session"
                        className="block text-sm font-medium text-deep-blue/70 ml-1"
                      >
                        {t("booking.form.session")}
                      </label>
                      <select
                        id="booking-session"
                        name="session"
                        required
                        value={selectedSession}
                        onChange={(e) => setSelectedSession(e.target.value)}
                        className={`${inputClasses} appearance-none cursor-pointer ${
                          !selectedSession ? "text-deep-blue/40" : ""
                        }`}
                      >
                        <option value="" disabled>
                          {t("booking.form.selectSession")}
                        </option>
                        {sessionKeys.map((key) => (
                          <option key={key} value={t(`sessions.items.${key}.title`)}>
                            {t(`sessions.items.${key}.title`)} - &euro;
                            {t(`sessions.items.${key}.price`)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label
                      htmlFor="booking-date"
                      className="block text-sm font-medium text-deep-blue/70 ml-1"
                    >
                      {t("booking.form.date")}
                    </label>
                    <input
                      id="booking-date"
                      name="date"
                      type="date"
                      required
                      className={inputClasses}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="booking-message"
                      className="block text-sm font-medium text-deep-blue/70 ml-1"
                    >
                      {t("booking.form.message")}
                    </label>
                    <textarea
                      id="booking-message"
                      name="message"
                      rows={4}
                      className={`${inputClasses} resize-none`}
                      placeholder={t("booking.form.message")}
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-rose to-rose-dark text-white font-medium rounded-xl shadow-lg shadow-rose/20 hover:shadow-xl hover:shadow-rose/30 transition-shadow duration-300 text-[15px] tracking-wide"
                    >
                      {t("booking.form.submit")}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom decorative line */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-light/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-rose-light/50" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-light/40" />
        </div>
      </div>
    </section>
  );
}
