# quality-control.md
## SELF-AUDIT CHECKLIST
## Must be executed before final output

---

# 1. STRUCTURE CHECK

[ ] Multi-page architecture implemented (/generate, /dashboard, etc.)
[ ] App Router used
[ ] No Pages Router fallback
[ ] Folder structure matches `architecture-lock.md`

---

# 2. DESIGN CHECK ("DARK-INTELLIGENCE")

[ ] Background is Deep Obsidian (`#020408`)
[ ] Primary Accent is Neon Blue (`#2563EB`)
[ ] **Logic Grid** background is visible but subtle (opacity < 6%)
[ ] No rounded corners > 6px
[ ] No drop shadows (use 1px borders + glows)
[ ] Typography: Headings are tight-tracked; Data is Monospace.

---

# 3. FUNCTIONALITY CHECK

[ ] Generator Form uses "Segmented Toggles", NOT native dropdowns.
[ ] "Processing" state has a dedicated animation (not just a spinner).
[ ] Output is structured (Headlines, Hooks, Body, CTA) - not a solid block of text.
[ ] Auth protection working on /dashboard and /account.

---

# 4. INTELLECTUAL PROPERTY CHECK

[ ] No "Lorem Ipsum"
[ ] No "Generic SaaS" copy
[ ] Copy feels like a "Military-Grade Marketing Tool"

---

# 5. STACK CHECK

[ ] TypeScript strict mode (no `any`)
[ ] Supabase client initialized correctly
[ ] OpenAI API keys protected (Server-side)
[ ] Stripe Webhooks configured

---

# 6. GENERICITY CHECK

If you remove the logo:
**Does this look like a Bootstrap template?**

If YES → **FAIL**. Redisgn immediately.
If NO (it looks like a sci-fi terminal) → **PASS**.

---

# 7. FINAL VERDICT

You must explicitly state:
“Quality control passed: EzzAds System Green.”

If not, fix issues first.

---

END
