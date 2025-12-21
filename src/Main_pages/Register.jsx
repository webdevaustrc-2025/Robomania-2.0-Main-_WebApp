import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { db } from "../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";

const soloSegments = ["Cadyssey", "Circuit Wizardry", "Robo Olympiad"];
const teamSegments = ["Soccer Bot", "Line Following Robot", "RoboProject Hackathon"];

// Google Forms URLs for each segment
const googleFormsLinks = {
  "Cadyssey": "https://forms.gle/8BunRjjdnAf2ev8NA",
  "Circuit Wizardry": "https://forms.gle/TAb5TsSbuqzjJbec8",
  "Soccer Bot": "https://forms.gle/ZDTYup7aJHRs1vHu5",
  "Line Following Robot": "https://forms.gle/vEK2PBbLqTMDodmX8",
  "RoboProject Hackathon": "https://forms.gle/XjGvtc4FjBHk8jrq9",
  "Robo Olympiad": "https://forms.gle/WToS83Q4pWZUTnUR7",
};
const teamMemberOptions = [
  { value: 1, label: "1 Member" },
  { value: 2, label: "2 Members" },
  { value: 3, label: "3 Members" },
  { value: 4, label: "4 Members" },
  { value: 5, label: "5 Members" },
  { value: 6, label: "6 Members" },
];
const tShirtSizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
const semesters = ["1.1", "1.2", "2.1", "2.2", "3.1", "3.2", "4.1", "4.2"];
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
const paymentMethods = ["Bkash", "Nagad"];
const enrollmentOptions = ["Yes", "No"];

// Reusable dropdown component
const SelectDropdown = ({
  label,
  value,
  options,
  onChange,
  error,
  required = true,
  isOpen,
  onToggle,
}) => (
  <div className="relative">
    <label className="block text-amber-200 font-semibold mb-2">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <button
      type="button"
      onClick={onToggle}
      className={`w-full px-4 py-3 rounded-lg bg-amber-950/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-amber-50 text-left flex justify-between items-center ${
        error
          ? "border-red-500/70"
          : "border-amber-500/30 hover:border-amber-500/50"
      }`}
    >
      <span className={value ? "" : "text-amber-300/40"}>
        {value || "Select an option"}
      </span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        ▼
      </motion.span>
    </button>

    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: isOpen ? 1 : 0,
        y: isOpen ? 0 : -10,
        pointerEvents: isOpen ? "auto" : "none",
      }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 mt-2 bg-amber-950/90 border border-amber-500/30 rounded-lg backdrop-blur-xl z-10"
      style={{
        boxShadow: "0 0 20px rgba(251, 191, 36, 0.2)",
      }}
    >
      <ul className="max-h-48 overflow-y-auto">
        {options.map((option, idx) => (
          <motion.li
            key={idx}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              onClick={() => onChange(option)}
              className="w-full text-left px-4 py-2 text-amber-100 hover:text-amber-300 hover:bg-amber-500/20 transition-all duration-200"
            >
              {option}
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.div>

    {error && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-400 text-sm mt-1"
      >
        {error}
      </motion.p>
    )}
  </div>
);

// Reusable text input component
const TextInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = true,
}) => (
  <div>
    <label className="block text-amber-200 font-semibold mb-2">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-lg bg-amber-950/50 border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-amber-300/40 text-amber-50 ${
        error
          ? "border-red-500/70"
          : "border-amber-500/30 hover:border-amber-500/50"
      }`}
    />
    {error && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-400 text-sm mt-1"
      >
        {error}
      </motion.p>
    )}
  </div>
);

export default function Register() {
  const [step, setStep] = useState(1);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [segmentType, setSegmentType] = useState(null); // "solo" or "team"
  const [teamMemberCount, setTeamMemberCount] = useState(1);
  const [paymentNumbers, setPaymentNumbers] = useState({
    bkash: "",
    nagad: "",
  });
  const [segmentAmount, setSegmentAmount] = useState(0);
  const [extraMemberAmount, setExtraMemberAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Solo form state
  const [soloData, setSoloData] = useState({
    name: "",
    email: "",
    eduMail: "",
    austStudentId: "",
    department: "",
    semester: "",
    phoneNumber: "",
    austrcId: "",
    tShirtSize: "",
    paymentMethod: "",
    senderPaymentNumber: "",
    transactionId: "",
    previousEnrollment: "",
  });
  const [soloErrors, setSoloErrors] = useState({});

  // Team form state
  const [teamData, setTeamData] = useState({
    teamName: "",
    teamLeader: {
      name: "",
      email: "",
      eduMail: "",
      austStudentId: "",
      department: "",
      semester: "",
      phoneNumber: "",
      austrcId: "",
      tShirtSize: "",
    },
    teamMembers: [],
    paymentMethod: "",
    senderPaymentNumber: "",
    transactionId: "",
    previousEnrollment: "",
  });
  const [teamErrors, setTeamErrors] = useState({});

  // Dropdown states
  const [dropdownOpen, setDropdownOpen] = useState({
    department: false,
    semester: false,
    tShirtSize: false,
    paymentMethod: false,
    leaderDepartment: false,
    leaderSemester: false,
    leaderTShirtSize: false,
  });

  // Fetch payment details
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const bkashDoc = await getDoc(doc(db, "Payment Number", "Bkash"));
        if (bkashDoc.exists()) {
          setPaymentNumbers((prev) => ({
            ...prev,
            bkash: bkashDoc.data().Number,
          }));
        }

        const nagadDoc = await getDoc(doc(db, "Payment Number", "Nagad"));
        if (nagadDoc.exists()) {
          setPaymentNumbers((prev) => ({
            ...prev,
            nagad: nagadDoc.data().Number,
          }));
        }
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, []);

  // Fetch segment amount and extra member amount
  useEffect(() => {
    const fetchSegmentAmount = async () => {
      if (!selectedSegment) return;

      try {
        const doc_ = await getDoc(
          doc(db, "Payment Number", "Segment Money")
        );

        if (doc_.exists()) {
          const data = doc_.data();
          setSegmentAmount(data[selectedSegment] || 0);
          
          // Fetch extra member amount based on selected segment
          if (segmentType === "team") {
            const extraMemberField = `${selectedSegment}_Extra_Member_Amount`;
            setExtraMemberAmount(data[extraMemberField] || 0);
          }
        }
      } catch (error) {
        console.error("Error fetching segment amount:", error);
      }
    };

    fetchSegmentAmount();
  }, [selectedSegment, segmentType]);

  const handleSegmentSelect = (segment) => {
    // Redirect to the corresponding Google Form
    const formUrl = googleFormsLinks[segment];
    if (formUrl) {
      window.open(formUrl, "_blank");
    }
  };

  const handleTeamMemberSelect = (count) => {
    setTeamMemberCount(count);
    const newMembers = Array(count - 1)
      .fill(null)
      .map(() => ({
        name: "",
        email: "",
        eduMail: "",
        austStudentId: "",
        department: "",
        semester: "",
        phoneNumber: "",
        austrcId: "",
        tShirtSize: "",
      }));

    setTeamData((prev) => ({
      ...prev,
      teamMembers: newMembers,
    }));
    setStep(3);
  };

  const handleSoloInputChange = (e) => {
    const { name, value } = e.target;
    setSoloData((prev) => ({ ...prev, [name]: value }));
    if (soloErrors[name]) {
      setSoloErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSoloSelectChange = (field, value) => {
    setSoloData((prev) => ({ ...prev, [field]: value }));
    setDropdownOpen((prev) => ({ ...prev, [field]: false }));
    if (soloErrors[field]) {
      setSoloErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleTeamInputChange = (e, memberIndex = null) => {
    const { name, value } = e.target;

    if (memberIndex === null) {
      // Team leader or common field
      if (
        ["teamName", "paymentMethod", "senderPaymentNumber", "transactionId", "previousEnrollment"].includes(
          name
        )
      ) {
        setTeamData((prev) => ({ ...prev, [name]: value }));
      } else {
        // Team leader field
        setTeamData((prev) => ({
          ...prev,
          teamLeader: { ...prev.teamLeader, [name]: value },
        }));
      }
    } else {
      // Team member field
      setTeamData((prev) => {
        const newMembers = [...prev.teamMembers];
        newMembers[memberIndex] = { ...newMembers[memberIndex], [name]: value };
        return { ...prev, teamMembers: newMembers };
      });
    }

    if (teamErrors[name]) {
      setTeamErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTeamSelectChange = (field, value, memberIndex = null) => {
    if (memberIndex === null) {
      // Team leader
      setTeamData((prev) => ({
        ...prev,
        teamLeader: { ...prev.teamLeader, [field]: value },
      }));
    } else {
      // Team member
      setTeamData((prev) => {
        const newMembers = [...prev.teamMembers];
        newMembers[memberIndex] = { ...newMembers[memberIndex], [field]: value };
        return { ...prev, teamMembers: newMembers };
      });
    }

    setDropdownOpen((prev) => ({ ...prev, [field]: false }));
  };

  const validateSolo = () => {
    const errors = {};

    if (!soloData.name.trim()) errors.name = "Name is required";
    if (!soloData.email.trim()) errors.email = "Email is required";
    if (!soloData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errors.email = "Valid email required";
    if (!soloData.eduMail.trim()) errors.eduMail = "Educational email is required";
    if (!soloData.austStudentId.trim()) errors.austStudentId = "Student ID is required";
    if (!soloData.department.trim()) errors.department = "Department is required";
    if (!soloData.semester.trim()) errors.semester = "Semester is required";
    if (!soloData.phoneNumber.trim()) errors.phoneNumber = "Phone number is required";
    if (!soloData.austrcId.trim()) errors.austrcId = "AUSTRC ID is required";
    if (!soloData.tShirtSize.trim()) errors.tShirtSize = "T-Shirt size is required";
    if (!soloData.paymentMethod.trim()) errors.paymentMethod = "Payment method is required";
    if (!soloData.senderPaymentNumber.trim())
      errors.senderPaymentNumber = "Payment number is required";
    if (!soloData.transactionId.trim()) errors.transactionId = "Transaction ID is required";
    if (!soloData.previousEnrollment) errors.previousEnrollment = "Please select";

    setSoloErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateTeam = () => {
    const errors = {};

    if (!teamData.teamName.trim()) errors.teamName = "Team name is required";

    // Validate team leader
    const tl = teamData.teamLeader;
    if (!tl.name.trim()) errors.leaderName = "Team leader name is required";
    if (!tl.email.trim()) errors.leaderEmail = "Team leader email is required";
    if (!tl.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errors.leaderEmail = "Valid email required";
    if (!tl.eduMail.trim()) errors.leaderEduMail = "Educational email is required";
    if (!tl.austStudentId.trim()) errors.leaderAustStudentId = "Student ID is required";
    if (!tl.department.trim()) errors.leaderDepartment = "Department is required";
    if (!tl.semester.trim()) errors.leaderSemester = "Semester is required";
    if (!tl.phoneNumber.trim()) errors.leaderPhoneNumber = "Phone number is required";
    if (!tl.austrcId.trim()) errors.leaderAustrcId = "AUSTRC ID is required";
    if (!tl.tShirtSize.trim()) errors.leaderTShirtSize = "T-Shirt size is required";

    // Validate team members
    teamData.teamMembers.forEach((member, idx) => {
      if (!member.name.trim()) errors[`member${idx}Name`] = "Name is required";
      if (!member.email.trim()) errors[`member${idx}Email`] = "Email is required";
      if (!member.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        errors[`member${idx}Email`] = "Valid email required";
      if (!member.eduMail.trim()) errors[`member${idx}EduMail`] = "Educational email is required";
      if (!member.austStudentId.trim())
        errors[`member${idx}AustStudentId`] = "Student ID is required";
      if (!member.department.trim()) errors[`member${idx}Department`] = "Department is required";
      if (!member.semester.trim()) errors[`member${idx}Semester`] = "Semester is required";
      if (!member.phoneNumber.trim())
        errors[`member${idx}PhoneNumber`] = "Phone number is required";
      if (!member.austrcId.trim()) errors[`member${idx}AustrcId`] = "AUSTRC ID is required";
      if (!member.tShirtSize.trim())
        errors[`member${idx}TShirtSize`] = "T-Shirt size is required";
    });

    // Validate common fields
    if (!teamData.paymentMethod.trim()) errors.paymentMethod = "Payment method is required";
    if (!teamData.senderPaymentNumber.trim())
      errors.senderPaymentNumber = "Payment number is required";
    if (!teamData.transactionId.trim()) errors.transactionId = "Transaction ID is required";
    if (!teamData.previousEnrollment) errors.previousEnrollment = "Please select";

    setTeamErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSoloSubmit = async (e) => {
    e.preventDefault();

    if (!validateSolo()) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const documentName = `${soloData.name}_${soloData.austrcId}_${selectedSegment}`;

      await setDoc(
        doc(db, "Registration_Informations", documentName),
        {
          Registration_Type: "Solo",
          Name: soloData.name,
          Email: soloData.email,
          Educational_Email: soloData.eduMail,
          AUST_Student_ID: soloData.austStudentId,
          Department: soloData.department,
          Semester: soloData.semester,
          Phone_Number: soloData.phoneNumber,
          AUSTRC_ID: soloData.austrcId,
          T_Shirt_Size: soloData.tShirtSize,
          Segment: selectedSegment,
          Payment_Amount: segmentAmount,
          Payment_Method: soloData.paymentMethod,
          Sender_Payment_Number: soloData.senderPaymentNumber,
          Transaction_ID: soloData.transactionId,
          Previous_Enrollment: soloData.previousEnrollment,
          Timestamp: new Date(),
          Document_Name: documentName,
        }
      );

      setMessage({
        type: "success",
        text: "Registration successful! Thank you for registering.",
      });

      // Reset
      setSoloData({
        name: "",
        email: "",
        eduMail: "",
        austStudentId: "",
        department: "",
        semester: "",
        phoneNumber: "",
        austrcId: "",
        tShirtSize: "",
        paymentMethod: "",
        senderPaymentNumber: "",
        transactionId: "",
        previousEnrollment: "",
      });

      setTimeout(() => {
        setSelectedSegment(null);
        setSegmentType(null);
        setStep(1);
        setMessage(null);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        type: "error",
        text: "Error registering. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();

    if (!validateTeam()) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const documentName = `${teamData.teamName}_${teamData.teamLeader.austrcId}_${selectedSegment}`;

      await setDoc(
        doc(db, "Registration_Informations", documentName),
        {
          Registration_Type: "Team",
          Team_Name: teamData.teamName,
          Total_Members: teamMemberCount,
          Team_Leader: {
            Name: teamData.teamLeader.name,
            Email: teamData.teamLeader.email,
            Educational_Email: teamData.teamLeader.eduMail,
            AUST_Student_ID: teamData.teamLeader.austStudentId,
            Department: teamData.teamLeader.department,
            Semester: teamData.teamLeader.semester,
            Phone_Number: teamData.teamLeader.phoneNumber,
            AUSTRC_ID: teamData.teamLeader.austrcId,
            T_Shirt_Size: teamData.teamLeader.tShirtSize,
          },
          Team_Members: teamData.teamMembers.map((member, idx) => ({
            Member_Number: idx + 1,
            Name: member.name,
            Email: member.email,
            Educational_Email: member.eduMail,
            AUST_Student_ID: member.austStudentId,
            Department: member.department,
            Semester: member.semester,
            Phone_Number: member.phoneNumber,
            AUSTRC_ID: member.austrcId,
            T_Shirt_Size: member.tShirtSize,
          })),
          Segment: selectedSegment,
          Payment_Amount_Per_Person: segmentAmount,
          Total_Payment_Amount: segmentAmount * teamMemberCount,
          Payment_Method: teamData.paymentMethod,
          Sender_Payment_Number: teamData.senderPaymentNumber,
          Transaction_ID: teamData.transactionId,
          Previous_Enrollment: teamData.previousEnrollment,
          Timestamp: new Date(),
          Document_Name: documentName,
        }
      );

      setMessage({
        type: "success",
        text: "Team registration successful! Thank you for registering.",
      });

      // Reset
      setTeamData({
        teamName: "",
        teamLeader: {
          name: "",
          email: "",
          eduMail: "",
          austStudentId: "",
          department: "",
          semester: "",
          phoneNumber: "",
          austrcId: "",
          tShirtSize: "",
        },
        teamMembers: [],
        paymentMethod: "",
        senderPaymentNumber: "",
        transactionId: "",
        previousEnrollment: "",
      });

      setTimeout(() => {
        setSelectedSegment(null);
        setSegmentType(null);
        setTeamMemberCount(1);
        setStep(1);
        setMessage(null);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
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
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
    <>
      {/* Step 1: Segment Selection */}
      {step === 1 && (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <motion.div
            className="w-full max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 mb-4">
                Select Your Segment
              </h1>
              <p className="text-amber-100/80 text-lg">
                Choose a solo or team event to register for Robomania 2.0
              </p>
            </motion.div>

            {/* Solo Segments */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-amber-300 mb-6 text-center">
                Solo Events
              </h2>
              <div className="grid md:grid-cols-2 gap-6 justify-items-center">
                {soloSegments.map((segment, index) => (
                  <motion.button
                    key={segment}
                    variants={itemVariants}
                    onClick={() => handleSegmentSelect(segment)}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-8 rounded-2xl border border-amber-500/30 bg-amber-950/30 backdrop-blur-xl text-left group overflow-hidden w-full ${soloSegments.length % 2 === 1 && index === soloSegments.length - 1 ? 'md:col-span-2 md:max-w-[calc(50%-12px)]' : ''}`}
                    style={{
                      boxShadow:
                        "0 0 30px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(251, 191, 36, 0.1)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-amber-300 mb-2">
                        {segment}
                      </h3>
                      <p className="text-amber-100/70">
                        Click to register for this solo event
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Team Segments */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-amber-300 mb-6 text-center">
                Team Events
              </h2>
              <div className="grid md:grid-cols-2 gap-6 justify-items-center">
                {teamSegments.map((segment, index) => (
                  <motion.button
                    key={segment}
                    variants={itemVariants}
                    onClick={() => handleSegmentSelect(segment)}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-8 rounded-2xl border border-amber-500/30 bg-amber-950/30 backdrop-blur-xl text-left group overflow-hidden w-full ${teamSegments.length % 2 === 1 && index === teamSegments.length - 1 ? 'md:col-span-2 md:max-w-[calc(50%-12px)]' : ''}`}
                    style={{
                      boxShadow:
                        "0 0 30px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(251, 191, 36, 0.1)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-amber-300 mb-2">
                        {segment}
                      </h3>
                      <p className="text-amber-100/70">
                        Click to register your team for this event
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Step 2: Team Size Selection */}
      {step === 2 && (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <motion.div
            className="w-full max-w-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <motion.button
                onClick={() => setStep(1)}
                className="mb-4 px-4 py-2 rounded-full border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back to Segments
              </motion.button>
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 mb-4">
                Select Team Size
              </h1>
              <p className="text-amber-100/80 text-lg">
                How many members will be on your {selectedSegment} team?
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {teamMemberOptions.map((option) => (
                <motion.button
                  key={option.value}
                  variants={itemVariants}
                  onClick={() => handleTeamMemberSelect(option.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-6 rounded-xl border-2 border-amber-500/30 bg-amber-950/30 hover:bg-amber-500/20 hover:border-amber-400 text-center transition-all group"
                >
                  <p className="text-3xl font-bold text-amber-300 group-hover:text-amber-200">
                    {option.value}
                  </p>
                  <p className="text-amber-100/70 text-sm mt-2">{option.label}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Step 3: Registration Form */}
      {step === 3 && (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <motion.div
            className="w-full max-w-5xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <motion.button
                onClick={() => {
                  if (segmentType === "team") {
                    setStep(2);
                  } else {
                    setStep(1);
                  }
                }}
                className="mb-4 px-4 py-2 rounded-full border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back
              </motion.button>
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 mb-2">
                Register for {selectedSegment}
              </h1>
              <p className="text-amber-100/80 text-lg">
                Fill in {segmentType === "team" ? "your team's" : "your"} details
              </p>
            </motion.div>

            {/* Payment Info Box */}
            <motion.div
              variants={itemVariants}
              className="mb-8 p-6 rounded-lg bg-amber-950/60 border border-amber-500/50"
            >
              <h3 className="text-xl font-semibold text-amber-300 mb-3">
                💳 Payment Information
              </h3>
              <div className="space-y-3 text-amber-100/90">
                <p>
                  <span className="font-semibold">Segment:</span> {selectedSegment}
                </p>
                <p>
                  <span className="font-semibold">Amount: </span>৳{segmentAmount}
                  {segmentType === "solo" && (
                    <span className="text-amber-200 font-bold"> (This Amount is for per person)</span>
                  )}
                  {segmentType === "team" && (
                    <span className="text-amber-200 font-bold"> (Base amount for 3 members)</span>
                  )}
                </p>

                {segmentType === "team" && (
                  <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-4 mt-4">
                    <p className="text-sm text-amber-100">
                      <span className="font-semibold text-amber-300">Pricing Breakdown:</span>
                    </p>
                    <ul className="text-sm text-amber-100 mt-2 space-y-1 ml-2">
                      <li>• Base registration includes <span className="font-semibold">3 team members</span></li>
                      <li>• Team may include up to <span className="font-semibold">6 members</span> total</li>
                      <li>• Each additional member beyond 3: <span className="font-semibold">৳{extraMemberAmount}</span> per member</li>
                    </ul>
                  </div>
                )}

                <div className="border-t border-amber-500/20 pt-3 mt-3">
                  <p className="font-semibold mb-2">Payment Numbers:</p>
                  <div className="space-y-2 ml-4">
                    <p>
                      <span className="font-semibold">Bkash:</span>{" "}
                      <span className="text-amber-300">{paymentNumbers.bkash || "Loading..."}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Nagad:</span>{" "}
                      <span className="text-amber-300">{paymentNumbers.nagad || "Loading..."}</span>
                    </p>
                  </div>
                </div>

                <p className="text-sm text-amber-200/60 pt-3 border-t border-amber-500/20">
                  Send money to your selected payment method and provide the transaction ID below
                </p>
              </div>
            </motion.div>

            {/* Benefits Box */}
            {segmentType === "solo" && (
              <motion.div
                variants={itemVariants}
                className="mb-8 p-6 rounded-lg bg-amber-950/60 border border-amber-500/50"
              >
                <h3 className="text-xl font-semibold text-amber-300 mb-4">
                  🎁 What will you get?
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 text-amber-100/90">
                    <span className="text-green-400 font-bold mt-0.5">✅</span>
                    <span>Participation Certificates for All Members</span>
                  </li>
                  <li className="flex items-start gap-3 text-amber-100/90">
                    <span className="text-green-400 font-bold mt-0.5">✅</span>
                    <span>Access to Networking & Learning Sessions with Tech Enthusiasts across AUST</span>
                  </li>
                  <li className="flex items-start gap-3 text-amber-100/90">
                    <span className="text-green-400 font-bold mt-0.5">✅</span>
                    <span>A Complete Robotics Competition Experience</span>
                  </li>
                  <li className="flex items-start gap-3 text-amber-100/90">
                    <span className="text-green-400 font-bold mt-0.5">✅</span>
                    <span>Recognition & Awards for Top-Performing Teams</span>
                  </li>
                  <li className="flex items-start gap-3 text-amber-100/90">
                    <span className="text-green-400 font-bold mt-0.5">✅</span>
                    <span>Participants will get Snacks</span>
                  </li>
                </ul>
              </motion.div>
            )}

            {segmentType === "team" && (
              <motion.div
                variants={itemVariants}
                className="mb-8 p-6 rounded-lg bg-amber-950/60 border border-amber-500/50"
              >
                <h3 className="text-xl font-semibold text-amber-300 mb-4">
                  🎁 What will you get?
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 text-amber-100/90">
                    <span className="text-green-400 font-bold mt-0.5">✅</span>
                    <span>Official Event T-Shirt</span>
                  </li>
                  <li className="flex items-start gap-3 text-amber-100/90">
                    <span className="text-green-400 font-bold mt-0.5">✅</span>
                    <span>Participation Certificates for All Members</span>
                  </li>
                  <li className="flex items-start gap-3 text-amber-100/90">
                    <span className="text-green-400 font-bold mt-0.5">✅</span>
                    <span>Access to Networking & Learning Sessions with Tech Enthusiasts across AUST</span>
                  </li>
                  <li className="flex items-start gap-3 text-amber-100/90">
                    <span className="text-green-400 font-bold mt-0.5">✅</span>
                    <span>A Complete Robotics Competition Experience</span>
                  </li>
                  <li className="flex items-start gap-3 text-amber-100/90">
                    <span className="text-green-400 font-bold mt-0.5">✅</span>
                    <span>Recognition & Awards for Top-Performing Teams</span>
                  </li>
                  <li className="flex items-start gap-3 text-amber-100/90">
                    <span className="text-green-400 font-bold mt-0.5">✅</span>
                    <span>Participants will get Snacks and Lunch</span>
                  </li>
                </ul>
              </motion.div>
            )}

            {/* Form */}
            <motion.form
              variants={itemVariants}
              onSubmit={segmentType === "solo" ? handleSoloSubmit : handleTeamSubmit}
              className="backdrop-blur-xl bg-amber-950/30 border border-amber-500/30 rounded-2xl p-8 md:p-12 shadow-2xl"
              style={{
                boxShadow:
                  "0 0 30px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(251, 191, 36, 0.1)",
              }}
            >
              {/* Message */}
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

              {/* SOLO FORM */}
              {segmentType === "solo" && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <TextInput
                      label="Name"
                      name="name"
                      value={soloData.name}
                      onChange={handleSoloInputChange}
                      placeholder="Your full name"
                      error={soloErrors.name}
                    />
                    <TextInput
                      label="Email"
                      name="email"
                      type="email"
                      value={soloData.email}
                      onChange={handleSoloInputChange}
                      placeholder="your@email.com"
                      error={soloErrors.email}
                    />
                    <TextInput
                      label="Educational Email"
                      name="eduMail"
                      type="email"
                      value={soloData.eduMail}
                      onChange={handleSoloInputChange}
                      placeholder="your@aust.edu"
                      error={soloErrors.eduMail}
                    />
                    <TextInput
                      label="AUST Student ID"
                      name="austStudentId"
                      value={soloData.austStudentId}
                      onChange={handleSoloInputChange}
                      placeholder="Your Student ID"
                      error={soloErrors.austStudentId}
                    />
                    <SelectDropdown
                      label="Department"
                      value={soloData.department}
                      options={departments}
                      onChange={(val) => handleSoloSelectChange("department", val)}
                      error={soloErrors.department}
                      isOpen={dropdownOpen.department}
                      onToggle={() =>
                        setDropdownOpen((prev) => ({
                          ...prev,
                          department: !prev.department,
                        }))
                      }
                    />
                    <SelectDropdown
                      label="Year/Semester"
                      value={soloData.semester}
                      options={semesters}
                      onChange={(val) => handleSoloSelectChange("semester", val)}
                      error={soloErrors.semester}
                      isOpen={dropdownOpen.semester}
                      onToggle={() =>
                        setDropdownOpen((prev) => ({
                          ...prev,
                          semester: !prev.semester,
                        }))
                      }
                    />
                    <TextInput
                      label="Phone Number"
                      name="phoneNumber"
                      type="tel"
                      value={soloData.phoneNumber}
                      onChange={handleSoloInputChange}
                      placeholder="+880 1XXXXXXXXX"
                      error={soloErrors.phoneNumber}
                    />
                    <div>
                      <TextInput
                        label="AUSTRC ID"
                        name="austrcId"
                        value={soloData.austrcId}
                        onChange={handleSoloInputChange}
                        placeholder="Your AUSTRC ID"
                        error={soloErrors.austrcId}
                      />
                      <p className="text-xs text-amber-300/70 mt-1 italic">If you do not have an AUSTRC ID, please enter 'N/A'</p>
                    </div>
                    <SelectDropdown
                      label="T-Shirt Size"
                      value={soloData.tShirtSize}
                      options={tShirtSizes}
                      onChange={(val) => handleSoloSelectChange("tShirtSize", val)}
                      error={soloErrors.tShirtSize}
                      isOpen={dropdownOpen.tShirtSize}
                      onToggle={() =>
                        setDropdownOpen((prev) => ({
                          ...prev,
                          tShirtSize: !prev.tShirtSize,
                        }))
                      }
                    />
                    <SelectDropdown
                      label="Payment Method"
                      value={soloData.paymentMethod}
                      options={paymentMethods}
                      onChange={(val) => handleSoloSelectChange("paymentMethod", val)}
                      error={soloErrors.paymentMethod}
                      isOpen={dropdownOpen.paymentMethod}
                      onToggle={() =>
                        setDropdownOpen((prev) => ({
                          ...prev,
                          paymentMethod: !prev.paymentMethod,
                        }))
                      }
                    />
                    <TextInput
                      label="Transaction ID"
                      name="transactionId"
                      value={soloData.transactionId}
                      onChange={handleSoloInputChange}
                      placeholder="Your transaction ID"
                      error={soloErrors.transactionId}
                    />
                    <TextInput
                      label="Your Payment Number"
                      name="senderPaymentNumber"
                      type="tel"
                      value={soloData.senderPaymentNumber}
                      onChange={handleSoloInputChange}
                      placeholder="01XXXXXXXXX"
                      error={soloErrors.senderPaymentNumber}
                    />
                  </div>

                  <div>
                    <label className="block text-amber-200 font-semibold mb-2">
                      Have you already enrolled in another segment?{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="flex gap-4">
                      {enrollmentOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            handleSoloSelectChange("previousEnrollment", option)
                          }
                          className={`flex-1 px-4 py-3 rounded-lg border transition-all duration-300 font-semibold ${
                            soloData.previousEnrollment === option
                              ? "bg-amber-500/30 border-amber-400 text-amber-300"
                              : "bg-amber-950/50 border-amber-500/30 text-amber-100 hover:border-amber-500/50"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {soloErrors.previousEnrollment && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm mt-1"
                      >
                        {soloErrors.previousEnrollment}
                      </motion.p>
                    )}
                  </div>

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
                      "Complete Registration"
                    )}
                  </motion.button>
                </div>
              )}

              {/* TEAM FORM */}
              {segmentType === "team" && (
                <div className="space-y-8">
                  {/* Team Info */}
                  <div className="border-b border-amber-500/30 pb-6">
                    <h3 className="text-xl font-bold text-amber-300 mb-4">
                      Team Information
                    </h3>
                    <TextInput
                      label="Team Name"
                      name="teamName"
                      value={teamData.teamName}
                      onChange={(e) => handleTeamInputChange(e)}
                      placeholder="Your team name"
                      error={teamErrors.teamName}
                    />
                  </div>

                  {/* Team Leader */}
                  <div className="border-b border-amber-500/30 pb-6">
                    <h3 className="text-xl font-bold text-amber-300 mb-4">
                      Team Leader Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <TextInput
                        label="Name"
                        name="name"
                        value={teamData.teamLeader.name}
                        onChange={(e) => handleTeamInputChange(e)}
                        placeholder="Full name"
                        error={teamErrors.leaderName}
                      />
                      <TextInput
                        label="Email"
                        name="email"
                        type="email"
                        value={teamData.teamLeader.email}
                        onChange={(e) => handleTeamInputChange(e)}
                        placeholder="your@email.com"
                        error={teamErrors.leaderEmail}
                      />
                      <TextInput
                        label="Educational Email"
                        name="eduMail"
                        type="email"
                        value={teamData.teamLeader.eduMail}
                        onChange={(e) => handleTeamInputChange(e)}
                        placeholder="your@aust.edu"
                        error={teamErrors.leaderEduMail}
                      />
                      <TextInput
                        label="AUST Student ID"
                        name="austStudentId"
                        value={teamData.teamLeader.austStudentId}
                        onChange={(e) => handleTeamInputChange(e)}
                        placeholder="Your Student ID"
                        error={teamErrors.leaderAustStudentId}
                      />
                      <SelectDropdown
                        label="Department"
                        value={teamData.teamLeader.department}
                        options={departments}
                        onChange={(val) =>
                          handleTeamSelectChange("department", val)
                        }
                        error={teamErrors.leaderDepartment}
                        isOpen={dropdownOpen.leaderDepartment}
                        onToggle={() =>
                          setDropdownOpen((prev) => ({
                            ...prev,
                            leaderDepartment: !prev.leaderDepartment,
                          }))
                        }
                      />
                      <SelectDropdown
                        label="Year/Semester"
                        value={teamData.teamLeader.semester}
                        options={semesters}
                        onChange={(val) =>
                          handleTeamSelectChange("semester", val)
                        }
                        error={teamErrors.leaderSemester}
                        isOpen={dropdownOpen.leaderSemester}
                        onToggle={() =>
                          setDropdownOpen((prev) => ({
                            ...prev,
                            leaderSemester: !prev.leaderSemester,
                          }))
                        }
                      />
                      <TextInput
                        label="Phone Number"
                        name="phoneNumber"
                        type="tel"
                        value={teamData.teamLeader.phoneNumber}
                        onChange={(e) => handleTeamInputChange(e)}
                        placeholder="+880 1XXXXXXXXX"
                        error={teamErrors.leaderPhoneNumber}
                      />
                      <div>
                        <TextInput
                          label="AUSTRC ID"
                          name="austrcId"
                          value={teamData.teamLeader.austrcId}
                          onChange={(e) => handleTeamInputChange(e)}
                          placeholder="Your AUSTRC ID"
                          error={teamErrors.leaderAustrcId}
                        />
                        <p className="text-xs text-amber-300/70 mt-1 italic">If you do not have an AUSTRC ID, please enter 'N/A'</p>
                      </div>
                      <SelectDropdown
                        label="T-Shirt Size"
                        value={teamData.teamLeader.tShirtSize}
                        options={tShirtSizes}
                        onChange={(val) =>
                          handleTeamSelectChange("tShirtSize", val)
                        }
                        error={teamErrors.leaderTShirtSize}
                        isOpen={dropdownOpen.leaderTShirtSize}
                        onToggle={() =>
                          setDropdownOpen((prev) => ({
                            ...prev,
                            leaderTShirtSize: !prev.leaderTShirtSize,
                          }))
                        }
                      />
                    </div>
                  </div>

                  {/* Team Members */}
                  {teamData.teamMembers.map((member, idx) => (
                    <div key={idx} className="border-b border-amber-500/30 pb-6">
                      <h3 className="text-xl font-bold text-amber-300 mb-4">
                        Team Member {idx + 1}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <TextInput
                          label="Name"
                          name="name"
                          value={member.name}
                          onChange={(e) => handleTeamInputChange(e, idx)}
                          placeholder="Full name"
                          error={teamErrors[`member${idx}Name`]}
                        />
                        <TextInput
                          label="Email"
                          name="email"
                          type="email"
                          value={member.email}
                          onChange={(e) => handleTeamInputChange(e, idx)}
                          placeholder="your@email.com"
                          error={teamErrors[`member${idx}Email`]}
                        />
                        <TextInput
                          label="Educational Email"
                          name="eduMail"
                          type="email"
                          value={member.eduMail}
                          onChange={(e) => handleTeamInputChange(e, idx)}
                          placeholder="your@aust.edu"
                          error={teamErrors[`member${idx}EduMail`]}
                        />
                        <TextInput
                          label="AUST Student ID"
                          name="austStudentId"
                          value={member.austStudentId}
                          onChange={(e) => handleTeamInputChange(e, idx)}
                          placeholder="Your Student ID"
                          error={teamErrors[`member${idx}AustStudentId`]}
                        />
                        <SelectDropdown
                          label="Department"
                          value={member.department}
                          options={departments}
                          onChange={(val) =>
                            handleTeamSelectChange("department", val, idx)
                          }
                          error={teamErrors[`member${idx}Department`]}
                          isOpen={dropdownOpen[`member${idx}Department`]}
                          onToggle={() =>
                            setDropdownOpen((prev) => ({
                              ...prev,
                              [`member${idx}Department`]: !prev[
                                `member${idx}Department`
                              ],
                            }))
                          }
                        />
                        <SelectDropdown
                          label="Year/Semester"
                          value={member.semester}
                          options={semesters}
                          onChange={(val) =>
                            handleTeamSelectChange("semester", val, idx)
                          }
                          error={teamErrors[`member${idx}Semester`]}
                          isOpen={dropdownOpen[`member${idx}Semester`]}
                          onToggle={() =>
                            setDropdownOpen((prev) => ({
                              ...prev,
                              [`member${idx}Semester`]: !prev[
                                `member${idx}Semester`
                              ],
                            }))
                          }
                        />
                        <TextInput
                          label="Phone Number"
                          name="phoneNumber"
                          type="tel"
                          value={member.phoneNumber}
                          onChange={(e) => handleTeamInputChange(e, idx)}
                          placeholder="+880 1XXXXXXXXX"
                          error={teamErrors[`member${idx}PhoneNumber`]}
                        />
                        <div>
                          <TextInput
                            label="AUSTRC ID"
                            name="austrcId"
                            value={member.austrcId}
                            onChange={(e) => handleTeamInputChange(e, idx)}
                            placeholder="Your AUSTRC ID"
                            error={teamErrors[`member${idx}AustrcId`]}
                          />
                          <p className="text-xs text-amber-300/70 mt-1 italic">If you do not have an AUSTRC ID, please enter 'N/A'</p>
                        </div>
                        <SelectDropdown
                          label="T-Shirt Size"
                          value={member.tShirtSize}
                          options={tShirtSizes}
                          onChange={(val) =>
                            handleTeamSelectChange("tShirtSize", val, idx)
                          }
                          error={teamErrors[`member${idx}TShirtSize`]}
                          isOpen={dropdownOpen[`member${idx}TShirtSize`]}
                          onToggle={() =>
                            setDropdownOpen((prev) => ({
                              ...prev,
                              [`member${idx}TShirtSize`]: !prev[
                                `member${idx}TShirtSize`
                              ],
                            }))
                          }
                        />
                      </div>
                    </div>
                  ))}

                  {/* Payment & Common Fields */}
                  <div>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <SelectDropdown
                        label="Payment Method"
                        value={teamData.paymentMethod}
                        options={paymentMethods}
                        onChange={(val) =>
                          setTeamData((prev) => ({
                            ...prev,
                            paymentMethod: val,
                          }))
                        }
                        error={teamErrors.paymentMethod}
                        isOpen={dropdownOpen.paymentMethod}
                        onToggle={() =>
                          setDropdownOpen((prev) => ({
                            ...prev,
                            paymentMethod: !prev.paymentMethod,
                          }))
                        }
                      />
                      <TextInput
                        label="Transaction ID"
                        name="transactionId"
                        value={teamData.transactionId}
                        onChange={(e) => handleTeamInputChange(e)}
                        placeholder="Your transaction ID"
                        error={teamErrors.transactionId}
                      />
                      <TextInput
                        label="Your Payment Number"
                        name="senderPaymentNumber"
                        type="tel"
                        value={teamData.senderPaymentNumber}
                        onChange={(e) => handleTeamInputChange(e)}
                        placeholder="01XXXXXXXXX"
                        error={teamErrors.senderPaymentNumber}
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-amber-200 font-semibold mb-2">
                        Have you already enrolled in another segment?{" "}
                        <span className="text-red-400">*</span>
                      </label>
                      <div className="flex gap-4">
                        {enrollmentOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              setTeamData((prev) => ({
                                ...prev,
                                previousEnrollment: option,
                              }))
                            }
                            className={`flex-1 px-4 py-3 rounded-lg border transition-all duration-300 font-semibold ${
                              teamData.previousEnrollment === option
                                ? "bg-amber-500/30 border-amber-400 text-amber-300"
                                : "bg-amber-950/50 border-amber-500/30 text-amber-100 hover:border-amber-500/50"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {teamErrors.previousEnrollment && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-400 text-sm mt-1"
                        >
                          {teamErrors.previousEnrollment}
                        </motion.p>
                      )}
                    </div>
                  </div>

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
                      "Complete Team Registration"
                    )}
                  </motion.button>
                </div>
              )}
            </motion.form>
          </motion.div>
        </div>
      )}
    </>
  );
}
