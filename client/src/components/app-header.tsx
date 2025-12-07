import { GraduationCap } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface AppHeaderProps {
  showReset?: boolean;
  onReset?: () => void;
}

export function AppHeader({ showReset, onReset }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-background/80 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold font-serif tracking-tight">Astra</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              AI College Admissions Advisor
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {showReset && onReset && (
            <button
              onClick={onReset}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
              data-testid="button-new-chat"
            >
              New Chat
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
