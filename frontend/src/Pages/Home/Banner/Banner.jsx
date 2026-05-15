

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";

// ── Images — swap for your actual paths ─────────────────────────────────────
import img1 from "/home/01.jpg";
import img2 from "/home/02.jpg";
import img3 from "/home/03.png";
import img4 from "/home/04.jpg";
import img5 from "/home/05.png";
import img6 from "/home/06.png";
// ────────────────────────────────────────────────────────────────────────────

const SLIDES = [
  { src: img1, label: "Editorial 01", heading: "The Art of", accent: "Silence",  sub: "A study in form and restraint"   },
  { src: img2, label: "Editorial 02", heading: "Beyond the", accent: "Horizon",  sub: "Where light meets infinite sky"  },
  { src: img3, label: "Editorial 03", heading: "Crafted in", accent: "Shadow",   sub: "Precision born from darkness"    },
  { src: img4, label: "Editorial 04", heading: "Modern",     accent: "Reverie",  sub: "Dreams distilled into design"    },
  { src: img5, label: "Editorial 05", heading: "Pure",       accent: "Instinct", sub: "Raw beauty, refined purpose"     },
  { src: img6, label: "Editorial 06", heading: "Eternal",    accent: "Bloom",    sub: "Nature's geometry, reimagined"   },
];

// ── ReactBits-style Framer Motion variants ───────────────────────────────────
const textVariant = {
  hidden:  { opacity: 0, y: 26, filter: "blur(4px)" },
  visible: (d = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: d },
  }),
  exit: { opacity: 0, y: -14, filter: "blur(3px)", transition: { duration: 0.3 } },
};

const lineVariant = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 } },
  exit:    { scaleX: 0, originX: 1, transition: { duration: 0.25 } },
};

const imageVariant = {
  hidden:  { scale: 1.07, opacity: 0 },
  visible: { scale: 1,    opacity: 1, transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { scale: 0.97, opacity: 0, transition: { duration: 0.45 } },
};

// ── SlideContent — animated editorial copy ───────────────────────────────────
function SlideContent({ slide, index, total }) {
  return (
    <AnimatePresence mode="wait">
      <div key={slide.label} className="absolute inset-0 z-20 flex flex-col justify-end pointer-events-none">

        <div className="px-8 pb-16 md:px-14 md:pb-16 max-w-2xl">

          {/* Label */}
          <motion.p
            custom={0} variants={textVariant} initial="hidden" animate="visible" exit="exit"
            className="text-[10px] tracking-[0.35em] uppercase text-white/40 mb-4 font-['DM_Sans'] font-light"
          >
            {slide.label}
          </motion.p>

          {/* Heading */}
          <motion.h2
            custom={0.1} variants={textVariant} initial="hidden" animate="visible" exit="exit"
            className="font-['Playfair_Display'] font-normal text-white leading-[1.05] text-5xl md:text-7xl"
          >
            {slide.heading}{" "}
            <em className="italic text-amber-200/85">{slide.accent}</em>
          </motion.h2>

          {/* Divider — ReactBits scaleX reveal */}
          <motion.div
            variants={lineVariant} initial="hidden" animate="visible" exit="exit"
            className="h-px bg-white/20 w-24 my-5"
          />

          {/* Sub-copy */}
          <motion.p
            custom={0.25} variants={textVariant} initial="hidden" animate="visible" exit="exit"
            className="text-xs font-['DM_Sans'] font-light tracking-[0.2em] text-white/45 uppercase"
          >
            {slide.sub}
          </motion.p>

          {/* CTA */}
          <motion.button
            custom={0.38} variants={textVariant} initial="hidden" animate="visible" exit="exit"
            whileHover={{ x: 5 }} whileTap={{ scale: 0.97 }}
            className="pointer-events-auto mt-8 inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-['DM_Sans'] font-light text-white/75 border-b border-white/25 pb-1 hover:text-white hover:border-white/55 transition-colors duration-300"
          >
            Explore Collection
            <svg className="w-3 h-3 stroke-current fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Bottom-right slide counter */}
        <motion.div
          custom={0.08} variants={textVariant} initial="hidden" animate="visible" exit="exit"
          className="absolute bottom-8 right-10 text-right hidden md:block select-none"
        >
          <span className="font-['Playfair_Display'] text-[4.5rem] leading-none font-normal text-white/[0.07]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-[9px] tracking-[0.3em] uppercase text-white/20 font-['DM_Sans'] mt-0.5">
            of {String(total).padStart(2, "0")}
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ── NavBtn ───────────────────────────────────────────────────────────────────
function NavBtn({ onClick, dir }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.10)" }}
      whileTap={{ scale: 0.93 }}
      className={`absolute top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full flex items-center justify-center border border-white/15 bg-white/[0.06] backdrop-blur-sm text-white/65 hover:text-white hover:border-white/30 transition-colors duration-300 ${dir === "prev" ? "left-5 md:left-8" : "right-5 md:right-8"}`}
      aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
    >
      <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        {dir === "prev"
          ? <path d="M19 12H5M12 19l-7-7 7-7" />
          : <path d="M5 12h14M12 5l7 7-7 7" />}
      </svg>
    </motion.button>
  );
}

// ── Dot indicators ────────────────────────────────────────────────────────────
function Dots({ total, active, onSelect }) {
  return (
    <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-[7px]">
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onSelect(i)}
          animate={{ width: i === active ? 28 : 6, opacity: i === active ? 1 : 0.28 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="h-[5px] rounded-full bg-white cursor-pointer outline-none"
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ index, total }) {
  return (
    <div className="absolute top-0 left-0 right-0 h-px bg-white/10 z-30">
      <motion.div
        className="h-full bg-amber-200/55"
        animate={{ width: `${((index + 1) / total) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

// ── Thumbnail strip ───────────────────────────────────────────────────────────
function Thumbs({ slides, active, onSelect }) {
  return (
    <div className="absolute top-6 right-8 z-30 hidden lg:flex gap-2">
      {slides.map((s, i) => (
        <motion.button
          key={i}
          onClick={() => onSelect(i)}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.94 }}
          animate={{
            opacity: i === active ? 1 : 0.32,
            boxShadow: i === active ? "0 0 0 1.5px rgba(255,255,255,0.55)" : "0 0 0 1.5px transparent",
          }}
          transition={{ duration: 0.3 }}
          className="w-12 h-8 rounded-sm overflow-hidden"
          aria-label={`Slide ${i + 1}`}
        >
          <img src={s.src} alt="" className="w-full h-full object-cover" draggable={false} />
        </motion.button>
      ))}
    </div>
  );
}

// ── Banner (main) ─────────────────────────────────────────────────────────────
export default function Banner() {
  const autoplay = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 36 },
    [autoplay.current]
  );

  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps]       = useState([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo   = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <section
      className="relative w-full overflow-hidden bg-neutral-950"
      style={{ height: "clamp(440px, 74vh, 860px)" }}
      aria-label="Image banner"
    >
      {/* Embla viewport */}
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {SLIDES.map((slide, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-full overflow-hidden">

              {/* Active slide: animated entrance */}
              <AnimatePresence>
                {i === selected && (
                  <motion.img
                    key={`active-${i}`}
                    src={slide.src}
                    alt={`Slide ${i + 1}`}
                    variants={imageVariant}
                    initial="hidden" animate="visible" exit="exit"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    draggable={false}
                  />
                )}
              </AnimatePresence>

              {/* Non-active: static (Embla needs the slide in DOM) */}
              {i !== selected && (
                <img
                  src={slide.src}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  draggable={false}
                />
              )}

              {/* Cinematic dual gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent pointer-events-none" />

              {/* Grain overlay */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-[0.035]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />

              {/* Copy — rendered only on active slide */}
              {i === selected && (
                <SlideContent slide={slide} index={selected} total={SLIDES.length} />
              )}
            </div>
          ))}
        </div>
      </div>


      <ProgressBar index={selected} total={SLIDES.length} />
      <Thumbs slides={SLIDES} active={selected} onSelect={scrollTo} />
      <NavBtn onClick={scrollPrev} dir="prev" />
      <NavBtn onClick={scrollNext} dir="next" />
      <Dots total={snaps.length} active={selected} onSelect={scrollTo} />
    </section>
  );
}