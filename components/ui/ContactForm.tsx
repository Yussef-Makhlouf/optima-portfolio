'use client'
import { useState } from 'react'

interface Props {
  services: string[]
  markets: string[]
}

export function ContactForm({ services, markets }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    market: '',
    service: '',
    budget: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('sent')
  }

  const inputCls =
    'input-field'

  const labelCls =
    'block font-mono text-[10px] tracking-widest uppercase text-muted/60 dark:text-muted/50 mb-2'

  if (status === 'sent') {
    return (
      <div className="border border-accent/30 bg-accent/[0.04] dark:bg-accent/[0.06] p-16 flex flex-col items-center justify-center text-center min-h-[400px]">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent mb-6">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <p className="section-label mb-3">Message Received</p>
        <h2 className="font-display font-bold text-navy dark:text-off-white text-2xl mb-4">
          Thanks, {form.name.split(' ')[0]}!
        </h2>
        <p className="text-muted dark:text-muted text-sm leading-relaxed max-w-sm">
          We&apos;ll review your project details and get back to you within 24 hours.
          Check your inbox for a confirmation.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Row 1 */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="name">Full Name *</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ahmed Al-Rashidi"
            className={inputCls}
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="ahmed@company.com"
            className={inputCls}
            required
            autoComplete="email"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="company">Company / Brand</label>
          <input
            id="company"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Your Company"
            className={inputCls}
            autoComplete="organization"
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="market">Market / Location</label>
          <select
            id="market"
            name="market"
            value={form.market}
            onChange={handleChange}
            className={inputCls}
          >
            <option value="">Select market...</option>
            {markets.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="service">Service Needed</label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className={inputCls}
          >
            <option value="">Select service...</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="budget">Estimated Budget</label>
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className={inputCls}
          >
            <option value="">Select range...</option>
            {['Under $2,000', '$2,000 – $5,000', '$5,000 – $10,000', '$10,000 – $20,000', '$20,000+', "Let's discuss"].map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className={labelCls} htmlFor="message">Project Brief *</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={6}
          placeholder="Tell us about your project — goals, timeline, any specific requirements..."
          className={`${inputCls} resize-none`}
          required
        />
      </div>

      {/* Helper text */}
      <p className="font-mono text-[10px] text-muted/50 dark:text-muted/30">
        All fields marked with * are required. We typically respond within 24 hours.
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending' || !form.name || !form.email || !form.message}
        className="btn-accent w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <span className="inline-flex items-center gap-2">
            <span className="animate-spin inline-block w-4 h-4 border-2 border-navy dark:border-off-white border-t-transparent rounded-full" />
            Sending...
          </span>
        ) : (
          'Send Project Brief →'
        )}
      </button>

      {/* WhatsApp link */}
      <p className="font-mono text-[10px] text-muted/60 dark:text-muted/40 text-center">
        Prefer WhatsApp?{' '}
        <a
          href="https://wa.me/201234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent dark:text-accent hover:text-accent-light dark:hover:text-accent-light transition-colors"
        >
          Message us directly ↗
        </a>
      </p>
    </form>
  )
}
