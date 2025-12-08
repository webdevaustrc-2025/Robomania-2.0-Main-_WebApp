"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

const PALETTE = {
  left: "#127f40",
  mid: "#023C3C",
  right: "#1AB7AA",
};

const partnerOptions = [
  { name: "Premier Partner", link: "/partners/premier" },
  { name: "Platinum Partner", link: "/partners/platinum" },
  
  { name: "Gold Partner", link: "/partners/gold" },
  { name: "Supporting Partner", link: "/partners/supporting" },
];

export default function Navbar(){
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Partners", link: "/partners/premier" },
    { name: "Segments", link: "/segments" },
    { name: "About Us", link: "/aboutus" },
    { name: "Contact Us", link: "/contact" },
    { name: "Register Now", link: "/register" },
  ];

  const [open, setOpen] = useState(false);

  const pathname = useMemo(() => {
    if (typeof window !== "undefined") return window.location.pathname;
    return "/";
  }, []);

  // shrink-on-scroll
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 120));

  return (
    <header className="fixed inset-x-0 top-10 z-50">
      {/* Mobile navbar - hamburger only */}
      <div className="lg:hidden flex justify-end px-6">
        <motion.button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/20 text-amber-200"
          style={{
            boxShadow: '0 0 10px rgba(251, 191, 36, 0.3)'
          }}
        >
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {open ? <IconX size={18} /> : <IconMenu2 size={18} />}
          </motion.div>
        </motion.button>
      </div>

      {/* Desktop navbar - full width centered */}
      <nav className="hidden lg:flex justify-center">
        <motion.div
          animate={{
            width: compact ? "auto" : "auto",
            y: compact ? 6 : 0,
          }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
          className={cn(
            "flex h-12 items-center justify-center gap-8 rounded-full border px-6 backdrop-blur-xl",
            "bg-amber-950/80 border-amber-500/30"
          )}
          style={{
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.2), 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(251, 191, 36, 0.1)'
          }}
        >
          {/* Brand with Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-2 rounded-full px-2 py-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.img
              src={"https://ik.imagekit.io/mekt2pafz/Robomania%202.0/Website%20Icon-image%20(1).png"}
              alt="Robomania 2.0"
              className="h-7 w-auto object-contain"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))'
              }}
            />
          </motion.a>

          {/* Desktop links */}
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.link;
              const isPartners = item.name === "Partners";
              const isRegister = item.name === "Register Now";

              if (!isPartners) {
                if (isRegister) {
                  return (
                    <li key={item.link}>
                      <motion.a
                        href={item.link}
                        aria-current={active ? "page" : undefined}
                        className="group relative px-5 py-2 text-sm/6 font-semibold text-white rounded-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          background: "linear-gradient(90deg, rgba(251, 191, 36, 0.1), transparent)",
                          border: "2px solid transparent",
                          backgroundClip: "padding-box",
                        }}
                      >
                        {/* Animated border using pseudo-element approach */}
                        <motion.div
                          className="absolute -inset-0.5 rounded-full pointer-events-none"
                          animate={{
                            background: [
                              "conic-gradient(from 0deg, #fbbf24, #f59e0b, #d97706, #fbbf24)",
                              "conic-gradient(from 90deg, #fbbf24, #f59e0b, #d97706, #fbbf24)",
                              "conic-gradient(from 180deg, #fbbf24, #f59e0b, #d97706, #fbbf24)",
                              "conic-gradient(from 270deg, #fbbf24, #f59e0b, #d97706, #fbbf24)",
                              "conic-gradient(from 360deg, #fbbf24, #f59e0b, #d97706, #fbbf24)",
                            ]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          style={{
                            zIndex: -1,
                            borderRadius: "9999px",
                          }}
                        />
                        {item.name}
                      </motion.a>
                    </li>
                  );
                }

                return (
                  <li key={item.link}>
                    <motion.a
                      href={item.link}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative rounded-full px-3 py-2 text-sm/6 font-medium transition-all duration-300",
                        active ? "text-amber-400" : "text-amber-100 hover:text-amber-300"
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                      <motion.span
                        className="pointer-events-none absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-600"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ 
                          scaleX: active ? 1 : 0,
                          opacity: active ? 1 : 0
                        }}
                        whileHover={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          boxShadow: '0 0 10px rgba(251, 191, 36, 0.6)'
                        }}
                      />
                    </motion.a>
                  </li>
                );
              }

              // Partners with dropdown
              return (
                <li key={item.link} className="relative">
                  <div className="group relative">
                    <motion.a
                      href={item.link}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-3 py-2 text-sm/6 font-medium transition-all duration-300",
                        active ? "text-amber-400" : "text-amber-100 hover:text-amber-300"
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                      <motion.span
                        className="pointer-events-none absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-600"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ 
                          scaleX: active ? 1 : 0,
                          opacity: active ? 1 : 0
                        }}
                        whileHover={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          boxShadow: '0 0 10px rgba(251, 191, 36, 0.6)'
                        }}
                      />
                    </motion.a>

                    {/* Dropdown */}
                    <div 
                      className="pointer-events-none absolute left-1/2 top-full z-40 mt-2 w-56 -translate-x-1/2 rounded-2xl border border-amber-500/30 bg-amber-950/90 backdrop-blur-xl opacity-0 -translate-y-2.5 transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0"
                      style={{
                        boxShadow: '0 0 20px rgba(251, 191, 36, 0.2)'
                      }}
                    >
                      <ul className="py-2 text-sm">
                        {partnerOptions.map((opt) => (
                          <li 
                            key={opt.link}
                            className="transform transition-transform duration-200 hover:translate-x-1"
                          >
                            <a
                              href={opt.link}
                              className="block px-3 py-2 text-amber-100 hover:text-amber-300 hover:bg-amber-500/20 transition-all duration-200 rounded-lg mx-1"
                            >
                              {opt.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="mx-auto mt-2 w-11/12 max-w-md rounded-3xl border border-amber-500/30 bg-amber-950/90 p-3 backdrop-blur-xl"
              style={{
                boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)'
              }}
            >
              <ul className="grid gap-1">
                {navItems.map((item, index) => {
                  const active = pathname === item.link;
                  const isPartners = item.name === "Partners";

                  if (!isPartners) {
                    return (
                      <motion.li 
                        key={`m-${item.link}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <a
                          href={item.link}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-all duration-200",
                            active ? "text-amber-300 bg-amber-500/20" : "text-amber-100 hover:text-amber-300 hover:bg-amber-500/10"
                          )}
                        >
                          {item.name}
                          {active && (
                            <motion.span
                              className="h-2 w-2 rounded-full bg-amber-400"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              style={{
                                boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
                              }}
                            />
                          )}
                        </a>
                      </motion.li>
                    );
                  }

                  // Mobile: Partners + its options
                  return (
                    <React.Fragment key={`m-${item.link}`}>
                      <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <a
                          href={item.link}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-all duration-200",
                            active ? "text-amber-300 bg-amber-500/20" : "text-amber-100 hover:text-amber-300 hover:bg-amber-500/10"
                          )}
                        >
                          {item.name}
                          {active && (
                            <motion.span
                              className="h-2 w-2 rounded-full bg-amber-400"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              style={{
                                boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
                              }}
                            />
                          )}
                        </a>
                      </motion.li>
                      {partnerOptions.map((opt, optIdx) => (
                        <motion.li 
                          key={`m-${opt.link}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index + optIdx + 1) * 0.1 }}
                        >
                          <a
                            href={opt.link}
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-between rounded-2xl px-6 py-2 text-sm text-amber-100 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-200"
                          >
                            {opt.name}
                          </a>
                        </motion.li>
                      ))}
                    </React.Fragment>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
  );
}

/* ---------- Buttons (unchanged, just keep for later) ---------- */
function NavBtn({
  as: Tag = "a",
  href,
  className,
  variant = "gradient",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-3.5 py-2 text-sm font-medium transition";
  const styles =
    variant === "gradient"
      ? cn("text-white ring-1 ring-white/15 shadow", className)
      : cn(
          "text-white border border-white/20 bg-white/10 hover:bg-white/20",
          className
        );

  const styleObj =
    variant === "gradient"
      ? {
          background: `linear-gradient(90deg, ${PALETTE.left}E0, ${PALETTE.mid}E0 45%, ${PALETTE.right}E0)`,
        }
      : undefined;

  return (
    <Tag
      href={Tag === "a" ? href : undefined}
      className={cn(base, styles)}
      style={styleObj}
      {...props}
    >
      {children}
    </Tag>
  );
}
