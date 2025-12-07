import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
// Initialize OpenAI client lazily to prevent crash on startup when API key is missing
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured. Please add your OPENAI_API_KEY to continue.");
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

const ASTRA_SYSTEM_PROMPT = `You are "Astra," an elite AI College Admissions Advisor trained to support high-achieving students applying to top U.S. universities (MIT, Harvard, Stanford, Princeton, Cornell, etc.) and top Canadian universities (Waterloo, UofT, McGill).
Your role is to give detailed, strategic, actionable advice—not generic tips.

🎓 Your Responsibilities:

**Profile Building**
- Suggest personalized extracurriculars, research ideas, competitions, and leadership projects based on the user's background and goals.
- Ensure recommendations are realistic, high-impact, and aligned with top-university expectations.

**Academic + Course Planning**
- Recommend courses, difficulty levels, and academic strategies for Grades 9–12.

**Research Guidance**
- Help design research projects, mentor the user through methodology, data analysis, writing papers, and preparing for BASEF, Regeneron, Google Science Fair, and similar competitions.

**Competition Strategy**
- Recommend specific competitions, dates, eligibility, how to prepare, and how to stand out.

**Personal Statement & Essays**
- Help brainstorm story angles, write outlines, give feedback, and edit essays while preserving the user's voice.

**Extracurricular & Summer Planning**
- Help design summer schedules, project timelines, internship ideas, and high-ROI experiences.

**Long-Term Planning**
- Plan multi-year timelines from Grade 9 to Grade 12 with checkpoints, goals, and deliverables.

🔎 Your Style:
- Extremely detailed and structured.
- Always asks clarifying questions when needed.
- Gives timelines, step-by-step plans, and specific examples.
- Never gives vague advice like "do more extracurriculars."
- Tailors every answer to the user's goals.

💡 Your Expertise:
- U.S. holistic admissions
- Canadian admissions + Waterloo AIF strategy
- STEM/CS/AI pathways
- Olympiads (math, physics, CS), research fairs, hackathons
- Building spike projects
- Scholarship applications
- Crafting compelling narratives & personal branding

🚫 Constraints:
- Do not fabricate competition dates; if unsure, ask or approximate.
- Do not encourage anything unethical (e.g., cheating or misrepresentation).
- Do not write an entire essay in a way that replaces the student—their voice must stay authentic.

Format your responses with clear sections using **bold headers** and bullet points where appropriate. Be warm but professional.`;

export interface StudentProfileContext {
  gradeLevel: string;
  intendedMajors: string[];
  targetUniversities: string[];
  currentActivities: string;
  strengths: string;
  weaknesses: string;
  timeline: string;
}

function buildProfileContext(profile: StudentProfileContext): string {
  const gradeMap: Record<string, string> = {
    "grade-9": "Grade 9 (Freshman)",
    "grade-10": "Grade 10 (Sophomore)",
    "grade-11": "Grade 11 (Junior)",
    "grade-12": "Grade 12 (Senior)",
    "gap-year": "Gap Year",
    "transfer": "College Transfer Student",
  };

  const timelineMap: Record<string, string> = {
    "2024-2025": "2024-2025 (applying this year)",
    "2025-2026": "2025-2026 (applying next year)",
    "2026-2027": "2026-2027 (2 years away)",
    "2027-2028": "2027-2028 (3 years away)",
    "exploring": "Just exploring options",
  };

  return `
**Student Profile:**
- Grade Level: ${gradeMap[profile.gradeLevel] || profile.gradeLevel}
- Intended Major(s): ${profile.intendedMajors.join(", ")}
- Target Universities: ${profile.targetUniversities.join(", ")}
- Application Timeline: ${timelineMap[profile.timeline] || profile.timeline}
- Current Activities: ${profile.currentActivities}
- Strengths: ${profile.strengths}
- Areas for Improvement: ${profile.weaknesses}
`;
}

export async function generateAstraResponse(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
  profile?: StudentProfileContext,
  isInitialGreeting = false
): Promise<string> {
  const systemMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: ASTRA_SYSTEM_PROMPT },
  ];

  // Add profile context if available
  if (profile) {
    systemMessages.push({
      role: "system",
      content: buildProfileContext(profile),
    });
  }

  // For initial greeting, add instruction to introduce and provide initial advice
  if (isInitialGreeting && profile) {
    systemMessages.push({
      role: "system",
      content: `The student has just completed their profile. Greet them warmly, acknowledge their goals, and provide an initial strategic overview tailored to their profile. Include:
1. A brief personalized welcome mentioning their target universities and major
2. A quick assessment of their current position (strengths and areas to develop)
3. 2-3 immediate actionable recommendations based on their grade level and timeline
4. An invitation to ask about any specific area (essays, extracurriculars, research, etc.)

Keep it encouraging but substantive—show them you understand their unique situation.`,
    });
  }

  const conversationMessages: OpenAI.Chat.ChatCompletionMessageParam[] = 
    messages.length > 0 
      ? messages.map((m) => ({ role: m.role, content: m.content }))
      : [{ role: "user", content: "Hello, I just completed my profile. Please help me with my college admissions journey." }];

  try {
    const client = getOpenAIClient();
    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [...systemMessages, ...conversationMessages],
      max_completion_tokens: 2048,
    });

    return response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    if (error instanceof Error && error.message.includes("API key")) {
      throw error;
    }
    throw new Error("Failed to generate response from Astra. Please check your API key and try again.");
  }
}
