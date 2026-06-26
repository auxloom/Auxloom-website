import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useModals } from "./ModalProvider";
import { submitBooking } from "../lib/actions";

export default function BookMeetingModal() {
  const { isBookingOpen, closeBooking, selectedService } = useModals();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Pre-fill description with service context if provided
  useEffect(() => {
    if (selectedService) {
      setDescription(`I am interested in booking a meeting regarding: ${selectedService}`);
    } else {
      setDescription("");
    }
  }, [selectedService, isBookingOpen]);

  // Reset form states on close/open
  useEffect(() => {
    if (isBookingOpen) {
      setName("");
      setEmail("");
      setDateTime("");
      setErrorMsg("");
      setSuccessMsg("");
    }
  }, [isBookingOpen]);

  if (!isBookingOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await submitBooking({
        data: {
          name,
          email,
          dateTime,
          description,
        },
      });

      if (response.success) {
        setSuccessMsg(response.message);
        // Clear inputs on success
        setName("");
        setEmail("");
        setDateTime("");
        setDescription("");
        // Close modal after 3 seconds on success
        setTimeout(() => {
          closeBooking();
        }, 3000);
      } else {
        setErrorMsg("Failed to book meeting. Please try again.");
      }
    } catch (error: any) {
      console.error("Booking error:", error);
      setErrorMsg(error?.message || "Something went wrong. Please check your inputs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeBooking}
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-card p-6 shadow-2xl sm:p-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-white/5 pb-4">
            <div>
              <h3 className="text-display text-2xl font-light tracking-wide text-foreground">
                Book a Meeting
              </h3>
              <p className="mt-1 text-xs text-foreground/50">
                Let's set up a calendar invitation for your session.
              </p>
            </div>
            <button
              onClick={closeBooking}
              className="rounded-full bg-white/5 p-2 text-foreground/60 transition-colors hover:bg-white/10 hover:text-foreground"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          {successMsg ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="my-8 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                ✓
              </div>
              <h4 className="mt-4 text-lg font-medium text-foreground">Booking Successful!</h4>
              <p className="mt-2 text-sm text-foreground/70">{successMsg}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {errorMsg && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider text-foreground/60">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder-white/20 transition-all focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-foreground/60">
                  Gmail / Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder-white/20 transition-all focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-foreground/60">
                  Preferred Date & Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground [color-scheme:dark] transition-all focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-foreground/60">
                  Additional Details
                </label>
                <textarea
                  placeholder="Tell us a little bit about what you want to build..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder-white/20 transition-all focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "var(--shadow-glow)" }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                type="submit"
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-foreground py-3.5 text-sm font-medium text-background transition-shadow disabled:opacity-55"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    Booking meeting...
                  </span>
                ) : (
                  "Confirm Meeting Booking"
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
