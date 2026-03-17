/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, Award, Trophy, Crown } from "lucide-react";
/* eslint-enable no-unused-vars */

const categories = [
  {
    name: "Segment Winners",
    icon: Trophy,
    color: "from-red-500 to-orange-500",
    glowColor: "#ef4444",
    description: "Celebrating the champions of individual segments",
    images: [
      "https://ik.imagekit.io/mekt2pafz/Segment%20winners/17.jpg?updatedAt=1773684677709",
      "https://ik.imagekit.io/mekt2pafz/Segment%20winners/12.jpg?updatedAt=1773684677636",
      "https://ik.imagekit.io/mekt2pafz/Segment%20winners/10.jpg?updatedAt=1773684677549",
      "https://ik.imagekit.io/mekt2pafz/Segment%20winners/13.jpg?updatedAt=1773684677547",
      "https://ik.imagekit.io/mekt2pafz/Segment%20winners/9.jpg?updatedAt=1773684677522",
      "https://ik.imagekit.io/mekt2pafz/Segment%20winners/20.jpg?updatedAt=1773684677440",
      "https://ik.imagekit.io/mekt2pafz/Segment%20winners/11.jpg?updatedAt=1773684677337",
      "https://ik.imagekit.io/mekt2pafz/Segment%20winners/19.jpg?updatedAt=1773684677194",
      "https://ik.imagekit.io/mekt2pafz/Segment%20winners/8.jpg?updatedAt=1773684676815",
      "https://ik.imagekit.io/mekt2pafz/Segment%20winners/18.jpg?updatedAt=1773684676851",
      "https://ik.imagekit.io/mekt2pafz/Segment%20winners/31.jpg?updatedAt=1773684676628",
      "https://ik.imagekit.io/mekt2pafz/Segment%20winners/15.jpg?updatedAt=1773684676283"
    ]
  },
  {
    name: "Team Leads",
    icon: Award,
    color: "from-blue-500 to-cyan-500",
    glowColor: "#3b82f6",
    description: "Honoring the remarkable leaders of our teams",
    images: [
      "https://ik.imagekit.io/mekt2pafz/Team%20Leads/34.jpg?updatedAt=1773685019903",
      "https://ik.imagekit.io/mekt2pafz/Team%20Leads/32.jpg?updatedAt=1773685019807",
      "https://ik.imagekit.io/mekt2pafz/Team%20Leads/36.jpg?updatedAt=1773685019953",
      "https://ik.imagekit.io/mekt2pafz/Team%20Leads/35.jpg?updatedAt=1773685019937",
      "https://ik.imagekit.io/mekt2pafz/Team%20Leads/37.jpg?updatedAt=1773685019454",
      "https://ik.imagekit.io/mekt2pafz/Team%20Leads/5.jpg?updatedAt=1773685017934"
    ]
  },
  {
    name: "Winners of All",
    icon: Crown,
    color: "from-purple-500 to-indigo-500",
    glowColor: "#a855f7",
    description: "The ultimate champions of Robomania",
    images: [
      "https://ik.imagekit.io/mekt2pafz/Winners%20of%20all/IMG_20260317_011810_477.jpg?updatedAt=1773700489660",
      "https://ik.imagekit.io/mekt2pafz/Winners%20of%20all/IMG_20260317_011810_248.jpg?updatedAt=1773700489572",
      "https://ik.imagekit.io/mekt2pafz/Winners%20of%20all/IMG_20260317_011810_148.jpg?updatedAt=1773700489492",
      "https://ik.imagekit.io/mekt2pafz/Winners%20of%20all/IMG_20260317_011809_809.jpg?updatedAt=1773700489436",
      "https://ik.imagekit.io/mekt2pafz/Winners%20of%20all/IMG_20260317_011810_534.jpg?updatedAt=1773700489409",
      "https://ik.imagekit.io/mekt2pafz/Winners%20of%20all/IMG_20260317_011810_205.jpg?updatedAt=1773700489125",
      "https://ik.imagekit.io/mekt2pafz/Winners%20of%20all/IMG_20260317_011810_366.jpg?updatedAt=1773700488854",
      "https://ik.imagekit.io/mekt2pafz/Winners%20of%20all/IMG_20260317_011809_965.jpg?updatedAt=1773700488459",
      "https://ik.imagekit.io/mekt2pafz/Winners%20of%20all/IMG_20260317_011809_800.jpg?updatedAt=1773700488272",
      "https://ik.imagekit.io/mekt2pafz/Winners%20of%20all/IMG_20260317_011814_093.jpg?updatedAt=1773700488230",
      "https://ik.imagekit.io/mekt2pafz/Winners%20of%20all/IMG_20260317_011809_699.jpg?updatedAt=1773700486921"
    ]
  }
];

export default function WinnersGalleryModal() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(undefined);

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 25px 50px rgba(251, 146, 60, 0.4)",
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      transition: { duration: 0.3 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const categoryButtonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (idx) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: idx * 0.1,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.02,
      transition: { duration: 0.8 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (idx) => ({
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.5,
        delay: idx * 0.05,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.03,
      transition: { duration: 0.5 }
    }
  };

  const currentCategory = selected !== undefined ? categories[selected] : null;
  const CurrentIcon = currentCategory?.icon || Trophy;

  return (
    <div>
      <motion.button
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="relative px-8 py-4 rounded-2xl bg-linear-to-r from-amber-400 via-yellow-500 to-amber-600 text-white font-bold shadow-2xl overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-amber-600 to-amber-400 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.8 }}
        />
        <span className="relative z-10 flex items-center gap-2">
          <Trophy size={20} />
          View Winners Gallery
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div 
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            onClick={() => {
              setOpen(false);
              setSelected(undefined);
            }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className={`bg-slate-950 rounded-3xl shadow-2xl p-8 max-w-5xl w-full ${
                selected === undefined ? 'h-auto' : 'min-h-[70vh]'
              } relative border border-amber-400/20 overflow-hidden`}
              style={{
                background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              }}
            >
              {/* Decorative background elements */}
              <motion.div
                className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20"
                style={{
                  background: currentCategory?.glowColor ? `radial-gradient(circle, ${currentCategory.glowColor}, transparent)` : "radial-gradient(circle, #fbbf24, transparent)"
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20"
                style={{
                  background: currentCategory?.glowColor ? `radial-gradient(circle, ${currentCategory.glowColor}, transparent)` : "radial-gradient(circle, #fbbf24, transparent)"
                }}
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setOpen(false);
                  setSelected(undefined);
                }}
                className="absolute top-6 right-6 z-20 p-3 rounded-full bg-slate-800/50 backdrop-blur-md border border-amber-400/30 text-amber-300 hover:bg-red-500/30 hover:border-red-400 transition-all duration-300"
              >
                <X size={24} />
              </motion.button>

              {selected === undefined ? (
                // Category Selection View
                <motion.div 
                  className="flex flex-col items-center gap-8 py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="text-center space-y-3"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-amber-300 via-yellow-300 to-amber-400">
                      Winners Gallery
                    </h2>
                    <p className="text-amber-200/70 text-lg">Celebrate the achievements of our champions</p>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full [&>:last-child]:sm:col-span-2 [&>:last-child]:sm:mx-auto [&>:last-child]:sm:w-fit">
                    {categories.map((cat, idx) => {
                      const IconComponent = cat.icon;
                      return (
                        <motion.button
                          key={cat.name}
                          custom={idx}
                          variants={categoryButtonVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelected(idx)}
                          className={`group relative p-6 rounded-2xl bg-linear-to-br ${cat.color} text-white font-semibold overflow-hidden border border-white/20 transition-all duration-800`}
                          style={{
                            boxShadow: `0 0 30px ${cat.glowColor}40, inset 0 1px 0 rgba(255,255,255,0.2)`
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100"
                            style={{
                              background: `linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0))`
                            }}
                            transition={{ duration: 0.8 }}
                          />
                          
                          <div className="relative z-10 flex items-center gap-4">
                            <motion.div
                              animate={{ rotate: [0, 10, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <IconComponent size={32} />
                            </motion.div>
                            <div className="text-left">
                              <div className="text-lg font-bold">{cat.name}</div>
                              <div className="text-sm opacity-90">{cat.description}</div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                // Image Gallery View
                <motion.div
                  className="flex flex-col gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Header with Back Button */}
                  <div className="flex items-center justify-between mb-4">
                    <motion.button
                      whileHover={{ x: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelected(undefined)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 backdrop-blur-md border border-amber-400/30 text-amber-400 hover:bg-slate-800 transition-all duration-300"
                    >
                      <ChevronLeft size={20} />
                      Back
                    </motion.button>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center flex-1"
                    >
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <CurrentIcon size={28} style={{ color: currentCategory.glowColor }} />
                        <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-amber-300 to-amber-400">
                          {currentCategory.name}
                        </h3>
                      </div>
                      <p className="text-amber-200/60">{currentCategory.images.length} amazing moments</p>
                    </motion.div>

                    <div className="w-24" />
                  </div>

                  {/* Images Grid */}
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 gap-6 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar auto-rows-max"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {currentCategory.images.map((img, i) => (
                      <motion.div
                        key={img}
                        custom={i}
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className="relative overflow-hidden rounded-2xl group flex flex-col items-center justify-center bg-slate-800/50 p-2"
                      >
                        <motion.div
                          className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 bg-linear-to-t from-black/60 to-transparent flex items-end p-4"
                          transition={{ duration: 0.5 }}
                        >
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-white text-sm font-semibold"
                          >
                            {currentCategory.name} #{i + 1}
                          </motion.div>
                        </motion.div>

                        <motion.img
                          src={img}
                          alt={`${currentCategory.name} ${i + 1}`}
                          className="w-full h-auto object-contain max-h-96 border border-amber-400/20 rounded-xl shadow-xl"
                          loading="lazy"
                          transition={{ duration: 0.5 }}
                        />

                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-400"
                          transition={{ duration: 0.5 }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #fbbf24, #f59e0b);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #fcd34d, #fbbf24);
        }
      `}</style>
    </div>
  );
}
