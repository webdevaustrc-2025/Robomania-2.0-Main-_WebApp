import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  User,
  Briefcase,
  Newspaper,
  Users,
  Send,
  Clock,
  Building2
} from "lucide-react";

import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";


const Contact = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">

      {/* Animated Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* HERO */}
      <div className="relative z-10 flex items-center justify-center px-4 pt-24 pb-20">
        <div className="pointer-events-none absolute inset-x-0 -top-10 -z-10 flex justify-center">
          <div className="h-40 w-40 rounded-full bg-amber-500/40 blur-3xl opacity-70" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-3xl w-full mx-auto rounded-3xl border border-amber-400/30 
                     bg-amber-900/10 bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-transparent
                     backdrop-blur-xl shadow-[0_18px_80px_rgba(0,0,0,0.75)] 
                     px-6 py-10 sm:px-10 sm:py-12 text-center"
        >

          <div className="pointer-events-none absolute inset-0 rounded-3xl border border-amber-300/10" />

          <div className="relative space-y-6">

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                         bg-amber-500/15 border border-amber-300/40 
                         text-amber-200 text-xs sm:text-sm font-semibold
                         shadow-[0_0_30px_rgba(251,191,36,0.35)]"
            >
              <Mail className="w-4 h-4" />
              <span>Get In Touch</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="bg-linear-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>

            <div className="mx-auto h-[2px] w-24 rounded-full bg-gradient-to-r from-amber-200/20 via-amber-400/80 to-amber-200/20" />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-amber-50/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              We're here to assist you with any questions, partnership discussions,
              or clarifications about <span className="font-semibold text-amber-100">Robomania 2.0</span> and
              <span className="font-semibold text-amber-100"> AUST Robotics Club</span>.
            </motion.p>

          </div>
        </motion.div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-6"
          >
            <ContactMethodCard
              icon={<Mail className="w-6 h-6" />}
              title="Email Us"
              info="austrc@aust.edu"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=austrc@aust.edu"
              delay={0.1}
            />

            <ContactMethodCard
              icon={<Globe className="w-6 h-6" />}
              title="Visit Website"
              info="www.austrc.com"
              href="https://www.austrc.com"
              delay={0.2}
            />

            <ContactMethodCard
              icon={<MapPin className="w-6 h-6" />}
              title="Find Us"
              info="Dhaka-1208, Bangladesh"
              href="https://www.google.com/maps?q=141+Love+Road+Tejgaon+Dhaka+1208"
              delay={0.3}
            />
          </motion.div>

          {/* OFFICIAL ADDRESS */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-linear-to-r from-amber-500/5 to-amber-600/5 rounded-3xl blur-xl" />

            <div className="relative bg-gradient-to-br from-amber-950/40 via-black/60 to-amber-900/40 backdrop-blur-xl rounded-3xl border border-amber-400/20 p-8 md:p-12 overflow-hidden">

              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />

              <div className="relative space-y-8">

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-400/30">
                    <Building2 className="w-6 h-6 text-amber-400" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-amber-300">Official Address</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">

                  <div className="space-y-6">
                    <div>
                      <p className="text-2xl font-semibold text-white mb-2">AUST Robotics Club</p>
                      <p className="text-amber-100/60 text-sm">
                        Ahsanullah University of Science and Technology
                      </p>
                    </div>

                    <motion.a
                      href="https://www.google.com/maps?q=141+Love+Road+Tejgaon+Dhaka+1208"
                      target="_blank"
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-3 text-amber-100/80 hover:text-amber-300 transition-colors group"
                    >
                      <MapPin className="w-5 h-5 text-amber-400 mt-1 group-hover:scale-110" />
                      <span>
                        141 & 142, Love Road, Tejgaon Industrial Area,<br />
                        Dhaka-1208, Bangladesh
                      </span>
                    </motion.a>

                    {/* SOCIALS */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      {[
                        { icon: FaFacebookF, href: "https://www.facebook.com/AustRoboticsClub" },
                        { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/aust-robotics-club/posts/?feedView=all" },
                        { icon: FaInstagram, href: "https://www.instagram.com/aust_robotics_club/" }
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.15, y: -3 }}
                          className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/30 
                                     flex items-center justify-center text-amber-300 hover:bg-amber-500/30 hover:text-white"
                        >
                          <social.icon size={18} />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="h-64 rounded-2xl overflow-hidden border border-amber-400/30 shadow-lg"
                  >
                    <iframe
                      title="AUST Location"
                      src="https://www.google.com/maps?q=23.76363,90.40697&z=17&output=embed"
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </motion.div>

                </div>

              </div>

            </div>
          </motion.section>

          {/* TEAM SECTION */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >

            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-linear-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Meet Our Team
                </span>
              </h2>
              <p className="text-amber-100/70 text-lg max-w-2xl mx-auto">
                Connect directly with our organizing and management team
              </p>
            </div>

            {/* LEADERSHIP CARDS */}
            <div className="grid md:grid-cols-2 gap-6">

              <TeamMemberCard
                name="Khalid Hasan Drobo"
                position="President, AUSTRC"
                role="General Inquiries & Coordination"
                phone="+880 1316345727"
                email="president@austrc.com"
                icon={<User className="w-5 h-5" />}
                image="https://ik.imagekit.io/mekt2pafz/MSM%20PIC/11.jpg"
              />

              <TeamMemberCard
                name="Md. Nazmul Islam Sayem"
                position="General Secretary, AUSTRC"
                role="Club Administration & Documentation"
                phone="+880 1521788690"
                email="gs@austrc.com"
                icon={<Briefcase className="w-5 h-5" />}
                image="https://ik.imagekit.io/mekt2pafz/MSM%20PIC/2.jpg"
              />

              <TeamMemberCard
                name="Safayet Al Asif"
                position="Vice President, AUSTRC"
                role="Sponsorship & Partnership"
                phone="+880 1880864777"
                email="vp@austrc.com"
                icon={<Briefcase className="w-5 h-5" />}
                image="https://ik.imagekit.io/mekt2pafz/MSM%20PIC/3.jpg"
              />

              <TeamMemberCard
                name="Md. Meheraj"
                position="Director of MSM Team"
                role="Media & Public Relations"
                phone="+880 1609417195"
                email="director.pr@austrc.com"
                icon={<Newspaper className="w-5 h-5" />}
                image="https://ik.imagekit.io/mekt2pafz/MSM%20PIC/4.jpg"
              />

            </div>

            {/* CONTRIBUTORS */}
            <div className="space-y-8 mt-16">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-linear-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                    Contributors
                  </span>
                </h2>
                <p className="text-amber-100/70 text-lg max-w-2xl mx-auto">
                  Website development team behind Robomania 2.0
                </p>
              </div>

              {/* CONTRIBUTOR CARDS WITH LINKEDIN ADDED */}
              <div className="grid md:grid-cols-2 gap-6">

                <TeamMemberCard
                  name="Ahnaf Amer"
                  position="Director, Web Development Team"
                  role="Website Development Team"
                  email="ahnafamer15@gmail.com"
                  image="https://ik.imagekit.io/mekt2pafz/Web%20site%20team/ahnaf_amer%20pic.jpg?updatedAt=1765464698021"
                  icon={<Globe className="w-5 h-5" />}
                  linkedin="https://www.linkedin.com/in/ahnaf-amer-085211244a"
                />

                <TeamMemberCard
                  name="Saobia Islam Tinni"
                  position="Asst. Director, Web Development Team"
                  role="Website Development Team"
                  
                  email="islamsaobia@gmail.com"
                  image="https://ik.imagekit.io/mekt2pafz/Web%20site%20team/22222.jpg"
                  icon={<Globe className="w-5 h-5" />}
                  linkedin="https://www.linkedin.com/in/saobia-islam-1b173b284/"
                />

                <TeamMemberCard
                  name="Arko Saha"
                  position="Senior Sub Executive, Web Development Team"
                  role="Website Development Team"
                  
                  email="arkosaha61005@gmail.com"
                  image="https://ik.imagekit.io/mekt2pafz/Web%20site%20team/3333.jpg"
                  icon={<Globe className="w-5 h-5" />}
                  linkedin="https://www.linkedin.com/in/aarkosaahaa"
                />

                <TeamMemberCard
                  name="Shajedul Kabir Rafi"
                  position="Senior Sub Executive, Web Development Team"
                  role="Website Development Team"
                  
                  email="shajidulkabir12345@gmail.com"
                  image="https://ik.imagekit.io/mekt2pafz/Web%20site%20team/420000.jpeg"
                  icon={<Globe className="w-5 h-5" />}
                  facebook="https://www.facebook.com/share/1AXPPJF2XP/"
                  
                />

                <TeamMemberCard
                  name="Samanta Islam"
                  position="Senior Sub Executive, Web Development Team"
                  role="Website Development Team"
                  
                  email="samanta.cse.20230104082@aust.edu"
                  image="https://ik.imagekit.io/mekt2pafz/Web%20site%20team/422.jpeg"
                  icon={<Globe className="w-5 h-5" />}

                />

                <TeamMemberCard
                  name="Shakhawat Hossain Shoaib"
                  position="Sub Executive, Web Development Team"
                  role="Website Development Team"
                  
                  email="shakhawathossainshoaib@gmail.com"
                  image="https://ik.imagekit.io/mekt2pafz/Web%20site%20team/111.jpg"
                  icon={<Globe className="w-5 h-5" />}
                  linkedin="https://www.linkedin.com/in/shakhawat--hossain--shoaib"
                />

              </div>
            </div>

          </motion.section>

        </div>
      </div>
    </div>
  );
};

/* CONTACT METHOD CARD */
const ContactMethodCard = ({ icon, title, info, href, delay }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="group relative bg-gradient-to-br from-amber-950/40 via-black/60 to-amber-900/40 
               backdrop-blur-xl rounded-2xl border border-amber-400/20 p-6 hover:border-amber-400/40 
               transition-all duration-300 overflow-hidden"
  >
    <div className="relative space-y-4">
      <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center 
                      border border-amber-400/30 text-amber-400 group-hover:scale-110">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-amber-300 mb-1">{title}</h3>
      <p className="text-amber-100/70 text-sm group-hover:text-amber-100">{info}</p>

      <motion.div className="flex items-center gap-2 text-amber-400 text-sm font-medium"
        whileHover={{ x: 5 }}>
        <span>Connect</span>
        <Send className="w-4 h-4" />
      </motion.div>
    </div>
  </motion.a>
);

/* TEAM MEMBER CARD */
const TeamMemberCard = ({
  name,
  position,
  role,
  phone,
  email,
  image,
  icon,
  facebook,
  linkedin,  // ✓ ADDED HERE
  compact = false
}) => {
      const isContributor = position?.toLowerCase().includes("web management");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative bg-gradient-to-br from-amber-950/40 via-black/60 to-amber-900/40 
                 backdrop-blur-xl rounded-2xl border border-amber-400/20 overflow-hidden 
                 hover:border-amber-400/40 transition-all duration-300"
    >

      <div className="relative p-6">
        <div className="flex gap-6">

          {/* IMAGE */}
          <motion.div whileHover={{ scale: 1.05 }} className="shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/20 rounded-xl blur-lg" />
              <img
                src={image}
                alt={name}
                className={`relative rounded-xl object-cover border-2 border-amber-400/30 ${
                  compact ? "w-20 h-20" : "w-24 h-24"
                }`}
              />
            </div>
          </motion.div>

          {/* TEXT */}
          <div className="flex-1 space-y-4">

            {!compact && role && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center 
                                justify-center text-amber-400 border border-amber-400/30">
                  {icon}
                </div>
                <span className="text-xs uppercase tracking-wider text-amber-400/80 font-medium">
                  {role}
                </span>
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-amber-300">{name}</h3>
              <p className="text-amber-100/70 text-sm">{position}</p>
            </div>

            {/* CONTACT INFO */}
            <div className="space-y-2">
              {!isContributor && phone && (

              <motion.a href={`tel:${phone}`} whileHover={{ x: 3 }}
                className="flex items-center gap-2 text-amber-100/80 hover:text-amber-300 text-sm">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{phone}</span>
              </motion.a>
              )}

              <motion.a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                target="_blank"
                whileHover={{ x: 3 }}
                className="flex items-center gap-2 text-amber-100/80 hover:text-amber-300 text-sm"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span className="break-all">{email}</span>
              </motion.a>

              {/* ⭐ LINKEDIN (SHOW ONLY IF EXISTS) */}
              {linkedin && (
                <motion.a
                  href={linkedin}
                  target="_blank"
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-2 text-amber-100/80 hover:text-amber-300 text-sm"
                >
                  <FaLinkedinIn className="w-4 h-4 text-amber-400" />
                  <span>LinkedIn Profile</span>
                </motion.a>
              )}
              {/* ⭐ FACEBOOK (SHOW ONLY IF EXISTS) */}
              {facebook && (
                <motion.a
                  href={facebook}
                  target="_blank"
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-2 text-amber-100/80 hover:text-amber-300 text-sm"
                >
                  <FaFacebookF className="w-4 h-4 text-amber-400" />
                  <span>Facebook Profile</span>
                </motion.a>
              )}


            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default Contact;
