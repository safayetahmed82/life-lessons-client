import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    title: "Keep the lessons life teaches you",
    text: "We forget more than we remember. Write your lessons down while they are still fresh, and keep them for the days you need them most.",
    button: "Start writing",
    link: "/dashboard/add-lesson",
    quote: "I learned more from the project that failed than from the three that went fine.",
    tone: "Realization",
  },
  {
    title: "Learn from lives you have not lived",
    text: "Browse lessons shared by people from every walk of life. Filter by category or emotional tone, and find the wisdom you need today.",
    button: "Browse lessons",
    link: "/public-lessons",
    quote: "Waiting for confidence cost me two years that action would have given back in two months.",
    tone: "Motivational",
  },
  {
    title: "Go deeper with Premium",
    text: "Pay once and read every Premium lesson for life, and share your own paid lessons with the community.",
    button: "See Premium",
    link: "/pricing",
    quote: "The people who helped me most never knew it, because I only ever thanked them in my head.",
    tone: "Gratitude",
  },
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [index]);

  const goPrev = () => setIndex((index - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((index + 1) % slides.length);

  const slide = slides[index];

  return (
    <section className="bg-night">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
        <div className="min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="grid items-center gap-10 lg:grid-cols-2"
            >
              <div>
                <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                  {slide.title}
                </h1>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-indigo-200">
                  {slide.text}
                </p>
                <Link to={slide.link} className="btn mt-8 px-7 py-3 text-base">
                  {slide.button}
                </Link>
              </div>

              <div className="rounded-2xl bg-night-light p-7">
                <p className="font-serif text-6xl leading-none text-gold">&ldquo;</p>
                <p className="mt-2 font-serif text-xl leading-snug text-white">
                  {slide.quote}
                </p>
                <p className="mt-4 text-sm text-indigo-200">{slide.tone}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="rounded-full border border-indigo-300 p-2 text-white hover:bg-night-light"
          >
            <FiChevronLeft />
          </button>

          <div className="flex gap-2">
            {slides.map((item, i) => (
              <button
                key={item.title}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-gold" : "w-2.5 bg-indigo-300"
                }`}
              ></button>
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next slide"
            className="rounded-full border border-indigo-300 p-2 text-white hover:bg-night-light"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;