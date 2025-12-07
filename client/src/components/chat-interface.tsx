import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatMessage } from "./chat-message";
import { Send, GraduationCap, Loader2, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Message, InsertStudentProfile, ChatResponse } from "@shared/schema";

interface ChatInterfaceProps {
  profile: InsertStudentProfile;
}

export function ChatInterface({ profile }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Send initial greeting when component mounts
  useEffect(() => {
    sendMessage("", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        message,
        conversationId,
        profile: messages.length === 0 ? profile : undefined,
      });
      return (await response.json()) as ChatResponse;
    },
    onSuccess: (data) => {
      setError(null);
      setConversationId(data.conversationId);
      setMessages((prev) => [...prev, data.message]);
    },
    onError: (err: Error) => {
      const errorMessage = err.message || "Failed to get a response. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const sendMessage = async (messageText: string, isInitial = false) => {
    if (!isInitial && !messageText.trim()) return;

    if (!isInitial) {
      // Add user message immediately
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: messageText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
    }

    chatMutation.mutate(isInitial ? "" : messageText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages */}
      <ScrollArea className="flex-1 px-4 md:px-6" ref={scrollRef}>
        <div className="max-w-4xl mx-auto py-6 space-y-6">
          {messages.length === 0 && !chatMutation.isPending && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Starting your session...</h2>
              <p className="text-muted-foreground">
                Astra is preparing personalized advice based on your profile.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* Loading indicator */}
          {chatMutation.isPending && (
            <div className="flex gap-3 md:gap-4">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <GraduationCap className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-card rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Astra is thinking...</span>
                </div>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && !chatMutation.isPending && (
            <div className="flex gap-3 md:gap-4">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-destructive text-destructive-foreground">
                  <AlertCircle className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-card rounded-2xl px-4 py-3 max-w-[85%] md:max-w-[75%]">
                <p className="text-sm text-destructive font-medium mb-2">Unable to connect</p>
                <p className="text-sm text-muted-foreground mb-3">{error}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setError(null);
                    sendMessage("", true);
                  }}
                  data-testid="button-retry"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t bg-background/80 backdrop-blur-sm px-4 py-4 md:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              placeholder="Ask Astra anything about college admissions..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={chatMutation.isPending}
              className="resize-none pr-12 min-h-[52px] max-h-[200px] rounded-xl"
              rows={1}
              data-testid="textarea-chat-input"
            />
            <Button
              size="icon"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || chatMutation.isPending}
              className="absolute right-2 bottom-2"
              data-testid="button-send-message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Astra provides guidance, not guarantees. Always verify advice with counselors.
          </p>
        </div>
      </div>
    </div>
  );
}
