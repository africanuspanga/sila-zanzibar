// Central site configuration for SILA.
// Edit these values to update contact details across the whole site.

export const site = {
  name: "SILA",
  legalName: "SILA Limited",
  tagline: "Property. Investment. Possibility.",
  description:
    "SILA is a Zanzibar-based real estate developer and investor, helping individuals, families, businesses and investors buy, rent, build, develop and invest in property and land across Zanzibar and mainland Tanzania.",
  // Production domain — used for canonical URLs, sitemap and structured data.
  url: "https://www.silazanzibar.com",
  domain: "www.silazanzibar.com",
  // Contact details.
  phone: "+255 725 715 250",
  whatsapp: "255725715250", // digits only, for wa.me links
  email: "info@silazanzibar.com",
  emailAlt: "silazanzibar@gmail.com",
  address: "Mpendae, Zanzibar, Tanzania",
  hours: "Mon – Sat, 9:00 – 18:00 EAT",
  social: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
    youtube: "#",
  },
} as const;

// All contact emails, in display order.
export const contactEmails = [site.email, site.emailAlt];

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// tel: href with spaces stripped, e.g. "+255725715250".
export const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Projects", href: "/projects" },
  { label: "Plots", href: "/plots" },
  { label: "Investment Advisory", href: "/investment-advisory" },
  { label: "List Your Property", href: "/list-your-property" },
  { label: "About Us", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export const zanzibarLocations = [
  "Stone Town",
  "Fumba",
  "Paje",
  "Jambiani",
  "Nungwi",
  "Kendwa",
  "Kiwengwa",
  "Matemwe",
  "Michamvi",
  "Bwejuu",
  "Chukwani",
  "Mbweni",
];
