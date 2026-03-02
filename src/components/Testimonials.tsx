"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

const avatarUrls = [
  "https://clayrety.nl/wp-content/uploads/2021/11/Jeantine-Mark-e1635800715964.jpg",
  "https://clayrety.nl/wp-content/uploads/2021/11/Margarita-e1635800801408.jpg",
  "https://clayrety.nl/wp-content/uploads/2022/06/Linda.jpg",
  "https://clayrety.nl/wp-content/uploads/2022/06/Yael.jpg",
  "https://clayrety.nl/wp-content/uploads/2022/06/Sema.jpg",
  "https://clayrety.nl/wp-content/uploads/2021/11/Sabien-e1635800748939.jpg",
  "https://clayrety.nl/wp-content/uploads/2023/02/IMG-20230207-WA0002-002-e1677014463773.jpg",
  "https://clayrety.nl/wp-content/uploads/2022/06/Yana-scaled.jpg",
];

function StarRating() {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  item,
  avatarUrl,
  index,
}: {
  item: { name: string; quote: string; highlight: string };
  avatarUrl: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group flex-shrink-0 w-[340px] snap-center"
    >
      <div className="relative h-full rounded-2xl bg-white p-7 shadow-[0_2px_20px_rgba(30,38,109,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(223,139,163,0.15)] border border-cream-dark/50">
        {/* Rose accent bar */}
        <div className="absolute top-0 left-8 right-8 h-[3px] rounded-b-full bg-gradient-to-r from-rose-light via-rose to-rose-light opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Decorative quotation mark */}
        <div className="mb-3">
          <svg
            className="h-10 w-10 text-rose-light"
            fill="currentColor"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
          </svg>
        </div>

        {/* Stars */}
        <StarRating />

        {/* Highlight */}
        <h3 className="mt-3 font-heading text-lg font-bold text-deep-blue leading-snug">
          {item.highlight}
        </h3>

        {/* Quote */}
        <p className="mt-3 text-[15px] leading-relaxed text-deep-blue/70 font-body">
          &ldquo;{item.quote}&rdquo;
        </p>

        {/* Divider */}
        <div className="mt-5 mb-4 h-px bg-gradient-to-r from-transparent via-rose-light/50 to-transparent" />

        {/* Avatar and name */}
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-rose-light/30">
            <Image
              src={avatarUrl}
              alt={item.name}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <span className="font-heading text-sm font-semibold text-deep-blue">
            {item.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const items = Array.from({ length: 8 }, (_, i) => ({
    name: t(`testimonials.items.${i}.name`),
    quote: t(`testimonials.items.${i}.quote`),
    highlight: t(`testimonials.items.${i}.highlight`),
  }));

  const totalCards = items.length;

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const cardWidth = 340 + 24; // card width + gap
      const containerWidth = container.clientWidth;
      const scrollTarget =
        index * cardWidth - containerWidth / 2 + cardWidth / 2;
      container.scrollTo({ left: scrollTarget, behavior: "smooth" });
      setActiveIndex(index);
    },
    []
  );

  // Auto-scroll
  useEffect(() => {
    if (isHovered || isDragging) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % totalCards;
        scrollToIndex(next);
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovered, isDragging, totalCards, scrollToIndex]);

  // Update active dot on manual scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = 340 + 24;
      const containerWidth = container.clientWidth;
      const scrollCenter = container.scrollLeft + containerWidth / 2;
      const index = Math.round(
        (scrollCenter - cardWidth / 2) / cardWidth
      );
      setActiveIndex(Math.max(0, Math.min(index, totalCards - 1)));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [totalCards]);

  const handlePrev = () => {
    const prev = activeIndex === 0 ? totalCards - 1 : activeIndex - 1;
    scrollToIndex(prev);
  };

  const handleNext = () => {
    const next = (activeIndex + 1) % totalCards;
    scrollToIndex(next);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream py-20 sm:py-28"
    >
      {/* Subtle decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-rose-light/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-rose/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={
            sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          {/* Badge */}
          <span className="inline-block rounded-full bg-rose-light/20 px-5 py-1.5 text-sm font-semibold text-rose-dark tracking-wide font-heading">
            {t("testimonials.badge")}
          </span>

          {/* Title */}
          <h2 className="mt-5 font-heading text-3xl font-bold text-deep-blue sm:text-4xl lg:text-5xl text-balance">
            {t("testimonials.title")}
          </h2>

          {/* Decorative line */}
          <div className="mx-auto mt-5 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-rose-light/60" />
            <div className="h-1.5 w-1.5 rounded-full bg-rose" />
            <div className="h-px w-12 bg-rose-light/60" />
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-2 hidden lg:flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-md text-deep-blue transition-all duration-200 hover:bg-white hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-2 hidden lg:flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-md text-deep-blue transition-all duration-200 hover:bg-white hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Scroll container */}
          <div
            ref={scrollRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-4 lg:px-12 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {items.map((item, index) => (
              <TestimonialCard
                key={index}
                item={item}
                avatarUrl={avatarUrls[index]}
                index={index}
              />
            ))}
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-cream to-transparent lg:w-12" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-cream to-transparent lg:w-12" />
        </div>

        {/* Navigation dots */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={
            sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
          }
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-2"
        >
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === index
                  ? "h-2.5 w-7 bg-rose"
                  : "h-2.5 w-2.5 bg-rose-light/40 hover:bg-rose-light"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
