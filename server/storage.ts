import { randomUUID } from "crypto";
import type { 
  Message, 
  Conversation, 
  StudentProfile, 
  InsertStudentProfile 
} from "@shared/schema";

export interface IStorage {
  // Profile methods
  createProfile(profile: InsertStudentProfile): Promise<StudentProfile>;
  getProfile(id: string): Promise<StudentProfile | undefined>;

  // Conversation methods
  createConversation(profileId?: string): Promise<Conversation>;
  getConversation(id: string): Promise<Conversation | undefined>;
  addMessage(conversationId: string, message: Message): Promise<void>;
}

export class MemStorage implements IStorage {
  private profiles: Map<string, StudentProfile>;
  private conversations: Map<string, Conversation>;

  constructor() {
    this.profiles = new Map();
    this.conversations = new Map();
  }

  async createProfile(insertProfile: InsertStudentProfile): Promise<StudentProfile> {
    const id = randomUUID();
    const profile: StudentProfile = { ...insertProfile, id };
    this.profiles.set(id, profile);
    return profile;
  }

  async getProfile(id: string): Promise<StudentProfile | undefined> {
    return this.profiles.get(id);
  }

  async createConversation(profileId?: string): Promise<Conversation> {
    const id = randomUUID();
    const conversation: Conversation = {
      id,
      profileId,
      messages: [],
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async getConversation(id: string): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async addMessage(conversationId: string, message: Message): Promise<void> {
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.messages.push(message);
    }
  }
}

export const storage = new MemStorage();
