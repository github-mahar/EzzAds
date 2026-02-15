# architecture-lock.md
## Structural Enforcement Layer
## Applies to: GPT-5 and Claude Code

---

# 1. FOLDER STRUCTURE IS IMMUTABLE

The following structure must be preserved:

/app
  /system-info
  /project-archive
  /execution-pipeline
  /initialize-connection
  layout.tsx
  page.tsx

/components
/lib
/styles
/public

You may ADD files inside these folders.

You may NOT:
- Rename root folders
- Convert to single-page architecture
- Move routing logic outside App Router
- Introduce monorepo structure
- Add backend folders

---

# 2. RENDERING MODEL LOCK

Must prioritize:

- Server Components by default
- Client Components only when required
- No full client-side app conversion
- No unnecessary state management libraries

Do not introduce:
- Redux
- Zustand
- Context unless absolutely required

---

# 3. DATA FLOW LOCK

All content must originate from:

/lib/data.ts

No:
- External APIs
- CMS
- Dynamic runtime fetching
- Edge database calls

If future scalability is needed,
architect in a way that does not break static deployment.

---

# 4. COMPONENT ABSTRACTION RULE

Do NOT over-abstract.

If a component is used only once,
do not extract it unnecessarily.

Avoid:
- Premature optimization
- Hyper-generic reusable component systems

---

# 5. STABILITY TEST

Before finalizing:

Ask:
“If I deploy this to Cloudflare Pages right now, will it break?”

If unsure → simplify.

---

END
