import {
  StudentProfileContext,
  majorCategories,
  gradeAdvice,
  universityTiers,
  essayTopics,
  strengthsGuidance,
  weaknessesGuidance,
} from "./knowledge-base";

function detectMajorCategory(majors: string[]): string {
  const normalizedMajors = majors.map((m) => m.toLowerCase());

  for (const [category, data] of Object.entries(majorCategories)) {
    for (const keyword of data.keywords) {
      if (normalizedMajors.some((m) => m.includes(keyword))) {
        return category;
      }
    }
  }

  return "stem_general";
}

function detectUniversityTier(universities: string[]): string {
  const normalized = universities.map((u) => u.toLowerCase());

  for (const [tier, data] of Object.entries(universityTiers)) {
    for (const keyword of data.keywords) {
      if (normalized.some((u) => u.includes(keyword))) {
        return tier;
      }
    }
  }

  return "top30";
}

function detectTopics(message: string): string[] {
  const topics: string[] = [];
  const lower = message.toLowerCase();

  const topicKeywords: Record<string, string[]> = {
    courses: ["course", "class", "ap", "ib", "schedule", "curriculum", "subject"],
    extracurriculars: ["extracurricular", "activity", "activities", "club", "sport", "volunteer", "leadership"],
    research: ["research", "project", "paper", "publish", "professor", "lab"],
    competitions: ["competition", "olympiad", "contest", "award", "usaco", "amc", "usamo"],
    essays: ["essay", "personal statement", "supplemental", "writing", "common app"],
    summer: ["summer", "program", "internship", "camp"],
    timeline: ["timeline", "plan", "schedule", "when", "deadline"],
    testing: ["sat", "act", "test", "score", "standardized"],
    recommendation: ["recommendation", "letter", "rec", "teacher", "counselor"],
    interview: ["interview", "alumni", "tips"],
    spike: ["spike", "unique", "stand out", "special", "differentiate"],
    waterloo: ["waterloo", "aif", "ccc", "euclid", "cemc"],
  };

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some((k) => lower.includes(k))) {
      topics.push(topic);
    }
  }

  return topics.length > 0 ? topics : ["general"];
}

function detectStrengthCategories(strengths: string): string[] {
  const categories: string[] = [];
  const lower = strengths.toLowerCase();

  if (lower.includes("leader") || lower.includes("president") || lower.includes("captain") || lower.includes("founder")) {
    categories.push("leadership");
  }
  if (lower.includes("grade") || lower.includes("gpa") || lower.includes("academic") || lower.includes("class rank")) {
    categories.push("academic");
  }
  if (lower.includes("creative") || lower.includes("art") || lower.includes("music") || lower.includes("design") || lower.includes("writing")) {
    categories.push("creative");
  }
  if (lower.includes("sport") || lower.includes("athletic") || lower.includes("varsity") || lower.includes("team")) {
    categories.push("athletic");
  }
  if (lower.includes("service") || lower.includes("volunteer") || lower.includes("community") || lower.includes("nonprofit")) {
    categories.push("service");
  }

  return categories.length > 0 ? categories : ["academic"];
}

function detectWeaknessCategories(weaknesses: string): string[] {
  const categories: string[] = [];
  const lower = weaknesses.toLowerCase();

  if (lower.includes("grade") || lower.includes("gpa") || lower.includes("academic")) {
    categories.push("grades");
  }
  if (lower.includes("sat") || lower.includes("act") || lower.includes("test") || lower.includes("score")) {
    categories.push("testing");
  }
  if (lower.includes("extracurricular") || lower.includes("activity") || lower.includes("club")) {
    categories.push("extracurriculars");
  }
  if (lower.includes("essay") || lower.includes("writing") || lower.includes("write")) {
    categories.push("essays");
  }
  if (lower.includes("recommendation") || lower.includes("teacher") || lower.includes("relationship")) {
    categories.push("recommendations");
  }

  return categories.length > 0 ? categories : [];
}

function generateInitialGreeting(profile: StudentProfileContext): string {
  const gradeMap: Record<string, string> = {
    "grade-9": "freshman",
    "grade-10": "sophomore",
    "grade-11": "junior",
    "grade-12": "senior",
    "gap-year": "gap year student",
    "transfer": "transfer student",
  };

  const majorCategory = detectMajorCategory(profile.intendedMajors);
  const uniTier = detectUniversityTier(profile.targetUniversities);
  const grade = gradeAdvice[profile.gradeLevel] || gradeAdvice["grade-11"];
  const major = majorCategories[majorCategory];
  const tier = universityTiers[uniTier];
  const strengthCats = detectStrengthCategories(profile.strengths);
  const weaknessCats = detectWeaknessCategories(profile.weaknesses);

  let response = `**Welcome to Astra, your College Admissions Advisor!**

I've reviewed your profile and I'm excited to help you on your journey to ${profile.targetUniversities.slice(0, 3).join(", ")}${profile.targetUniversities.length > 3 ? " and others" : ""}!

---

**Your Profile at a Glance:**
- **Grade Level:** ${gradeMap[profile.gradeLevel] || profile.gradeLevel}
- **Target Major(s):** ${profile.intendedMajors.join(", ")}
- **Target Schools:** ${profile.targetUniversities.join(", ")}

---

**What It Takes for Your Target Schools:**

`;

  for (const exp of tier.expectations.slice(0, 4)) {
    response += `- ${exp}\n`;
  }

  response += `
---

**Your Current Strengths:**
${profile.strengths}

`;

  if (strengthCats.length > 0) {
    response += `**How to Build on These Strengths:**\n`;
    for (const cat of strengthCats.slice(0, 2)) {
      const guidance = strengthsGuidance[cat] || [];
      for (const g of guidance.slice(0, 2)) {
        response += `- ${g}\n`;
      }
    }
  }

  response += `
**Areas to Develop:**
${profile.weaknesses}

`;

  if (weaknessCats.length > 0) {
    response += `**Recommendations to Address These:**\n`;
    for (const cat of weaknessCats.slice(0, 2)) {
      const guidance = weaknessesGuidance[cat] || [];
      for (const g of guidance.slice(0, 2)) {
        response += `- ${g}\n`;
      }
    }
  }

  response += `
---

**Your ${gradeMap[profile.gradeLevel]} Year Priorities:**

`;

  for (const priority of grade.priorities) {
    response += `- ${priority}\n`;
  }

  response += `
---

**Recommended Next Steps for ${profile.intendedMajors[0] || "Your Major"}:**

**Courses to Consider:**
`;

  for (const course of major.courses.slice(0, 3)) {
    response += `- ${course}\n`;
  }

  response += `
**Key Competitions:**
`;

  for (const comp of major.competitions.slice(0, 3)) {
    response += `- ${comp}\n`;
  }

  response += `
**Extracurricular Ideas:**
`;

  for (const ec of major.extracurriculars.slice(0, 3)) {
    response += `- ${ec}\n`;
  }

  response += `
---

**What would you like to explore?**

I can help you with:
- Course planning and academic strategy
- Extracurricular development and building your "spike"
- Research opportunities and competitions
- Summer programs and internships
- Essay brainstorming and strategy
- Application timeline and deadlines

Just ask me anything about your college journey!`;

  return response;
}

function generateTopicResponse(
  topic: string,
  profile: StudentProfileContext,
  message: string
): string {
  const majorCategory = detectMajorCategory(profile.intendedMajors);
  const uniTier = detectUniversityTier(profile.targetUniversities);
  const grade = gradeAdvice[profile.gradeLevel] || gradeAdvice["grade-11"];
  const major = majorCategories[majorCategory];
  const tier = universityTiers[uniTier];

  switch (topic) {
    case "courses":
      return generateCourseAdvice(profile, major, grade);
    case "extracurriculars":
      return generateExtracurricularAdvice(profile, major, grade);
    case "research":
      return generateResearchAdvice(profile, major);
    case "competitions":
      return generateCompetitionAdvice(profile, major, tier);
    case "essays":
      return generateEssayAdvice(profile);
    case "summer":
      return generateSummerAdvice(profile, major);
    case "timeline":
      return generateTimelineAdvice(profile, grade);
    case "testing":
      return generateTestingAdvice(profile, tier);
    case "recommendation":
      return generateRecommendationAdvice(profile);
    case "spike":
      return generateSpikeAdvice(profile, major);
    case "waterloo":
      return generateWaterlooAdvice(profile);
    default:
      return generateGeneralAdvice(profile, message);
  }
}

function generateCourseAdvice(profile: StudentProfileContext, major: any, grade: any): string {
  let response = `**Course Planning for ${profile.intendedMajors.join(" / ")}**

Based on your goals of studying ${profile.intendedMajors.join(" or ")} at top universities, here's my course planning advice:

---

**Recommended Courses for Your Major:**

`;

  for (const course of major.courses) {
    response += `- ${course}\n`;
  }

  response += `
---

**Grade-Specific Recommendations:**

`;

  for (const course of grade.courses) {
    response += `- ${course}\n`;
  }

  response += `
---

**Course Selection Strategy:**

1. **Rigor Matters:** Admissions officers want to see you taking the most challenging courses available at your school. If you have access to AP/IB/Honors courses, take them.

2. **Balance Depth and Breadth:** While focusing on your major area, don't neglect other subjects. A well-rounded academic profile includes strength in humanities, sciences, and math.

3. **Show Progression:** Your course rigor should increase each year. Freshman year might have 0-1 APs, sophomore year 2-3, and junior/senior year 4-6.

4. **Connect to Your Spike:** If your main interest is ${profile.intendedMajors[0]}, make sure you're taking the most advanced courses in that area.

---

**Questions to Consider:**
- What AP/IB courses does your school offer?
- Are there dual enrollment options at local colleges?
- Can you self-study for AP exams in subjects not offered at your school?

Would you like specific recommendations based on your school's course offerings?`;

  return response;
}

function generateExtracurricularAdvice(profile: StudentProfileContext, major: any, grade: any): string {
  let response = `**Extracurricular Strategy for ${profile.intendedMajors.join(" / ")} Applicants**

Your current activities: ${profile.currentActivities}

---

**Key Principle: Depth Over Breadth**

Top universities want to see a "spike" - one or two areas where you've achieved significant depth and impact. Joining 15 clubs won't impress admissions; leading one initiative to national recognition will.

---

**Recommended Activities for ${profile.intendedMajors[0]}:**

`;

  for (const ec of major.extracurriculars) {
    response += `- ${ec}\n`;
  }

  response += `
---

**Building Your Activity Profile:**

`;

  for (const activity of grade.activities) {
    response += `- ${activity}\n`;
  }

  response += `
---

**The 4-Tier Activity Framework:**

1. **Tier 1 (National/International Impact):** Winning national competitions, published research, starting an organization with significant reach. Aim for 1-2 of these.

2. **Tier 2 (State/Regional Impact):** State-level awards, significant leadership positions, impressive independent projects. Aim for 2-3 of these.

3. **Tier 3 (School-Wide Impact):** Club leadership, team captains, significant school contributions. These support your profile.

4. **Tier 4 (Personal Development):** Hobbies, general involvement. These round out your profile but don't drive admissions.

---

**Based on Your Strengths (${profile.strengths}):**

Focus on taking your existing strengths to the next level. What's one thing you could do this month to elevate your impact?

Would you like specific project ideas or help planning your extracurricular strategy?`;

  return response;
}

function generateResearchAdvice(profile: StudentProfileContext, major: any): string {
  let response = `**Research Opportunities for ${profile.intendedMajors.join(" / ")} Applicants**

Research experience is one of the most powerful ways to demonstrate intellectual curiosity and capability for top universities.

---

**Research Ideas in Your Field:**

`;

  for (const research of major.research) {
    response += `- ${research}\n`;
  }

  response += `
---

**How to Find Research Opportunities:**

**1. University Professors (Cold Emailing)**
- Research professors at local universities working in areas you find interesting
- Send a personalized email expressing genuine interest in their work
- Mention specific papers you've read and questions you have
- Ask about summer research opportunities or ongoing projects needing assistance

**2. Science Fairs and Competitions**
- Regeneron Science Talent Search (senior year)
- ISEF (International Science and Engineering Fair)
- Regional and state science fairs (good stepping stones)
- Google Science Fair / Breakthrough Junior Challenge

**3. Independent Research Projects**
- Identify a problem in your field that interests you
- Develop a methodology to investigate it
- Document your process and findings
- Consider publishing in high school research journals

---

**Building a Research Portfolio:**

1. **Start Small:** Begin with a literature review or replicating existing research
2. **Find a Mentor:** A professor, graduate student, or industry professional
3. **Document Everything:** Keep detailed notes, data, and methodology
4. **Seek Publication:** Even small journals show you can complete the research cycle
5. **Present Your Work:** Science fairs, conferences, school presentations

---

**Timeline for Research:**

- **Grade 9-10:** Explore interests, learn research methodology, start small projects
- **Grade 11:** Complete significant research, submit to competitions, seek publication
- **Grade 12:** Finalize research for applications, continue work if ongoing

Would you like help designing a specific research project or crafting cold emails to professors?`;

  return response;
}

function generateCompetitionAdvice(profile: StudentProfileContext, major: any, tier: any): string {
  let response = `**Competition Strategy for ${profile.intendedMajors.join(" / ")} Applicants**

Competitions demonstrate your ability to excel beyond the classroom. For ${profile.targetUniversities[0]}, awards in relevant competitions significantly strengthen your application.

---

**Top Competitions for Your Major:**

`;

  for (const comp of major.competitions) {
    response += `- ${comp}\n`;
  }

  response += `
---

**Competition Strategy by Level:**

**National/International (Highest Impact):**
- These awards can be application-defining
- Start preparing 1-2 years in advance
- Focus on 2-3 key competitions rather than many

**State/Regional (Strong Impact):**
- More achievable stepping stones
- Build skills for national competitions
- Show consistent improvement over time

**School/Local (Foundation):**
- Good for building experience
- Less weight in applications but still valuable
- Use these to identify strengths

---

**Preparation Tips:**

1. **Start Early:** Most olympiad-level competitors prepare for 2+ years
2. **Use Past Problems:** Every major competition has archived problems
3. **Find Study Groups:** Connect with other competitors online or locally
4. **Get Coaching:** Consider summer programs or tutors for serious preparation
5. **Track Progress:** Take practice tests regularly to measure improvement

---

**What Your Target Schools Want:**

`;

  for (const exp of tier.expectations.slice(0, 3)) {
    response += `- ${exp}\n`;
  }

  response += `
---

Which competitions interest you most? I can provide specific preparation strategies and timelines.`;

  return response;
}

function generateEssayAdvice(profile: StudentProfileContext): string {
  return `**Essay Strategy for ${profile.targetUniversities.join(", ")} Applications**

Your essays are where your personality, story, and voice come through. Strong essays can make the difference between acceptance and rejection at top schools.

---

**Personal Statement Topics to Consider:**

${essayTopics.personalStatement.map(t => `- ${t}`).join("\n")}

---

**Key Principles for Strong Essays:**

**1. Show, Don't Tell**
- Don't say "I'm passionate about computer science"
- Instead, describe the moment you stayed up until 3am debugging code because you couldn't rest until you solved the problem

**2. Be Specific and Authentic**
- Generic essays read like everyone else's
- Your unique details and voice make you memorable
- Admissions officers read thousands of essays - stand out!

**3. Reflect and Grow**
- The best essays show self-awareness
- Discuss what you learned, how you changed, what you now understand
- Connect experiences to who you are today

**4. Connect to Your Future**
- Link your past experiences to your goals
- Show a clear through-line from who you were to who you're becoming

---

**Supplemental Essay Strategies:**

${essayTopics.supplementalStrategies.map(s => `- ${s}`).join("\n")}

---

**Common Mistakes to Avoid:**

${essayTopics.commonMistakes.map(m => `- ${m}`).join("\n")}

---

**Essay Writing Process:**

1. **Brainstorm (2 weeks):** List 10-15 potential stories and experiences
2. **Outline (1 week):** Choose your strongest ideas and create detailed outlines
3. **Draft (2 weeks):** Write full drafts without editing
4. **Revise (3-4 weeks):** Multiple revision rounds with feedback
5. **Polish (1 week):** Final proofreading and refinements

---

**Your Unique Angle:**

Based on your profile - strengths in ${profile.strengths} and interest in ${profile.intendedMajors.join("/")} - consider how these elements combine in a way that's uniquely you.

Would you like help brainstorming specific essay topics or reviewing an outline?`;
}

function generateSummerAdvice(profile: StudentProfileContext, major: any): string {
  let response = `**Summer Planning for ${profile.intendedMajors.join(" / ")} Applicants**

Summer is your chance to pursue intensive experiences that aren't possible during the school year. Use this time strategically!

---

**Top Summer Programs for Your Major:**

`;

  for (const program of major.summerPrograms) {
    response += `- ${program}\n`;
  }

  response += `
---

**Summer Options by Impact Level:**

**Tier 1 - Highly Selective Programs:**
- RSI (Research Science Institute) - Free, extremely competitive
- MIT PRIMES / PRIMES-USA - Research with MIT professors
- SSP (Summer Science Program) - Intensive research experience
- TASP (Telluride Association Summer Program) - Humanities focus

**Tier 2 - Strong Programs:**
- Governor's Schools (free, state-run)
- University research programs (many available)
- Internships at companies or labs
- Intensive skill-building camps

**Tier 3 - Good Experiences:**
- Online courses from universities
- Self-directed projects
- Jobs or internships in relevant fields
- Community service projects

---

**If You Can't Get Into Selective Programs:**

Don't worry! Many successful applicants never attended famous programs. What matters is what you **do** with your summer:

1. **Self-directed projects:** Build an app, write a research paper, start a business
2. **Local internships:** Reach out to local professionals in your field
3. **Online learning:** Complete courses from MIT OpenCourseWare, Coursera, etc.
4. **Community impact:** Start an initiative that helps your community

---

**Summer Planning Timeline:**

- **January-February:** Research programs and deadlines
- **March-April:** Submit applications
- **May:** Finalize plans, prepare for programs
- **June-August:** Execute your summer plan
- **Late August:** Reflect and document what you learned

---

What type of summer experience are you most interested in? I can help you identify specific opportunities or design an independent project.`;

  return response;
}

function generateTimelineAdvice(profile: StudentProfileContext, grade: any): string {
  let response = `**Timeline and Action Plan**

Based on your profile, here's a comprehensive timeline for your college admissions journey:

---

**Your ${profile.gradeLevel.replace("-", " ").replace("grade", "Grade")} Timeline:**

`;

  for (const item of grade.timeline) {
    response += `- ${item}\n`;
  }

  response += `
---

**Complete High School Timeline:**

**Freshman Year (Grade 9):**
- Explore interests through clubs and activities
- Build strong academic foundations
- Develop core skills in potential areas of focus
- Summer: Try new experiences, start learning a skill

**Sophomore Year (Grade 10):**
- Begin narrowing to 1-2 primary interests
- Take on initial leadership roles
- Start preparing for PSAT/standardized tests
- Summer: First substantive experience (program, project, or internship)

**Junior Year (Grade 11) - CRITICAL:**
- Most challenging course load
- Highest leadership positions
- Major achievements in competitions/research
- SAT/ACT prep and testing (take by end of junior year)
- Begin college research and list development
- Summer: Most impactful experience (prestigious program, research, or major project)

**Senior Year (Grade 12):**
- August-September: Finalize college list, start essays
- October: Complete Common App, Early Decision applications
- November: Submit Early applications
- December-January: Complete Regular Decision applications
- March-April: Receive decisions, make final choice
- May: Commit to school, send final transcript

---

**Key Deadlines to Track:**

- **PSAT:** October (sophomore and junior year)
- **SAT/ACT:** Multiple dates, aim to finish by June of junior year
- **AP Exams:** May (registration in fall)
- **Early Decision/Action:** November 1-15 (varies by school)
- **Regular Decision:** January 1-15 (varies by school)
- **Financial Aid (FAFSA/CSS):** October of senior year

---

Would you like a more detailed timeline for a specific aspect of your preparation?`;

  return response;
}

function generateTestingAdvice(profile: StudentProfileContext, tier: any): string {
  return `**Standardized Testing Strategy**

Testing is one component of your application. Here's how to approach it strategically:

---

**Score Targets for Your Schools:**

${tier.expectations.filter((e: string) => e.toLowerCase().includes("score") || e.toLowerCase().includes("test")).map((e: string) => `- ${e}`).join("\n") || "- Aim for 1500+ SAT or 33+ ACT for highly selective schools"}

---

**SAT vs. ACT:**

Take a full practice test of each to see which suits you better:
- **SAT:** More strategic, fewer questions, reading-heavy
- **ACT:** Faster pace, science section, more straightforward math

Many students score equivalently on both, but some find one format significantly easier.

---

**Preparation Strategy:**

**Phase 1 - Diagnostic (1-2 weeks):**
- Take full official practice tests for SAT and ACT
- Identify strengths and weaknesses
- Choose which test to focus on

**Phase 2 - Content Review (4-6 weeks):**
- Study weak content areas
- Use official prep materials (College Board, ACT.org)
- Consider prep courses or tutoring for targeted help

**Phase 3 - Practice Testing (4-6 weeks):**
- Take full practice tests weekly
- Review every mistake in detail
- Focus on timing and stamina

**Phase 4 - Final Prep (2 weeks before test):**
- Light review, no new content
- Focus on test-day strategies
- Get plenty of sleep

---

**Test-Optional Considerations:**

Many schools are now test-optional. Submit scores if:
- Your scores are at or above the school's 50th percentile
- Your scores strengthen a weaker part of your application

Consider going test-optional if:
- Your scores are significantly below the school's range
- The rest of your application is very strong

---

**Subject Tests / AP Scores:**

- Most schools no longer require SAT Subject Tests (discontinued)
- Strong AP scores (4s and 5s) can demonstrate subject mastery
- Some competitive programs value specific AP scores

---

**Timeline:**

- **Sophomore Spring:** Take PSAT for practice
- **Junior Fall:** Take PSAT (National Merit qualifier)
- **Junior Winter/Spring:** First SAT/ACT attempts
- **Junior Summer:** Prep and retake if needed
- **Senior Fall:** Final attempt if necessary

What's your current testing situation? I can provide more specific prep recommendations.`;
}

function generateRecommendationAdvice(profile: StudentProfileContext): string {
  return `**Letters of Recommendation Strategy**

Strong recommendation letters provide insight into who you are beyond grades and test scores. Here's how to secure excellent recommendations:

---

**Who Should Write Your Letters:**

**Core Academic Recommendations (2 required by most schools):**
- One STEM teacher (math, science, computer science)
- One humanities teacher (English, history, social studies)
- Choose teachers who know you well, not just classes where you got an A

**Additional Recommendations (optional but valuable):**
- Counselor letter (required)
- Activity supervisor, coach, or mentor
- Research mentor or employer
- Alumni of your target schools

---

**Choosing the Right Teachers:**

Ask yourself:
1. Has this teacher seen me overcome challenges?
2. Has this teacher seen me contribute to class discussions?
3. Have I had meaningful conversations with this teacher outside of class?
4. Can this teacher speak to my intellectual curiosity and character?

**Important:** A glowing letter from a teacher who truly knows you is far more valuable than a generic letter from a "famous" or senior teacher.

---

**How to Ask:**

**Timing:**
- Ask at the end of junior year or beginning of senior year
- Give teachers at least 4-6 weeks before deadlines
- Ask in person first, then follow up with formal request

**What to Provide:**
- Your resume/activity list
- A "brag sheet" about your accomplishments and goals
- Why you chose this teacher (specific memories or moments)
- Your target schools and what they're looking for
- Deadline information for each school

---

**Building Relationships Now:**

If you're not yet a senior:
- Participate actively in class
- Visit office hours with genuine questions
- Share your interests and goals
- Ask for feedback on your work
- Attend school events where teachers are present

---

**Common Mistakes:**

- Asking teachers who don't know you well
- Giving insufficient time or information
- Not following up appropriately
- Choosing only teachers from your major area

---

Based on your activities (${profile.currentActivities}), think about which teachers or mentors have seen you at your best. Would you like help crafting a request or preparing materials for your recommenders?`;
}

function generateSpikeAdvice(profile: StudentProfileContext, major: any): string {
  return `**Building Your "Spike" for Top Universities**

A "spike" is an area where you've achieved unusual depth and excellence. Top universities look for students who are exceptional at something, not just well-rounded.

---

**What Makes a Strong Spike:**

1. **Depth:** Going far beyond what's typical for a high school student
2. **Uniqueness:** Combining interests in a novel way
3. **Impact:** Creating something that affects others
4. **Recognition:** External validation (awards, publication, press coverage)
5. **Authenticity:** Genuine passion, not resume-building

---

**Based on Your Profile:**

Your interests (${profile.intendedMajors.join(", ")}) and strengths (${profile.strengths}) suggest several potential spike directions:

**Option 1: Deep Technical Achievement**
- Win national-level competitions in your field
- Publish research in academic journals
- Build something used by thousands of people

**Option 2: Entrepreneurial Impact**
- Start an organization that solves a real problem
- Build a product or service with real users
- Create measurable community impact

**Option 3: Research Excellence**
- Original research with university mentors
- Science fair success (ISEF, Regeneron STS)
- Academic publication or conference presentation

**Option 4: Creative + Technical Fusion**
- Combine your major with another interest uniquely
- Create a project that showcases interdisciplinary thinking
- Build something that doesn't fit traditional categories

---

**Developing Your Spike:**

**Phase 1 - Foundation (Grade 9-10):**
- Build fundamental skills
- Explore to find genuine interests
- Start small projects and see what excites you

**Phase 2 - Focus (Grade 10-11):**
- Choose 1-2 primary areas
- Commit significant time (10+ hours/week)
- Seek mentors and advanced opportunities

**Phase 3 - Excellence (Grade 11-12):**
- Achieve recognition at highest possible level
- Create tangible, demonstrable impact
- Document everything for applications

---

**Skills to Develop for ${profile.intendedMajors[0]}:**

${major.skills.map((s: string) => `- ${s}`).join("\n")}

---

**The Key Question:**

What can you become one of the best high school students in your state (or country) at? What would you do even if it didn't help your college application?

That intersection of passion and potential excellence is where your spike lives.

Would you like help developing a specific spike idea or planning how to take your current activities to the next level?`;
}

function generateWaterlooAdvice(profile: StudentProfileContext): string {
  return `**Waterloo Admissions Strategy**

Waterloo, especially for CS and Engineering, has a unique admissions process. Here's how to approach it:

---

**What Makes Waterloo Different:**

1. **AIF (Admission Information Form):** A mandatory form that's essentially their version of personal essays
2. **Contest Results:** CEMC contests (Euclid, CCC, etc.) carry significant weight
3. **Grade Focus:** Strong emphasis on math and relevant subject grades
4. **Co-op Program:** Unique 6-term work experience integrated into degree

---

**CEMC Contests to Prioritize:**

**For CS/Software Engineering:**
- **CCC (Canadian Computing Competition):** Most important for CS
  - Target: Junior Division Honor Roll → Senior Division top scores
  - Prep: Past problems at cemc.uwaterloo.ca, USACO-style practice

**For Engineering/Math:**
- **Euclid Mathematics Contest:** Key for all engineering programs
  - Target: Top 25% nationally, ideally Certificate of Distinction
  - Prep: Past contests, Art of Problem Solving resources

**Other Valuable Contests:**
- Fermat, Cayley, Pascal (earlier grades)
- CIMC (Intermediate)
- Hypatia (for those who prefer proofs)

---

**AIF Strategy:**

The AIF has several components:
1. **Extracurricular Activities:** Similar to Common App activities list
2. **Short Essays:** Explain your interest in the program, significant experiences
3. **Additional Information:** Explain any circumstances affecting your grades

**Tips:**
- Be specific and quantify your achievements
- Show genuine enthusiasm for the specific program
- Connect your experiences to why Waterloo is the right fit
- Mention co-op as a reason you're interested

---

**Grade Expectations:**

**Computer Science:** 
- Minimum cutoff: ~90% average
- Competitive: 95%+ with strong AIF and contests

**Software Engineering:**
- Even more competitive than CS
- Top grades + strong contests + excellent AIF needed

**Other Engineering Programs:**
- Requirements vary; check specific programs
- Math and science grades weighted heavily

---

**Timeline for Waterloo:**

- **Grade 9-10:** Start CEMC contests, build programming skills
- **Grade 11:** Take CCC and Euclid, continue building profile
- **Grade 12 Fall:** Submit application through OUAC
- **December-February:** Complete AIF
- **February:** Take Euclid (final chance)
- **March-May:** Admission decisions released

---

**Key Advice:**

1. Start CCC/Euclid prep early - these contests are hard to cram for
2. Your AIF matters as much as grades for borderline cases
3. Waterloo values technical skills and real projects over traditional ECs
4. Co-op interest should be genuine - it's a major part of the Waterloo experience

Would you like specific help with CCC preparation or AIF writing strategies?`;
}

function generateGeneralAdvice(profile: StudentProfileContext, message: string): string {
  const majorCategory = detectMajorCategory(profile.intendedMajors);
  const major = majorCategories[majorCategory];
  const grade = gradeAdvice[profile.gradeLevel] || gradeAdvice["grade-11"];

  return `**Let me help with your college admissions journey!**

Based on your profile and question, here are some thoughts:

---

**Quick Profile Summary:**
- You're targeting ${profile.targetUniversities.slice(0, 3).join(", ")}
- Your intended major: ${profile.intendedMajors.join(", ")}
- Current strengths: ${profile.strengths}
- Areas to develop: ${profile.weaknesses}

---

**Key Priorities for You Right Now:**

${grade.priorities.map(p => `- ${p}`).join("\n")}

---

**Relevant Opportunities:**

**Competitions:**
${major.competitions.slice(0, 3).map(c => `- ${c}`).join("\n")}

**Summer Programs:**
${major.summerPrograms.slice(0, 3).map(s => `- ${s}`).join("\n")}

---

**I can provide detailed guidance on:**

- **Course Planning:** What classes to take each year
- **Extracurriculars:** Building your activities and "spike"
- **Research:** Finding opportunities and designing projects
- **Competitions:** Which to prioritize and how to prepare
- **Essays:** Topic brainstorming and writing strategies
- **Summer Planning:** Programs and independent projects
- **Timeline:** When to do what in your admissions journey
- **Testing:** SAT/ACT strategies
- **Recommendations:** Getting strong letters

What specific area would you like to explore in more detail?`;
}

export function generateAstraResponse(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
  profile?: StudentProfileContext,
  isInitialGreeting = false
): string {
  if (!profile) {
    return `**Welcome to Astra!**

I'm your AI College Admissions Advisor, ready to help you navigate your journey to top universities.

To give you personalized advice, please complete the onboarding questionnaire with information about:
- Your current grade level
- Intended major(s)
- Target universities
- Current activities and achievements
- Strengths and areas for improvement

Once I know more about you, I can provide tailored recommendations for courses, extracurriculars, competitions, research opportunities, essays, and more!`;
  }

  if (isInitialGreeting) {
    return generateInitialGreeting(profile);
  }

  const lastUserMessage = messages.filter((m) => m.role === "user").pop();
  if (!lastUserMessage) {
    return generateInitialGreeting(profile);
  }

  const topics = detectTopics(lastUserMessage.content);
  return generateTopicResponse(topics[0], profile, lastUserMessage.content);
}
