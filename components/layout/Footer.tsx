import Link from "next/link";
import { Instagram, Facebook, Linkedin, Youtube, Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ArchOutline } from "@/components/ui/Arch";
import { site, whatsappLink } from "@/lib/site";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About SILA", href: "/about" },
      { label: "Our Services", href: "/services" },
      { label: "Our Team", href: "/about#team" },
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
    title: "Developments",
    links: [
      { label: "Build-to-Own", href: "/developments" },
      { label: "Current Projects", href: "/developments" },
      { label: "Construction Updates", href: "/developments" },
      { label: "Payment Plans", href: "/developments" },
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
    <footer className="relative overflow-hidden bg-navy-950 text-white">
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

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
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

            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <h3 className="text-[0.72rem] font-semibold uppercase tracking-brand text-crimson-400">
                Contact
              </h3>
              <ul className="mt-4 space-y-3 text-[0.85rem] text-white/65">
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-white/40" /> {site.phone}
                </li>
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 transition-colors hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-white/40" /> WhatsApp
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-white/40" /> {site.email}
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" /> {site.address}
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 shrink-0 text-white/40" /> {site.hours}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="mb-5 text-xs leading-relaxed text-white/40">
            Listings, prices and imagery shown on this website are illustrative and
            for demonstration until SILA&apos;s live inventory is published from the
            admin dashboard. Legal, tax, valuation and regulatory matters should be
            confirmed by qualified professionals and the relevant Zanzibar authorities.
          </p>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <Logo tone="light" width={84} />
              <span className="text-xs text-white/45">
                © 2026 SILA Real Estate. All rights reserved.
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
