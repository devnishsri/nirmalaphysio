export interface Treatment {
  id: string;
  titleEn: string;
  titleHi: string;
  category: "ortho-spine" | "neuro" | "general";
  descEn: string;
  descHi: string;
  symptomsEn: string[];
  symptomsHi: string[];
  iconName: string;
}

export interface ClinicMeta {
  nameEn: string;
  nameHi: string;
  doctorName: string;
  title: string;
  degrees: string;
  regNo: string;
  formerly: string;
  sloganEn: string;
  sloganHi: string;
  whatsappNumber: string;
  secondaryNumber: string;
  addressEn: string;
  addressHi: string;
}

export const CLINIC_DATA: ClinicMeta = {
  nameEn: "Nirmala Physiotherapy & Ortho-Neuro Rehabilitation Clinic",
  nameHi: "निर्मला फिजियोथेरेपी एवं ऑर्थो-न्यूरो रिहैबिलिटेशन क्लिनिक",
  doctorName: "Dr. Ritesh Agrahari (PT)",
  title: "Consultant Physiotherapist",
  degrees: "BPT, UPUMS Saifai PGI",
  regNo: "Regd. No. 2346",
  formerly: "Formerly: Ortho & Neuro Rehabilitation Hospital (Bharatpur, Rajasthan)",
  sloganEn: "Permanent, Non-Surgical Treatment for Spinal Nerve Compression & Musculoskeletal Disorders",
  sloganHi: "रीढ़ की हड्डी से आये नसों पर दबाव का बिना ऑपरेशन और स्थायी इलाज",
  whatsappNumber: "7905431134",
  secondaryNumber: "7376502331",
  addressEn: "Naiganj, Jaunpur (U.P.) - 222002",
  addressHi: "नईगंज, जौनपुर (उत्तर प्रदेश) - 222002",
};

export const TREATMENTS: Treatment[] = [
  {
    id: "sciatica",
    titleEn: "Sciatica",
    titleHi: "साइटिका",
    category: "ortho-spine",
    descEn: "Therapy and rehabilitation for lower back pain radiating down the sciatic nerve in legs.",
    descHi: "कमर में दर्द, पैरों में सुन्नपन एवं दर्द का वैज्ञानिक फिजियोथेरेपी उपचार।",
    symptomsEn: ["Lower back pain", "Leg numbness", "Shooting leg pain"],
    symptomsHi: ["कमर में दर्द", "पैरों में सुन्नपन", "पैरों में तेज दर्द"],
    iconName: "Activity",
  },
  {
    id: "cervical",
    titleEn: "Cervical Spondylosis",
    titleHi: "सर्वाइकल",
    category: "ortho-spine",
    descEn: "Targeted decompression exercises and mobilization for neck stiffness and arm pain.",
    descHi: "गर्दन में दर्द, हाथों में सुन्नपन एवं दर्द का स्थायी इलाज।",
    symptomsEn: ["Neck pain", "Arm numbness", "Headaches & stiffness"],
    symptomsHi: ["गर्दन में दर्द", "हाथों में सुन्नपन", "गर्दन की अकड़न"],
    iconName: "ShieldAlert",
  },
  {
    id: "slip-disk",
    titleEn: "Slip Disc / Herniation",
    titleHi: "स्लिप डिस्क",
    category: "ortho-spine",
    descEn: "Non-surgical decompression and stabilization therapies for spinal herniation.",
    descHi: "रीढ़ की हड्डी और कमर में दर्द, नसों के खिंचाव का बिना ऑपरेशन स्थायी इलाज।",
    symptomsEn: ["Spine stiffness", "Severe back pain", "Radiating nerve pain"],
    symptomsHi: ["रीढ़ की हड्डी में दर्द", "कमर दर्द", "नसों पर दबाव"],
    iconName: "Disc",
  },
  {
    id: "frozen-shoulder",
    titleEn: "Frozen Shoulder",
    titleHi: "फ्रोजन शोल्डर",
    category: "ortho-spine",
    descEn: "Gentle manual mobilization and stretching to restore full range of motion.",
    descHi: "कंधे में दर्द एवं जाम होने (अकड़न) की समस्या का त्वरित निदान।",
    symptomsEn: ["Shoulder pain", "Stiffness", "Inability to lift arm"],
    symptomsHi: ["कंधे में दर्द", "कंधे की जाम होना", "हाथ उठाने में परेशानी"],
    iconName: "Undo2",
  },
  {
    id: "arthritis",
    titleEn: "Arthritis & Gout",
    titleHi: "गठिया",
    category: "ortho-spine",
    descEn: "Joint protection therapies, pain management, and strengthening for osteo/rheumatoid arthritis.",
    descHi: "जोड़ों का पुराना दर्द, सूजन और गठिया का आधुनिक फिजियोथेरेपी समाधान।",
    symptomsEn: ["Joint swelling", "Morning stiffness", "Chronic joint pain"],
    symptomsHi: ["जोड़ों में सूजन", "सुबह की अकड़न", "जोड़ों का पुराना दर्द"],
    iconName: "FlameKindling",
  },
  {
    id: "spondylitis",
    titleEn: "Spondylitis",
    titleHi: "स्पॉन्डिलाइटिस",
    category: "ortho-spine",
    descEn: "Postural correction and specialized spinal extension exercises for inflammation relief.",
    descHi: "रीढ़ की हड्डी की सूजन और अकड़न का व्यायाम एवं सिकाई द्वारा इलाज।",
    symptomsEn: ["Back stiffness", "Spine soreness", "Reduced flexibility"],
    symptomsHi: ["पीठ में अकड़न", "रीढ़ में दर्द", "लचीलापन कम होना"],
    iconName: "TrendingDown",
  },
  {
    id: "paralysis",
    titleEn: "Stroke & Paralysis",
    titleHi: "लकवा (फाँलिश)",
    category: "neuro",
    descEn: "Neuromuscular re-education, gait training, and functional independence exercises.",
    descHi: "मस्तिष्क घात या अधरंग के बाद शरीर के अंगों को पुनः सक्रिय करने का अभ्यास।",
    symptomsEn: ["Loss of limb control", "Balance difficulties", "Muscle weakness"],
    symptomsHi: ["हाथ-पैर का काम न करना", "संतुलन की कमी", "मांसपेशियों का ढीलापन"],
    iconName: "Sparkles",
  },
  {
    id: "facial-paralysis",
    titleEn: "Facial Paralysis / Bell's Palsy",
    titleHi: "चेहरे का लकवा",
    category: "neuro",
    descEn: "Facial muscle neuromuscular facilitation exercises to restore expressions and symmetry.",
    descHi: "चेहरे के एक तरफ के टेढ़ेपन या कमजोरी को ठीक करने की थेरेपी।",
    symptomsEn: ["Facial drooping", "Difficulty closing eye", "Asymmetry"],
    symptomsHi: ["चेहरे का टेढ़ापन", "आंख बंद करने में कठिनाई", "बोलने में असुविधा"],
    iconName: "Smile",
  },
  {
    id: "parkinsons",
    titleEn: "Parkinson's Disease Care",
    titleHi: "पार्किसन रोग",
    category: "neuro",
    descEn: "Balance enhancement, posture training, and gait synchronization strategies.",
    descHi: "हाथ-पैरों के कंपन और चलने की लड़खड़ाहट को नियंत्रित करने का अभ्यास।",
    symptomsEn: ["Tremors", "Slow movements", "Gait instability"],
    symptomsHi: ["हाथों में कंपन", "धीमी गति", "चलने में लड़खड़ाहट"],
    iconName: "Navigation",
  },
  {
    id: "gbs-syndrome",
    titleEn: "GBS Syndrome Rehab",
    titleHi: "जी.बी.एस. सिंड्रोम",
    category: "neuro",
    descEn: "Progressive muscle strengthening and sensory stimulation during GBS recovery stages.",
    descHi: "नसों की कमजोरी के बाद मांसपेशियों की खोई हुई ताकत वापस लाने का रिहैब।",
    symptomsEn: ["Progressive weakness", "Sensory loss", "Fatigue"],
    symptomsHi: ["शरीर की कमजोरी", "हाथ-पैर न उठना", "मांसपेशियों का शिथिल होना"],
    iconName: "Zap",
  },
  {
    id: "cerebral-palsy",
    titleEn: "Cerebral Palsy / Pediatric Rehab",
    titleHi: "बच्चों का शारीरिक व मानसिक विकास",
    category: "neuro",
    descEn: "Developmental therapy for delayed physical/mental milestones and spasticity management.",
    descHi: "बच्चों का शारीरिक एवं मानसिक विकास का न होना, सेरेब्रल पाल्सी का स्नेहपूर्ण इलाज।",
    symptomsEn: ["Delayed walking", "Spastic muscles", "Motor delays"],
    symptomsHi: ["देर से चलना/बैठना", "मांसपेशियों में जकड़न", "शारीरिक विकास रुकना"],
    iconName: "Baby",
  },
  {
    id: "joint-stiffness",
    titleEn: "Joint Pain & Stiffness",
    titleHi: "जोड़ों का दर्द एवं जाम होना",
    category: "ortho-spine",
    descEn: "Therapeutic modalities and mobilization techniques to restore painless joint movement.",
    descHi: "घुटनों, कोहनी या उंगलियों के जोड़ों का जाम होना व दर्द दूर करने की थेरेपी।",
    symptomsEn: ["Joint locking", "Severe stiffness", "Clicking sounds"],
    symptomsHi: ["जोड़ों का जाम होना", "कड़ापन", "हिलने-डुलने में दर्द"],
    iconName: "RefreshCw",
  },
  {
    id: "post-fracture",
    titleEn: "Post-Fracture Joint Stiffness",
    titleHi: "हड्डी टूटने के बाद जोड़ों का जाम होना",
    category: "ortho-spine",
    descEn: "Specialized stretching and strength recovery program after plaster removal.",
    descHi: "प्लास्टर कटने के बाद जोड़ों के कड़ेपन को दूर करने और शक्ति बढ़ाने का इलाज।",
    symptomsEn: ["Stiffness after cast", "Weak muscles", "Restricted flexion"],
    symptomsHi: ["प्लास्टर के बाद अकड़न", "कमजोर मांसपेशियां", "अंग का पूरा न मुड़ना"],
    iconName: "Workflow",
  },
  {
    id: "tennis-elbow",
    titleEn: "Tennis Elbow (Elbow Pain)",
    titleHi: "कोहनी का दर्द (टेनिस एल्बो)",
    category: "ortho-spine",
    descEn: "Targeted forearm stretching, ultrasound therapy, and eccentric load training.",
    descHi: "कोहनी के बाहरी हिस्से में दर्द और कलाई की कमजोरी का आधुनिक उपचार।",
    symptomsEn: ["Elbow tenderness", "Weak grip", "Pain twisting wrist"],
    symptomsHi: ["कोहनी में दर्द", "पकड़ कमजोर होना", "हाथ घुमाने पर दर्द"],
    iconName: "Dumbbell",
  },
  {
    id: "muscle-weakness",
    titleEn: "Muscle Weakness Rehab",
    titleHi: "मांसपेशियों की कमजोरी",
    category: "general",
    descEn: "Custom resistance training and electrical muscle stimulation for localized wasting.",
    descHi: "अस्वस्थता या बीमारी के बाद आई कमजोरी को दूर करने का वैज्ञानिक सुदृढ़ीकरण।",
    symptomsEn: ["Loss of strength", "Muscle thinning", "Chronic fatigue"],
    symptomsHi: ["ताकत की कमी", "मांसपेशियों का पतला होना", "जल्दी थकना"],
    iconName: "Gauge",
  }
];

export const FAQS = [
  {
    qEn: "Do you offer home visits in Jaunpur?",
    qHi: "क्या आप जौनपुर में घर पर आकर इलाज (Home Visit) की सुविधा देते हैं?",
    aEn: "Yes, we specialize in high-quality home visits for patients who cannot travel to the clinic due to severe pain, paralysis, or post-operative conditions.",
    aHi: "हाँ, हम उन मरीजों के लिए घर पर ही फिजियोथेरेपी (Home Visit) की विशेष सुविधा देते हैं जो गंभीर दर्द, लकवा या ऑपरेशन के बाद क्लिनिक आने में असमर्थ हैं।"
  },
  {
    qEn: "Is Dr. Ritesh Agrahari registered with medical councils?",
    qHi: "क्या डॉ. रितेश अग्रहरी चिकित्सा परिषद में पंजीकृत हैं?",
    aEn: "Yes, Dr. Ritesh Agrahari (PT) is highly qualified with BPT from Saifai PGI and registered with MSMF, Registration No. 2346.",
    aHi: "हाँ, डॉ. रितेश अग्रहरी (PT) सैफई PGI से BPT हैं और MSMF में पंजीकृत हैं (पंजीकरण संख्या 2346)।"
  },
  {
    qEn: "How many sessions will I need for severe sciatica or slip disc?",
    qHi: "साइटिका या स्लिप डिस्क के लिए मुझे कितने सत्र (Sessions) की आवश्यकता होगी?",
    aEn: "Usually, patients start feeling significant relief within 3 to 5 sessions. A complete rehabilitation course may take 10 to 15 sessions depending on the severity of nerve compression.",
    aHi: "आमतौर पर 3 से 5 सत्रों में मरीज को काफी आराम मिलने लगता है। नसों के दबाव की गंभीरता के आधार पर पूरा कोर्स 10 से 15 सत्रों का हो सकता है।"
  },
  {
    qEn: "What is the non-surgical spine treatment?",
    qHi: "बिना ऑपरेशन रीढ़ की हड्डी का इलाज कैसे होता है?",
    aEn: "We utilize advanced traction, specialized nerve decompression movements, manual spine mobilization, and deep tissue stabilization exercises to relieve disc pressure on spinal nerves naturally.",
    aHi: "हम नसों के दबाव को प्राकृतिक रूप से कम करने के लिए उन्नत स्पाइनल मोबिलाइजेशन, डीकंप्रेशन मूवमेंट और डीप कोर स्टेबलाइजेशन व्यायामों का उपयोग करते हैं।"
  }
];
