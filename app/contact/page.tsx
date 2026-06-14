import type { Metadata } from 'next'
import { ContactForm } from '@/components/ui/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with OPTIMA \u2014 Full-stack development and UX design for Gulf-market enterprises. UAE, KSA, Kuwait, Jordan & Egypt.',
  openGraph: {
    title: 'Contact | OPTIMA Digital Transformations',
    description: 'Start your next project. Gulf-market expertise across 5+ countries.',
  },
}

const services = [
  'Full-Stack Web Development',
  'UX Design & Prototyping',
  'E-Commerce Platform',
  'Enterprise Portal / SaaS',
  'AI Integration & Tools',
  'Arabic RTL / Bilingual Site',
  'Mobile App (React Native)',
  'Other / Consultation',
]

const markets = ['UAE', 'Saudi Arabia', 'Kuwait', 'Jordan', 'Egypt', 'Other Gulf', 'International']

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24 px-6 min-h-screen bg-off-white dark:bg-navy transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <div className="section-label mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-accent" />
            Let&apos;s Build Together
          </div>
          <h1
            className="font-display font-extrabold text-navy dark:text-off-white leading-[0.95] mb-5 tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Start a<br />
            <span className="text-accent">Project</span>
          </h1>
          <div className="flex gap-1 h-1 w-32 mb-6">
            <div className="h-full w-1/3 bg-accent" />
            <div className="h-full w-1/3 bg-primary" />
            <div className="h-full w-1/3 bg-accent/50" />
          </div>
          <p className="text-muted dark:text-muted text-lg max-w-xl leading-relaxed">
            Based in Egypt, serving UAE, Kuwait, Saudi Arabia & Jordan.
            Bilingual by default. Gulf-market expertise built in.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-16">

          {/* Form */}
          <ContactForm services={services} markets={markets} />

          {/* Info panel */}
          <div className="space-y-8">

            {/* Direct contact */}
            <div className="border border-navy/8 dark:border-off-white/8 bg-white dark:bg-navy-soft p-7 transition-colors duration-300">
              <p className="section-label mb-5">Direct Contact</p>
              <div className="space-y-4">
                {[
                  { label: 'Email', val: 'yussef@optima.dev', href: 'mailto:yussef@optima.dev' },
                  { label: 'WhatsApp', val: 'Message on WhatsApp ↗', href: 'https://wa.me/201234567890' },
                  { label: 'LinkedIn', val: 'linkedin.com/in/yussef-makhlouf ↗', href: 'https://linkedin.com/in/yussef-makhlouf' },
                  { label: 'GitHub', val: 'github.com/YussefMakhlouf ↗', href: 'https://github.com/YussefMakhlouf' },
                ].map(({ label, val, href }) => (
                  <div key={label} className="border-b border-navy/5 dark:border-off-white/5 pb-4">
                    <p className="font-mono text-[10px] tracking-widest uppercase text-muted/60 dark:text-muted/50 mb-1">{label}</p>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-accent dark:text-accent hover:text-accent-dark dark:hover:text-accent-light transition-colors"
                    >
                      {val}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* What to expect */}
            <div className="border border-navy/8 dark:border-off-white/8 bg-white dark:bg-navy-soft p-7 transition-colors duration-300">
              <p className="section-label mb-5">What to Expect</p>
              <div className="space-y-5">
                {[
                  { step: '01', title: 'Response in 24h', desc: 'Every inquiry gets a personal reply within one business day.' },
                  { step: '02', title: 'Free Discovery Call', desc: '30-minute call to understand your project, goals, and timeline.' },
                  { step: '03', title: 'Detailed Proposal', desc: 'Custom scope, timeline, and pricing — no templates.' },
                  { step: '04', title: 'We Build', desc: 'Production-grade code from day one. Regular updates throughout.' },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-4">
                    <span className="font-mono text-xs text-accent font-bold mt-0.5 flex-shrink-0">{step}</span>
                    <div>
                      <p className="font-display font-semibold text-navy dark:text-off-white text-sm mb-1">{title}</p>
                      <p className="text-muted dark:text-muted text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Markets */}
            <div className="border border-accent/15 bg-accent/[0.03] dark:bg-accent/[0.05] p-6">
              <p className="section-label mb-4">Markets Served</p>
              <div className="flex flex-wrap gap-2">
                {markets.map((m) => (
                  <span key={m} className="stack-tag">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact | OPTIMA Digital Transformations',
            url: 'https://optima.dev/contact',
            description: 'Start a project with OPTIMA',
          }),
        }}
      />
    </div>
  )
}
