import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Trophy, Users, Target, Cpu, BookOpen, UserPlus, Calendar, MapPin, Clock, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LineFollowingRobot = () => {
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const googleFormsLink = "https://forms.gle/vEK2PBbLqTMDodmX8";

  const segment = {
    id: 2,
    name: "Line Following Robot",
    badge: "Core Robotics Skill",
    category: "Embedded Systems · Control",
    prizePool: "To be Announced",
    expectedTeams: "40+ teams",
    difficulty: "Beginner – Intermediate",
    image: "https://ik.imagekit.io/mekt2pafz/LineFollowingRobot.png",
    tagline: "Master sensors, control logic and optimization in a classic robotics challenge.",
    shortDescription: "Build a robot that can autonomously follow complex tracks with high speed and accuracy. Perfect for participants stepping into robotics or sharpening control skills.",
    detailedDescription: "In the Line Following Robot challenge, participants design sensor arrays, tune motor drivers and implement control algorithms to track black/white paths and dynamic curves. Tracks may include sharp turns, lane splits and speed sections. This segment demonstrates fundamental automation principles and offers sponsors a strong connection to skill-building and learning-focused robotics.",
    highlights: [
      "Multiple track difficulties: beginner, intermediate and pro lanes.",
      "Focus on sensor tuning, PID control and hardware optimization.",
      "Ideal gateway event for newcomers to robotics."
    ],
    schedule: "To be Announced",
    place: "To be Announced",
    registrationDeadline: "To be Announced"
  };

  return (
    <section className="min-h-screen px-4 py-10 text-white md:py-16 bg-black">
      <div className="mx-auto max-w-7xl">
        <motion.button
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#F5CB7A]/60 bg-black/60 px-4 py-2 text-sm font-semibold text-[#F5CB7A] hover:bg-[#1AB7AA]/20 transition-colors duration-200"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </motion.button>

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="relative rounded-3xl border border-[#D1BA83]/60 
                     bg-gradient-to-br from-[#050506]/95 via-[#0d0902]/95 to-[#1a0f00]/80 
                     shadow-[0_0_70px_rgba(245,203,122,0.28)]"
        >
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5CB7A] to-transparent opacity-80" />

          <div className="px-5 sm:px-8 pt-8 pb-8">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.3 }}
              className="mb-6 flex flex-wrap items-center justify-between gap-3"
            >
              {segment.badge && (
                <div className="inline-flex items-center gap-2 rounded-full bg-black/70 border border-[#D1BA83]/70 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-[#F5CB7A]" />
                  <span className="text-[11px] font-semibold tracking-wide text-[#F5CB7A] uppercase">
                    {segment.badge}
                  </span>
                </div>
              )}

              {segment.category && (
                <div className="rounded-full bg-black/60 border border-[#1AB7AA]/70 px-3 py-1">
                  <span className="text-[11px] font-medium text-[#CCF5EE]">
                    {segment.category}
                  </span>
                </div>
              )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] gap-5 md:gap-7 items-start">
              <motion.div
                initial={{ opacity: 0, x: -10, y: 4 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.1, duration: 0.35 }}
                className="relative rounded-3xl border border-[#D1BA83]/60 
                           bg-gradient-to-br from-[#18100a]/95 via-[#0b0804]/95 to-[#140b02]/95 
                           p-3 shadow-[0_18px_45px_rgba(0,0,0,0.75)]"
              >
                <div className="pointer-events-none absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-[#F5CB7A]/30 via-transparent to-[#1AB7AA]/30 opacity-40 blur-xl" />

                <div className="relative rounded-2xl bg-black/60 border border-[#D1BA83]/70 aspect-[4/3] overflow-hidden flex items-center justify-center">
                  <img
                    src={segment.image}
                    alt={segment.name}
                    className="max-h-full w-auto object-contain"
                  />
                </div>

                <p className="relative mt-3 text-[11px] text-neutral-300/80 leading-snug">
                  Designed visual for <span className="text-[#F5CB7A] font-semibold">{segment.name}</span> —
                  as seen in Robomania 2.0 branding.
                </p>
              </motion.div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14, duration: 0.35 }}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-[#F5CB7A] via-[#1AB7AA] to-[#F5CB7A] bg-clip-text text-transparent">
                      {segment.name}
                    </span>
                  </h1>
                  {segment.tagline && (
                    <p className="mt-3 text-xs sm:text-sm text-neutral-200/85 leading-relaxed">
                      {segment.tagline}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.35 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                >
                  {segment.prizePool && (
                    <div className="rounded-2xl border border-[#F5CB7A]/40 bg-black/45 px-3 py-2.5 flex items-start gap-2">
                      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-xl bg-[#F5CB7A]/10">
                        <Trophy className="h-4 w-4 text-[#F5CB7A]" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[11px] uppercase tracking-wide text-neutral-300/70">
                          Prize Pool
                        </p>
                        <p className="text-sm font-semibold text-[#F5CB7A]">
                          {segment.prizePool}
                        </p>
                      </div>
                    </div>
                  )}

                  {segment.schedule && (
                    <div className="rounded-2xl border border-[#F5CB7A]/40 bg-black/45 px-3 py-2.5 flex items-start gap-2">
                      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-xl bg-[#F5CB7A]/10">
                        <Calendar className="h-4 w-4 text-[#F5CB7A]" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[11px] uppercase tracking-wide text-neutral-300/70">
                          Schedule
                        </p>
                        <p className="text-sm font-semibold text-[#F5CB7A]">
                          {segment.schedule}
                        </p>
                      </div>
                    </div>
                  )}

                  {segment.place && (
                    <div className="rounded-2xl border border-[#1AB7AA]/40 bg-black/45 px-3 py-2.5 flex items-start gap-2">
                      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-xl bg-[#1AB7AA]/10">
                        <MapPin className="h-4 w-4 text-[#1AB7AA]" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[11px] uppercase tracking-wide text-neutral-300/70">
                          Place
                        </p>
                        <p className="text-sm font-semibold text-[#CCF5EE]">
                          {segment.place}
                        </p>
                      </div>
                    </div>
                  )}

                {segment.registrationDeadline && (
                  <div className="rounded-2xl border border-red-500/60 bg-black/45 px-3 py-2.5 flex items-start gap-2">
                    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-xl bg-red-500/10">
                      <Clock className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[11px] uppercase tracking-wide text-neutral-300/70">
                        Registration Deadline
                      </p>
                      <p className="text-sm font-semibold text-red-500">
                        {segment.registrationDeadline}
                      </p>
                    </div>
                  </div>
                )}                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24, duration: 0.35 }}
                  className="mt-6 flex flex-wrap gap-3 sm:gap-4"
                >
                  <button onClick={() => setShowComingSoon(true)} className="flex-1 rounded-xl border border-[#D1BA83]/60 bg-black/50 px-4 py-2.5 text-sm font-semibold text-[#D1BA83] hover:bg-[#D1BA83]/10 transition-colors duration-200 flex items-center justify-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Rule Book
                  </button>
                  <button className="flex-1 rounded-xl bg-gradient-to-r from-[#1AB7AA] to-[#0fa399] px-4 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-[#1AB7AA]/50 transition-all duration-200 flex items-center justify-center gap-2" onClick={() => window.open(googleFormsLink, "_blank")}>
                    <UserPlus className="h-4 w-4" />
                    Register Now
                  </button>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.35 }}
              className="mt-8 space-y-4"
            >
              <p className="text-neutral-100 text-sm sm:text-base leading-relaxed border-l-4 border-[#1AB7AA] pl-4 py-2 bg-white/5 rounded-md">
                {segment.detailedDescription}
              </p>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                {segment.shortDescription}
              </p>

              {segment.highlights && segment.highlights.length > 0 && (
                <div className="mt-6 rounded-2xl border border-[#1AB7AA]/35 bg-black/40 px-4 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Cpu className="h-4 w-4 text-[#1AB7AA]" />
                    <p className="text-xs font-semibold tracking-wide text-[#CCF5EE] uppercase">
                      Key Highlights
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {segment.highlights.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-neutral-200"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#1AB7AA] flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Coming Soon Modal */}
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowComingSoon(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-3xl border border-[#D1BA83]/60 bg-gradient-to-br from-[#050506]/95 via-[#0d0902]/95 to-[#1a0f00]/80 shadow-[0_0_70px_rgba(245,203,122,0.28)] p-8 max-w-md w-full text-center"
            >
              {/* Close button */}
              <button
                onClick={() => setShowComingSoon(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#D1BA83]/10 transition-colors duration-200"
              >
                <X className="h-5 w-5 text-[#D1BA83]" />
              </button>

              {/* Content */}
              <div className="space-y-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl font-bold bg-gradient-to-r from-[#F5CB7A] via-[#1AB7AA] to-[#F5CB7A] bg-clip-text text-transparent"
                >
                  🎉
                </motion.div>

                <h2 className="text-3xl font-bold text-[#F5CB7A]">Coming Soon!</h2>

                <p className="text-neutral-300 text-sm leading-relaxed">
                  The rule book for this segment is being prepared with all the exciting details and guidelines.
                </p>

                <p className="text-neutral-400 text-xs">
                  Check back soon for the complete ruleset and competition guidelines.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowComingSoon(false)}
                  className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#1AB7AA] to-[#0fa399] px-4 py-3 text-sm font-semibold text-white hover:shadow-lg hover:shadow-[#1AB7AA]/50 transition-all duration-200"
                >
                  Got it!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LineFollowingRobot;