"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Navigation items (mirroring the header)
// ---------------------------------------------------------------------------

const navItems = [
  { key: "home", href: "#home" },
  { key: "howItWorks", href: "#how-it-works" },
  { key: "about", href: "#about" },
  { key: "sessions", href: "#sessions" },
  { key: "testimonials", href: "#testimonials" },
  { key: "contact", href: "#contact" },
] as const;

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

// ---------------------------------------------------------------------------
// Instagram SVG icon
// ---------------------------------------------------------------------------

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Mail SVG icon
// ---------------------------------------------------------------------------

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Phone SVG icon
// ---------------------------------------------------------------------------

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Smooth scroll helper
// ---------------------------------------------------------------------------

function scrollToSection(href: string) {
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

// ---------------------------------------------------------------------------
// Footer Component
// ---------------------------------------------------------------------------

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="relative bg-deep-blue overflow-hidden">
      {/* Top rose accent border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose to-transparent" />

      {/* Subtle background gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-deep-blue-light/10 to-transparent" />

      {/* Main footer content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-8 md:pt-20 md:pb-10">
        <div className="grid gap-12 md:grid-cols-12 lg:gap-16">
          {/* Column 1: Brand & description */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0}
            className="md:col-span-4"
          >
            <button
              onClick={() => scrollToSection("#home")}
              className="group inline-flex items-baseline gap-0 select-none"
            >
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                Clayrety
              </span>
              <span className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-rose transition-transform duration-300 group-hover:scale-125" />
            </button>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              {t("footer.description")}
            </p>

            {/* Social link */}
            <div className="mt-6">
              <a
                href="https://instagram.com/clayrety"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-rose/40 hover:text-rose hover:bg-rose/10"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0.1}
            className="md:col-span-4"
          >
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
              {t("footer.navigation")}
            </h3>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-3">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-sm text-white/60 transition-colors duration-200 hover:text-rose"
                >
                  {t(`nav.${item.key}`)}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Column 3: Contact info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0.2}
            className="md:col-span-4"
          >
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@clayrety.nl"
                  className="group inline-flex items-center gap-3 text-sm text-white/60 transition-colors duration-200 hover:text-rose"
                >
                  <MailIcon className="h-4 w-4 shrink-0 text-rose/60 transition-colors duration-200 group-hover:text-rose" />
                  info@clayrety.nl
                </a>
              </li>
              <li>
                <a
                  href="tel:+31645202299"
                  className="group inline-flex items-center gap-3 text-sm text-white/60 transition-colors duration-200 hover:text-rose"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0 text-rose/60 transition-colors duration-200 group-hover:text-rose" />
                  06 45 20 22 99
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/clayrety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-sm text-white/60 transition-colors duration-200 hover:text-rose"
                >
                  <InstagramIcon className="h-4 w-4 shrink-0 text-rose/60 transition-colors duration-200 group-hover:text-rose" />
                  @clayrety
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-14 h-px w-full origin-left bg-gradient-to-r from-rose/30 via-rose/10 to-transparent md:mt-16"
        />

        {/* Bottom bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          custom={0.4}
          className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between"
        >
          <p className="text-xs text-white/35">
            &copy; 2026 Clayrety. {t("footer.rights")}
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-white/35 transition-colors duration-200 hover:text-rose/70"
            >
              {t("footer.privacy")}
            </a>
            <span className="h-3 w-px bg-white/15" />
            <a
              href="#"
              className="text-xs text-white/35 transition-colors duration-200 hover:text-rose/70"
            >
              {t("footer.terms")}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
