import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { site, whatsappLink, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact SILA",
  description:
    "Contact SILA to buy, rent, sell, list, build, develop or invest in Zanzibar property. Call +255 725 715 250 or email info@silazanzibar.com.",
  alternates: { canonical: "/contact" },
};

const details = [
  { icon: Phone, label: "Phone", value: site.phone, href: telHref },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with our team", href: whatsappLink() },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Mail, label: "Email", value: site.emailAlt, href: `mailto:${site.emailAlt}` },
  { icon: MapPin, label: "Office", value: site.address },
  { icon: Clock, label: "Hours", value: site.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        crumb="Contact"
        title="Let Us Discuss Your Property Goals"
        intro="Whether you want to buy, rent, sell, list, build or invest, our team is ready to understand your requirements."
        image="/silo-image-2.jpg"
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl text-navy-800">Get in touch</h2>
            <div className="mt-4 h-px w-14 bg-crimson-600" />
            <ul className="mt-7 space-y-5">
              {details.map((d) => {
                const content = (
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-navy-800/5 text-navy-800">
                      <d.icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="text-[0.72rem] uppercase tracking-wide text-muted">{d.label}</p>
                      <p className="mt-0.5 font-medium text-navy-800">{d.value}</p>
                    </div>
                  </div>
                );
                return (
                  <li key={`${d.label}-${d.value}`}>
                    {d.href ? (
                      <a href={d.href} target={d.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block transition-opacity hover:opacity-70">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <Reveal>
            <div className="border border-sand-300 bg-white p-6 shadow-card sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
