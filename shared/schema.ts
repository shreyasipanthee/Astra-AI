import { z } from "zod";

// Message schema for chat
export const messageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.number(),
});

export type Message = z.infer<typeof messageSchema>;

export const insertMessageSchema = messageSchema.omit({ id: true, timestamp: true });
export type InsertMessage = z.infer<typeof insertMessageSchema>;

// Student profile schema for onboarding
export const studentProfileSchema = z.object({
  id: z.string(),
  gradeLevel: z.string(),
  intendedMajors: z.array(z.string()),
  targetUniversities: z.array(z.string()),
  currentActivities: z.string(),
  strengths: z.string(),
  weaknesses: z.string(),
  timeline: z.string(),
});

export type StudentProfile = z.infer<typeof studentProfileSchema>;

export const insertStudentProfileSchema = studentProfileSchema.omit({ id: true });
export type InsertStudentProfile = z.infer<typeof insertStudentProfileSchema>;

// Conversation schema
export const conversationSchema = z.object({
  id: z.string(),
  profileId: z.string().optional(),
  messages: z.array(messageSchema),
});

export type Conversation = z.infer<typeof conversationSchema>;

// Chat request/response schemas
export const chatRequestSchema = z.object({
  message: z.string(), // Allow empty string for initial greeting
  conversationId: z.string().optional(),
  profile: insertStudentProfileSchema.optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;

export const chatResponseSchema = z.object({
  message: messageSchema,
  conversationId: z.string(),
});

export type ChatResponse = z.infer<typeof chatResponseSchema>;
