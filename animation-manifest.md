# animation-manifest.md
## Motion Ruleset: EzzAds System

---

# 1. PAGE LOAD ANIMATION

**Style**: "System Boot"
- **Text Reveal**: Fast scrambling or typewriter effect for headers.
- **Opacity**: Quick fade-in (0 -> 1 in 200ms).
- **Stagger**: Rapid succession.

**Avoid**:
- Slow, dreamy fades ( > 800ms).
- Bounce/Spring effects.

---

# 2. HOVER ANIMATION

**Style**: "Tactile Feedback"
- **Border**: Instant color switch (Slate -> Blue).
- **Glow**: Subtle bloom effect.
- **Scale**: NONE. Do not scale buttons on hover.

---

# 3. PROCESSING STATE (CRITICAL)

When the AI is generating:
- **Progress Bar**: Linear, scanning motion.
- **Text**: "Analyzing...", "Drafting...", "Optimizing..." cycling rapidly.
- **Visuals**: A "Radar" or "Scanner" sweep effect.

**Banned**:
- Standard rotating circle spinner.

---

# 4. TRANSITIONS

- **Instant** or **Fast Cut** prefered.
- If animating route changes, keep it < 150ms.

---

# 5. MOTION PHILOSOPHY

Motion should feel:
**Electronic. Instant. Glitch-free.**

Not:
Organic. Fluid. Bouncy.

---

END
