import React, { useState } from "react";
import { motion } from "motion/react";
import { db } from "../firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";

const segments = [
  "Soccer Bot",
  "Line Following Robot",
  "RoboProject Hackathon",
  "Innovators' Arena",
  "Circuit Wizardry",
  "Cadyssey",
  "ADCanvas",
];

const departments = [
  "Computer Science & Engineering",
  "Electrical & Electronic Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Industrial & Production Engineering",
  "Textile Engineering",
  "Architecture",
  "BBA",
];

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    austrcId: "",
    austId: "",
    semester: "",
    department: "",
    segment: "",
    transactionId: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState({
    segment: false,
    department: false,
    semester: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setDropdownOpen((prev) => ({
      ...prev,
      [field]: false,
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.austrcId.trim()) {
      newErrors.austrcId = "AUSTRC ID is required";
    }
    if (!formData.austId.trim()) {
      newErrors.austId = "AUST ID is required";
    }
    if (!formData.semester.trim()) {
      newErrors.semester = "Semester is required";
    }
    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }
    if (!formData.segment.trim()) {
      newErrors.segment = "Segment is required";
    }
    if (!formData.transactionId.trim()) {
      newErrors.transactionId = "Transaction ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const documentName = `${formData.name}_${formData.austrcId}`;

      await setDoc(doc(collection(db, "Registration_Informations"), documentName), {
        Name: formData.name,
        AUSTRC_ID: formData.austrcId,
        AUST_ID: formData.austId,
        Semester: formData.semester,
        Department: formData.department,
        Segment: formData.segment,
        Transaction_ID: formData.transactionId,
        Timestamp: new Date(),
      });

      setMessage({
        type: "success",
        text: "Registration successful! Thank you for registering.",
      });

      // Reset form
      setFormData({
        name: "",
        austrcId: "",
        austId: "",
        semester: "",
        department: "",
        segment: "",
        transactionId: "",
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage({
        type: "error",
        text: "Error registering. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 mb-4">
            Register Now
          </h1>
          <p className="text-amber-100/80 text-lg">
            Join the Robomania 2.0 journey and showcase your robotics skills
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-amber-950/30 border border-amber-500/30 rounded-2xl p-8 md:p-12 shadow-2xl"
          style={{
            boxShadow:
              "0 0 30px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(251, 191, 36, 0.1)",
          }}
        >
          {/* Message Alert */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: message ? 1 : 0,
              y: message ? 0 : -10,
            }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            {message && (
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
                  message.type === "success"
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                    : "bg-red-500/20 border-red-500/50 text-red-300"
                }`}
              >
                {message.type === "success" ? (
                  <IconCheck size={20} />
                ) : (
                  <IconAlertCircle size={20} />
                )}
                <span>{message.text}</span>
              </div>
            )}
          </motion.div>

          {/* Form Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-amber-200 font-semibold mb-2">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                className={`w-full px-4 py-3 rounded-lg bg-amber-950/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-amber-300/40 text-amber-50 ${
                  errors.name
                    ? "border-red-500/70"
                    : "border-amber-500/30 hover:border-amber-500/50"
                }`}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            {/* AUSTRC ID Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-amber-200 font-semibold mb-2">
                AUSTRC ID <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="austrcId"
                value={formData.austrcId}
                onChange={handleInputChange}
                placeholder="Your AUSTRC ID"
                className={`w-full px-4 py-3 rounded-lg bg-amber-950/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-amber-300/40 text-amber-50 ${
                  errors.austrcId
                    ? "border-red-500/70"
                    : "border-amber-500/30 hover:border-amber-500/50"
                }`}
              />
              {errors.austrcId && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.austrcId}
                </motion.p>
              )}
            </motion.div>

            {/* AUST ID Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-amber-200 font-semibold mb-2">
                AUST ID <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="austId"
                value={formData.austId}
                onChange={handleInputChange}
                placeholder="Your AUST ID"
                className={`w-full px-4 py-3 rounded-lg bg-amber-950/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-amber-300/40 text-amber-50 ${
                  errors.austId
                    ? "border-red-500/70"
                    : "border-amber-500/30 hover:border-amber-500/50"
                }`}
              />
              {errors.austId && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.austId}
                </motion.p>
              )}
            </motion.div>

            {/* Semester Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-amber-200 font-semibold mb-2">
                Semester <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                placeholder="e.g., 3, 4, 5"
                className={`w-full px-4 py-3 rounded-lg bg-amber-950/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-amber-300/40 text-amber-50 ${
                  errors.semester
                    ? "border-red-500/70"
                    : "border-amber-500/30 hover:border-amber-500/50"
                }`}
              />
              {errors.semester && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.semester}
                </motion.p>
              )}
            </motion.div>

            {/* Department Dropdown */}
            <motion.div variants={itemVariants} className="relative">
              <label className="block text-amber-200 font-semibold mb-2">
                Department <span className="text-red-400">*</span>
              </label>
              <button
                type="button"
                onClick={() =>
                  setDropdownOpen((prev) => ({
                    ...prev,
                    department: !prev.department,
                  }))
                }
                className={`w-full px-4 py-3 rounded-lg bg-amber-950/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-amber-50 text-left flex justify-between items-center ${
                  errors.department
                    ? "border-red-500/70"
                    : "border-amber-500/30 hover:border-amber-500/50"
                }`}
              >
                <span className={formData.department ? "" : "text-amber-300/40"}>
                  {formData.department || "Select department"}
                </span>
                <motion.span
                  animate={{ rotate: dropdownOpen.department ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▼
                </motion.span>
              </button>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: dropdownOpen.department ? 1 : 0,
                  y: dropdownOpen.department ? 0 : -10,
                  pointerEvents: dropdownOpen.department ? "auto" : "none",
                }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-amber-950/90 border border-amber-500/30 rounded-lg backdrop-blur-xl z-10"
                style={{
                  boxShadow: "0 0 20px rgba(251, 191, 36, 0.2)",
                }}
              >
                <ul className="max-h-48 overflow-y-auto">
                  {departments.map((dept, idx) => (
                    <motion.li
                      key={idx}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectChange("department", dept)}
                        className="w-full text-left px-4 py-2 text-amber-100 hover:text-amber-300 hover:bg-amber-500/20 transition-all duration-200"
                      >
                        {dept}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {errors.department && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.department}
                </motion.p>
              )}
            </motion.div>

            {/* Segment Dropdown */}
            <motion.div variants={itemVariants} className="relative">
              <label className="block text-amber-200 font-semibold mb-2">
                Segment <span className="text-red-400">*</span>
              </label>
              <button
                type="button"
                onClick={() =>
                  setDropdownOpen((prev) => ({
                    ...prev,
                    segment: !prev.segment,
                  }))
                }
                className={`w-full px-4 py-3 rounded-lg bg-amber-950/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-amber-50 text-left flex justify-between items-center ${
                  errors.segment
                    ? "border-red-500/70"
                    : "border-amber-500/30 hover:border-amber-500/50"
                }`}
              >
                <span className={formData.segment ? "" : "text-amber-300/40"}>
                  {formData.segment || "Select a segment"}
                </span>
                <motion.span
                  animate={{ rotate: dropdownOpen.segment ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ▼
                </motion.span>
              </button>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{
                  opacity: dropdownOpen.segment ? 1 : 0,
                  y: dropdownOpen.segment ? 0 : -10,
                  pointerEvents: dropdownOpen.segment ? "auto" : "none",
                }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-amber-950/90 border border-amber-500/30 rounded-lg backdrop-blur-xl z-10"
                style={{
                  boxShadow: "0 0 20px rgba(251, 191, 36, 0.2)",
                }}
              >
                <ul className="max-h-48 overflow-y-auto">
                  {segments.map((seg, idx) => (
                    <motion.li
                      key={idx}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectChange("segment", seg)}
                        className="w-full text-left px-4 py-2 text-amber-100 hover:text-amber-300 hover:bg-amber-500/20 transition-all duration-200"
                      >
                        {seg}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {errors.segment && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.segment}
                </motion.p>
              )}
            </motion.div>

            {/* Transaction ID Field - Full Width */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <label className="block text-amber-200 font-semibold mb-2">
                Transaction ID <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleInputChange}
                placeholder="Your payment transaction ID"
                className={`w-full px-4 py-3 rounded-lg bg-amber-950/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-amber-300/40 text-amber-50 ${
                  errors.transactionId
                    ? "border-red-500/70"
                    : "border-amber-500/30 hover:border-amber-500/50"
                }`}
              />
              {errors.transactionId && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-1"
                >
                  {errors.transactionId}
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="mt-8">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-6 rounded-lg font-semibold text-amber-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-500 hover:via-amber-400 hover:to-amber-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                boxShadow: "0 0 20px rgba(251, 191, 36, 0.4)",
              }}
            >
              {loading ? (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Registering...
                </motion.span>
              ) : (
                "Register Now"
              )}
            </motion.button>
          </motion.div>

          {/* Help Text */}
          <motion.p
            variants={itemVariants}
            className="text-center text-amber-200/60 text-sm mt-6"
          >
            By registering, you agree to participate in Robomania 2.0
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
}
