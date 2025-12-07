import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { OnboardingFlow } from "@/components/onboarding-flow";
import { ChatInterface } from "@/components/chat-interface";
import type { InsertStudentProfile } from "@shared/schema";

export default function Home() {
  const [profile, setProfile] = useState<InsertStudentProfile | null>(null);

  const handleOnboardingComplete = (completedProfile: InsertStudentProfile) => {
    setProfile(completedProfile);
  };

  const handleReset = () => {
    setProfile(null);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <AppHeader showReset={!!profile} onReset={handleReset} />
      
      <main className="flex-1 overflow-hidden">
        {!profile ? (
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        ) : (
          <ChatInterface profile={profile} />
        )}
      </main>
    </div>
  );
}
