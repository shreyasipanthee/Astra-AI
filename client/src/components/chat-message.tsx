import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap, User } from "lucide-react";
import type { Message } from "@shared/schema";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={cn(
        "flex gap-3 md:gap-4",
        isAssistant ? "justify-start" : "justify-end"
      )}
      data-testid={`message-${message.role}-${message.id}`}
    >
      {isAssistant && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <GraduationCap className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3",
          isAssistant
            ? "bg-card text-card-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        <div className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
          {formatMessageContent(message.content)}
        </div>
      </div>

      {!isAssistant && (
        <Avatar className="h-7 w-7 shrink-0">
          <AvatarFallback className="bg-muted text-muted-foreground">
            <User className="h-3.5 w-3.5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

function formatMessageContent(content: string) {
  // Split content into sections and format
  const lines = content.split("\n");
  
  return lines.map((line, i) => {
    // Bold headers (lines starting with **)
    if (line.match(/^\*\*.*\*\*$/)) {
      return (
        <p key={i} className="font-semibold mt-3 first:mt-0 mb-1">
          {line.replace(/\*\*/g, "")}
        </p>
      );
    }
    // Bullet points
    if (line.match(/^[-•]\s/)) {
      return (
        <p key={i} className="pl-4 before:content-['•'] before:mr-2 before:text-muted-foreground">
          {line.replace(/^[-•]\s/, "")}
        </p>
      );
    }
    // Numbered lists
    if (line.match(/^\d+\.\s/)) {
      return (
        <p key={i} className="pl-4">
          {line}
        </p>
      );
    }
    // Empty lines
    if (!line.trim()) {
      return <br key={i} />;
    }
    // Regular text
    return <p key={i}>{line}</p>;
  });
}
