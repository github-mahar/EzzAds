import Link from 'next/link';
import {
  Zap,
  Target,
  BarChart3,
  Layers,
  ArrowRight,
  Cpu,
  Shield,
  Clock,
} from 'lucide-react';

const PLATFORM_BADGES = [
  { name: 'META', icon: '◆', status: 'OPTIMIZED' },
  { name: 'GOOGLE', icon: '▲', status: 'OPTIMIZED' },
  { name: 'TIKTOK', icon: '●', status: 'OPTIMIZED' },
  { name: 'YOUTUBE', icon: '▶', status: 'OPTIMIZED' },
  { name: 'LINKEDIN', icon: '■', status: 'READY' },
];

const FEATURES = [
  {
    icon: <Target size={20} />,
    title: 'PRECISION_TARGETING',
    description: 'AI-driven audience analysis with platform-specific ad optimization for maximum conversion rates.',
    metric: 'CTR +340%',
  },
  {
    icon: <Layers size={20} />,
    title: 'FRAMEWORK_ENGINE',
    description: 'Leverages AIDA, PAS, and emotional trigger frameworks — not generic copy templates.',
    metric: 'ROAS 4.2x',
  },
  {
    icon: <Cpu size={20} />,
    title: 'MULTI_VARIANT_OUTPUT',
    description: 'Generates headlines, hooks, primary text, CTAs, and creative direction in a single operation.',
    metric: '6 BLOCKS',
  },
  {
    icon: <Clock size={20} />,
    title: 'RAPID_GENERATION',
    description: 'Complete ad copy package generated in under 8 seconds. No drafts. No iterations. Deploy-ready.',
    metric: '<8s',
  },
  {
    icon: <Shield size={20} />,
    title: 'CONVERSION_GRADE',
    description: 'Every output is scored against conversion benchmarks. Only optimal-rated copy is delivered.',
    metric: '92% SCORE',
  },
  {
    icon: <BarChart3 size={20} />,
    title: 'PLATFORM_INTELLIGENCE',
    description: 'Adapts copy length, tone, and structure for each ad platform\'s algorithm requirements.',
    metric: '5 PLATFORMS',
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* ====== HERO SECTION ====== */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="max-w-[1440px] mx-auto px-6 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Content */}
            <div className="lg:col-span-7 flex flex-col gap-8 animate-boot">
              {/* System Status Tag */}
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center gap-2 px-3 py-1.5"
                  style={{
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-sharp)',
                    background: 'var(--color-bg-secondary)',
                  }}
                >
                  <span className="status-pulse" />
                  <span className="mono-label text-[10px]">SYSTEM_ONLINE</span>
                </div>
                <span className="mono-label text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                  v1.0.0 // PRODUCTION
                </span>
              </div>

              {/* Headline */}
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
                  Generate{' '}
                  <span className="text-gradient-signal">High-Converting</span>
                  <br />
                  Ad Copy in Seconds
                </h1>
                <p
                  className="text-base md:text-lg max-w-xl leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Deploy AI-powered marketing frameworks across Meta, Google, TikTok, YouTube, and LinkedIn.
                  No generic templates. No ChatGPT wrappers. Pure conversion intelligence.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/generate" className="btn-signal glow-signal">
                  <Zap size={14} />
                  GENERATE YOUR AD
                  <ArrowRight size={14} />
                </Link>
                <a href="#features" className="btn-void">
                  VIEW_FEATURES
                </a>
              </div>

              {/* Metrics Bar */}
              <div
                className="flex flex-wrap gap-6 pt-6 mt-2"
                style={{ borderTop: '1px solid var(--color-border-subtle)' }}
              >
                {[
                  { label: 'ADS_GENERATED', value: '12,847' },
                  { label: 'AVG_CTR_LIFT', value: '+340%' },
                  { label: 'PLATFORMS', value: '5' },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className="mono-label text-[10px]">{stat.label}</span>
                    <span
                      className="text-xl font-bold"
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Terminal Preview / HUD */}
            <div className="lg:col-span-5 animate-boot-delay-2">
              <div
                className="card-void p-0 overflow-hidden"
                style={{ boxShadow: '0 0 40px rgba(37, 99, 235, 0.06)' }}
              >
                {/* Terminal Header */}
                <div
                  className="flex items-center justify-between px-4 py-2.5"
                  style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#EF4444' }} />
                    <div className="w-2 h-2 rounded-full" style={{ background: '#F59E0B' }} />
                    <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
                  </div>
                  <span className="mono-label text-[10px]">LIVE_PREVIEW</span>
                </div>

                {/* Terminal Content */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="mono-header text-xs" style={{ color: 'var(--color-accent-blue)' }}>
                    {'>'} AD_GENERATION_OUTPUT
                  </div>
                  <div
                    className="p-3 flex flex-col gap-2"
                    style={{
                      background: 'var(--color-bg-primary)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: 'var(--radius-sharp)',
                    }}
                  >
                    <span className="mono-label text-[10px]">HEADLINE_VARIANT_01</span>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      &quot;Stop Wasting Ad Budget on Copy That Doesn&apos;t Convert&quot;
                    </p>
                  </div>
                  <div
                    className="p-3 flex flex-col gap-2"
                    style={{
                      background: 'var(--color-bg-primary)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: 'var(--radius-sharp)',
                    }}
                  >
                    <span className="mono-label text-[10px]">HOOK_VARIANT_01</span>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      &quot;93% of ads fail because the copy was written by humans guessing — not by frameworks that convert.&quot;
                    </p>
                  </div>
                  <div
                    className="p-3 flex flex-col gap-2"
                    style={{
                      background: 'var(--color-bg-primary)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: 'var(--radius-sharp)',
                    }}
                  >
                    <span className="mono-label text-[10px]">CTA_SUGGESTION</span>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-accent-blue)' }}>
                      &quot;Activate Your First Campaign →&quot;
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="mono-label text-[10px]" style={{ color: 'var(--color-accent-success)' }}>
                      CTR_RATING: OPTIMAL
                    </span>
                    <span className="mono-label text-[10px]">[AIDA_FRAMEWORK]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PLATFORM BADGES ====== */}
      <section
        className="relative py-8"
        style={{ borderTop: '1px solid var(--color-border-subtle)', borderBottom: '1px solid var(--color-border-subtle)' }}
      >
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <span className="mono-label text-[10px]">OPTIMIZED_FOR:</span>
            {PLATFORM_BADGES.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center gap-2 px-3 py-1.5"
                style={{
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-sharp)',
                  background: 'var(--color-bg-secondary)',
                }}
              >
                <span style={{ color: 'var(--color-accent-blue)', fontSize: '10px' }}>{platform.icon}</span>
                <span className="mono-data text-xs">{platform.name}</span>
                <span
                  className="text-[9px] px-1.5 py-0.5"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-accent-success)',
                    background: 'rgba(16, 185, 129, 0.08)',
                    borderRadius: 'var(--radius-sharp)',
                  }}
                >
                  {platform.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FEATURES GRID ====== */}
      <section id="features" className="relative py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          {/* Section Header */}
          <div className="flex flex-col gap-3 mb-12">
            <span className="mono-header text-xs">[SYSTEM_CAPABILITIES]</span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Engineered for <span className="text-gradient-signal">Conversion</span>
            </h2>
            <p className="text-sm max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
              Every feature is calibrated to maximize ad performance across platforms.
              No feature bloat. No decorative modules. Pure operational output.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className="card-void p-6 flex flex-col gap-4 animate-boot"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Icon + Metric */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{
                      background: 'rgba(37, 99, 235, 0.08)',
                      border: '1px solid rgba(37, 99, 235, 0.2)',
                      borderRadius: 'var(--radius-sharp)',
                      color: 'var(--color-accent-blue)',
                    }}
                  >
                    {feature.icon}
                  </div>
                  <span
                    className="text-xs font-bold px-2 py-1"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-accent-success)',
                      background: 'rgba(16, 185, 129, 0.06)',
                      border: '1px solid rgba(16, 185, 129, 0.15)',
                      borderRadius: 'var(--radius-sharp)',
                    }}
                  >
                    {feature.metric}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-sm font-semibold tracking-wider"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className="relative py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div
            className="card-void p-12 text-center flex flex-col items-center gap-6"
            style={{
              borderColor: 'rgba(37, 99, 235, 0.15)',
              boxShadow: '0 0 60px rgba(37, 99, 235, 0.05)',
            }}
          >
            <span className="mono-header text-xs">[INITIALIZE_GENERATION]</span>
            <h2 className="text-2xl md:text-3xl font-bold max-w-lg">
              Stop guessing. Start <span className="text-gradient-signal">converting</span>.
            </h2>
            <p className="text-sm max-w-md" style={{ color: 'var(--color-text-muted)' }}>
              Deploy your first AI-generated ad in under 60 seconds.
              5 free generations per day. No credit card required.
            </p>
            <Link href="/generate" className="btn-signal glow-signal">
              <Zap size={14} />
              INITIALIZE_GENERATION
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
