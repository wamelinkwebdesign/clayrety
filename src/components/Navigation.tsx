"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";

const navItems = [
  { key: "home", href: "#home" },
  { key: "howItWorks", href: "#how-it-works" },
  { key: "about", href: "#about" },
  { key: "sessions", href: "#sessions" },
  { key: "testimonials", href: "#testimonials" },
  { key: "contact", href: "#contact" },
] as const;

const sectionIds = navItems.map((item) => item.href.slice(1));

export default function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  // Track scroll for glass-morphism effect
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 32);
  });

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (id: string) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(handleIntersect(id), {
          rootMargin: "-40% 0px -55% 0px",
          threshold: 0,
        });
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Switch locale
  const switchLocale = useCallback(
    (newLocale: "nl" | "en") => {
      router.replace(pathname, { locale: newLocale });
    },
    [router, pathname],
  );

  // Smooth scroll to section
  const scrollToSection = useCallback(
    (href: string) => {
      setMobileOpen(false);
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        const offset = 80;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    [],
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 30, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-white/70 backdrop-blur-xl shadow-[0_1px_30px_rgba(30,38,109,0.06)] border-b border-white/40"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10 h-20">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("#home")}
            className="relative z-10 select-none"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-heading text-2xl font-bold tracking-tight text-deep-blue">
              Clayrety
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 h-[2px] bg-rose rounded-full"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <DesktopNavItem
                key={item.key}
                label={t(item.key)}
                href={item.href}
                isActive={activeSection === item.href.slice(1)}
                onClick={() => scrollToSection(item.href)}
              />
            ))}
          </div>

          {/* Desktop Right Section: Language Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <LanguageToggle locale={locale} onSwitch={switchLocale} />

            <motion.button
              onClick={() => scrollToSection("#booking")}
              className="relative overflow-hidden rounded-full bg-rose px-6 py-2.5 text-sm font-semibold text-white shadow-[0_2px_16px_rgba(223,139,163,0.35)] transition-shadow hover:shadow-[0_4px_24px_rgba(223,139,163,0.5)]"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">{t("book")}</span>
              <motion.div
                className="absolute inset-0 bg-rose-dark"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </motion.button>
          </div>

          {/* Mobile: Language Toggle + Hamburger */}
          <div className="flex lg:hidden items-center gap-4">
            <LanguageToggle locale={locale} onSwitch={switchLocale} />
            <HamburgerButton isOpen={mobileOpen} toggle={() => setMobileOpen((v) => !v)} />
          </div>
        </nav>
      </motion.header>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            navItems={navItems}
            t={t}
            activeSection={activeSection}
            onNavigate={scrollToSection}
            onClose={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Desktop Nav Item                                                          */
/* -------------------------------------------------------------------------- */

function DesktopNavItem({
  label,
  href,
  isActive,
  onClick,
}: {
  label: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative px-4 py-2 text-[0.9rem] font-medium text-deep-blue/80 transition-colors hover:text-deep-blue"
    >
      <span className={isActive ? "text-deep-blue" : ""}>{label}</span>

      {/* Hover underline */}
      <span className="absolute bottom-0.5 left-4 right-4 h-[2px] origin-left scale-x-0 rounded-full bg-rose transition-transform duration-300 ease-out group-hover:scale-x-100" />

      {/* Active indicator */}
      {isActive && (
        <motion.span
          layoutId="activeNavIndicator"
          className="absolute bottom-0.5 left-4 right-4 h-[2px] rounded-full bg-rose"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Language Toggle                                                           */
/* -------------------------------------------------------------------------- */

function LanguageToggle({
  locale,
  onSwitch,
}: {
  locale: string;
  onSwitch: (locale: "nl" | "en") => void;
}) {
  const isNl = locale === "nl";

  return (
    <div className="relative flex h-8 w-[4.25rem] items-center rounded-full bg-cream p-[3px] text-xs font-semibold select-none">
      {/* Sliding pill background */}
      <motion.div
        className="absolute top-[3px] h-[calc(100%-6px)] w-[calc(50%-3px)] rounded-full bg-white shadow-sm"
        animate={{ left: isNl ? "3px" : "calc(50%)" }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />

      <button
        onClick={() => onSwitch("nl")}
        className={`relative z-10 flex-1 text-center transition-colors duration-200 ${
          isNl ? "text-deep-blue" : "text-deep-blue/40"
        }`}
      >
        NL
      </button>
      <button
        onClick={() => onSwitch("en")}
        className={`relative z-10 flex-1 text-center transition-colors duration-200 ${
          !isNl ? "text-deep-blue" : "text-deep-blue/40"
        }`}
      >
        EN
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hamburger Button                                                          */
/* -------------------------------------------------------------------------- */

function HamburgerButton({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  return (
    <motion.button
      onClick={toggle}
      className="relative z-50 flex h-10 w-10 items-center justify-center"
      aria-label="Toggle menu"
      whileTap={{ scale: 0.9 }}
    >
      <div className="flex w-6 flex-col items-end gap-[5px]">
        <motion.span
          className="block h-[2px] rounded-full bg-deep-blue origin-right"
          animate={
            isOpen
              ? { rotate: -45, width: 24, y: 0, x: 0 }
              : { rotate: 0, width: 24, y: 0, x: 0 }
          }
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        />
        <motion.span
          className="block h-[2px] rounded-full bg-deep-blue"
          animate={isOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: 18 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
        <motion.span
          className="block h-[2px] rounded-full bg-deep-blue origin-right"
          animate={
            isOpen
              ? { rotate: 45, width: 24, y: 0, x: 0 }
              : { rotate: 0, width: 14, y: 0, x: 0 }
          }
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mobile Menu                                                               */
/* -------------------------------------------------------------------------- */

function MobileMenu({
  navItems,
  t,
  activeSection,
  onNavigate,
  onClose,
}: {
  navItems: readonly { key: string; href: string }[];
  t: (key: string) => string;
  activeSection: string;
  onNavigate: (href: string) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col bg-white/95 backdrop-blur-2xl lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-cream opacity-60 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-rose/10 opacity-80 blur-3xl" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-8">
        {navItems.map((item, i) => {
          const isActive = activeSection === item.href.slice(1);

          return (
            <motion.button
              key={item.key}
              onClick={() => onNavigate(item.href)}
              className="group relative py-3"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{
                duration: 0.45,
                delay: 0.06 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span
                className={`font-heading text-3xl font-semibold tracking-tight transition-colors duration-200 ${
                  isActive ? "text-deep-blue" : "text-deep-blue/50"
                } group-hover:text-deep-blue`}
              >
                {t(item.key)}
              </span>

              {/* Active dot */}
              {isActive && (
                <motion.span
                  layoutId="mobileActiveDot"
                  className="absolute -left-6 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-rose"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}

              {/* Hover line */}
              <span className="absolute -bottom-0 left-0 right-0 h-[1.5px] origin-left scale-x-0 rounded-full bg-rose/60 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </motion.button>
          );
        })}

        {/* Mobile CTA */}
        <motion.button
          onClick={() => onNavigate("#booking")}
          className="mt-8 rounded-full bg-rose px-10 py-3.5 text-base font-semibold text-white shadow-[0_4px_24px_rgba(223,139,163,0.35)]"
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{
            duration: 0.45,
            delay: 0.06 * navItems.length,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          {t("book")}
        </motion.button>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        className="mx-auto mb-10 h-[1px] w-16 rounded-full bg-rose/30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      />
    </motion.div>
  );
}
