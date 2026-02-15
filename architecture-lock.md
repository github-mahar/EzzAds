# architecture-lock.md
## Structural Enforcement Layer
## Applies to: EzzAds Implementation Agent

---

# 1. FOLDER STRUCTURE IS IMMUTABLE

The following structure must be preserved (as per Techstack.md):

/app
  /generate      (Ad Generator)
  /result        (Output Display)
  /dashboard     (Saved Ads)
  /pricing       (Monetization)
  /account       (User Profile)
  /api           (Next.js API Routes)
  layout.tsx
  page.tsx       (Home)

/components
  /ui            (Shared "Void" components)
  /features      (Feature-specific components)
/lib
  supabase.ts
  openai.ts
  stripe.ts
  utils.ts
/types
/public

You may ADD files inside these folders.

You may NOT:
- Rename root folders
- Convert to single-page architecture (SPA)
- Move routing logic outside App Router
- Introduce monorepo structure without approval

---

# 2. RENDERING MODEL LOCK

Must prioritize:

- **Server Components (RSC)** by default
- **Client Components** only when interaction is required (Forms, Toggles, Buttons)
- **No full client-side app conversion**

Do not introduce:
- Redux / MobX
- Zustand (unless local state becomes unmanageable)
- Heavy UI libraries (Mantine, Chakra, Material UI) -> **Use strict Tailwind**

---

# 3. DATA FLOW LOCK

- **Supabase** is the single source of truth for user data.
- **OpenAI** interactions must happen **Server-Side ONLY**.
- **Stripe** handles all payments via webhooks.

No:
- Client-side API keys exposed
- Mock data in production
- Hardcoded content arrays (except for static UI labels)

---

# 4. COMPONENT ABSTRACTION RULE

Do NOT over-abstract.

If a component is used only once, keep it local or inline.
Avoid "Atomic Design" unless it simplifies the specific "Void" system.

---

# 5. STABILITY TEST

Before finalizing:

Ask:
“If I deploy this to Cloudflare Pages right now, will it break?”

If unsure → simplify.

---

END
