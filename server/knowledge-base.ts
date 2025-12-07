export interface StudentProfileContext {
  gradeLevel: string;
  intendedMajors: string[];
  targetUniversities: string[];
  currentActivities: string;
  strengths: string;
  weaknesses: string;
  timeline: string;
}

interface MajorCategory {
  keywords: string[];
  courses: string[];
  competitions: string[];
  research: string[];
  extracurriculars: string[];
  summerPrograms: string[];
  skills: string[];
}

interface GradeAdvice {
  priorities: string[];
  courses: string[];
  activities: string[];
  timeline: string[];
}

interface UniversityTier {
  keywords: string[];
  expectations: string[];
  tips: string[];
}

export const majorCategories: Record<string, MajorCategory> = {
  cs: {
    keywords: ["computer science", "cs", "software", "programming", "coding", "ai", "machine learning", "artificial intelligence", "data science"],
    courses: [
      "AP Computer Science A (essential)",
      "AP Computer Science Principles",
      "AP Calculus BC",
      "AP Statistics",
      "Linear Algebra (if available)",
      "Data Structures & Algorithms (online/dual enrollment)"
    ],
    competitions: [
      "USACO (USA Computing Olympiad) - Bronze to Platinum divisions",
      "Google Code Jam / Kick Start",
      "Meta Hacker Cup",
      "Codeforces / LeetCode competitive programming",
      "Kaggle competitions for data science",
      "Congressional App Challenge",
      "Hack Club events and hackathons"
    ],
    research: [
      "Build original projects: apps, websites, games, or AI tools",
      "Contribute to open-source projects on GitHub",
      "Research with university professors in AI/ML",
      "Submit to ISEF/Regeneron with a CS project",
      "Develop a research paper for publication"
    ],
    extracurriculars: [
      "Start or lead a coding club at school",
      "Mentor younger students in programming",
      "Create a tech startup or nonprofit",
      "Build apps that solve real community problems",
      "Participate in hackathons and win awards"
    ],
    summerPrograms: [
      "Google CSSI (Computer Science Summer Institute)",
      "MIT PRIMES / RSI (Research Science Institute)",
      "Stanford SIMR or COSMOS",
      "Carnegie Mellon's Summer Academy for Math and Science",
      "University research internships (cold email professors)"
    ],
    skills: [
      "Python, Java, C++ (at least 2 languages)",
      "Web development (HTML/CSS/JS, React)",
      "Version control with Git/GitHub",
      "Problem-solving and algorithmic thinking",
      "Machine learning basics (TensorFlow, PyTorch)"
    ]
  },
  engineering: {
    keywords: ["engineering", "mechanical", "electrical", "civil", "aerospace", "biomedical", "chemical", "robotics"],
    courses: [
      "AP Physics C: Mechanics & E&M",
      "AP Calculus BC",
      "AP Chemistry",
      "Engineering/Robotics electives",
      "CAD/3D modeling courses"
    ],
    competitions: [
      "FIRST Robotics (FRC/FTC)",
      "Science Olympiad (engineering events)",
      "Physics Olympiad (F=ma, USAPhO)",
      "TSA (Technology Student Association)",
      "Rube Goldberg Machine Contest",
      "Model bridge building competitions"
    ],
    research: [
      "University lab research in mechanical/electrical engineering",
      "Build functional prototypes solving real problems",
      "Patent a novel invention or design",
      "Submit to science fairs with engineering projects",
      "Publish research in engineering journals"
    ],
    extracurriculars: [
      "Lead a FIRST Robotics team",
      "Engineering/STEM tutoring",
      "Build prosthetics for underserved communities",
      "Drone club, 3D printing club",
      "Community engineering projects"
    ],
    summerPrograms: [
      "MIT Women's Technology Program",
      "Stanford Engineering Academy",
      "Cooper Union Summer STEM",
      "Notre Dame iSURE",
      "Carnegie Mellon SAMS"
    ],
    skills: [
      "CAD software (SolidWorks, AutoCAD, Fusion 360)",
      "3D printing and prototyping",
      "Arduino/Raspberry Pi programming",
      "Basic circuit design",
      "Technical documentation and design reports"
    ]
  },
  premed: {
    keywords: ["medicine", "pre-med", "premed", "biology", "neuroscience", "public health", "healthcare", "doctor", "physician"],
    courses: [
      "AP Biology",
      "AP Chemistry",
      "AP Physics 1 & 2 (or C)",
      "AP Psychology",
      "Anatomy & Physiology",
      "Research Methods/Statistics"
    ],
    competitions: [
      "Science Olympiad (biology/health events)",
      "HOSA - Future Health Professionals",
      "Biology Olympiad (USABO)",
      "Brain Bee (neuroscience)",
      "Health Career Connection essays"
    ],
    research: [
      "Clinical shadowing (100+ hours)",
      "Biomedical research with university professors",
      "Hospital volunteer work",
      "Public health research projects",
      "ISEF projects in biology/medicine"
    ],
    extracurriculars: [
      "Health-focused community service",
      "Medical mission trips (if available)",
      "Start a health education initiative",
      "Red Cross volunteering",
      "Peer health counseling"
    ],
    summerPrograms: [
      "NIH Summer Internship Program",
      "Stanford Institutes of Medicine Summer",
      "NSLC programs in medicine",
      "Local hospital volunteer programs",
      "University biomedical research REUs"
    ],
    skills: [
      "Laboratory techniques",
      "Patient communication",
      "Medical terminology",
      "Research methodology",
      "Empathy and bedside manner"
    ]
  },
  business: {
    keywords: ["business", "economics", "finance", "marketing", "entrepreneurship", "management", "accounting"],
    courses: [
      "AP Economics (Micro & Macro)",
      "AP Statistics",
      "AP Calculus (AB or BC)",
      "Business/Entrepreneurship electives",
      "Accounting courses"
    ],
    competitions: [
      "DECA (marketing, finance, hospitality)",
      "FBLA (Future Business Leaders)",
      "Economics Challenge (Fed Challenge)",
      "Diamond Challenge (entrepreneurship)",
      "Stock market simulations"
    ],
    research: [
      "Start and run an actual business",
      "Economic research paper",
      "Market analysis projects",
      "Social entrepreneurship venture",
      "Business case competitions"
    ],
    extracurriculars: [
      "Start a business or social enterprise",
      "Investment club leadership",
      "Junior Achievement programs",
      "Nonprofit management",
      "Event planning and management"
    ],
    summerPrograms: [
      "Wharton LBW/Moneyball Academy",
      "LaunchX (MIT entrepreneurship)",
      "NSLC Business & Entrepreneurship",
      "Summer business internships",
      "Yale Young Global Scholars"
    ],
    skills: [
      "Financial modeling (Excel)",
      "Public speaking and pitching",
      "Market research",
      "Leadership and team management",
      "Networking and communication"
    ]
  },
  humanities: {
    keywords: ["english", "history", "philosophy", "political science", "international relations", "sociology", "anthropology", "literature", "writing", "journalism"],
    courses: [
      "AP English Literature & Language",
      "AP US History / World History / European History",
      "AP Government & Politics",
      "AP Psychology",
      "Foreign languages (AP level)"
    ],
    competitions: [
      "Speech and Debate (NFL/NSDA)",
      "Model UN",
      "Scholastic Art & Writing Awards",
      "Essay competitions (JFK Library, etc.)",
      "National History Day"
    ],
    research: [
      "Original historical research with archives",
      "Political analysis and policy papers",
      "Publish articles in school/local newspapers",
      "Literary magazine editing",
      "Documentary filmmaking"
    ],
    extracurriculars: [
      "Debate team captain/leadership",
      "Model UN secretary-general",
      "School newspaper editor-in-chief",
      "Literary magazine founder/editor",
      "Community advocacy campaigns"
    ],
    summerPrograms: [
      "Telluride Association Summer Program (TASP)",
      "Stanford Humanities Institute",
      "Oxbridge Academic Programs",
      "Georgetown summer programs",
      "Journalism/writing workshops"
    ],
    skills: [
      "Research and analysis",
      "Academic writing",
      "Public speaking",
      "Critical thinking",
      "Foreign language proficiency"
    ]
  },
  stem_general: {
    keywords: ["math", "mathematics", "physics", "chemistry", "science", "stem"],
    courses: [
      "AP Calculus BC",
      "AP Physics C (both)",
      "AP Chemistry",
      "Multivariable Calculus / Linear Algebra",
      "AP Statistics"
    ],
    competitions: [
      "AMC/AIME/USAMO (math)",
      "USAPhO (physics)",
      "USNCO (chemistry)",
      "Science Olympiad",
      "Putnam preparation"
    ],
    research: [
      "Original research with university mentors",
      "Submit to ISEF/Regeneron",
      "Theoretical or experimental projects",
      "Mathematical proofs and papers",
      "Cross-disciplinary research"
    ],
    extracurriculars: [
      "Math/Science tutoring",
      "Science Olympiad team leadership",
      "Math circle facilitation",
      "STEM outreach to underserved communities",
      "Science YouTube channel or blog"
    ],
    summerPrograms: [
      "RSI (Research Science Institute)",
      "PROMYS / Ross Mathematics Program",
      "SSP (Summer Science Program)",
      "Canada/USA Mathcamp",
      "MIT PRIMES"
    ],
    skills: [
      "Advanced problem-solving",
      "Mathematical proof writing",
      "Lab techniques",
      "Scientific writing",
      "Programming for computation"
    ]
  }
};

export const gradeAdvice: Record<string, GradeAdvice> = {
  "grade-9": {
    priorities: [
      "Focus on building strong academic foundations",
      "Explore 2-3 potential interest areas through clubs and activities",
      "Start developing core skills in your areas of interest",
      "Build relationships with teachers who can become mentors"
    ],
    courses: [
      "Take honors-level courses in your strongest subjects",
      "Start a foreign language if you haven't already",
      "Consider taking Algebra II or Geometry (accelerated math track)",
      "Explore electives aligned with potential interests"
    ],
    activities: [
      "Join 2-3 clubs to explore interests (don't overcommit yet)",
      "Start learning skills outside school (coding, music, art)",
      "Consider joining a sport or physical activity",
      "Begin community service in areas you care about"
    ],
    timeline: [
      "Fall: Explore clubs and activities at school",
      "Winter: Settle into 2-3 consistent commitments",
      "Spring: Reflect on what you enjoyed most",
      "Summer: Take a class, start a project, or explore a new skill"
    ]
  },
  "grade-10": {
    priorities: [
      "Begin narrowing focus to 1-2 primary interest areas ('spike' development)",
      "Take leadership roles in activities you've committed to",
      "Start preparing for standardized tests (PSAT, SAT/ACT)",
      "Begin building a portfolio of work in your interest area"
    ],
    courses: [
      "Start taking AP courses in your strongest subjects (2-3 APs)",
      "Continue accelerated math track (Pre-Calculus)",
      "Add subject-specific APs aligned with intended major",
      "Consider dual enrollment for advanced courses"
    ],
    activities: [
      "Take on leadership roles (vice president, team captain)",
      "Start an independent project aligned with your interests",
      "Compete in regional/state-level competitions",
      "Build connections with mentors in your field"
    ],
    timeline: [
      "Fall: Increase commitment to primary activities, take PSAT",
      "Winter: Begin SAT/ACT prep, work on independent projects",
      "Spring: Compete in competitions, seek summer opportunities",
      "Summer: Research program, internship, or intensive project"
    ]
  },
  "grade-11": {
    priorities: [
      "This is the most critical year for college admissions",
      "Maximize your spike with significant achievements",
      "Take most challenging course load",
      "Excel on standardized tests (SAT/ACT, AP exams)"
    ],
    courses: [
      "Take 4-6 AP courses (focus on core + major-related)",
      "AP Calculus BC if STEM-focused",
      "Continue challenging course load across subjects",
      "Consider research methodology or advanced electives"
    ],
    activities: [
      "Achieve top leadership positions (president, founder, captain)",
      "Win significant awards in competitions",
      "Complete or publish research",
      "Create tangible impact in your community"
    ],
    timeline: [
      "Fall: SAT/ACT prep and first attempts, maximum activities",
      "Winter: Competition season, finalize research projects",
      "Spring: AP exams, final SAT/ACT attempts, college list research",
      "Summer: Prestigious program, internship, or capstone project"
    ]
  },
  "grade-12": {
    priorities: [
      "Focus on college applications (essays are crucial)",
      "Maintain strong grades (senior slump hurts)",
      "Continue leadership and activities through fall",
      "Demonstrate continued growth and commitment"
    ],
    courses: [
      "Continue rigorous course load (don't drop down)",
      "Take APs in new areas to show intellectual breadth",
      "Consider college-level courses (dual enrollment)",
      "Maintain GPA above 3.9 unweighted"
    ],
    activities: [
      "Complete any ongoing projects or research",
      "Maintain leadership roles through application season",
      "Win final awards and recognition",
      "Mentor younger students in your areas of expertise"
    ],
    timeline: [
      "August-October: Complete Common App, early applications",
      "November: Submit early decision/action applications",
      "December-January: Regular decision applications",
      "Spring: Make final decision, senior capstone activities"
    ]
  },
  "gap-year": {
    priorities: [
      "Create meaningful experiences that strengthen your profile",
      "Address any weaknesses from high school",
      "Develop maturity and unique perspectives",
      "Build skills and experiences relevant to your goals"
    ],
    courses: [
      "Consider community college courses in weak areas",
      "Take online courses from prestigious universities",
      "Learn new languages or technical skills",
      "Obtain relevant certifications"
    ],
    activities: [
      "Internship or work experience in your field",
      "Significant volunteer or service project",
      "Travel with purpose (language immersion, cultural exchange)",
      "Start a business or major independent project"
    ],
    timeline: [
      "Plan activities that build on your existing profile",
      "Document everything for updated applications",
      "Stay connected with recommenders",
      "Apply to schools during your gap year"
    ]
  },
  "transfer": {
    priorities: [
      "Achieve the highest possible GPA at current institution",
      "Build relationships with professors for recommendations",
      "Continue meaningful extracurricular involvement",
      "Articulate clear, compelling reasons for transfer"
    ],
    courses: [
      "Take the most rigorous courses available",
      "Focus on major-related prerequisites",
      "Achieve A's in all courses if possible",
      "Consider research opportunities with faculty"
    ],
    activities: [
      "Get involved in campus organizations",
      "Take on leadership roles quickly",
      "Conduct research with professors",
      "Continue high school activities if relevant"
    ],
    timeline: [
      "Fall: Research target schools, build relationships",
      "Winter: Request recommendations, draft essays",
      "Spring: Submit applications by deadlines",
      "Summer: Prepare for transition if admitted"
    ]
  }
};

export const universityTiers: Record<string, UniversityTier> = {
  ivy_plus: {
    keywords: ["harvard", "yale", "princeton", "columbia", "upenn", "penn", "dartmouth", "cornell", "brown", "mit", "stanford", "caltech", "duke", "uchicago", "northwestern"],
    expectations: [
      "Near-perfect academics (top 1-5% of class, 4.0+ weighted GPA)",
      "Exceptional standardized test scores (1550+ SAT, 35+ ACT)",
      "National or international-level achievements in your area of focus",
      "Clear 'spike' that sets you apart from other applicants",
      "Genuine intellectual curiosity demonstrated through projects",
      "Leadership with measurable impact, not just titles",
      "Compelling personal story that shines through essays"
    ],
    tips: [
      "Apply Early Decision/Action to maximize chances",
      "Visit campus if possible and engage with current students",
      "Research specific programs, professors, or opportunities at each school",
      "Essays must be exceptional - start early and revise many times",
      "Demonstrate 'fit' by showing you've researched what makes each school unique"
    ]
  },
  top30: {
    keywords: ["vanderbilt", "notre dame", "washu", "emory", "georgetown", "berkeley", "ucla", "usc", "michigan", "virginia", "cmu", "carnegie mellon", "nyu", "tufts", "boston college"],
    expectations: [
      "Strong academics (top 5-10% of class, 3.8+ GPA)",
      "High test scores (1450+ SAT, 32+ ACT)",
      "Regional or state-level achievements",
      "Consistent involvement and growth in activities",
      "Clear passion and direction in applications",
      "Good but not necessarily exceptional essays"
    ],
    tips: [
      "Apply to a balanced list of reach, match, and safety schools",
      "Highlight unique experiences or perspectives",
      "Show demonstrated interest through visits, interviews, webinars",
      "Strong letters of recommendation are crucial",
      "Consider school-specific scholarships and honors programs"
    ]
  },
  canadian_top: {
    keywords: ["waterloo", "uwaterloo", "uoft", "toronto", "mcgill", "ubc", "queens", "western"],
    expectations: [
      "Strong academics (90%+ average for competitive programs)",
      "For Waterloo: exceptional math/CS skills and contest results",
      "Strong AIF (Admission Information Form) for Waterloo",
      "Subject-specific requirements vary by program",
      "Extracurriculars valued but less emphasized than US schools"
    ],
    tips: [
      "For Waterloo CS/Engineering: Euclid, CCC, and CEMC contests are crucial",
      "Complete the AIF thoughtfully for Waterloo applications",
      "UofT and McGill focus heavily on grades",
      "Apply early as rolling/early admissions can help",
      "Consider co-op programs for career preparation"
    ]
  }
};

export const essayTopics = {
  personalStatement: [
    "A challenge that shaped who you are today",
    "An intellectual passion that drives your curiosity",
    "A moment that changed your perspective",
    "Your unique background, identity, or experience",
    "A community you belong to and how you contribute"
  ],
  supplementalStrategies: [
    "'Why This School': Research specific programs, professors, clubs, and traditions",
    "'Why This Major': Connect your experiences to your academic interests",
    "Activity descriptions: Use active verbs and quantify impact",
    "Short answers: Be concise but memorable",
    "Additional information: Explain any weaknesses without making excuses"
  ],
  commonMistakes: [
    "Writing what you think admissions wants to hear",
    "Listing accomplishments instead of telling a story",
    "Being too generic or cliche",
    "Not showing self-reflection and growth",
    "Poor editing and proofreading"
  ]
};

export const strengthsGuidance: Record<string, string[]> = {
  leadership: [
    "Take on higher-level positions (regional, state, national)",
    "Mentor other leaders and build sustainable organizations",
    "Document your impact with numbers and testimonials",
    "Expand leadership to new areas while maintaining depth"
  ],
  academic: [
    "Pursue highest-level competitions (national/international)",
    "Seek research opportunities with mentors",
    "Publish or present your work",
    "Tutor or teach others to demonstrate mastery"
  ],
  creative: [
    "Build a portfolio showcasing your best work",
    "Enter prestigious competitions and exhibitions",
    "Connect creativity to your intended field of study",
    "Create projects that solve real problems"
  ],
  athletic: [
    "Document achievements and statistics",
    "Highlight teamwork and leadership aspects",
    "Connect athletic discipline to other areas of life",
    "Consider recruitment if at competitive level"
  ],
  service: [
    "Scale your impact (more people, larger area)",
    "Take on leadership in service organizations",
    "Connect service to your intended major or career",
    "Document measurable impact and outcomes"
  ]
};

export const weaknessesGuidance: Record<string, string[]> = {
  grades: [
    "Focus on improving trends (upward trajectory matters)",
    "Take on challenging courses to show capability",
    "Get tutoring or extra help in weak subjects",
    "Explain circumstances in applications if relevant"
  ],
  testing: [
    "Consider test-optional schools if appropriate",
    "Take extensive prep courses and practice tests",
    "Try both SAT and ACT to find your strength",
    "Retake tests strategically (2-3 attempts maximum)"
  ],
  extracurriculars: [
    "It's not too late to start something meaningful",
    "Focus on depth over breadth in remaining time",
    "Create independent projects in your interest area",
    "Quality of involvement matters more than quantity"
  ],
  essays: [
    "Start writing early and revise extensively",
    "Get feedback from teachers, counselors, and peers",
    "Read successful essay examples",
    "Work with an essay coach if needed"
  ],
  recommendations: [
    "Build relationships with 2-3 teachers now",
    "Participate actively in classes",
    "Attend office hours and ask thoughtful questions",
    "Provide recommenders with detailed information about yourself"
  ]
};
