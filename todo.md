# TODO.md - The EzzAds Generator

## 1. Project Initialization
- [ ] Initialize Next.js App (TypeScript, App Router)
- [ ] Configure Tailwind CSS with "Void and Signal" color palette
- [ ] Set up directory structure (app, components, lib, types)
- [ ] Install dependencies (Supabase, Stripe, ensuring no unnecessary bloat)
- [ ] Verify local dev environment matches Techstack.md

## 2. Design System Implementation
- [ ] Create `tailwind.config.ts` with custom colors (`--color-bg-primary`, etc.)
- [ ] Implement global styles (CSS variables, fonts - Inter/Geist)
- [ ] Build "Logic Grid" background component
- [ ] Create core UI components (Buttons, Cards, Inputs) with 1px borders & glow effects
- [ ] Create Navigation Bar (Persistent, Active states)
- [ ] Create Footer

## 3. Database & Authentication (Supabase)
- [ ] Initialize Supabase project
- [ ] Create `Users` table (id, email, plan_type, generations_used)
- [ ] Create `Ads` table (id, user_id, platform, input_data, output_data)
- [ ] Configure Supabase Cloud Functions / RPC if needed
- [ ] Implement Authentication (Login/Signup pages)
- [ ] Create Middleware for route protection

## 4. Feature Implementation
### 4.1 Home Page
- [ ] Hero Section with Headlines
- [ ] Platform Badges
- [ ] "Generate Your Ad" (CTA)
- [ ] Feature Highlights

### 4.2 Generator Engine (GENERATE_AD)
- [ ] Create Structured Prompt Form (Product, Audience, Platform, Tone, Goal)
- [ ] Implement "Segmented Toggles" for selection (No dropdowns)
- [ ] Add Loading State ("Processing" animation)
- [ ] Connect to API Route

### 4.3 AI Integration (Backend)
- [ ] Create Next.js API Route for Ad Generation
- [ ] Implement OpenAI API integration
- [ ] Design System Prompt (AIDA, PAS frameworks)
- [ ] Implement Rate Limiting strategy

### 4.4 Results Interface (OUTPUT_RESULT)
- [ ] Display Generated Ad Blocks (Headlines, Body, CTA)
- [ ] Implement Copy to Clipboard functionality
- [ ] Implement "Save to Archive" functionality
- [ ] Add "Regenerate" option

### 4.5 Dashboard (SAVED_ADS)
- [ ] Fetch and display list of saved ads
- [ ] Create Card layout for saved items
- [ ] Implement View/Delete actions

### 4.6 Account & Pricing
- [ ] Pricing Page (Free vs Pro structure)
- [ ] Integration with Stripe (Checkout flow)
- [ ] Account Page (Profile details, usage stats)

## 5. Polishing & Optimization
- [ ] SEO Optimization (Metadata, Semantic HTML)
- [ ] Performance Tuning (Lighthouse score check)
- [ ] Mobile Responsiveness Verifiction
- [ ] Accessibility Audit
- [ ] Final Design Review against design.md (Anti-generic safeguards)
