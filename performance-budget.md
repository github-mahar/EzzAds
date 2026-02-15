# performance-budget.md
## Performance Constraints

---

# 1. JS BUDGET

Goal:
Minimal client-side JS.

Rules:
- Do not convert entire pages to client components.
- Use dynamic import only if necessary.
- Avoid heavy libraries.

Framer Motion must be limited to:
- Page transitions
- Controlled stagger

---

# 2. FONT BUDGET

- Maximum 2 font families.
- Use next/font optimization.
- No runtime font loading.

---

# 3. ANIMATION BUDGET

Max animated elements on load:
< 10

No continuous background animations.

No GPU-heavy blur effects.

---

# 4. CSS BUDGET

- No massive global CSS.
- Use Tailwind utilities.
- Avoid deep nesting.

---

# 5. LOAD TARGET

First contentful paint must be fast.
No blocking scripts.

---

END
