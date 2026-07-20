import Link from "next/link";
import { Instagram, Facebook, Linkedin, Youtube, Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ArchOutline } from "@/components/ui/Arch";
import { site, whatsappLink, telHref, contactEmails } from "@/lib/site";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About SILA", href: "/about" },
      { label: "Our Services", href: "/services" },
      { label: "Our Team", href: "/team" },
      { label: "Careers", href: "/contact" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Properties",
    links: [
      { label: "Properties for Sale", href: "/properties?listing=sale" },
      { label: "Properties for Rent", href: "/properties?listing=rent" },
      { label: "Villas", href: "/properties?type=Villa" },
      { label: "Apartments", href: "/properties?type=Apartment" },
      { label: "Commercial Properties", href: "/properties?type=Commercial" },
      { label: "Land & Plots", href: "/plots" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "Build-to-Own", href: "/projects" },
      { label: "Current Projects", href: "/projects" },
      { label: "Construction Updates", href: "/projects" },
      { label: "Payment Plans", href: "/projects#payment-plan" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "List Your Property", href: "/list-your-property" },
      { label: "Investment Consultancy", href: "/investment-advisory" },
      { label: "Frequently Asked Questions", href: "/#faq" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms & Conditions", href: "/legal/terms" },
    ],
  },
];

const socials = [
  { Icon: Instagram, href: site.social.instagram, label: "Instagram" },
  { Icon: Facebook, href: site.social.facebook, label: "Facebook" },
  { Icon: Linkedin, href: site.social.linkedin, label: "LinkedIn" },
  { Icon: Youtube, href: site.social.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/15 bg-navy-950 text-white">
      <ArchOutline
        className="pointer-events-none absolute -right-16 -top-24 h-[420px] w-[320px] text-white/[0.04]"
        strokeWidth={2}
      />

      <div className="container-x relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div className="max-w-md">
            <h2 className="h-display text-3xl text-white sm:text-[2.1rem]">
              Property Opportunities Guided by Local Expertise
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              SILA connects buyers, tenants, owners, developers and investors with
              selected real estate opportunities across Zanzibar.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-brand text-crimson-400">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[0.85rem] text-white/65 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact — full-width band so it has room to breathe */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <h3 className="text-[0.72rem] font-semibold uppercase tracking-brand text-crimson-400">
            Contact
          </h3>
          <div className="mt-5 flex flex-col gap-x-12 gap-y-4 text-[0.9rem] text-white/70 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={telHref}
              className="flex items-center gap-2.5 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 shrink-0 text-crimson-400" /> {site.phone}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 transition-colors hover:text-white"
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-crimson-400" /> WhatsApp
            </a>
            {contactEmails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-crimson-400" /> {email}
              </a>
            ))}
            <span className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-crimson-400" /> {site.address}
            </span>
            <span className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-crimson-400" /> {site.hours}
            </span>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Logo tone="light" width={84} />
              <span className="text-xs text-white/45">
                © 2026 SILA LIMITED. All rights reserved.
              </span>
            </div>
            <div className="flex gap-5 text-xs text-white/45">
              <Link href="/legal/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/legal/terms" className="hover:text-white">Terms &amp; Conditions</Link>
              <Link href="/legal/disclaimer" className="hover:text-white">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
