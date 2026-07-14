"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Envelope, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const reduce = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await fetch("https://formsubmit.co/ajax/ki3minpc@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: "Trabajo",
        }),
      });
      setSending(false);
      setSent(true);
      setFormState({ name: "", email: "", message: "" });
    } catch {
      setSending(false);
    }

    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="space-y-12">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 text-xs text-dim-gray mb-2">
          <span className="text-matrix-green">$</span>
          <span className="text-yellow-accent">./send_message</span>
          <span>--to developer</span>
        </div>

        <h2 className="font-pixel text-yellow-accent text-xs sm:text-sm uppercase tracking-wider">
          Contact
        </h2>

        <p className="text-xs sm:text-sm text-dim-gray max-w-xl leading-relaxed">
          <span className="text-matrix-green">//</span> Have a project in mind
          or just want to say hi? Drop me a message.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-6 sm:gap-8 items-start">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2 md:order-2 space-y-3 sm:space-y-4"
        >
          <div className="border border-surface bg-dark-bg p-4 sm:p-5 space-y-3 sm:space-y-4">
            <p className="text-[10px] sm:text-xs text-dim-gray font-mono">
              <span className="text-yellow-accent">$</span> find_me_online
            </p>
            <div className="space-y-2 sm:space-y-3">
              {[
                { icon: GithubLogo, label: "GitHub", handle: "https://github.com/ki3mi", url:"https://github.com/ki3mi" },
                { icon: LinkedinLogo, label: "LinkedIn", handle: "@joseccente", url:"https://www.linkedin.com/in/jose-ccente-mejia-3b2b37278/" },
                { icon: Envelope, label: "Email", handle: "ki3minpc@gmail.com", url:"#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.url.startsWith('mailto:') || link.url === '#' ? undefined : '_blank'}
                  className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-dim-gray hover:text-matrix-green transition-colors duration-200 group"
                >
                  <link.icon
                    size={14}
                    className="group-hover:text-yellow-accent transition-colors duration-200 shrink-0"
                    weight="duotone"
                  />
                  <span className="font-mono truncate">
                    <span className="text-matrix-green">{link.label.toLowerCase()}:</span> {link.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="border border-surface bg-dark-bg p-4 sm:p-5">
            <p className="text-[10px] sm:text-xs text-dim-gray font-mono mb-1.5 sm:mb-2">
              <span className="text-yellow-accent">$</span> pgp_key
            </p>
            <pre className="text-[0.35rem] sm:text-[0.4rem] text-dim-gray leading-tight">
              <code>
                {"─────BEGIN PGP PUBLIC KEY─────\n"}
                {"mQINBF8AAAABEQAA...\n"}
                {"──────END PGP PUBLIC KEY──────"}
              </code>
            </pre>
          </div>
        </motion.div>

        <motion.form
          initial={reduce ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className="md:col-span-3 md:order-1 space-y-3 sm:space-y-4"
        >
          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs text-dim-gray font-mono">
              <span className="text-matrix-green">$</span> enter_name
            </label>
            <input
              type="text"
              value={formState.name}
              onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
              required
              className="w-full bg-dark-bg border border-surface px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-terminal-gray font-mono
                focus:border-matrix-green focus:outline-none transition-colors duration-200
                placeholder:text-dim-gray/40"
              placeholder="John Developer"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs text-dim-gray font-mono">
              <span className="text-matrix-green">$</span> enter_email
            </label>
            <input
              type="email"
              value={formState.email}
              onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
              required
              className="w-full bg-dark-bg border border-surface px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-terminal-gray font-mono
                focus:border-matrix-green focus:outline-none transition-colors duration-200
                placeholder:text-dim-gray/40"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] sm:text-xs text-dim-gray font-mono">
              <span className="text-matrix-green">$</span> compose_message
            </label>
            <textarea
              value={formState.message}
              onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
              required
              rows={4}
              className="w-full bg-dark-bg border border-surface px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-terminal-gray font-mono resize-none
                focus:border-matrix-green focus:outline-none transition-colors duration-200
                placeholder:text-dim-gray/40"
              placeholder="Hello! I'd like to..."
            />
          </div>

          <button
            type="submit"
            disabled={sending || sent}
            className="w-full py-2.5 sm:py-3 bg-matrix-green text-dark-navy font-bold text-xs sm:text-sm font-mono
              hover:bg-yellow-accent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {sending ? "Sending..." : sent ? "[✓] Message sent!" : "$ ./send_message"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
