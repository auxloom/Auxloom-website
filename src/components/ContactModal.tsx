import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useModals } from "./ModalProvider";

export default function ContactModal() {
  const { isContactOpen, closeContact } = useModals();
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Editable configuration for email and phone numbers
  const CONTACT_INFO = {
    email: "auxloom@gmail.com",
    phone1: {
      display: "+91 73001 70942",
      waLink: "https://wa.me/917300170942",
      callLink: "tel:+917300170942"
    },
    phone2: {
      display: "+91 63764 62837",
      waLink: "https://wa.me/916376462837",
      callLink: "tel:+916376462837"
    }
  };

  if (!isContactOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeContact}
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-card p-6 shadow-2xl sm:p-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-white/5 pb-4">
            <div>
              <h3 className="text-display text-2xl font-light tracking-wide text-foreground">
                Let's Talk
              </h3>
              <p className="mt-1 text-xs text-foreground/50">
                Choose your preferred channel to connect with us directly.
              </p>
            </div>
            <button
              onClick={closeContact}
              className="rounded-full bg-white/5 p-2 text-foreground/60 transition-colors hover:bg-white/10 hover:text-foreground"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="mt-6 space-y-5">
            {/* Email Section */}
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-foreground/50">
                  Email Us
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="text-[10px] font-medium text-primary hover:underline"
                >
                  {copiedEmail ? "Copied!" : "Copy Email"}
                </button>
              </div>
              <p className="mt-2 text-lg font-light text-foreground">{CONTACT_INFO.email}</p>

              <div className="mt-4 flex gap-2">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex-1 rounded-xl bg-foreground py-2.5 text-center text-xs font-semibold text-background transition-opacity hover:opacity-90"
                >
                  ✉ Send an Email
                </a>
              </div>
            </div>

            {/* WhatsApp & Call Channels */}
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-foreground/50 block mb-3">
                Message or Call Us
              </span>

              {/* Number 1 */}
              <div className="flex flex-col gap-2 pb-4 border-b border-white/5">
                <span className="text-sm font-medium text-foreground">{CONTACT_INFO.phone1.display}</span>
                <div className="flex gap-2">
                  <a
                    href={CONTACT_INFO.phone1.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    💬 WhatsApp DM
                  </a>
                  <a
                    href={CONTACT_INFO.phone1.callLink}
                    className="inline-flex items-center justify-center px-4 rounded-xl border border-white/10 bg-white/5 text-xs text-foreground/80 hover:bg-white/10 transition-colors"
                  >
                    📞 Call
                  </a>
                </div>
              </div>

              {/* Number 2 */}
              <div className="flex flex-col gap-2 pt-4">
                <span className="text-sm font-medium text-foreground">{CONTACT_INFO.phone2.display}</span>
                <div className="flex gap-2">
                  <a
                    href={CONTACT_INFO.phone2.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    💬 WhatsApp DM
                  </a>
                  <a
                    href={CONTACT_INFO.phone2.callLink}
                    className="inline-flex items-center justify-center px-4 rounded-xl border border-white/10 bg-white/5 text-xs text-foreground/80 hover:bg-white/10 transition-colors"
                  >
                    📞 Call
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-[10px] text-foreground/40">
            We typically respond within a few hours.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
