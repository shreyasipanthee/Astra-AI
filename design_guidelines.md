# Astra AI College Admissions Advisor - Design Guidelines

## Design Approach

**Selected Approach:** Design System (Material Design) with ChatGPT interface patterns
**Rationale:** Educational productivity tool requiring clarity, trust, and readability. Chat-based interface benefits from established conversational UI patterns while maintaining academic professionalism.

---

## Core Design Elements

### Typography Hierarchy

**Font Family:** Google Fonts
- Primary: Inter (400, 500, 600) for UI and body text
- Secondary: Space Grotesk (500, 600) for headers and emphasis

**Type Scale:**
- App Title/Branding: 2xl, semibold (600)
- Section Headers: xl, semibold (600)
- Chat Messages (User): base, medium (500)
- Chat Messages (Astra): base, normal (400)
- Metadata/Timestamps: sm, normal (400)
- Button Text: sm, medium (500)
- Input Text: base, normal (400)

---

### Layout System

**Spacing Units:** Tailwind scale of 2, 3, 4, 6, 8, 12, 16, 20
- Micro spacing (within components): 2, 3, 4
- Component padding: 4, 6, 8
- Section spacing: 12, 16, 20
- Page margins: 8, 12, 16

**Grid Structure:**
- Single-column chat layout (max-w-4xl centered)
- Sidebar width: w-64 for desktop navigation (if multi-page)
- Chat messages: max-w-3xl for optimal readability
- Input area: sticky bottom, full-width container

---

## Component Library

### Chat Interface Components

**Message Bubbles:**
- User messages: Right-aligned, rounded-2xl, px-4 py-3, max-w-prose
- Astra messages: Left-aligned, rounded-2xl, px-6 py-4, max-w-full
- Avatar circles: h-8 w-8 rounded-full for Astra, h-7 w-7 for user
- Message spacing: space-y-6 between conversation turns

**Input Area:**
- Container: sticky bottom-0, px-4 py-6, backdrop-blur
- Textarea: rounded-xl, px-4 py-3, min-h-[52px], max-h-[200px] auto-resize
- Send button: h-10 w-10 rounded-lg, positioned absolute right-2
- Character/token counter: text-sm, positioned top-right of textarea

**Onboarding Cards:**
- Grid of question cards: grid-cols-1 md:grid-cols-2 gap-4
- Card padding: p-6, rounded-xl
- Input fields within cards: px-4 py-2, rounded-lg
- Multi-select options: flex flex-wrap gap-2, rounded-full px-3 py-1.5

### Navigation & Layout

**Header:**
- Height: h-16, sticky top-0, backdrop-blur
- Logo/branding: left-aligned with icon + "Astra" text
- User profile button: right-aligned, h-9 w-9 rounded-full
- Divider: border-b

**Sidebar (if multi-page):**
- Fixed left, w-64, h-screen, border-r
- Navigation items: px-4 py-2, rounded-lg, space-y-1
- Active state: distinct treatment with icon + label
- Conversation history: scrollable list with timestamps

### Content Formatting

**Structured Advice Display:**
- Section headers: text-lg font-semibold mb-3
- Bullet lists: pl-6, space-y-2, custom bullet styling
- Numbered lists: pl-6, space-y-2
- Callout boxes: p-4 rounded-lg border-l-4 (for important tips)
- Timeline items: relative positioning with connecting lines
- Tables: rounded-lg overflow with striped rows

### Form Elements

**Input Fields:**
- Height: h-11, rounded-lg, px-4
- Focus ring: ring-2, subtle offset
- Labels: text-sm font-medium mb-2
- Helper text: text-sm, mt-1

**Buttons:**
- Primary CTA: h-11 px-6 rounded-lg font-medium
- Secondary: h-10 px-5 rounded-lg
- Icon buttons: h-9 w-9 rounded-lg
- Button groups: space-x-2

**Select/Dropdown:**
- Height: h-11, rounded-lg, px-4
- Multi-select tags: rounded-full, px-2 py-1, text-sm

---

## Specialized Features

**Profile Dashboard:**
- Grid layout: grid-cols-1 md:grid-cols-3 gap-6
- Stat cards: p-6 rounded-xl with icon, value, label
- Progress bars: h-2 rounded-full with percentage fill
- Timeline visualization: vertical with milestone markers

**Essay Workspace:**
- Split view: 50/50 editor and feedback panel
- Editor: min-h-[500px], prose styling, line-height relaxed
- Feedback sidebar: sticky, max-h-screen overflow-auto
- Word count: fixed bottom-right of editor

**Competition Calendar:**
- Calendar grid: 7-column layout for week view
- Event cards: p-3 rounded-lg, truncated text with hover expand
- Date headers: sticky positioning, text-sm font-semibold
- Filter chips: rounded-full px-3 py-1 with checkmark icons

---

## Accessibility Standards

- Minimum touch targets: 44x44px
- Focus indicators: visible on all interactive elements
- Semantic HTML: proper heading hierarchy, landmark regions
- ARIA labels: on icon-only buttons and complex widgets
- Keyboard navigation: full support including message history
- Screen reader: announcements for new messages and loading states

---

## Responsive Behavior

**Breakpoints:**
- Mobile: base (< 768px) - single column, full-width chat
- Tablet: md (768px+) - introduce sidebar if applicable
- Desktop: lg (1024px+) - max-width containers, optimal reading width

**Mobile Adaptations:**
- Stack onboarding cards to single column
- Hide sidebar, replace with hamburger menu
- Reduce padding: p-4 → p-3
- Simplify navigation to bottom tab bar
- Input area: reduce py-6 → py-4

---

## Animation Principles

**Minimal Motion:**
- Message appearance: simple fade-in, 200ms duration
- Loading states: gentle pulse on avatar during response
- Button interactions: default browser states (no custom hover animations)
- Smooth scroll: scroll-smooth for navigation jumps
- Avoid: Page transitions, elaborate micro-interactions, parallax effects