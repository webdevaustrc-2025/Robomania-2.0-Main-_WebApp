import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Mail, MapPin, Phone, ArrowRight, Heart } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/AustRoboticsClub",
      label: "Facebook",
      color: "hover:bg-blue-500"
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/aust_robotics_club/",
      label: "Instagram",
      color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500"
    },
    {
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/company/aust-robotics-club",
      label: "LinkedIn",
      color: "hover:bg-blue-600"
    }
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Segments", href: "/segments" },
    { name: "About Us", href: "/about-us" }
  ];

  return (
    <footer
      className="
        relative overflow-hidden rounded-t-3xl
        border-t border-amber-500/25
        bg-gradient-to-b from-black/70 via-black/60 to-black/80
        backdrop-blur-xl
      "
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.35, 0.2, 0.35],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 space-y-4 sm:space-y-6"
            >
              {/* Logo and Name */}
              <a
                href="https://www.austrc.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <motion.div
                  className="flex items-center gap-3 sm:gap-4 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src="https://aust.edu/storage/files/Rc46weeV7JQjH1VT1DoCUWUMsIp81dtIMvZBMlpm.jpg"
                    alt="AUST Robotics Club"
                    className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl border-2 border-amber-400/30 p-1 bg-amber-950/40 backdrop-blur-sm"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-amber-300">
                      AUST Robotics Club
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-100/70 mt-1">
                      Building a Safer Future Through Robotics
                    </p>
                  </div>
                </motion.div>
              </a>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-amber-100/80 leading-relaxed text-xs sm:text-sm"
              >
                Empowering students to innovate, create, and lead in the field of
                robotics and automation. Join us in shaping the future of
                technology.
              </motion.p>

              {/* Social Links */}
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-xs sm:text-sm font-semibold text-amber-300 mb-2 sm:mb-3 tracking-wide"
                >
                  CONNECT WITH US
                </motion.p>
                <div className="flex gap-2.5 sm:gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08, type: "spring" }}
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group relative h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center 
                        rounded-full border border-amber-400/30 
                        bg-amber-950/40 backdrop-blur-md
                        transition-all duration-300 ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon
                        className="text-amber-300 group-hover:text-white transition-colors duration-300"
                        size={16}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-amber-400/20"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-3"
            >
              <h3 className="text-sm sm:text-lg font-bold text-amber-300 mb-3 sm:mb-4 tracking-wide">
                QUICK LINKS
              </h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <motion.a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-amber-100/80 hover:text-amber-300 transition-colors duration-300"
                      whileHover={{ x: 4 }}
                    >
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="text-xs sm:text-sm">{link.name}</span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <h3 className="text-sm sm:text-lg font-bold text-amber-300 mb-3 sm:mb-4 tracking-wide">
                GET IN TOUCH
              </h3>
              <div className="space-y-3.5 sm:space-y-4">
                <motion.div
                  whileHover={{ x: 2 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/20 flex items-center justify-center border border-amber-400/30 group-hover:bg-amber-500/30 transition-colors duration-300">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs text-amber-100/60 mb-0.5">
                      Email
                    </p>
                    <a
                      href="mailto:austrc@aust.edu"
                      className="text-xs sm:text-sm text-amber-100 hover:text-amber-300 transition-colors duration-300"
                    >
                      austrc@aust.edu
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 2 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500/20 flex items-center justify-center border border-amber-400/30 group-hover:bg-amber-500/30 transition-colors duration-300">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs text-amber-100/60 mb-0.5">
                      Address
                    </p>
                    <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
                      141 & 142, Love Road, Tejgaon Industrial Area,
                      <br />
                      Dhaka-1208, Bangladesh
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Map Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                whileHover={{ scale: 1.02 }}
                className="mt-4 sm:mt-5 h-24 sm:h-28 md:h-32 w-full overflow-hidden rounded-xl border border-amber-400/30 bg-black/40 backdrop-blur-md shadow-lg"
              >
                <iframe
                  title="AUST Location"
                  src="https://www.google.com/maps?q=23.76363,90.40697&z=17&output=embed"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated bottom glow line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </footer>
  );
};

export default Footer;
