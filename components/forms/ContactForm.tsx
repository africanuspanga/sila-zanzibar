"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { zanzibarLocations, whatsappLink } from "@/lib/site";

const serviceOptions = [
  "Buy Property", "Rent Property", "Sell Property", "List Property",
  "Buy Land", "Build-to-Own", "Investment Consultancy", "Commercial Property", "Other",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");

  if (sent) {
    return (
      <div className="border border-sand-300 bg-sand-50 p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy-800 text-white">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl text-navy-800">Thank you, {name || "friend"}</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Your enquiry has reached the SILA team. We&apos;ll be in touch shortly — or
          continue the conversation now on WhatsApp.
        </p>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-6">
          WhatsApp SILA
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
          <input required value={name} onChange={(e) => setName(e.target.value)} className="field" placeholder="Your name" />
        </label>
        <label className="block">
          <span className="field-label">Email</span>
          <input type="email" className="field" placeholder="you@email.com" />
        </label>
        <label className="block">
          <span className="field-label">Phone *</span>
          <input required className="field" placeholder="+255 …" />
        </label>
        <label className="block">
          <span className="field-label">WhatsApp</span>
          <input className="field" placeholder="+255 …" />
        </label>
        <label className="block">
          <span className="field-label">Country</span>
          <input className="field" placeholder="Country of residence" />
        </label>
        <label className="block">
          <span className="field-label">Service required</span>
          <select className="field" defaultValue="">
            <option value="" disabled>Select a service…</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="field-label">Preferred location</span>
          <select className="field" defaultValue="">
            <option value="">Anywhere in Zanzibar</option>
            {zanzibarLocations.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <label className="block">
            <span className="field-label">Budget</span>
            <input className="field" placeholder="Approx. budget" />
          </label>
          <label className="block">
            <span className="field-label">Currency</span>
            <select className="field" defaultValue="USD">
              <option>USD</option>
              <option>TZS</option>
            </select>
          </label>
        </div>
      </div>
      <label className="block">
        <span className="field-label">Message</span>
        <textarea rows={4} className="field resize-none" placeholder="How can we help?" />
      </label>
      <label className="block sm:max-w-xs">
        <span className="field-label">Preferred contact method</span>
        <select className="field" defaultValue="WhatsApp">
          <option>WhatsApp</option>
          <option>Phone call</option>
          <option>Email</option>
        </select>
      </label>
      <div className="flex flex-wrap gap-3 pt-2">
        <button type="submit" className="btn-red">
          <Send className="h-4 w-4" /> Send Enquiry
        </button>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          WhatsApp SILA
        </a>
      </div>
    </form>
  );
}
