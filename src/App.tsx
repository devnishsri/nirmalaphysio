import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  ShieldAlert,
  Disc,
  Undo2,
  FlameKindling,
  TrendingDown,
  Sparkles,
  Smile,
  Navigation,
  Zap,
  Baby,
  RefreshCw,
  Workflow,
  Dumbbell,
  Gauge,
  Phone,
  MapPin,
  Check,
  ChevronDown,
  Send,
  Globe,
  Award,
  Home,
  Calendar,
  Clock,
  Loader2,
  ArrowRight,
  AlertCircle,
  Search,
  MessageSquare,
  HelpCircle,
  Copy,
  ChevronRight
} from "lucide-react";
import { CLINIC_DATA, TREATMENTS, FAQS, Treatment } from "./data";

// Helper to map icon names to Lucide icons
function getTreatmentIcon(iconName: string) {
  const css = "w-5 h-5 text-teal-600 flex-shrink-0";
  switch (iconName) {
    case "Activity": return <Activity className={css} />;
    case "ShieldAlert": return <ShieldAlert className={css} />;
    case "Disc": return <Disc className={css} />;
    case "Undo2": return <Undo2 className={css} />;
    case "FlameKindling": return <FlameKindling className={css} />;
    case "TrendingDown": return <TrendingDown className={css} />;
    case "Sparkles": return <Sparkles className={css} />;
    case "Smile": return <Smile className={css} />;
    case "Navigation": return <Navigation className={css} />;
    case "Zap": return <Zap className={css} />;
    case "Baby": return <Baby className={css} />;
    case "RefreshCw": return <RefreshCw className={css} />;
    case "Workflow": return <Workflow className={css} />;
    case "Dumbbell": return <Dumbbell className={css} />;
    case "Gauge": return <Gauge className={css} />;
    default: return <Activity className={css} />;
  }
}

export default function App() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "ortho-spine" | "neuro" | "general">("all");
  
  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formAge, setFormAge] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formPainArea, setFormPainArea] = useState("");
  const [formDuration, setFormDuration] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formConsultType, setFormConsultType] = useState<"clinic" | "home">("clinic");
  const [formPreferredTime, setFormPreferredTime] = useState("");

  // Drafting and response states
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftResult, setDraftResult] = useState("");
  const [draftMode, setDraftMode] = useState<"ai" | "fallback" | "">("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);

  // Body areas for quick symptom selection
  const bodyPainShortcuts = useMemo(() => [
    { labelEn: "Lower Back / Spine", labelHi: "कमर और रीढ़", value: "Lower Back Pain / Spine issues" },
    { labelEn: "Neck / Cervical", labelHi: "गर्दन / सर्वाइकल", value: "Neck Pain / Cervical Spondylosis" },
    { labelEn: "Shoulder Stiffness", labelHi: "कंधे की जकड़न", value: "Frozen Shoulder / Shoulder pain" },
    { labelEn: "Knee / Joint Pain", labelHi: "घुटने / जोड़ों का दर्द", value: "Joint Pain & Stiffness" },
    { labelEn: "Stroke / Paralysis", labelHi: "लकवा / पैरालिसिस", value: "Stroke Rehab / Paralysis Recovery" },
    { labelEn: "Bell's Palsy (Face)", labelHi: "चेहरे का लकवा", value: "Bell's Palsy / Facial weakness" },
  ], []);

  // Filtered treatments list
  const filteredTreatments = useMemo(() => {
    return TREATMENTS.filter((t) => {
      const matchesCategory = activeCategory === "all" || t.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        t.titleEn.toLowerCase().includes(query) ||
        t.titleHi.toLowerCase().includes(query) ||
        t.descEn.toLowerCase().includes(query) ||
        t.descHi.toLowerCase().includes(query) ||
        t.symptomsEn.some((s) => s.toLowerCase().includes(query)) ||
        t.symptomsHi.some((s) => s.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  // Handle auto-populating symptom from cards
  const selectSymptom = (title: string) => {
    setFormPainArea(title);
    // Scroll smoothly to drafting form
    const formElement = document.getElementById("booking-drafter");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Submit drafting request and instantly open WhatsApp (dineconnect style)
  const handleGenerateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPainArea.trim()) {
      setErrorMsg(lang === "en" ? "Please fill in Patient Name and Pain Area." : "कृपया मरीज का नाम और मुख्य तकलीफ दर्ज करें।");
      return;
    }

    setErrorMsg("");
    setIsDrafting(true);

    try {
      // Format professional clinical message client-side
      const formattedMessage = lang === "en" ? `Respected Dr. Ritesh Agrahari (PT),

I would like to request an appointment/home visit at your clinic. Here are my details:

👤 Patient Name: ${formName}
🎂 Age: ${formAge || "N/A"} years
📞 Contact Phone: ${formPhone || "N/A"}
🩺 Primary Pain/Condition: ${formPainArea}
⏳ Duration of symptoms: ${formDuration || "N/A"}
📍 Consultation preference: ${formConsultType === "home" ? "Home Visit" : "Clinic Appointment"}
📅 Preferred Consultation Time: ${formPreferredTime || "N/A"}

📝 Additional details/comments:
${formDescription || "None"}

Sincerely,
${formName}` : `आदरणीय डॉ. रितेश अग्रहरी (PT),

मैं आपके क्लिनिक में अपॉइंटमेंट/होम विजिट के लिए अनुरोध करना चाहता हूँ। मेरे विवरण इस प्रकार हैं:

👤 मरीज का नाम: ${formName}
🎂 आयु: ${formAge || "N/A"} वर्ष
📞 संपर्क सूत्र: ${formPhone || "N/A"}
🩺 मुख्य दर्द / बीमारी: ${formPainArea}
⏳ तकलीफ की अवधि: ${formDuration || "N/A"}
📍 परामर्श का माध्यम: ${formConsultType === "home" ? "घर पर इलाज (Home Visit)" : "क्लिनिक अपॉइंटमेंट"}
📅 पसंदीदा समय: ${formPreferredTime || "N/A"}

📝 बीमारी का संक्षिप्त विवरण / टिप्पणी:
${formDescription || "कोई नहीं"}

सादर,
${formName}`;

      const formattedPhone = "91" + CLINIC_DATA.whatsappNumber; // Country code 91 for India
      const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(formattedMessage)}`;
      
      // Extremely robust in-memory <a> element click behavior to bypass iframe/popup blocks seamlessly
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(lang === "en" ? "Something went wrong. Please try again." : "कोई समस्या हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setIsDrafting(false);
    }
  };

  // Open deep link for WhatsApp
  const handleOpenWhatsApp = () => {
    if (!draftResult) return;
    const formattedPhone = "91" + CLINIC_DATA.whatsappNumber; // Country code 91 for India
    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(draftResult)}`;
    
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy draft to clipboard
  const handleCopyDraft = () => {
    navigator.clipboard.writeText(draftResult);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Upper Announcement Banner */}
      <div className="bg-neutral-900 text-teal-100 px-4 py-3 text-center text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase border-b border-neutral-800 flex items-center justify-center gap-2">
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse"></span>
        <span>{lang === "en" ? CLINIC_DATA.sloganEn : CLINIC_DATA.sloganHi}</span>
      </div>

      {/* Main Elegant Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            {/* Custom SVG logo resembling the card's orthopedic/home care logo */}
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-9 h-9">
                <path d="M 10,70 L 40,30 L 70,70" fill="none" stroke="#1b4e9b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 40,30 L 60,10 L 90,50" fill="none" stroke="#1b4e9b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="60" cy="10" r="7" fill="#dc2626" />
                <rect x="36" y="45" width="8" height="8" rx="1.5" fill="#171717" />
                <rect x="66" y="55" width="8" height="8" rx="1.5" fill="#171717" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="text-[12px] sm:text-base md:text-lg font-extrabold tracking-tight text-[#1b4e9b] font-display leading-tight">
                {lang === "en" ? (
                  <>
                    Nirmala Physiotherapy <span className="text-red-600 font-sans font-black">&amp;</span> Ortho-Neuro Rehabilitation Clinic
                  </>
                ) : (
                  <>
                    निर्मला फिजियोथेरेपी <span className="text-red-600 font-sans font-black">&amp;</span> ऑर्थो-न्यूरो रिहैबिलिटेशन क्लिनिक
                  </>
                )}
              </h1>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-neutral-500 font-bold mt-0.5 flex items-center gap-1.5 flex-wrap">
                <span className="text-[#1b4e9b] font-extrabold">Dr. Ritesh Agrahari (PT)</span>
                <span className="text-neutral-300">•</span>
                <span className="text-neutral-400 font-medium">{lang === "en" ? "BPT, UPUMS Saifai PGI" : "बी.पी.टी., यू.पी.यू.एम.एस. सैफई पी.जी.आई."}</span>
                <span className="text-neutral-300">•</span>
                <span className="text-teal-600 font-semibold">{CLINIC_DATA.regNo}</span>
              </p>
            </div>
          </div>

          {/* Quick Action Navigation & Language Switcher */}
          <div className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-widest">
            {/* Bilingual Toggle Button */}
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-neutral-200 bg-white hover:border-black text-neutral-800 cursor-pointer transition-colors"
              title="Switch Language"
              id="lang-toggle"
            >
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>{lang === "en" ? "हिन्दी" : "English"}</span>
            </button>

            {/* Quick Consultation CTAs */}
            <a
              href="#booking-drafter"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded text-neutral-900 hover:border-black bg-white transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              <span>{lang === "en" ? "Book Now" : "अपॉइंटमेंट"}</span>
            </a>
          </div>
        </div>

        {/* PC Navbar (Below the main division, visible only on PC/desktop) */}
        <motion.div 
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="hidden md:block border-t border-neutral-100/60 bg-white/40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              {[
                { id: 0, href: "#about", en: "About Doctor", hi: "चिकित्सक के बारे में" },
                { id: 1, href: "#treatments", en: "Specialties", hi: "विशेष उपचार" },
                { id: 2, href: "#booking-drafter", en: "Inquiry Drafter", hi: "सत्र ड्राफ्टर" },
                { id: 3, href: "#faqs", en: "Patient FAQs", hi: "अक्सर पूछे जाने वाले प्रश्न" },
                { id: 4, href: "#contact", en: "Contact & Timing", hi: "संपर्क सूत्र" }
              ].map((item) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className="relative px-3 py-1.5 transition-colors duration-200 text-neutral-500 hover:text-teal-700 rounded-sm"
                >
                  <span className="relative z-10">{lang === "en" ? item.en : item.hi}</span>
                  {hoveredNav === item.id && (
                    <motion.span
                      layoutId="navHoverPill"
                      className="absolute inset-0 bg-teal-50/50 rounded-sm z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            <div className="text-[10px] font-mono font-medium text-neutral-400 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{lang === "en" ? "HOME CARE VISIT SPECIALIST" : "घर पर इलाज उपलब्ध"}</span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Premium Minimal Hero Section */}
      <section id="about" className="relative overflow-hidden bg-white border-b border-neutral-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              {/* Specialized Badge */}
              <div className="inline-block">
                <span className="text-xs font-bold text-teal-600 uppercase tracking-[0.2em] mb-4 block">
                  Movement is Medicine
                </span>
                <span className="text-[10px] font-semibold text-neutral-400 tracking-wider block font-mono">
                  BPT, MSMF Saifai PGI • Regd. No. 2346
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-neutral-900">
                {lang === "en" ? (
                  <>
                    Precision care for the <span className="italic font-serif text-teal-600">active human.</span>
                  </>
                ) : (
                  <>
                    रीढ़ की हड्डी और नसों का <span className="italic font-serif text-teal-600">बिना ऑपरेशन</span> व स्थायी इलाज।
                  </>
                )}
              </h2>

              {/* Tagline / Subtitle */}
              <p className="text-neutral-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                {lang === "en"
                  ? "Evidence-based physical therapy designed to restore function and optimize performance under the supervision of Dr. Ritesh Agrahari (PT), offering dedicated home care in Jaunpur."
                  : "डॉ. रितेश अग्रहरी (PT) के कुशल मार्गदर्शन में जौनपुर में आधुनिक थेरेपी और होम विजिट (घर पर इलाज) की विशेष सुविधाओं के साथ अपने जीवन को पुनः दर्दमुक्त व सक्रिय बनाएं।"}
              </p>

              {/* Credentials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left max-w-xl mx-auto lg:mx-0">
                <div className="flex items-start gap-4 bg-neutral-50 p-5 rounded-lg border border-neutral-100">
                  <div className="p-2 rounded bg-white text-teal-600 border border-neutral-100">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">{lang === "en" ? "Academic Excellence" : "शैक्षणिक अनुभव"}</h4>
                    <p className="text-sm font-medium text-neutral-800 mt-1">Saifai PGI Alumni</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-neutral-50 p-5 rounded-lg border border-neutral-100">
                  <div className="p-2 rounded bg-white text-teal-600 border border-neutral-100">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">{lang === "en" ? "Dedicated Home Care" : "घर पर इलाज"}</h4>
                    <p className="text-sm font-medium text-neutral-800 mt-1">{lang === "en" ? "Direct Home Visit Visits" : "घर पर ही फिजियोथेरेपी"}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                <a
                  href="#booking-drafter"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded text-xs uppercase tracking-[0.2em] shadow-lg shadow-teal-100 transition duration-150"
                >
                  <span>{lang === "en" ? "Draft Your Session" : "पूछताछ संदेश बनाएं"}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={`https://wa.me/91${CLINIC_DATA.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-neutral-200 text-neutral-800 hover:border-black py-4 px-8 rounded text-xs font-bold uppercase tracking-[0.15em] transition duration-150"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>+91 7905431134</span>
                </a>
              </div>
            </div>

            {/* Doctor Card Profile */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-neutral-100 p-8 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full opacity-40"></div>
                
                {/* Doctor Bio Details */}
                <div className="flex items-center gap-4 border-b border-neutral-100 pb-5">
                  <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-800 flex items-center justify-center font-bold text-lg border border-neutral-100 shadow-inner flex-shrink-0 font-display">
                    RA
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-neutral-900 leading-tight">
                      {CLINIC_DATA.doctorName}
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-teal-600 mt-0.5">
                      {lang === "en" ? CLINIC_DATA.title : "सलाहकार फिजियोथेरेपिस्ट"}
                    </p>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">{CLINIC_DATA.regNo}</p>
                  </div>
                </div>

                {/* Academic Background / Experience */}
                <div className="space-y-4 pt-5">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{lang === "en" ? "Qualifications" : "योग्यता"}</p>
                    <p className="text-xs font-medium text-neutral-800">
                      BPT (Bachelor of Physiotherapy), MSMF Saifai PGI
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{lang === "en" ? "Experience & History" : "पूर्व अनुभव"}</p>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {lang === "en" ? CLINIC_DATA.formerly : "पूर्व फिजियोथेरेपिस्ट: ऑर्थो एंड न्यूरो रिहैबिलिटेशन हॉस्पिटल (भरतपुर, राजस्थान)"}
                    </p>
                  </div>

                  {/* Core Focus Badge */}
                  <div className="bg-neutral-50 border border-neutral-100 rounded-lg p-3 text-xs text-neutral-600 flex items-start gap-2">
                    <span className="text-teal-600 font-bold mt-0.5">●</span>
                    <div>
                      <span className="font-bold text-neutral-800">{lang === "en" ? "Specialty: " : "विशेषज्ञता: "}</span>
                      {lang === "en" 
                        ? "Non-surgical spine decompressions, chronic arthritis management, paralysis mobility rehabilitation, and pediatric motor developments."
                        : "बिना ऑपरेशन रीढ़ की हड्डी व नसों का सिकाई/व्यायाम उपचार, जोड़ों की अकड़न, एवं लकवा ग्रस्त अंगों की गतिशीलता बढ़ाना।"}
                    </div>
                  </div>
                </div>

                {/* Small Interactive Contact Badge */}
                <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500">
                  <span className="inline-flex items-center gap-1 font-medium text-[11px] uppercase tracking-wider text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-neutral-300" />
                    Naiganj, Jaunpur
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-neutral-800 font-semibold bg-neutral-50 border border-neutral-100 px-2.5 py-1 rounded">
                    <Phone className="w-3 h-3 text-teal-600" />
                    7905431134
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Treatment Catalog & Exploration Section */}
      <section id="treatments" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-[0.2em]">
            {lang === "en" ? "Areas of Practice" : "उपचार की सेवाएं"}
          </p>
          <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-900 font-display">
            {lang === "en" ? (
              <>
                Comprehensive <span className="italic font-serif">rehabilitation services</span>
              </>
            ) : (
              <>
                व्यापक ऑर्थो-न्यूरो फिजियोथेरेपी चिकित्सा
              </>
            )}
          </h3>
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-bold mt-2">
            {lang === "en"
              ? "Select an issue or symptom below to automatically pre-fill your consult request."
              : "नीचे दी गई बीमारियों में से किसी एक पर क्लिक करके सीधे अपॉइंटमेंट ड्राफ्ट फॉर्म में शामिल करें।"}
          </p>
        </div>

        {/* Categories, Search, Filters Container */}
        <div className="bg-white rounded-lg border border-neutral-100 p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-[11px] font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded transition-colors cursor-pointer ${
                activeCategory === "all"
                  ? "bg-teal-600 text-white"
                  : "bg-neutral-50 hover:bg-neutral-100 text-neutral-600"
              }`}
            >
              {lang === "en" ? "All Conditions" : "सभी बीमारियां"}
            </button>
            <button
              onClick={() => setActiveCategory("ortho-spine")}
              className={`px-4 py-2 rounded transition-colors cursor-pointer ${
                activeCategory === "ortho-spine"
                  ? "bg-teal-600 text-white"
                  : "bg-neutral-50 hover:bg-neutral-100 text-neutral-600"
              }`}
            >
              {lang === "en" ? "Spine & Joint" : "रीढ़ एवं जोड़"}
            </button>
            <button
              onClick={() => setActiveCategory("neuro")}
              className={`px-4 py-2 rounded transition-colors cursor-pointer ${
                activeCategory === "neuro"
                  ? "bg-teal-600 text-white"
                  : "bg-neutral-50 hover:bg-neutral-100 text-neutral-600"
              }`}
            >
              {lang === "en" ? "Neurological" : "न्यूरो / लकवा"}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder={lang === "en" ? "Search symptoms..." : "लक्षण खोजें..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded border border-neutral-200 text-xs tracking-wide focus:border-teal-500 focus:outline-none bg-[#fafafa]"
              id="search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-[10px] text-neutral-400 hover:text-neutral-600 cursor-pointer uppercase tracking-wider font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Empty Search State */}
        {filteredTreatments.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg border border-neutral-100 max-w-lg mx-auto">
            <HelpCircle className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700">No matching conditions found</h4>
            <p className="text-xs text-neutral-400 mt-1">Try searching for other words like back pain, palsy, joint stiffness.</p>
          </div>
        )}

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-lg border border-neutral-100 hover:border-neutral-300 transition-all p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Icon & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded bg-teal-50 text-teal-600 border border-neutral-100 group-hover:bg-teal-600 group-hover:text-white transition-all duration-150">
                    {getTreatmentIcon(t.iconName)}
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.15em] font-bold bg-neutral-50 border border-neutral-100 px-2.5 py-1 rounded text-neutral-500">
                    {t.category === "ortho-spine" 
                      ? (lang === "en" ? "Ortho & Spine" : "ऑर्थो व स्पाइन")
                      : t.category === "neuro" 
                        ? (lang === "en" ? "Neuro Rehab" : "न्यूरो रिहैब")
                        : (lang === "en" ? "General Care" : "सामान्य देखभाल")}
                  </span>
                </div>

                {/* Treatment Title (Both En & Hi dynamically layouted) */}
                <h4 className="text-sm font-semibold text-neutral-900 tracking-tight leading-none group-hover:text-teal-700 transition duration-150">
                  {lang === "en" ? t.titleEn : t.titleHi}
                  {lang === "en" ? (
                    <span className="block text-[10px] text-neutral-400 font-medium mt-1 uppercase tracking-wider">{t.titleHi}</span>
                  ) : (
                    <span className="block text-[10px] text-neutral-400 font-medium mt-1 uppercase tracking-wider">{t.titleEn}</span>
                  )}
                </h4>

                {/* Treatment Description */}
                <p className="text-xs text-neutral-500 mt-4 leading-relaxed">
                  {lang === "en" ? t.descEn : t.descHi}
                </p>

                {/* Symptoms Bullets */}
                <div className="mt-5 pt-4 border-t border-neutral-50 space-y-1.5">
                  <p className="text-[9px] uppercase font-bold tracking-[0.15em] text-neutral-400">
                    {lang === "en" ? "Typical Symptoms" : "प्रमुख लक्षण"}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === "en" ? t.symptomsEn : t.symptomsHi).map((sym, index) => (
                      <span
                        key={index}
                        className="bg-neutral-55 border border-neutral-100 rounded px-2 py-0.5 text-[9px] font-semibold tracking-wide text-neutral-600"
                      >
                        {sym}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link to book symptom */}
              <div className="mt-6 pt-4 border-t border-neutral-50">
                <button
                  onClick={() => selectSymptom(lang === "en" ? t.titleEn : t.titleHi)}
                  className="w-full text-center inline-flex items-center justify-center gap-1.5 py-2.5 border border-neutral-200 hover:border-black text-neutral-800 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer bg-white"
                >
                  <span>{lang === "en" ? "Select for Draft" : "ड्राफ्ट हेतु चुनें"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Interactive Smart Consultation Drafter & Form Section */}
      <section className="bg-white border-y border-neutral-100 py-16 md:py-24" id="booking-drafter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Explanatory Content & Short-cuts */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs font-bold text-teal-600 uppercase tracking-[0.2em]">
                {lang === "en" ? "Digital Intake" : "डिजिटल फॉर्म"}
              </p>
              
              <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-900 font-display">
                {lang === "en" ? (
                  <>
                    Intelligent <span className="italic font-serif">intake drafting</span>
                  </>
                ) : (
                  <>
                    स्मार्ट एआई व्हाट्सएप ड्राफ्टिंग
                  </>
                )}
              </h3>

              <p className="text-xs uppercase tracking-widest text-neutral-400 font-bold mt-2 leading-relaxed">
                {lang === "en"
                  ? "Organize clinical details into a concise clinical presentation. Our backend parses the text so Dr. Ritesh has prior awareness of your condition before consultation."
                  : "व्हाट्सएप चैट शुरू करने से पहले अपनी चिकित्सकीय जानकारी को एक पेशेवर संदेश में बदलें। हमारा सर्वर-साइड एआई सहायक विवरणों को इस प्रकार व्यवस्थित करेगा कि डॉ. रितेश आपकी समस्या तुरंत समझ सकें।"}
              </p>

              {/* Steps Layout */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-teal-50 border border-teal-100 text-teal-800 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-800">{lang === "en" ? "Enter Details" : "विवरण दर्ज करें"}</h5>
                    <p className="text-xs text-neutral-500 mt-0.5">{lang === "en" ? "Specify patient age, duration, pain areas, and remarks." : "नाम, आयु, दर्द वाले स्थान, दर्द की अवधि इत्यादि दर्ज करें।"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-teal-50 border border-teal-100 text-teal-800 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-800">{lang === "en" ? "AI Generation" : "जेमिनी ड्राफ्ट"}</h5>
                    <p className="text-xs text-neutral-500 mt-0.5">{lang === "en" ? "Our Gemini model structures clinical parameters." : "हमारा जेमिनी एआई संदेश को एक औपचारिक डॉक्टर नोट में बदल देगा।"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-teal-50 border border-teal-100 text-teal-800 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-800">{lang === "en" ? "WhatsApp Deep Link" : "व्हाट्सएप भेजें"}</h5>
                    <p className="text-xs text-neutral-500 mt-0.5">{lang === "en" ? "Send with one click to securely dispatch directly." : "एक क्लिक से डॉक्टर रितेश के व्हाट्सएप पर संदेश भेजें।"}</p>
                  </div>
                </div>
              </div>

              {/* Symptom Shortcuts Panel */}
              <div className="bg-neutral-50 border border-neutral-100 rounded-lg p-5 space-y-4">
                <h5 className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>{lang === "en" ? "Quick Symptoms" : "शीघ्र दर्द क्षेत्र चयन"}</span>
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {bodyPainShortcuts.map((shortcut, index) => (
                    <button
                      key={index}
                      onClick={() => setFormPainArea(shortcut.value)}
                      className="px-3 py-2 rounded border border-neutral-200 bg-white hover:border-black hover:bg-[#fafafa] text-neutral-700 text-[11px] font-semibold tracking-wide text-left cursor-pointer transition-colors"
                    >
                      {lang === "en" ? shortcut.labelEn : shortcut.labelHi}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Form & Preview Interface */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-neutral-100 rounded-lg p-6 md:p-8">
                
                {/* Form header */}
                <div className="flex items-center gap-3 border-b border-neutral-100 pb-5 mb-6">
                  <MessageSquare className="w-5 h-5 text-teal-600" />
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-950">
                      {lang === "en" ? "Intake Details" : "क्लिनिकल पूछताछ फॉर्म"}
                    </h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-teal-600 mt-1">
                      {lang === "en" ? "WhatsApp Integration Ready" : "व्हाट्सएप स्वचालित एकीकरण"}
                    </p>
                  </div>
                </div>

                {/* Form Element */}
                <form onSubmit={handleGenerateDraft} className="space-y-5">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded text-red-700 text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Patient Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 block mb-1.5">
                        {lang === "en" ? "Patient Name *" : "मरीज का नाम *"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-50 rounded border border-neutral-100 text-xs font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-teal-500 focus:ring-0 transition-colors"
                      />
                    </div>

                    {/* Patient Age */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 block mb-1.5">
                        {lang === "en" ? "Patient Age" : "मरीज की आयु"}
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 45"
                        value={formAge}
                        onChange={(e) => setFormAge(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-50 rounded border border-neutral-100 text-xs font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-teal-500 focus:ring-0 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Contact Phone */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 block mb-1.5">
                        {lang === "en" ? "Callback Contact (Optional)" : "कॉल बैक नंबर (वैकल्पिक)"}
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-50 rounded border border-neutral-100 text-xs font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-teal-500 focus:ring-0 transition-colors"
                      />
                    </div>

                    {/* Primary Symptom/Pain Area */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 block mb-1.5">
                        {lang === "en" ? "Primary Pain / Condition *" : "मुख्य दर्द / बीमारी *"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === "en" ? "e.g. Sciatica, Slip Disc, Joint Stiffness" : "जैसे- साइटिका, लकवा, घुटनों का दर्द"}
                        value={formPainArea}
                        onChange={(e) => setFormPainArea(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-50 rounded border border-neutral-100 text-xs font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-teal-500 focus:ring-0 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Symptom Duration */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 block mb-1.5">
                        {lang === "en" ? "Symptom Duration" : "तकलीफ की अवधि"}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2 weeks, 3 months"
                        value={formDuration}
                        onChange={(e) => setFormDuration(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-50 rounded border border-neutral-100 text-xs font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-teal-500 focus:ring-0 transition-colors"
                      />
                    </div>

                    {/* Preferred Date & Time */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 block mb-1.5">
                        {lang === "en" ? "Preferred Consultation Time" : "परामर्श हेतु पसंदीदा समय"}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tomorrow Afternoon, Monday morning"
                        value={formPreferredTime}
                        onChange={(e) => setFormPreferredTime(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-50 rounded border border-neutral-100 text-xs font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-teal-500 focus:ring-0 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Consultation Mode Toggles */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 block mb-1.5">
                      {lang === "en" ? "Consultation Preference" : "परामर्श का माध्यम"}
                    </label>
                    <div className="grid grid-cols-2 gap-3 text-[11px] uppercase tracking-wider font-bold">
                      <button
                        type="button"
                        onClick={() => setFormConsultType("clinic")}
                        className={`py-3.5 rounded border transition flex items-center justify-center gap-2 cursor-pointer ${
                          formConsultType === "clinic"
                            ? "bg-teal-55 border-teal-500 text-teal-800"
                            : "bg-white border-neutral-200 text-neutral-500 hover:border-black"
                        }`}
                      >
                        <MapPin className="w-4 h-4 text-teal-600" />
                        <span>{lang === "en" ? "Clinic Appointment" : "🏥 क्लिनिक पर आएं"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormConsultType("home")}
                        className={`py-3.5 rounded border transition flex items-center justify-center gap-2 cursor-pointer ${
                          formConsultType === "home"
                            ? "bg-teal-55 border-teal-500 text-teal-800"
                            : "bg-white border-neutral-200 text-neutral-500 hover:border-black"
                        }`}
                      >
                        <Home className="w-4 h-4 text-teal-600" />
                        <span>{lang === "en" ? "Home Visit" : "🏠 घर पर इलाज"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Symptom description textarea */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 block mb-1.5">
                      {lang === "en" ? "Symptom Details / Extra Comments (Optional)" : "बीमारी का संक्षिप्त विवरण (वैकल्पिक)"}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={lang === "en" ? "Briefly explain pain severity, prescriptions, or limitations." : "दर्द की तीव्रता, पूर्व डॉक्टर की पर्ची या शरीर के मुड़ने में तकलीफ की जानकारी।"}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full p-4 bg-neutral-50 rounded border border-neutral-100 text-xs font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-teal-500 focus:ring-0 transition-colors"
                    ></textarea>
                  </div>

                  {/* Direct Send Button */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded text-xs font-bold uppercase tracking-[0.2em] transition cursor-pointer shadow-md shadow-teal-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === "en" ? "Send Inquiry via WhatsApp" : "व्हाट्सएप पर तुरंत भेजें"}</span>
                  </button>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (Accordion Style) */}
      <section id="faqs" className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        
        {/* Section Title */}
        <div className="text-center space-y-2 mb-12">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-[0.2em]">FAQs</p>
          <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-900 font-display">
            {lang === "en" ? (
              <>
                Common <span className="italic font-serif">questions</span>
              </>
            ) : (
              <>
                पूछे जाने वाले मुख्य प्रश्न
              </>
            )}
          </h3>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-neutral-100 rounded-lg overflow-hidden transition-all hover:border-neutral-300"
              >
                {/* Trigger */}
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#fafafa] transition cursor-pointer"
                >
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 pr-2">
                    {lang === "en" ? faq.qEn : faq.qHi}
                  </h5>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transform transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-neutral-500 leading-relaxed border-t border-neutral-50 bg-[#fafafa]">
                    <p>{lang === "en" ? faq.aEn : faq.aHi}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Location / Direct Contact Info Bar */}
      <section id="contact" className="bg-[#fafafa] text-neutral-600 py-16 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Quick Contact Info */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                {lang === "en" ? "Direct Callback Support" : "सीधा संपर्क सूत्र"}
              </h4>
              <div className="space-y-2 text-xs">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span className="font-mono text-neutral-900 font-semibold">+91 {CLINIC_DATA.whatsappNumber}</span>
                  <span className="text-[10px] text-neutral-400 font-medium">(Primary / WhatsApp)</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span className="font-mono">+91 {CLINIC_DATA.secondaryNumber}</span>
                  <span className="text-[10px] text-neutral-400 font-medium">(Secondary)</span>
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                {lang === "en" ? "Clinic Location" : "क्लिनिक का पता"}
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>
                  {lang === "en" ? CLINIC_DATA.addressEn : CLINIC_DATA.addressHi}
                </span>
              </p>
            </div>

            {/* Quick Hours */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                {lang === "en" ? "Timings & Home Visits" : "परामर्श का समय"}
              </h4>
              <div className="text-xs text-neutral-600 space-y-1.5">
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>{lang === "en" ? "Monday - Saturday: 9:00 AM - 7:30 PM" : "सोमवार - शनिवार: सुबह 9:00 - शाम 7:30"}</span>
                </p>
                <p className="text-teal-600 font-medium pl-6 text-[11px] uppercase tracking-wider">
                  {lang === "en" ? "Home visit visits scheduled daily" : "🏠 होम विजिट मरीज की सुविधानुसार प्रतिदिन"}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Humble Footer */}
      <footer className="bg-white text-neutral-400 text-center py-8 border-t border-neutral-100 text-[10px] uppercase tracking-widest font-semibold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="text-neutral-500 font-sans tracking-widest">
            © {new Date().getFullYear()} {CLINIC_DATA.nameEn}.
          </p>
          <p className="text-neutral-400 font-mono tracking-normal lowercase text-[9px]">
            {CLINIC_DATA.regNo} • UPUMS Saifai PGI Approved Care Provider.
          </p>
        </div>
      </footer>
    </div>
  );
}
