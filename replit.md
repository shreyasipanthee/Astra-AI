# Astra AI College Admissions Advisor

## Overview

Astra is an AI-powered college admissions advisor designed to help high-achieving students applying to top U.S. and Canadian universities (MIT, Harvard, Stanford, Princeton, Cornell, UWaterloo, UofT, McGill, etc.). The application provides personalized, strategic guidance on profile building, academic planning, research projects, competitions, essays, and long-term planning from Grade 9-12.

The system uses a chat-based interface built with React and TypeScript on the frontend, Express.js on the backend, and integrates with OpenAI's GPT models to deliver detailed, actionable college admissions advice.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool

**UI Component Library**: Radix UI primitives with shadcn/ui design system
- Follows the "New York" style variant with Tailwind CSS
- Custom design tokens for colors, spacing, and typography defined in Tailwind config
- Comprehensive component library including dialogs, forms, buttons, cards, and chat-specific UI elements

**Styling Approach**: 
- Tailwind CSS for utility-first styling with custom HSL-based color system
- Design system inspired by Material Design with ChatGPT interface patterns
- Typography using Google Fonts (Inter for body/UI, Space Grotesk for headers)
- Dark mode support via CSS class-based theming

**State Management**:
- TanStack Query (React Query) for server state management and API calls
- Local React state for UI interactions and form handling
- Custom hooks for toast notifications and mobile detection

**Routing**: wouter for lightweight client-side routing

**Key Frontend Features**:
- Multi-step onboarding flow to collect student profile information
- Real-time chat interface with message history
- Responsive design optimized for desktop and mobile
- Theme toggle (light/dark mode)
- Form validation using React Hook Form with Zod resolvers

### Backend Architecture

**Framework**: Express.js with TypeScript

**API Design**: RESTful API with JSON request/response format
- POST `/api/chat` - Main chat endpoint handling conversation management and AI responses
- Stateless request handling with conversation context maintained through conversation IDs

**Session & Storage Strategy**:
- In-memory storage implementation (`MemStorage`) for development
- Conversation and profile data stored with UUID identifiers
- Designed to be easily swapped for persistent database storage (schema ready for Drizzle ORM with PostgreSQL)

**AI Integration**:
- OpenAI GPT integration using the official OpenAI SDK
- System prompt engineering to define Astra's expertise, responsibilities, and communication style
- Streaming responses not implemented (uses standard completion API)
- Conversation history maintained and passed to AI for context-aware responses

**Error Handling**:
- Graceful degradation when OpenAI API key is missing
- Input validation using Zod schemas shared between frontend and backend
- HTTP status codes for proper error communication

### Data Storage Solutions

**Current Implementation**: In-memory storage via `MemStorage` class

**Planned/Schema-Ready**: PostgreSQL with Drizzle ORM
- Configuration present in `drizzle.config.ts`
- Schema definitions in `shared/schema.ts` using Zod
- Migration support configured but not yet populated

**Data Models**:
- **StudentProfile**: Student background, goals, strengths, weaknesses, timeline
- **Conversation**: Links to optional profile, contains message history
- **Message**: Individual chat messages with role (user/assistant), content, timestamp

**Design Pattern**: Repository pattern with `IStorage` interface enabling easy storage backend swapping

### Authentication and Authorization

**Current State**: No authentication implemented
- Application is currently open-access
- No user accounts or session management
- Suitable for single-user or demo environments

**Future Considerations**: Authentication system can be added using:
- Express session middleware (already included in dependencies: `express-session`, `connect-pg-simple`)
- Passport.js support (included in dependencies with `passport`, `passport-local`)
- JWT tokens for stateless authentication (`jsonwebtoken` dependency present)

### External Dependencies

**AI Services**:
- **OpenAI API**: Core AI functionality using GPT models (currently configured for "gpt-5" per code comments)
- API key required via `OPENAI_API_KEY` environment variable
- Used for generating personalized college admissions advice based on student profiles and conversation history

**Database**:
- **PostgreSQL**: Planned primary database (configuration ready)
- **Drizzle ORM**: Type-safe ORM for database operations with Zod integration
- Connection via `DATABASE_URL` environment variable

**UI & Component Libraries**:
- **Radix UI**: Headless UI component primitives (accordions, dialogs, dropdowns, tooltips, etc.)
- **shadcn/ui**: Pre-built component patterns built on Radix UI
- **Lucide React**: Icon library for consistent iconography
- **TailwindCSS**: Utility-first CSS framework with PostCSS

**Development Tools**:
- **Vite**: Frontend build tool with HMR and development server
- **ESBuild**: Backend bundling for production builds
- **TypeScript**: Type safety across frontend and backend
- **Replit Plugins**: Development environment integration (cartographer, dev banner, runtime error overlay)

**Build & Deployment**:
- Client build outputs to `dist/public`
- Server build bundles to `dist/index.cjs` with selective dependency bundling
- Environment-specific build processes for development vs. production

**Form & Validation**:
- **Zod**: Schema validation for runtime type checking and API contracts
- **React Hook Form**: Form state management with Zod resolver integration
- Shared schemas between client and server via `shared/schema.ts`

**Date Utilities**:
- **date-fns**: Date formatting and manipulation

**Additional Backend Dependencies** (included but may be for future features):
- Rate limiting: `express-rate-limit`
- Email: `nodemailer`
- File uploads: `multer`
- Payment processing: `stripe`
- WebSocket support: `ws`
- Spreadsheet processing: `xlsx`