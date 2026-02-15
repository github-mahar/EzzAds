# performance-budget.md
## Performance Constraints: EzzAds

---

# 1. JS BUDGET

**Goal**: Zero-Bloat.

Rules:
- **Server Components** for all non-interactive UI.
- **Lazy Load** the Ad Result components if heavy.
- **Lucide React** for icons (tree-shakeable).
- No heavy charting libraries unless necessary for Analytics.

---

# 2. FONT BUDGET

- **Inter / Geist / SF Pro** (Variable font preferred).
- **JetBrains Mono** or **Geist Mono** for data.
- Self-host or use `next/font`. No Google Fonts CDN at runtime.

---

# 3. ANIMATION BUDGET

- CSS Transitions > JS Animations.
- If using `framer-motion`, bundle size must be monitored.
- Prefer `transform` and `opacity` changes only (GPU accelerated).

---

# 4. WEB VITALS TARGETS

- **LCP**: < 1.2s (Critical for "Institute Speed" feel).
- **CLS**: 0 (Layout must be rigid).
- **FID**: < 100ms.

---

# 5. IMAGE STRATEGY

- Use SVGs for UI elements (Icons, Grid).
- Optimize any user-facing images automatically (`next/image`).

---

END
