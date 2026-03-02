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
  const [preferredDate, setPreferredDate] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [direction, setDirection] = useState<1 | -1>(1);

  const goToStep2 = () => {
    setDirection(1);
    setStep(2);
  };

  const goToStep1 = () => {
    setDirection(-1);
    setStep(1);
  };

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

            {/* Step indicator */}
            {!submitted && (
              <div className="flex items-center justify-center gap-0 mb-10">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose to-rose-dark flex items-center justify-center text-white text-sm font-semibold shadow-md shadow-rose/20">
                    1
                  </div>
                  <span className="mt-2 text-xs font-medium text-deep-blue/70 whitespace-nowrap">
                    {t("booking.step1")}
                  </span>
                </div>
                <div
                  className={`w-20 md:w-32 h-0.5 mb-5 rounded-full transition-colors duration-500 ${
                    step === 2 ? "bg-rose" : "bg-cream-dark/50"
                  }`}
                />
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${
                      step === 2
                        ? "bg-gradient-to-br from-rose to-rose-dark text-white shadow-md shadow-rose/20"
                        : "border-2 border-cream-dark/50 text-deep-blue/30 bg-white"
                    }`}
                  >
                    2
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium whitespace-nowrap transition-colors duration-500 ${
                      step === 2 ? "text-deep-blue/70" : "text-deep-blue/30"
                    }`}
                  >
                    {t("booking.step2")}
                  </span>
                </div>
              </div>
            )}

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
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                      setSelectedSession("");
                      setPreferredDate("");
                    }}
                    className="mt-8 px-6 py-2.5 text-sm text-rose hover:text-rose-dark border border-rose/30 hover:border-rose/60 rounded-full transition-all duration-300"
                  >
                    {t("booking.form.submit")}
                  </motion.button>
                </motion.div>
              ) : step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: direction * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  {/* Session selector label */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-deep-blue/70 ml-1">
                      {t("booking.form.session")}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {sessionKeys.map((key) => {
                        const isSelected = selectedSession === key;
                        return (
                          <motion.button
                            key={key}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedSession(key)}
                            className={`relative px-4 py-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "border-rose bg-rose/5 shadow-sm shadow-rose/10"
                                : "border-cream-dark bg-white hover:border-deep-blue/20"
                            }`}
                          >
                            <span className={`block text-sm font-semibold leading-tight ${
                              isSelected ? "text-rose-dark" : "text-deep-blue"
                            }`}>
                              {t(`sessions.items.${key}.title`)}
                            </span>
                            <span className={`block text-xs mt-1 ${
                              isSelected ? "text-rose/70" : "text-deep-blue/50"
                            }`}>
                              &euro;{t(`sessions.items.${key}.price`)}
                            </span>
                            {isSelected && (
                              <motion.div
                                layoutId="session-check"
                                className="absolute top-2 right-2 w-5 h-5 bg-rose rounded-full flex items-center justify-center"
                              >
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </motion.div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preferred date */}
                  <div className="space-y-2">
                    <label
                      htmlFor="booking-date"
                      className="block text-sm font-medium text-deep-blue/70 ml-1"
                    >
                      {t("booking.form.date")}
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className={inputClasses}
                    />
                  </div>

                  {/* Continue button */}
                  <div className="pt-2">
                    <motion.button
                      type="button"
                      whileHover={selectedSession ? { scale: 1.015 } : {}}
                      whileTap={selectedSession ? { scale: 0.985 } : {}}
                      disabled={!selectedSession}
                      onClick={goToStep2}
                      className={`w-full md:w-auto px-10 py-4 font-medium rounded-xl text-[15px] tracking-wide transition-all duration-300 ${
                        selectedSession
                          ? "bg-gradient-to-r from-rose to-rose-dark text-white shadow-lg shadow-rose/20 hover:shadow-xl hover:shadow-rose/30 cursor-pointer"
                          : "bg-cream-dark/40 text-deep-blue/30 cursor-not-allowed"
                      }`}
                    >
                      {t("booking.next")}
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: direction * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 80 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  {/* Back link */}
                  <button
                    type="button"
                    onClick={goToStep1}
                    className="flex items-center gap-1.5 text-sm text-deep-blue/50 hover:text-rose transition-colors duration-200 mb-6 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    {t("booking.back")}
                  </button>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hidden fields for session and date */}
                    <input type="hidden" name="session" value={selectedSession ? t(`sessions.items.${selectedSession}.title`) : ""} />
                    <input type="hidden" name="date" value={preferredDate} />

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

                    {/* Phone */}
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
                    <div className="pt-2 space-y-4">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-rose to-rose-dark text-white font-medium rounded-xl shadow-lg shadow-rose/20 hover:shadow-xl hover:shadow-rose/30 transition-shadow duration-300 text-[15px] tracking-wide"
                      >
                        {t("booking.form.submit")}
                      </motion.button>

                      {/* WhatsApp option */}
                      <div className="flex items-center justify-start">
                        <a
                          href={`https://wa.me/31645202299?text=${encodeURIComponent(
                            selectedSession
                              ? `Hoi! Ik wil graag een ${t(`sessions.items.${selectedSession}.title`)} boeken${preferredDate ? ` op ${preferredDate}` : ""}.`
                              : "Hoi! Ik wil graag een sessie boeken."
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[15px] font-medium text-[#25D366] hover:text-[#128C7E] transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          {t("booking.form.whatsapp")}
                        </a>
                      </div>
                    </div>
                  </form>
                </motion.div>
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
