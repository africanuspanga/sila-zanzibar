"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { whatsappLink } from "@/lib/site";

// Enquiry form. With no backend wired yet, submission shows a confirmation and
// routes the enquiry to WhatsApp so no lead is lost. Swap `onSubmit` for a
// server action / API route when the admin dashboard lead pipeline is ready.
export function EnquiryForm({
  context,
  compact = false,
}: {
  context?: string;
  compact?: boolean;
}) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    date: "",
    contact: "WhatsApp",
    message: context ? `I'd like to enquire about ${context}.` : "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  if (sent) {
    return (
      <div className="border border-sand-300 bg-sand-50 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy-800 text-white">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-display text-xl text-navy-800">Enquiry received</h3>
        <p className="mt-2 text-sm text-muted">
          Thank you, {form.name || "there"}. A SILA advisor will be in touch shortly.
          For the fastest response, continue on WhatsApp.
        </p>
        <a
          href={whatsappLink(`${form.message}${context ? "" : ""} (${form.name}, ${form.phone})`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp mt-5"
        >
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="field-label">Full name *</span>
          <input required value={form.name} onChange={set("name")} className="field" placeholder="Your name" />
        </label>
        <label className="block">
          <span className="field-label">Phone *</span>
          <input required value={form.phone} onChange={set("phone")} className="field" placeholder="+255 …" />
        </label>
        <label className="block">
          <span className="field-label">Email</span>
          <input type="email" value={form.email} onChange={set("email")} className="field" placeholder="you@email.com" />
        </label>
        <label className="block">
          <span className="field-label">Country</span>
          <input value={form.country} onChange={set("country")} className="field" placeholder="Country of residence" />
        </label>
        {!compact && (
          <>
            <label className="block">
              <span className="field-label">Preferred viewing date</span>
              <input type="date" value={form.date} onChange={set("date")} className="field" />
            </label>
            <label className="block">
              <span className="field-label">Preferred contact method</span>
              <select value={form.contact} onChange={set("contact")} className="field">
                <option>WhatsApp</option>
                <option>Phone call</option>
                <option>Email</option>
              </select>
            </label>
          </>
        )}
      </div>
      <label className="block">
        <span className="field-label">Message</span>
        <textarea rows={compact ? 3 : 4} value={form.message} onChange={set("message")} className="field resize-none" placeholder="Tell us what you're looking for…" />
      </label>
      <button type="submit" className="btn-red w-full sm:w-auto">
        <Send className="h-4 w-4" /> Send Enquiry
      </button>
    </form>
  );
}
