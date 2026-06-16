import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMessageCircle, FiSend } from 'react-icons/fi';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { variants } from '../lib/motion';

function getApiBase() {
  const base = import.meta.env?.VITE_API_BASE_URL;
  return typeof base === 'string' ? base.replace(/\/+$/, '') : '';
}

export function Contact({ site }) {
  const apiBase = useMemo(() => getApiBase(), []);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });

    try {
      const res = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Request failed');
      }

      setForm({ name: '', email: '', message: '' });
      setStatus({ state: 'success', message: 'Thanks—message received. I’ll reply within 24 hours.' });
    } catch (err) {
      setStatus({
        state: 'error',
        message:
          'Could not send message. Please use the email/WhatsApp buttons for now.',
      });
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={site.contact.headline}
      desc={site.contact.desc}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
          variants={variants.fadeUp(0)}
          className="lg:col-span-7"
        >
          <Card className="p-6 sm:p-8">
            <form onSubmit={onSubmit} className="space-y-4">
              <Field
                label="Full name"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your name"
                required
              />
              <Field
                label="Email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                type="email"
                required
              />
              <Field
                label="Message"
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Tell me about your project…"
                textarea
                required
              />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  as="button"
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto"
                  disabled={status.state === 'loading'}
                >
                  Send message <FiSend className="h-4 w-4" />
                </Button>

                <div className="text-xs text-white/55">
                  Typically replies within 24 hours. If it’s urgent, message me on WhatsApp.
                </div>
              </div>

              {status.state !== 'idle' && (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    status.state === 'success'
                      ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100'
                      : status.state === 'error'
                        ? 'border-rose-300/20 bg-rose-300/10 text-rose-100'
                        : 'border-white/10 bg-white/5 text-white/70'
                  }`}
                >
                  {status.message || (status.state === 'loading' ? 'Sending…' : '')}
                </div>
              )}
            </form>
          </Card>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
          variants={variants.fadeUp(1)}
          className="lg:col-span-5"
        >
          <div className="grid gap-4">
            <Card className="p-6">
              <div className="text-sm font-semibold text-white">Quick actions</div>
              <div className="mt-4 flex flex-col gap-3">
                <Button href={site.socials.whatsapp} variant="ghost">
                  WhatsApp <FiMessageCircle className="h-4 w-4" />
                </Button>
                <Button href={site.socials.email} variant="ghost">
                  Email <FiMail className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="text-sm font-semibold text-white">What you’ll get</div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/35" />
                  Clear next steps + timeline
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/35" />
                  Estimate with scope clarity
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/35" />
                  Premium UI and maintainable code
                </li>
              </ul>
            </Card>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Field({ label, textarea = false, className = '', ...props }) {
  const Comp = textarea ? 'textarea' : 'input';
  return (
    <label className={`block ${className}`}>
      <div className="text-xs font-medium tracking-wide text-white/60">{label}</div>
      <Comp
        {...props}
        className={`mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 placeholder:text-white/35 outline-none transition focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30 ${
          textarea ? 'min-h-[140px] resize-y' : ''
        }`}
      />
    </label>
  );
}

