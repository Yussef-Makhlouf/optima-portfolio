'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

/* ── Data ──────────────────────────────────────────────────────── */

const SERVICES = [
  {
    num: '01',
    title: 'Full-Stack Development',
    tagline: 'Ship production-grade products from day one.',
    desc: 'Next.js, React, Node.js, .NET — RTL Arabic & bilingual built-in. We architect scalable back-ends alongside pixel-perfect frontends.',
    img: '/web-development.jpeg',
    accent: 'from-primary/80 to-navy/90',
    tips: [
      'Use TypeScript strictly — catch runtime bugs before users do.',
      'Design your API contract before writing a single line of UI.',
      'Arabic RTL is a first-class concern, not an afterthought.',
    ],
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    cta: '/projects',
  },
  {
    num: '02',
    title: 'UX & Interface Design',
    tagline: 'Interfaces that convert — not just impress.',
    desc: 'Figma systems to pixel-perfect code. Design tokens, component libraries, GSAP animations. Every interaction micro-choreographed.',
    img: '/web-development1.png',
    accent: 'from-accent/70 to-navy/90',
    tips: [
      'White space is not wasted space — it guides the eye.',
      'Design tokens first: one colour change should cascade everywhere.',
      'Test on a real mobile device before calling it done.',
    ],
    icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
    cta: '/projects',
  },
  {
    num: '03',
    title: 'AI Solutions & SaaS',
    tagline: 'Intelligent products, not just chatbots.',
    desc: 'Claude API, Groq, custom LLM integrations. Content tools, automation pipelines, and AI-native product features that deliver real ROI.',
    img: '/web-development2.png',
    accent: 'from-primary-light/60 to-navy/90',
    tips: [
      'Stream responses — users shouldn\'t stare at a spinner.',
      'Rate-limit & cache aggressively; LLM calls are expensive.',
      'Build human-review checkpoints into every AI workflow.',
    ],
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    cta: '/contact',
  },
  {
    num: '04',
    title: 'E-Commerce Platforms',
    tagline: 'Arabic-first stores that actually sell.',
    desc: 'Tabby, Tamara, Stripe. Saudi ZATCA compliance. Gulf-market UX patterns. We\'ve shipped stores moving real volume across the GCC.',
    img: '/services-hero.png',
    accent: 'from-accent-dark/80 to-navy/90',
    tips: [
      'Offer BNPL (Tabby/Tamara) — it lifts average order value significantly.',
      'Product photos load fast = fewer abandoned carts.',
      'Always localise currency, not just language.',
    ],
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z',
    cta: '/projects',
  },
  {
    num: '05',
    title: 'Enterprise Portals',
    tagline: 'Multi-tenant. Secure. Gulf-scale.',
    desc: 'ERPs, dashboards, secure portals. Built for enterprise data sensitivity, role-based access, and Gulf compliance frameworks.',
    img: '/hosted.png',
    accent: 'from-navy-mid/90 to-primary/70',
    tips: [
      'Row-level security in Postgres beats application-level checks.',
      'Audit logs are non-negotiable for enterprise clients.',
      'Design the permission matrix before writing a single component.',
    ],
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    cta: '/contact',
  },
  {
    num: '06',
    title: 'Gulf Market Strategy',
    tagline: 'We know the market — we\'ve shipped in it.',
    desc: 'Deep UAE/KSA/Kuwait expertise. Bilingual positioning, local payment gateways, cultural UX patterns. Strategy backed by shipped products.',
    img: '/about.png',
    accent: 'from-primary/60 to-accent/70',
    tips: [
      'Friday is Saturday in the Gulf — plan your deployment windows.',
      'VAT compliance varies by country; build flexibility in from day one.',
      'Arabic copy should be written by a native, then coded, not Google Translated.',
    ],
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    cta: '/contact',
  },
]

const TIPS = [
  '⚡ Ship an MVP in 4 weeks, not 4 months — iterate with real users',
  '🎯 Gulf users expect Arabic UX patterns, not just translated text',
  '🔒 ZATCA e-invoicing is mandatory in KSA — build it in from day one',
  '📱 60%+ of Gulf traffic is mobile — design thumb-first',
  '💳 BNPL integrations (Tabby, Tamara) increase conversion by 20–40%',
  '🌐 RTL support must be designed, not hacked on at the end',
  '⚙️ TypeScript + Zod = zero runtime surprises in production',
  '🚀 Core Web Vitals directly affect your SEO ranking in Arabic SERPs',
  '🔄 Bilingual design systems save weeks of back-and-forth with clients',
  '🛡️ Role-based access control should be part of your database schema',
]

/* ── Component ──────────────────────────────────────────────────── */

export function ServicesBanner() {
  const [active, setActive] = useState(0)
  const service = SERVICES[active]

  return (
    <section className="py-28 px-6 bg-off-white dark:bg-navy-soft transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-14">
          <div className="section-label mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-accent" />
            002
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-navy dark:text-off-white tracking-tight">
            Core<br />
            <span className="text-accent">Services</span>
          </h2>
        </div>

        {/* Main panel */}
        <div className="grid lg:grid-cols-12 gap-0 border border-navy/8 dark:border-off-white/6 overflow-hidden">

          {/* Left nav list */}
          <div className="lg:col-span-4 border-r border-navy/8 dark:border-off-white/6">
            {SERVICES.map((s, i) => (
              <button
                key={s.num}
                onClick={() => setActive(i)}
                className={`
                  w-full text-left px-6 py-5 flex items-center gap-4 transition-all duration-200
                  border-b border-navy/5 dark:border-off-white/5 last:border-b-0 group
                  ${active === i
                    ? 'bg-primary/[0.06] dark:bg-primary/[0.12] border-l-2 border-l-accent'
                    : 'bg-off-white dark:bg-navy hover:bg-primary/[0.02] dark:hover:bg-primary/[0.04] border-l-2 border-l-transparent'}
                `}
              >
                <span className={`font-mono text-[10px] tracking-widest flex-shrink-0 transition-colors ${active === i ? 'text-accent' : 'text-muted/50 group-hover:text-accent/60'}`}>
                  {s.num}
                </span>
                <div className="min-w-0">
                  <div className={`font-display font-semibold text-sm leading-snug transition-colors ${active === i ? 'text-navy dark:text-off-white' : 'text-muted group-hover:text-navy dark:group-hover:text-off-white'}`}>
                    {s.title}
                  </div>
                  {active === i && (
                    <div className="font-mono text-[10px] text-accent/70 mt-0.5 truncate">
                      {s.tagline}
                    </div>
                  )}
                </div>
                {active === i && (
                  <svg className="ml-auto flex-shrink-0 text-accent" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Right: image + content panel */}
          <div className="lg:col-span-8 relative min-h-[480px] overflow-hidden bg-navy">

            {/* Background image */}
            <Image
              key={service.img}
              src={service.img}
              alt={service.title}
              fill
              className="object-cover opacity-30 transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />

            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-85`} />

            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(244,242,238,0.6) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(244,242,238,0.6) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-accent/60" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-accent/60" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-accent/60" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-accent/60" />

            {/* Content */}
            <div className="relative p-8 md:p-12 flex flex-col h-full min-h-[480px]">
              {/* Icon + number */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-white/10 backdrop-blur-sm border border-white/20">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
                    <path d={service.icon} />
                  </svg>
                </div>
                <span className="font-mono text-[10px] text-white/50 tracking-widest">{service.num} / 06</span>
              </div>

              {/* Title */}
              <h3 className="font-display font-extrabold text-white text-2xl md:text-3xl leading-tight mb-2 tracking-tight">
                {service.title}
              </h3>
              <p className="font-mono text-[11px] text-accent-light tracking-wider mb-5">
                {service.tagline}
              </p>

              {/* Description */}
              <p className="text-white/75 text-sm leading-relaxed mb-8 max-w-lg">
                {service.desc}
              </p>

              {/* Tips */}
              <div className="mt-auto">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-4 h-px bg-accent/60" />
                  <span className="font-mono text-[9px] text-accent/70 tracking-widest uppercase">Pro Tips</span>
                </div>
                <div className="space-y-2">
                  {service.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <span className="w-1 h-1 rounded-full bg-accent/60 mt-2 flex-shrink-0 group-hover:bg-accent transition-colors" />
                      <p className="text-white/60 text-xs leading-relaxed group-hover:text-white/80 transition-colors">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href={service.cta}
                  className="inline-flex items-center gap-2 mt-6 font-mono text-[11px] text-accent tracking-wider group hover:text-accent-light transition-colors"
                >
                  <span>
                    {service.cta === '/contact' ? 'Discuss this service' : 'See related projects'}
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: simple grid below the panel */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-px bg-navy/8 dark:bg-off-white/6 border border-navy/8 dark:border-off-white/6 lg:hidden overflow-hidden">
          {SERVICES.map((s) => (
            <button
              key={s.num}
              onClick={() => setActive(SERVICES.indexOf(s))}
              className="bg-off-white dark:bg-navy p-4 text-left transition-colors hover:bg-primary/[0.04] dark:hover:bg-primary/[0.08]"
            >
              <div className="font-mono text-[9px] text-accent/60 mb-1">{s.num}</div>
              <div className="font-display font-semibold text-xs text-navy dark:text-off-white leading-snug">{s.title}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Tips Ticker Banner ──────────────────────────────────────────── */

export function TipsBanner() {
  return (
    <section className="relative overflow-hidden border-y border-navy/5 dark:border-off-white/5 bg-navy dark:bg-navy py-0">
      {/* Subtle gradient top / bottom edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-navy to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-navy to-transparent pointer-events-none" />

      <div className="flex gap-0 py-4 overflow-hidden">
        {/* Duplicate for seamless loop */}
        {[0, 1].map((dup) => (
          <div key={dup} className="flex gap-0 shrink-0 animate-tips-scroll">
            {TIPS.map((tip, i) => (
              <div
                key={`${dup}-${i}`}
                className="flex items-center gap-4 px-6 shrink-0"
              >
                <span className="text-off-white/70 text-xs font-mono leading-relaxed whitespace-nowrap">
                  {tip}
                </span>
                <span className="w-px h-3 bg-accent/30 flex-shrink-0" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Service Spotlight Banner ────────────────────────────────────── */

export function ServiceSpotlightBanner() {
  return (
    <section className="relative overflow-hidden py-0 border-y border-navy/5 dark:border-off-white/5">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/services-hero.png"
          alt="Services background"
          fill
          className="object-cover opacity-15 dark:opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-off-white via-off-white/95 to-off-white/60 dark:from-navy dark:via-navy/95 dark:to-navy/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-12 gap-8 items-center">

          {/* Left: headline */}
          <div className="md:col-span-5">
            <div className="section-label mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-accent" />
              How We Work
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-navy dark:text-off-white tracking-tight leading-snug mb-4">
              From Brief to<br />
              <span className="text-accent">Production</span>
              {' '}in Weeks
            </h2>
            <p className="text-muted dark:text-muted text-sm leading-relaxed max-w-sm">
              Our battle-tested process keeps projects on budget, on schedule,
              and on-brand — across every Gulf market we operate in.
            </p>
          </div>

          {/* Right: process steps */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-px bg-navy/8 dark:bg-off-white/6 border border-navy/8 dark:border-off-white/6 overflow-hidden">
              {[
                { step: '01', title: 'Discovery Sprint', desc: 'Deep-dive into your market, users, and goals. We align on KPIs before writing a line of code.' },
                { step: '02', title: 'Design System', desc: 'Tokens, components, and RTL-ready layouts. A living Figma system your team can own forever.' },
                { step: '03', title: 'Iterative Build', desc: 'Bi-weekly demos. Real URLs from week one. Feedback loops, not surprise reveals.' },
                { step: '04', title: 'Launch & Scale', desc: 'Monitored deployment, performance audits, and ongoing optimisation sprints post-launch.' },
              ].map(({ step, title, desc }) => (
                <div
                  key={step}
                  className="bg-off-white dark:bg-navy p-6 group hover:bg-primary/[0.03] dark:hover:bg-primary/[0.06] transition-colors"
                >
                  <div className="font-mono text-[10px] text-accent/60 tracking-widest mb-3">{step}</div>
                  <div className="font-display font-bold text-sm text-navy dark:text-off-white mb-2 group-hover:text-accent dark:group-hover:text-accent transition-colors">
                    {title}
                  </div>
                  <p className="text-muted text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
