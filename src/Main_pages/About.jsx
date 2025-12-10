"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Trophy,
  Cpu,
  Rocket,
  Globe2,
  Sparkles,
  Layers,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
// OurGrossReach removed per request

const container = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stats = [
  {
    icon: Users,
    label: "Active Members",
    value: "1000+",
    desc: "Robotics enthusiasts engaged in projects, events and learning.",
  },
  {
    icon: Layers,
    label: "Executives",
    value: "90+",
    desc: "Student leaders driving operations, events and mentorship.",
  },
  {
    icon: Cpu,
    label: "Workshops",
    value: "20+",
    desc: "Hands-on sessions covering design, hardware and AI.",
  },
  {
    icon: Rocket,
    label: "National Events",
    value: "5+",
    desc: "Flagship robotics competitions impacting thousands nationwide.",
  },
];

const achievements = [
  {
    title: "Bot Fight",
    event: "Robomania 1.0 Champion",
    image: "https://ik.imagekit.io/xq2aftghg/Robomania%201.0/223.jpg",
    winners: [
      { label: "Winner", image: "https://ik.imagekit.io/xq2aftghg/Robomania%201.0/bot%20fight%20winners(team).jpg" },
      { label: "2nd Runner-Up", image: "https://ik.imagekit.io/xq2aftghg/Robomania%201.0/boot%20fight%202nd%20runner%20up.jpg" },
    ],
  },
  {
    title: "Soccer Bot",
    event: "Robomania 1.0 Champion",
    image: "https://ik.imagekit.io/xq2aftghg/Robomania%201.0/fd.jpg",
    winners: [
      { label: "1st Runner-Up", image: "https://ik.imagekit.io/xq2aftghg/Robomania%201.0/soccer%20bot%201st%20runner%20up.jpg" },
      { label: "2nd Runner-Up", image: "https://ik.imagekit.io/xq2aftghg/Robomania%201.0/soccer%20bot%202nd%20runner%20up.jpg" },
    ],
  },
  {
    title: "Line Follower",
    event: "Robomania 1.0 Champion",
    image: "https://ik.imagekit.io/xq2aftghg/Robomania%201.0/444.jpg",
    winners: [
      { label: "Winner", image: "https://ik.imagekit.io/xq2aftghg/Robomania%201.0/lfr%20winners(team).jpg" },
      { label: "1st Runner-Up", image: "https://drive.google.com/uc?export=view&id=1U6EaMNK8vx257iZVEbBhkddc8LGxNlCy" },
      { label: "2nd Runner-Up", image: "https://ik.imagekit.io/xq2aftghg/Robomania%201.0/lfr%202nd%20runner%20up.jpg" },
    ],
  },
  {
    title: "Project Showcasing",
    event: "Robomania 1.0 Champion",
    image: "https://ik.imagekit.io/xq2aftghg/Robomania%201.0/22.jpg",
    winners: [
      { label: "Winner", image: "https://ik.imagekit.io/xq2aftghg/Robomania%201.0/project%20show%20case%20winners%20(team).jpg" },
      { label: "2nd Runner-Up", image: "https://ik.imagekit.io/xq2aftghg/Robomania%201.0/project%20show%202nd%20runner%20up.jpg" },
    ],
  },
];

const SegmentModal = ({ segment, onClose }) => {
  const [index, setIndex] = useState(0);

  React.useEffect(() => setIndex(0), [segment]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (!segment) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex((i) => (i === 0 ? segment.winners.length - 1 : i - 1));
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % segment.winners.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [segment, onClose]);

  if (!segment) return null;

  const winners = segment.winners || [];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[9999]"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center p-4 z-[10000]">
        <motion.div
          initial={{ scale: 0.98, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.98, opacity: 0, y: 12 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-gradient-to-br from-black/95 to-zinc-900 border border-amber-500/20 rounded-xl overflow-hidden shadow-2xl p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-3 top-3 bg-amber-500/80 text-black p-1.5 rounded-full z-20"
          >
            <X size={16} />
          </button>

          <h3 className="text-lg font-bold text-amber-100 mb-2">
            {segment.title}
          </h3>
          <p className="text-sm text-amber-200/80 mb-4">{segment.event}</p>

          {winners.length > 0 ? (
            <div className="flex flex-col gap-3">
              <div className="relative w-full flex items-center justify-center">
                <button
                  onClick={() => setIndex((i) => (i === 0 ? winners.length - 1 : i - 1))}
                  className="absolute left-2 z-20 bg-black/40 text-amber-200 p-2 rounded-full hover:bg-black/60"
                >
                  <ChevronLeft size={20} />
                </button>

                <img
                  src={winners[index].image}
                  alt={winners[index].label}
                  className="w-full max-h-[560px] object-contain rounded-md bg-black/30"
                />

                <button
                  onClick={() => setIndex((i) => (i + 1) % winners.length)}
                  className="absolute right-2 z-20 bg-black/40 text-amber-200 p-2 rounded-full hover:bg-black/60"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2 overflow-x-auto">
                {winners.map((w, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`border rounded-md overflow-hidden ${
                      i === index ? "ring-2 ring-amber-400" : ""
                    }`}
                  >
                    <img
                      src={w.image}
                      alt={w.label}
                      className="h-20 w-28 object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="text-center text-amber-200/90 mt-2">
                <div className="font-semibold">{winners[index].label}</div>
              </div>
            </div>
          ) : (
            <div className="text-center text-amber-200/80">
              No winner images available for this segment.
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

const About = () => {
  const [selectedSegment, setSelectedSegment] = useState(null);

  return (
    <div className="space-y-20 pb-20 px-4 md:px-6 lg:px-10 font-noto-kr">
      {/* HERO / ABOUT AUSTRC */}
      <section className="pt-10 md:pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-amber-500/30 bg-black/60 backdrop-blur-2xl p-6 sm:p-10 md:p-12 shadow-[0_0_70px_rgba(0,0,0,0.9)]"
        >
          {/* floating glow blobs */}
          <motion.div
            className="pointer-events-none absolute -top-32 -left-10 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl"
            animate={{ x: [0, 20, 0], y: [0, 10, -5], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-40 -right-10 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center"
          >
            <motion.div variants={item} className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-amber-200">
                <Sparkles className="h-4 w-4 text-amber-300" />
                <span>About AUSTRC</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <span className="bg-linear-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Robotics for Building
                </span>
                <br />
                <span className="bg-linear-to-r from-amber-500 via-amber-300 to-amber-400 bg-clip-text text-transparent">
                  a Safer Future.
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-amber-100/80 leading-relaxed">
                Ahsanullah University of Science and Technology Robotics Club
                (AUSTRC) is one of AUST&apos;s largest and most active student
                organizations, dedicated to{" "}
                <span className="text-amber-200 font-semibold">
                  innovation, creativity and collaboration
                </span>{" "}
                in robotics, automation and artificial intelligence.
              </p>

              <p className="text-sm sm:text-base text-amber-100/75 leading-relaxed">
                With our motto{" "}
                <span className="italic text-amber-200">
                  &quot;Robotics for Building a Safer Future&quot;
                </span>
                , we connect classroom theory with real-life engineering
                problems through projects, competitions, research and
                hands-on learning.
              </p>
            </motion.div>

            <motion.div
              variants={item}
              className="flex-1 mt-4 md:mt-0 grid grid-cols-2 gap-4"
            >
              {stats.map((s, idx) => (
                <motion.div
                  key={s.label}
                  variants={item}
                  whileHover={{
                    y: -4,
                    scale: 1.03,
                  }}
                  className="group rounded-2xl border border-amber-400/30 bg-amber-50/5 p-4 sm:p-5 backdrop-blur-xl text-left shadow-[0_0_35px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-amber-500/15 p-2">
                      <s.icon className="h-5 w-5 text-amber-300" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-amber-200/70">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-extrabold text-amber-100">
                      {s.value}
                    </p>
                    <p className="text-sm font-semibold text-amber-200/90">
                      {s.label}
                    </p>
                    <p className="mt-1 text-xs sm:text-[0.8rem] text-amber-100/70">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="mx-auto max-w-6xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-3xl border border-amber-500/30 bg-linear-to-br from-black/80 via-zinc-950 to-amber-950/40 p-6 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(0,0,0,0.9)]"
        >
          <motion.div
            variants={item}
            className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6 sm:mb-8"
          >
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
                <Trophy className="h-4 w-4 text-amber-300" />
                <span>Champion</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-linear-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                Champion of Robomania 1.0
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-amber-100/80 leading-relaxed">
                Excellence drives innovation—our victory across all four segments reflects the dedication, creativity and teamwork that define AUSTRC.{" "}
                <span className="font-semibold text-amber-200">
                  Every challenge conquered brings us closer to our mission
                </span>{" "}
                of shaping the future of robotics.
              </p>
            </div>

            <motion.div
              variants={item}
              className="mt-2 md:mt-0 rounded-2xl border border-amber-500/40 bg-amber-50/5 px-4 py-3 text-amber-100/80 text-sm sm:text-base"
            >
              <p className="font-semibold text-amber-200">
                4 Segment Victory
              </p>
              <p className="text-xs sm:text-sm">
                Bot Fight · Soccer Bot · Line Follower · Project Showcasing
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {achievements.map((a) => (
              <motion.div
                key={a.title + a.event}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelectedSegment(a)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-amber-400/25 bg-black/60 backdrop-blur-xl"
              >
                <div className="relative h-32 sm:h-36 overflow-hidden">
                  <motion.img
                    src={a.image}
                    alt={a.event}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    initial={{ scale: 1.05 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <div className="pointer-events-none absolute top-2 left-2 rounded-full bg-amber-500/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-black">
                    Highlight
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-300/80">
                    {a.event}
                  </p>
                  <h3 className="mt-2 text-sm sm:text-base font-semibold text-amber-100">
                    {a.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedSegment && (
          <SegmentModal
            segment={selectedSegment}
            onClose={() => setSelectedSegment(null)}
          />
        )}
      </AnimatePresence>

      {/* OurGrossReach section removed */}
    </div>
  );
};

export default About;
