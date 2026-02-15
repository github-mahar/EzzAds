# TECHSTACK.md  
## Project Name: The EzzAds Generator  
## Deployment: Cloudflare Pages  
## Architecture: Multi-Page SaaS (Production Ready)

---

# 1. Architecture Overview

The EzzAds Generator follows a modern SaaS architecture:

Frontend (Edge Deployed)  
→ Serverless API Layer  
→ OpenAI API  
→ Database (Users + Usage + Ads)  
→ Auth & Payments  

The system prioritizes:

- Performance  
- Scalability  
- Security  
- Low operational complexity  

---

# 2. Frontend Stack

## Framework
**Next.js (App Router)**  
- Native multi-page routing  
- Server Components support  
- Built-in API routes  
- Cloudflare-compatible  
- SEO friendly  

## Language
**TypeScript**  
- Strong typing  
- Maintainable codebase  
- Production-grade safety  

## Styling
**Tailwind CSS**  
- Utility-first workflow  
- Clean responsive control  
- Minimal CSS bloat  

Optional:
- shadcn/ui for consistent SaaS components  

## State Management
- React Server Components (default)  
- useState / useReducer for local UI  
- No heavy global state library  

---

# 3. Backend Stack

## API Layer
**Next.js API Routes (Server-side only)**  

Handles:
- AI requests  
- API key protection  
- Input validation  
- Rate limiting  
- Usage tracking  

## AI Integration
**OpenAI API**

Used for:
- Structured ad generation  
- Platform-specific formatting  
- Psychology frameworks (AIDA, PAS, emotional triggers)  

Rules:
- System prompt controlled internally  
- No client-side API calls  
- Temperature tuned for creative variation  

---

# 4. Database Layer

## Primary Database
**Supabase (PostgreSQL)**  

Stores:
- Users  
- Plan type  
- Usage tracking  
- Saved ads  
- Generation logs  

Why Supabase:
- Built-in auth  
- SQL reliability  
- Scalable  
- Cloudflare compatible  

## Core Tables

### Users
- id  
- email  
- plan_type  
- generations_used_today  
- created_at  

### Ads
- id  
- user_id  
- platform  
- input_data (JSON)  
- output_data (JSON)  
- created_at  

---

# 5. Authentication

**Supabase Auth**

Features:
- Email login  
- Magic link option  
- Session handling  
- Route protection  

Protected Pages:
- Dashboard  
- Account  
- Saved Ads  

---

# 6. Payments

**Stripe**

Used for:
- Subscription management  
- Plan upgrades  
- Billing portal  

Flow:
Stripe Checkout → Webhook → Update user plan in database  

---

# 7. Deployment & Hosting

## Hosting
**Cloudflare Pages**

Benefits:
- Global edge delivery  
- Fast static + SSR  
- Low latency  
- Cost-efficient  

## Serverless Functions
Used for:
- AI generation endpoint  
- Rate limiting  
- Stripe webhooks  

---

# 8. Security

- Environment variables for API keys  
- Server-only OpenAI key usage  
- Rate limiting middleware  
- Input validation using Zod  
- Sanitized output rendering  

---

# 9. Performance Strategy

- Default to Server Components  
- Minimal client-side JavaScript  
- Dynamic imports where needed  
- Lazy loading heavy components  
- Optimized API calls  
- Prevent layout shift  

Targets:
- Page load under 2 seconds  
- Lighthouse ≥ 90  
- TTFB under 500ms  

---

# 10. Observability

Phase 1:
- Basic error logging  

Phase 2:
- Sentry integration  
- API failure tracking  
- Usage anomaly monitoring  

---

# 11. Folder Structure (Recommended)

/app
/home
/generate
/result
/dashboard
/pricing
/account
/support

/components
/lib
openai.ts
rate-limit.ts
stripe.ts
supabase.ts
/types
/middleware.ts


---

# 12. Development Tools

- ESLint  
- Prettier  
- Husky (pre-commit checks)  
- GitHub for version control  

---

# 13. Future Scalability

- Queue system for high AI load  
- Prompt caching layer  
- Fine-tuned AI models  
- Analytics dashboard  
- Team accounts (B2B mode)  

---

# 14. Stack Philosophy

The stack must:

- Stay lean  
- Stay scalable  
- Stay production-ready  
- Avoid unnecessary complexity  
- Enable fast iteration  

If the stack becomes complicated without growth need,  
it has failed.