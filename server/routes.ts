import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatRequestSchema } from "@shared/schema";
import { generateAstraResponse } from "./openai";
import { randomUUID } from "crypto";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const parsed = chatRequestSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: parsed.error.issues 
        });
      }

      const { message, conversationId, profile } = parsed.data;

      // Get or create conversation
      let conversation = conversationId 
        ? await storage.getConversation(conversationId)
        : null;

      let storedProfile = null;

      // If this is a new conversation with a profile, create both
      if (!conversation) {
        if (profile) {
          storedProfile = await storage.createProfile(profile);
          conversation = await storage.createConversation(storedProfile.id);
        } else {
          conversation = await storage.createConversation();
        }
      } else if (conversation.profileId) {
        storedProfile = await storage.getProfile(conversation.profileId);
      }

      const isInitialGreeting = message === "" && conversation.messages.length === 0;

      // Add user message to conversation (if not initial greeting)
      if (message && !isInitialGreeting) {
        const userMessage = {
          id: randomUUID(),
          role: "user" as const,
          content: message,
          timestamp: Date.now(),
        };
        await storage.addMessage(conversation.id, userMessage);
      }

      // Build conversation history for context
      const conversationHistory = conversation.messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Add current message to history if not initial
      if (message && !isInitialGreeting) {
        conversationHistory.push({ role: "user", content: message });
      }

      // Generate Astra's response
      const profileContext = storedProfile || profile;
      const astraContent = await generateAstraResponse(
        conversationHistory,
        profileContext ? {
          gradeLevel: profileContext.gradeLevel,
          intendedMajors: profileContext.intendedMajors,
          targetUniversities: profileContext.targetUniversities,
          currentActivities: profileContext.currentActivities,
          strengths: profileContext.strengths,
          weaknesses: profileContext.weaknesses,
          timeline: profileContext.timeline,
        } : undefined,
        isInitialGreeting
      );

      // Create assistant message
      const assistantMessage = {
        id: randomUUID(),
        role: "assistant" as const,
        content: astraContent,
        timestamp: Date.now(),
      };

      // Store the response
      await storage.addMessage(conversation.id, assistantMessage);

      res.json({
        message: assistantMessage,
        conversationId: conversation.id,
      });
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(500).json({ error: errorMessage });
    }
  });

  // Get conversation history
  app.get("/api/conversation/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const conversation = await storage.getConversation(id);
      
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      res.json(conversation);
    } catch (error) {
      console.error("Get conversation error:", error);
      res.status(500).json({ error: "Failed to retrieve conversation" });
    }
  });

  return httpServer;
}
