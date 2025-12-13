import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PartnersShowcase  from "./PartnersShowcase.jsx";

import PrevEvents from "./PrevEvents.jsx";

/* -------------------------------------------------------------------------- */
/*                                SEGMENTS DATA                               */
/* -------------------------------------------------------------------------- */

const SEGMENTS_DATA = [
  {
    id: 1,
    title: "Line Following Robot",
    subtitle: "Speed, Precision & Algorithm Mastery",
    description:
      "In the Line Following Robot challenge, participants will build a robot capable of autonomously navigating a path marked with lines. Perfect for those who want to test their engineering and programming skills in a fun and competitive setting.",
    imageUrl: "https://ik.imagekit.io/mekt2pafz/LineFollowingRobot.png",
    
    icon: Zap,
  },
  {
    id: 2,
    title: "Soccer Bot",
    subtitle: "Strategic Gameplay & Autonomous Control",
    description:
      "Join us in the Soccer Bot Challenge, where robotics and soccer meet. Teams will design and program autonomous robots that can kick a ball and score goals. Test your creativity and technical skills while competing to become the ultimate soccer bot champions.",
    imageUrl: "https://ik.imagekit.io/mekt2pafz/SoccerBot.png",
    
    icon: Trophy,
  },
  {
    id: 3,
    title: "Cadyssey",
    subtitle: "3D Modeling & Engineering Design",
    description:
      "In the CAD Design segment, participants will create precise digital models of mechanical or electrical systems using CAD software. Ideal for those who want to sharpen their 3D design skills and gain a deeper understanding of engineering designs in the virtual space.",
    imageUrl: "https://ik.imagekit.io/mekt2pafz/Cadyssey.png",
    
    icon: Zap,
  },
  {
    id: 4,
    title: "Circuit Wizardry",
    subtitle: "Electronics Design & PCB Innovation",
    description:
      "Circuit Wizardry is a challenge designed for those with a passion for electrical engineering. Teams will solve complex circuit problems, testing their knowledge in circuit design, troubleshooting and optimization.",
    imageUrl: "https://ik.imagekit.io/mekt2pafz/CIRCUITWizardy.png",
    
    icon: Trophy,
  },
  {
    id: 5,
    title: "RoboProject Hackathon",
    subtitle: "Code, Innovate & Build Solutions",
    description:
      "The Mini Robotics Hackathon is a fast-paced event where participants will work on building mini robots under tight deadlines. With limited resources and time, this event challenges your problem-solving and quick-thinking abilities.",
    imageUrl: "https://ik.imagekit.io/mekt2pafz/RoboProjectHackathon(2).png",
    
    icon: Zap,
  },
  {
    id: 6,
    title: "Robo Olympiad",
    subtitle: "Project Showcase & Innovation Display",
    description:
      "The Robot Olympiad is a knowledge-based competition that focuses on testing your understanding of robotics, automation, and artificial intelligence. It is an individual event designed to measure your analytical thinking, technical knowledge, and problem-solving ability. If you can apply what you know with confidence, the Robot Olympiad is the perfect place to prove your skills.",
    imageUrl: "https://ik.imagekit.io/mekt2pafz/Robomania%202.0/robo%20olympiad.png?updatedAt=1765578419230",
    
    icon: Trophy,
  },
];

/* -------------------------------------------------------------------------- */
/*                                PARTNERS DATA                               */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                           PROFESSIONAL PARTNERS UI                         */
/* -------------------------------------------------------------------------- */

const PartnersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = PARTNERS_DATA.length - 1;
      if (newIndex >= PARTNERS_DATA.length) newIndex = 0;
      return newIndex;
    });
  };

  const currentPartner = PARTNERS_DATA[currentIndex];

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
      <div className="relative">
        {/* Carousel Container */}
        <div className="relative h-[650px] sm:h-[550px] lg:h-[600px] flex items-center justify-center overflow-hidden">
          {/* Background Glow Effect */}
          <motion.div
            key={currentIndex}
            className="absolute inset-0 opacity-30 blur-3xl"
            style={{
              background: `radial-gradient(circle at center, ${currentPartner.glowColor}, transparent 70%)`,
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Main Card */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 280, damping: 28, mass: 0.8 },
                opacity: { duration: 0.35, ease: "easeInOut" },
                scale: { duration: 0.35, ease: "easeOut" },
                rotateY: { duration: 0.35, ease: "easeOut" },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full max-w-4xl"
              style={{
                perspective: "2000px",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative mx-2 sm:mx-4 lg:mx-0">
                {/* Neon Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl blur-xl"
                  style={{
                    background: `radial-gradient(circle at top, ${currentPartner.glowColor}, transparent 70%)`,
                    opacity: 0.4,
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Animated Border Wrapper */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0%, ${currentPartner.glowColor} 50%, transparent 100%)`,
                    }}
                  />
                  <div className="absolute inset-[3px] bg-slate-950 rounded-3xl" />
                </div>

                {/* Main Card Content */}
                <div
                  className="relative bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl border border-slate-800/50 overflow-hidden"
                  style={{
                    boxShadow: `0 0 30px ${currentPartner.glowColor}, 0 0 60px ${currentPartner.glowColor}, inset 0 0 20px rgba(0,0,0,0.5)`,
                  }}
                >
                  {/* Premium Accents */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-full" />

                  {/* Animated Grid Pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                      backgroundSize: "50px 50px",
                    }}
                    animate={{
                      backgroundPosition: ["0px 0px", "50px 50px"],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <div className="relative p-4 sm:p-6 lg:p-12 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
                    {/* Left Section - Logo & Badge */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-6">
                      {/* Tier Badge */}
                      <motion.div
                        className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-linear-to-r ${currentPartner.color} shadow-2xl`}
                        animate={{
                          boxShadow: [
                            `0 0 20px ${currentPartner.glowColor}`,
                            `0 0 40px ${currentPartner.glowColor}`,
                            `0 0 20px ${currentPartner.glowColor}`,
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Trophy
                          className={`w-4 sm:w-5 h-4 sm:h-5 ${
                            currentPartner.id === 2
                              ? "text-gray-800"
                              : "text-white"
                          }`}
                        />
                        <span
                          className={`text-sm sm:text-base font-bold tracking-wider ${
                            currentPartner.id === 2
                              ? "text-gray-800"
                              : "text-white"
                          }`}
                        >
                          {currentPartner.tier}
                        </span>
                      </motion.div>

                      {/* Partner Logo */}
                      <motion.div
                        className="relative w-[200px] h-[140px] sm:w-[240px] sm:h-[170px] lg:w-[320px] lg:h-[240px]"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background: `radial-gradient(circle, ${currentPartner.glowColor}, transparent 70%)`,
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-2xl" />
                        <img
                          src={currentPartner.imageUrl}
                          alt={currentPartner.tier}
                          className="relative z-10 w-full h-full object-contain filter drop-shadow-2xl"
                        />
                      </motion.div>
                    </div>

                    {/* Right Section - Description */}
                    <div className="flex-1 flex flex-col gap-6">
                      <motion.div
                        className={`h-1 bg-linear-to-r ${currentPartner.color} rounded-full`}
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />

                      <motion.p
                        className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {currentPartner.description}
                      </motion.p>

                      {/* View Details Button */}
                      <motion.button
                        onClick={() => navigate(currentPartner.route)}
                        className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/20 font-semibold text-sm sm:text-base tracking-wide overflow-hidden mt-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        whileHover={{
                          scale: 1.02,
                          borderColor: currentPartner.glowColor,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className={`absolute inset-0 bg-linear-to-r ${currentPartner.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        />

                        <span
                          className={`relative z-10 ${
                            currentPartner.id === 2
                              ? "text-slate-200 group-hover:text-gray-800"
                              : "text-slate-200 group-hover:text-white"
                          } transition-colors duration-300`}
                        >
                          View Details
                        </span>
                        <ArrowRight
                          className={`relative z-10 w-4 h-4 sm:w-5 sm:h-5 ${
                            currentPartner.id === 2
                              ? "text-slate-300 group-hover:text-gray-800"
                              : "text-slate-300 group-hover:text-white"
                          } transition-all duration-300 group-hover:translate-x-1`}
                        />
                      </motion.button>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute left-2 sm:left-4 lg:left-8 z-10 p-3 sm:p-4 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 text-white hover:bg-slate-800/80 transition-colors shadow-2xl"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
          </motion.button>

          <motion.button
            onClick={() => paginate(1)}
            className="absolute right-2 sm:right-4 lg:right-8 z-10 p-3 sm:p-4 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 text-white hover:bg-slate-800/80 transition-colors shadow-2xl"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
          </motion.button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {PARTNERS_DATA.map((partner, index) => (
            <motion.button
              key={partner.id}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8" : "w-2"
              }`}
              style={{
                background:
                  index === currentIndex
                    ? PARTNERS_DATA[index].glowColor.replace("0.4", "1")
                    : "rgba(148, 163, 184, 0.3)",
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               3D SEGMENTS CAROUSEL                         */
/* -------------------------------------------------------------------------- */

const Carousel3D = ({
  items = SEGMENTS_DATA,
  autoPlay = true,
  autoPlayInterval = 4000,
  showArrows = true,
  className = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);
  const [flippedCards, setFlippedCards] = useState(new Set());

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % items.length);
    setFlippedCards(new Set());
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    setFlippedCards(new Set());
  }, [items.length]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, handleNext, isHovered]);

  const handleCardClick = useCallback(
    (index) => {
      if (index === activeIndex) {
        setFlippedCards((prev) => {
          const newSet = new Set(prev);
          if (newSet.has(index)) {
            newSet.delete(index);
          } else {
            newSet.add(index);
          }
          return newSet;
        });
      } else {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
        setFlippedCards(new Set());
      }
    },
    [activeIndex]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Positioning styles
  const getCardStyle = (index) => {
    const diff = index - activeIndex;
    const absIndex = ((diff % items.length) + items.length) % items.length;
    const normalizedDiff =
      absIndex > items.length / 2 ? absIndex - items.length : absIndex;

    const isMobile =
      typeof window !== "undefined" && window.innerWidth < 768;

    const ROTATION_ANGLE = isMobile ? 25 : 35;
    const TRANSLATE_Z_CENTER = 0;
    const TRANSLATE_Z_SIDE = isMobile ? -150 : -200;
    const TRANSLATE_Z_FAR = isMobile ? -250 : -350;
    const SCALE_CENTER = 1;
    const SCALE_SIDE = isMobile ? 0.65 : 0.75;
    const SCALE_FAR = isMobile ? 0.4 : 0.5;
    const OPACITY_CENTER = 1;
    const OPACITY_SIDE = isMobile ? 0.5 : 0.7;
    const OPACITY_FAR = isMobile ? 0.2 : 0.3;
    const X_OFFSET = isMobile ? "55%" : "45%";
    const X_OFFSET_FAR = isMobile ? "100%" : "90%";

    let transform = {};
    let zIndex = 0;
    let opacity = OPACITY_FAR;

    if (normalizedDiff === 0) {
      transform = {
        x: 0,
        scale: SCALE_CENTER,
        rotateY: 0,
        z: TRANSLATE_Z_CENTER,
      };
      zIndex = 50;
      opacity = OPACITY_CENTER;
    } else if (normalizedDiff === 1) {
      transform = {
        x: X_OFFSET,
        scale: SCALE_SIDE,
        rotateY: -ROTATION_ANGLE,
        z: TRANSLATE_Z_SIDE,
      };
      zIndex = 30;
      opacity = OPACITY_SIDE;
    } else if (normalizedDiff === -1) {
      transform = {
        x: `-${X_OFFSET}`,
        scale: SCALE_SIDE,
        rotateY: ROTATION_ANGLE,
        z: TRANSLATE_Z_SIDE,
      };
      zIndex = 30;
      opacity = OPACITY_SIDE;
    } else if (normalizedDiff === 2) {
      transform = {
        x: X_OFFSET_FAR,
        scale: SCALE_FAR,
        rotateY: -ROTATION_ANGLE * 1.5,
        z: TRANSLATE_Z_FAR,
      };
      zIndex = 10;
      opacity = OPACITY_FAR;
    } else if (normalizedDiff === -2) {
      transform = {
        x: `-${X_OFFSET_FAR}`,
        scale: SCALE_FAR,
        rotateY: ROTATION_ANGLE * 1.5,
        z: TRANSLATE_Z_FAR,
      };
      zIndex = 10;
      opacity = OPACITY_FAR;
    } else {
      transform = {
        x: normalizedDiff > 0 ? "120%" : "-120%",
        scale: 0.3,
        rotateY: normalizedDiff > 0 ? -60 : 60,
        z: -500,
      };
      zIndex = 0;
      opacity = 0;
    }

    return { transform, zIndex, opacity };
  };

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Stage */}
      <div
        className="relative mx-auto h-[420px] sm:h-[480px] md:h-[550px] lg:h-[600px]"
        style={{
          perspective:
            typeof window !== "undefined" && window.innerWidth < 768
              ? "1000px"
              : "1400px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((item, index) => {
            const { transform, zIndex, opacity } = getCardStyle(index);
            const isCenter = index === activeIndex;
            const isFlipped = flippedCards.has(index);

            return (
              <motion.div
                key={item.id}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  zIndex,
                }}
                initial={false}
                animate={{
                  x: transform.x,
                  y: "-50%",
                  scale: transform.scale,
                  rotateY: transform.rotateY,
                  z: transform.z,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                  mass: 0.8,
                }}
                onClick={() => handleCardClick(index)}
                whileHover={!isCenter ? { scale: transform.scale * 1.05 } : {}}
              >
                <motion.div
                  className="relative w-[240px] sm:w-[280px] md:w-[340px] lg:w-[380px] h-[360px] sm:h-[400px] md:h-[480px] lg:h-[520px]"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  }}
                >
                  {/* FRONT */}
                  <div
                    className={`
                      absolute inset-0 w-full h-full
                      rounded-2xl overflow-hidden
                      border ${
                        isCenter
                          ? "border-amber-400/50"
                          : "border-amber-500/20"
                      }
                      bg-linear-to-br from-amber-950/40 via-black/60 to-amber-900/40
                      backdrop-blur-md
                    `}
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                      boxShadow: isCenter
                        ? "0 0 40px rgba(251, 191, 36, 0.4), 0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(251, 191, 36, 0.2)"
                        : "0 10px 30px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <div className="relative h-[70%] overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        style={{
                          filter: isCenter
                            ? "brightness(1)"
                            : "brightness(0.7)",
                        }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

                      {isCenter && item.icon && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0.2,
                            type: "spring",
                          }}
                          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30 flex items-center justify-center"
                          style={{
                            boxShadow:
                              "0 0 20px rgba(251, 191, 36, 0.4)",
                          }}
                        >
                          <item.icon className="w-6 h-6 text-amber-400" />
                        </motion.div>
                      )}

                      {isCenter && !isFlipped && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30"
                        >
                          <span className="text-xs text-amber-300 font-medium">
                            Click to flip
                          </span>
                        </motion.div>
                      )}
                    </div>

                    <div className="relative h-[30%] p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col justify-center">
                      <h3
                        className={`
                          font-bold text-center
                          ${
                            isCenter
                              ? "text-lg sm:text-xl md:text-2xl text-amber-300"
                              : "text-base sm:text-lg md:text-xl text-amber-400/70"
                          }
                        `}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`
                          text-xs sm:text-sm text-center mt-1 sm:mt-2 font-medium
                          ${
                            isCenter
                              ? "text-amber-400/90"
                              : "text-amber-500/60"
                          }
                        `}
                      >
                        {item.subtitle}
                      </p>
                    </div>

                    {isCenter && (
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 0%, rgba(251, 191, 36, 0.1), transparent 70%)",
                        }}
                      />
                    )}
                  </div>

                  {/* BACK */}
                  <div
                    className={`
                      absolute inset-0 w-full h-full
                      rounded-2xl overflow-hidden
                      border ${
                        isCenter
                          ? "border-amber-400/50"
                          : "border-amber-500/20"
                      }
                      bg-linear-to-br from-amber-950/60 via-black/80 to-amber-900/60
                      backdrop-blur-md
                      p-4 sm:p-5 md:p-6 lg:p-8
                      flex flex-col justify-between
                    `}
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transformStyle: "preserve-3d",
                      transform: "rotateY(180deg)",
                      boxShadow: isCenter
                        ? "0 0 40px rgba(251, 191, 36, 0.4), 0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(251, 191, 36, 0.2)"
                        : "0 10px 30px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <div className="flex-1 flex flex-col justify-center">
                      {item.icon && (
                        <div className="flex justify-center mb-6">
                          <div
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30 flex items-center justify-center"
                            style={{
                              boxShadow:
                                "0 0 20px rgba(251, 191, 36, 0.4)",
                            }}
                          >
                            <item.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-amber-400" />
                          </div>
                        </div>
                      )}

                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-300 text-center mb-2 sm:mb-3">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm md:text-base text-amber-100/80 text-center leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30"
                    >
                      <span className="text-xs text-amber-300 font-medium">
                        Click to flip back
                      </span>
                    </motion.div>

                    {isCenter && (
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.1), transparent 70%)",
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <motion.button
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-amber-950/80 border border-amber-500/30 backdrop-blur-md flex items-center justify-center text-amber-400 hover:text-amber-300 transition-colors"
            style={{
              boxShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-amber-950/80 border border-amber-500/30 backdrop-blur-md flex items-center justify-center text-amber-400 hover:text-amber-300 transition-colors"
            style={{
              boxShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
            }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </motion.button>
        </>
      )}

      {/* Indicator Dots */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {items.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleCardClick(index)}
            className={`
              h-2 rounded-full transition-all duration-300
              ${
                index === activeIndex
                  ? "w-8 bg-amber-400"
                  : "w-2 bg-amber-600/40 hover:bg-amber-500/60"
              }
            `}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              boxShadow:
                index === activeIndex
                  ? "0 0 10px rgba(251, 191, 36, 0.6)"
                  : "none",
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   HOME PAGE                                */
/* -------------------------------------------------------------------------- */

const Home = () => {
  const navigate = useNavigate();

  // ⏳ Countdown to 3 January 2026
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetDate = new Date("2026-01-03T00:00:00"); // local time

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        clearInterval(timer);
        return;
      }

      const totalSeconds = Math.floor(distance / 1000);
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor(
        (totalSeconds % (60 * 60 * 24)) / (60 * 60)
      );
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* HERO: Robomania 2.0 Card with Blur + Timer */}
      <section className="px-4 py-10 md:py-20 font-noto-kr">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-center justify-center">
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative z-0 text-center rounded-3xl border border-amber-400/30 bg-black/40 backdrop-blur-2xl px-6 sm:px-10 py-8 sm:py-10 shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* small top badge */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-medium mb-5"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>AUST Robotics Club · Intra AUST Robotics Competition</span>
              </motion.div>

              {/* Accessible heading (hidden visually) */}
              <motion.h1
                className="sr-only"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                Robomania 2.0
              </motion.h1>

              {/* 🔥 Hero image instead of text Robomania 2.0 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="relative flex justify-center"
              >
                <img
                  src="https://ik.imagekit.io/mekt2pafz/Robomania%202.0/Robomania%20LOGO.png"
                  // You can also use your uploaded file path after placing it in public, e.g.:
                  // src="/25ba0237-80d5-4848-a8d2-54a54e57fd1f.png"
                  alt="Robomania 2.0 – Intra AUST Robotics Competition"
                  className="w-full max-w-[720px] h-auto object-contain drop-shadow-[0_0_35px_rgba(251,191,36,0.75)]"
                />

                {/* soft glow under image */}
                <div
                  className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 w-[75%] h-1 rounded-full bg-linear-to-r from-transparent via-amber-400/70 to-transparent"
                  style={{
                    boxShadow: "0 0 25px rgba(251,191,36,0.8)",
                  }}
                />
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.1 }}
                className="relative z-10 mt-6 max-w-2xl mx-auto text-center text-base sm:text-lg md:text-xl font-medium text-amber-100/90"
                style={{
                  textShadow:
                    "0 0 20px rgba(251, 191, 36, 0.3), 0 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                Join us for a week of{" "}
                <span className="text-amber-300 font-semibold">
                  robots, rivalry
                </span>{" "}
                and{" "}
                <span className="text-amber-300 font-semibold">
                  real innovation
                </span>{" "}
                at AUST. Build with your team, compete in multiple segments, and
                be part of Robomania 2.0.
              </motion.p>

              {/* ⏳ Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="relative z-10 mt-8 flex flex-col items-center gap-4"
              >
                <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-200/80">
                  Event starts in · 3 January 2026
                </span>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Minutes", value: timeLeft.minutes },
                    { label: "Seconds", value: timeLeft.seconds },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center justify-center w-20 sm:w-24 rounded-2xl border border-amber-400/35 bg-amber-50/5 backdrop-blur-xl px-3 py-2"
                    >
                      <span className="text-2xl sm:text-3xl font-extrabold tabular-nums text-amber-100">
                        {item.value}
                      </span>
                      <span className="mt-1 text-[0.65rem] sm:text-xs uppercase tracking-wide text-amber-200/80">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick stats + CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="mt-8 flex flex-col gap-5 items-center"
              >
                <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-amber-100/80">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/40">
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>6 Competition Segments</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/40">
                    <Trophy className="w-4 h-4 text-amber-300" />
                    <span>40+ Teams</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/40">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Powered by AUSTRC</span>
                  </div>
                </div>
              </motion.div>

              {/* Glowing border behind content */}
              <motion.div
                className="pointer-events-none absolute inset-0 -z-10 rounded-3xl border-2 border-amber-400/20"
                animate={{
                  borderColor: [
                    "rgba(251, 191, 36, 0.1)",
                    "rgba(251, 191, 36, 0.35)",
                    "rgba(251, 191, 36, 0.1)",
                  ],
                  boxShadow: [
                    "0 0 20px rgba(251, 191, 36, 0.2)",
                    "0 0 40px rgba(251, 191, 36, 0.5)",
                    "0 0 20px rgba(251, 191, 36, 0.2)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

<section className="px-4 py-10 md:py-16">
  <div className="mx-auto max-w-7xl">
    <div
      className="relative rounded-2xl md:rounded-3xl border border-amber-500/20 bg-linear-to-br from-amber-950/20 via-black/40 to-amber-900/20 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden"
      style={{
        boxShadow:
          "0 0 40px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(251, 191, 36, 0.1)",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 via-transparent to-amber-600/5 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16 relative z-10"
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-linear-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent"
          style={{
            textShadow: "0 0 40px rgba(251, 191, 36, 0.3)",
            filter: "drop-shadow(0 4px 8px rgba(251, 191, 36, 0.3))",
          }}
        >
          Competition Segments
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-amber-100/70 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-2"
        >
          Explore diverse tracks crafted to challenge your hardware,
          software and design skills.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10"
      >
        <Carousel3D
          items={SEGMENTS_DATA}
          autoPlay={true}
          autoPlayInterval={4000}
          showArrows={true}
        />
      </motion.div>

      {/* Gold CTA button under carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 mt-8 md:mt-10 flex justify-center"
      >
        {/* use Link if you're on react-router, or <a href="/segments"> */}
        <a href="/segments">
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="
              inline-flex items-center gap-2
              rounded-full px-6 py-3
              text-sm md:text-base font-semibold
              bg-gradient-to-r from-[#F5CB7A] via-[#FFE4A3] to-[#FACC6B]
              text-black
              border border-amber-400/70
              shadow-[0_10px_30px_rgba(0,0,0,0.7)]
              hover:shadow-[0_0_30px_rgba(251,191,36,0.6)]
              transition-all duration-300
            "
          >
            Explore the Segments
          </motion.button>
        </a>
      </motion.div>
    </div>
  </div>
</section>


      {/* Sponsors Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div
              className="relative rounded-2xl md:rounded-3xl border border-amber-500/20 bg-linear-to-br from-amber-950/20 via-black/40 to-amber-900/20 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden"
              style={{
                boxShadow:
                  "0 0 40px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(251, 191, 36, 0.1)",
              }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 via-transparent to-amber-600/5 pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center relative z-10 space-y-8 md:space-y-12"
              >
                <motion.h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 bg-linear-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent"
                  style={{
                    textShadow: "0 0 40px rgba(251, 191, 36, 0.3)",
                    filter: "drop-shadow(0 4px 8px rgba(251, 191, 36, 0.3))",
                  }}
                >
                  Meet Our Valued Sponsors
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col items-center gap-6"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl md:text-7xl lg:text-8xl"
                  >
                    🎯
                  </motion.div>

                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-amber-300">
                      Coming Soon!
                    </h3>
                    <p className="text-amber-100/80 text-base md:text-lg max-w-2xl mx-auto px-2">
                      Our valued sponsors will be announced very soon. Stay tuned for exciting partnerships and collaborations that make Robomania 2.0 possible!
                    </p>
                  </div>

                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-400/40"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-sm text-amber-300">Updates coming soon</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <div className="mx-auto max-w-6xl  gap-10 rounded-3xl border border-[#554110] p-6 backdrop-blur-md md:flex-row md:p-10">
        <PrevEvents />
      </div>
      
    </div>
  );
};


export default Home;
