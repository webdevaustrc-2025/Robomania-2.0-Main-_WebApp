import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  BookOpen,
  Calendar,
  MapPin,
  Clock,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const segmentsData = [
  {
    id: 1,
    name: "Soccer Bot Challenge",
    slug: "soccer-bot",
    badge: "Flagship Arena Event",
    category: "Autonomous Robotics · Game AI",
    image: "https://ik.imagekit.io/mekt2pafz/SoccerBot.png",
    schedule: "Day 2, 10:00 AM - 2:00 PM",
    place: "Main Arena, Block A",
    registrationDeadline: "27 December, 2025",
    rulebookLink: "https://tinyurl.com/SoccerBot-Rlbk", // Update this with actual rulebook link
  },
  {
    id: 2,
    name: "Line Following Robot",
    slug: "line-following-robot",
    badge: "Core Robotics Skill",
    category: "Embedded Systems · Control",
    image: "https://ik.imagekit.io/mekt2pafz/LineFollowingRobot.png",
    schedule: "Day 1, 9:00 AM - 12:00 PM",
    place: "Track B, Ground Floor",
    registrationDeadline: "27 December, 2025",
    rulebookLink: "https://tinyurl.com/LFR-Rulebook", // Update this with actual rulebook link
  },
  {
    id: 4,
    name: "Circuit Wizardry",
    slug: "circuit-wizardry",
    badge: "EEE Showdown",
    category: "Electronics · Circuit Design",
    image: "https://ik.imagekit.io/mekt2pafz/CIRCUITWizardy.png",
    schedule: "Day 1, 2:00 PM - 4:30 PM",
    place: "Lab Room 102, Block B",
    registrationDeadline: "27 December,2025",
    rulebookLink: "https://tinyurl.com/Circuit-Wizardry", // Update this with actual rulebook link
  },
  {
    id: 5,
    name: "Cadyssey",
    slug: "cadyssey",
    badge: "Design Studio",
    category: "CAD · Product Design",
    image: "https://ik.imagekit.io/mekt2pafz/Cadyssey.png",
    schedule: "Day 1, 11:00 AM - 3:00 PM",
    place: "Computer Lab, Block C",
    registrationDeadline: "27 December,2025",
    rulebookLink: "https://tinyurl.com/CADyssey", // Update this with actual rulebook link
  },
  {
    id: 6,
    name: "RoboProject Hackathon",
    slug: "roboproject-hackathon",
    badge: "24-Hour Build Sprint",
    category: "Hackathon · Rapid Prototyping",
    image: "https://ik.imagekit.io/mekt2pafz/RoboProjectHackathon(2).png",
    schedule: "Day 3, 6:00 PM - Day 4, 6:00 PM",
    place: "Makerspace, Block D",
    registrationDeadline: "27 December,2025",
    rulebookLink: "https://tinyurl.com/RoboProject-Hackathon", // Update this with actual rulebook link
  },
  {
    id: 8,
    name: "Robo Olympiad",
    slug: "robo-olympiad",
    badge: "Ultimate Robotics Challenge",
    category: "Multi-Event Competition · Team Strategy",
    image:
      "https://ik.imagekit.io/mekt2pafz/Robomania%202.0/robo%20olympiad.png?updatedAt=1765578419230",
    schedule: "Day 3, 9:00 AM - 12:00 PM",
    place: "TT Ground",
    registrationDeadline: "27 December, 2025",
    prizePool: "20,000",
    description:
      "An exciting multi-event robotics competition that challenges teams to excel across diverse robotic disciplines. Teams compete in various categories showcasing skills in automation, precision, and innovation. This ultimate robotics challenge brings together the best robotic talents for an unforgettable experience.",
    rulebookLink: "https://tinyurl.com/Robo-Olympiad", // Update this with actual rulebook link
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const SegmentCard = ({ segment, index, onDetails, onRulebook }) => {
  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      layout
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="
        relative group cursor-pointer overflow-hidden
        rounded-3xl border border-[#D1BA83]/60
        bg-black/30 backdrop-blur-xl
        shadow-[0_18px_45px_rgba(0,0,0,0.75)]
        transition-all duration-300
        hover:shadow-[0_0_40px_rgba(245,203,122,0.35)]
      "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#050506]/75 via-[#120b05]/80 to-[#1a0f00]/70" />

      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[#F5CB7A]/18 via-transparent to-transparent"
        whileHover={{ opacity: 1 }}
      />

      <div className="pointer-events-none absolute -inset-px rounded-3xl border border-[#F5CB7A]/10 group-hover:border-[#F5CB7A]/40 transition-colors duration-300" />

      <div className="relative p-5 sm:p-6 h-full flex flex-col">
        {/* Image section */}
        <motion.div
          className="
            mb-4 w-full h-56 sm:h-64
            rounded-2xl overflow-hidden
            bg-black/40 border border-[#D1BA83]/40
            flex items-center justify-center
            group-hover:border-[#F5CB7A]/70
            transition-colors duration-300
          "
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <motion.img
            src={segment.image}
            alt={segment.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-lg sm:text-xl font-bold mb-2.5 leading-tight"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.15 }}
        >
          <span className="bg-gradient-to-r from-[#F5CB7A] via-[#FFE4A3] to-[#FACC6B] bg-clip-text text-transparent">
            {segment.name}
          </span>
        </motion.h3>

        {/* Category badge */}
        <div className="mb-4 inline-flex w-fit">
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#F5bb46]/20 border border-[#F5bb46]/60 text-[#CCF5EE]">
            {segment.category}
          </span>
        </div>

        {/* Info Cards: Schedule, Place, Registration Deadline */}
        <div className="mb-4 space-y-2.5">
          {/* Schedule */}
          <div className="flex items-start gap-2.5 text-xs sm:text-sm">
            <Calendar className="h-4 w-4 text-[#F5CB7A] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-neutral-400 text-[10px] sm:text-xs uppercase tracking-wide">
                Schedule
              </p>
              <p className="text-neutral-100 font-medium">{segment.schedule}</p>
            </div>
          </div>

          {/* Place */}
          <div className="flex items-start gap-2.5 text-xs sm:text-sm">
            <MapPin className="h-4 w-4 text-[#F5bb46] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-neutral-400 text-[10px] sm:text-xs uppercase tracking-wide">
                Place
              </p>
              <p className="text-neutral-100 font-medium">{segment.place}</p>
            </div>
          </div>

          {/* Registration Deadline */}
          <div className="flex items-start gap-2.5 text-xs sm:text-sm">
            <Clock className="h-4 w-4 text-[#FFE4A3] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-neutral-400 text-[10px] sm:text-xs uppercase tracking-wide">
                Registration Deadline
              </p>
              <p className="text-neutral-100 font-medium">
                {segment.registrationDeadline}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-grow" />

        {/* Buttons: Details & Rulebook */}
        <div className="mt-4 flex gap-2.5">
          {/* Details Button */}
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onDetails(segment)}
            className="
              flex-1 inline-flex items-center justify-center gap-2
              rounded-full px-3 py-2.5
              text-xs sm:text-sm font-semibold
              bg-gradient-to-r from-[#3b2a12] via-[#6b4a1c] to-[#3b2a12]
              text-[#FDF6DF]
              border border-[#F5CB7A]/70
              shadow-[0_8px_25px_rgba(0,0,0,0.7)]
              hover:shadow-[0_0_25px_rgba(245,203,122,0.5)]
              transition-all duration-300
            "
          >
            <span>Details</span>
            <motion.span
              animate={{ x: 0 }}
              whileHover={{ x: 2 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex items-center justify-center h-4 w-4"
            >
              <ChevronDown className="h-3 w- rotate-[-90deg]" />
            </motion.span>
          </motion.button>

          {/* Rulebook Button */}
          <motion.button
            onClick={(e) => onRulebook(segment, e)}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="
                flex-1 inline-flex items-center justify-center gap-2
                rounded-full px-3 py-2.5
                text-xs sm:text-sm font-semibold
                bg-gradient-to-r from-[#31010b] via-[#3f0202] to-[#31010b]
                text-[#e3deca]
                border border-[#F5bb46]/70
                shadow-[0_8px_25px_rgba(0,0,0,0.7)]
                hover:shadow-[0_0_25px_rgba(150,110,80,0.5)]
                transition-all duration-300
              "
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Rule Book</span>
          </motion.button>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        whileHover={{ opacity: 1 }}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-[#F5CB7A]/18 to-transparent" />
      </motion.div>
    </motion.div>
  );
};

const Segments = () => {
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleDetails = (segment) => {
    console.log(`Navigating to: /segment/${segment.slug}`);
    navigate(`/segment/${segment.slug}`);
  };

  const handleRulebook = (segment, e) => {
    e.preventDefault();
    e.stopPropagation();

    const link = segment?.rulebookLink;

    if (!link || link === "#") {
      setShowComingSoon(true);
      return;
    }

    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="px-4 py-10 text-white md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        {/* PAGE HEADER */}
        <header className="rounded-3xl border border-[#D1BA83]/40 bg-gradient-to-br from-[#050506]/70 to-[#1a0f00]/30 backdrop-blur-sm p-8 md:p-10 space-y-6 shadow-[0_0_30px_rgba(245,203,122,0.08)]">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#D1BA83]/70 bg-gradient-to-r from-[#F5CB7A]/10 to-[#F5bb46/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] w-fit">
            <span className="h-[6px] w-[6px] rounded-full bg-[#F5CB7A] animate-pulse" />
            Event Segments
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-[#F5CB7A] via-[#e69f08] to-[#F5CB7A] bg-clip-text text-transparent">
                Segments of the Event
              </span>
            </h1>
            <p className="text-neutral-300 text-base leading-relaxed max-w-3xl">
              Explore our diverse competition segments designed to challenge and
              inspire robotics enthusiasts at every level. Each segment offers a
              unique opportunity to showcase your skills, creativity, and
              problem-solving abilities.
            </p>
          </motion.div>
        </header>

        {/* SEGMENTS GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
        >
          {segmentsData.map((segment, index) => (
            <SegmentCard
              key={segment.id}
              segment={segment}
              index={index}
              onDetails={handleDetails}
              onRulebook={handleRulebook}
              // onShowComingSoon={() => setShowComingSoon(true)}
            />
          ))}
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

                <h2 className="text-3xl font-bold text-[#F5CB7A]">
                  Coming Soon!
                </h2>

                <p className="text-neutral-300 text-sm leading-relaxed">
                  The rule books for all segments are being prepared with all
                  the exciting details and guidelines.
                </p>

                <p className="text-neutral-400 text-xs">
                  Check back soon for the complete rulesets and competition
                  guidelines.
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

export default Segments;
