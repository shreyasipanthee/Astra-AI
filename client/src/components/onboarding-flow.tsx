import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap, ArrowRight, Sparkles, Target, BookOpen } from "lucide-react";
import type { InsertStudentProfile } from "@shared/schema";

interface OnboardingFlowProps {
  onComplete: (profile: InsertStudentProfile) => void;
}

const POPULAR_MAJORS = [
  "Computer Science",
  "Engineering",
  "Business",
  "Pre-Med",
  "Biology",
  "Physics",
  "Mathematics",
  "Economics",
  "Psychology",
  "Political Science",
];

const POPULAR_UNIVERSITIES = [
  "MIT",
  "Harvard",
  "Stanford",
  "Princeton",
  "Yale",
  "Cornell",
  "Columbia",
  "UPenn",
  "Waterloo",
  "UofT",
  "McGill",
  "Berkeley",
  "Caltech",
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<InsertStudentProfile>>({
    gradeLevel: "",
    intendedMajors: [],
    targetUniversities: [],
    currentActivities: "",
    strengths: "",
    weaknesses: "",
    timeline: "",
  });

  const updateProfile = <K extends keyof InsertStudentProfile>(
    key: K,
    value: InsertStudentProfile[K]
  ) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (
    key: "intendedMajors" | "targetUniversities",
    item: string
  ) => {
    const current = profile[key] || [];
    if (current.includes(item)) {
      updateProfile(key, current.filter((i) => i !== item));
    } else {
      updateProfile(key, [...current, item]);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return profile.gradeLevel;
      case 1:
        return (profile.intendedMajors?.length ?? 0) > 0;
      case 2:
        return (profile.targetUniversities?.length ?? 0) > 0;
      case 3:
        return profile.currentActivities?.trim();
      case 4:
        return profile.strengths?.trim() && profile.weaknesses?.trim();
      case 5:
        return profile.timeline;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete(profile as InsertStudentProfile);
    }
  };

  const steps = [
    {
      title: "What grade are you in?",
      description: "This helps me tailor advice to your timeline.",
      icon: GraduationCap,
      content: (
        <div className="space-y-4">
          <Select
            value={profile.gradeLevel}
            onValueChange={(v) => updateProfile("gradeLevel", v)}
          >
            <SelectTrigger data-testid="select-grade-level" className="w-full">
              <SelectValue placeholder="Select your grade level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grade-9">Grade 9 (Freshman)</SelectItem>
              <SelectItem value="grade-10">Grade 10 (Sophomore)</SelectItem>
              <SelectItem value="grade-11">Grade 11 (Junior)</SelectItem>
              <SelectItem value="grade-12">Grade 12 (Senior)</SelectItem>
              <SelectItem value="gap-year">Gap Year</SelectItem>
              <SelectItem value="transfer">College Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      title: "What do you want to study?",
      description: "Select your intended major(s). You can pick multiple.",
      icon: BookOpen,
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {POPULAR_MAJORS.map((major) => (
              <Badge
                key={major}
                variant={profile.intendedMajors?.includes(major) ? "default" : "outline"}
                className="cursor-pointer px-3 py-1.5 text-sm"
                onClick={() => toggleArrayItem("intendedMajors", major)}
                data-testid={`badge-major-${major.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {major}
              </Badge>
            ))}
          </div>
          <Input
            placeholder="Or type a custom major..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                toggleArrayItem("intendedMajors", e.currentTarget.value.trim());
                e.currentTarget.value = "";
              }
            }}
            data-testid="input-custom-major"
          />
        </div>
      ),
    },
    {
      title: "Which universities are you targeting?",
      description: "Pick your dream schools. Be ambitious!",
      icon: Target,
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {POPULAR_UNIVERSITIES.map((uni) => (
              <Badge
                key={uni}
                variant={profile.targetUniversities?.includes(uni) ? "default" : "outline"}
                className="cursor-pointer px-3 py-1.5 text-sm"
                onClick={() => toggleArrayItem("targetUniversities", uni)}
                data-testid={`badge-university-${uni.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {uni}
              </Badge>
            ))}
          </div>
          <Input
            placeholder="Or type another university..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                toggleArrayItem("targetUniversities", e.currentTarget.value.trim());
                e.currentTarget.value = "";
              }
            }}
            data-testid="input-custom-university"
          />
        </div>
      ),
    },
    {
      title: "What are your current activities?",
      description: "Clubs, sports, research, jobs, volunteering, projects...",
      icon: Sparkles,
      content: (
        <div className="space-y-2">
          <Textarea
            placeholder="Example: President of Robotics Club, varsity tennis, research internship at local university lab, part-time tutor for SAT prep..."
            value={profile.currentActivities}
            onChange={(e) => updateProfile("currentActivities", e.target.value)}
            className="min-h-[120px]"
            data-testid="textarea-activities"
          />
        </div>
      ),
    },
    {
      title: "What are your strengths and areas for growth?",
      description: "Be honest - this helps me give you targeted advice.",
      icon: Target,
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="strengths">Your Strengths</Label>
            <Textarea
              id="strengths"
              placeholder="Example: Strong GPA, leadership experience, unique research background..."
              value={profile.strengths}
              onChange={(e) => updateProfile("strengths", e.target.value)}
              className="min-h-[80px]"
              data-testid="textarea-strengths"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weaknesses">Areas to Improve</Label>
            <Textarea
              id="weaknesses"
              placeholder="Example: Limited extracurriculars, test scores need work, no research experience yet..."
              value={profile.weaknesses}
              onChange={(e) => updateProfile("weaknesses", e.target.value)}
              className="min-h-[80px]"
              data-testid="textarea-weaknesses"
            />
          </div>
        </div>
      ),
    },
    {
      title: "What's your timeline?",
      description: "When are you applying to college?",
      icon: GraduationCap,
      content: (
        <div className="space-y-4">
          <Select
            value={profile.timeline}
            onValueChange={(v) => updateProfile("timeline", v)}
          >
            <SelectTrigger data-testid="select-timeline" className="w-full">
              <SelectValue placeholder="Select your application cycle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-2025">2024-2025 (This Year)</SelectItem>
              <SelectItem value="2025-2026">2025-2026 (Next Year)</SelectItem>
              <SelectItem value="2026-2027">2026-2027 (2 Years Away)</SelectItem>
              <SelectItem value="2027-2028">2027-2028 (3 Years Away)</SelectItem>
              <SelectItem value="exploring">Just Exploring</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-8 rounded-full transition-colors ${
                i <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl md:text-2xl font-semibold">
              {currentStep.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {currentStep.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            {currentStep.content}

            <div className="flex justify-between mt-8">
              {step > 0 ? (
                <Button
                  variant="ghost"
                  onClick={() => setStep(step - 1)}
                  data-testid="button-back"
                >
                  Back
                </Button>
              ) : (
                <div />
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                data-testid="button-next"
              >
                {step === steps.length - 1 ? "Start Chatting" : "Continue"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Welcome message for first step */}
        {step === 0 && (
          <p className="text-center text-sm text-muted-foreground mt-6 px-4">
            Welcome to Astra! I'm your AI college admissions advisor. Let me learn about you so I can provide personalized guidance.
          </p>
        )}
      </div>
    </div>
  );
}
