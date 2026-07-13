// Central site configuration for SILA Real Estate.
// Contact details are placeholders per the brief — replace once confirmed.

export const site = {
  name: "SILA",
  legalName: "SILA Real Estate",
  tagline: "Property. Investment. Possibility.",
  description:
    "A premium Zanzibar real estate partner combining property sales, rentals, development, plot sales and professional land investment guidance in one trusted company.",
  // Placeholder contact details — to be confirmed.
  phone: "+255 000 000 000",
  whatsapp: "255000000000", // digits only, for wa.me links
  email: "hello@sila.co.tz",
  address: "Stone Town, Zanzibar, Tanzania",
  hours: "Mon – Sat, 9:00 – 18:00 EAT",
  social: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
    youtube: "#",
  },
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Developments", href: "/developments" },
  { label: "Plots", href: "/plots" },
  { label: "Investment Advisory", href: "/investment-advisory" },
  { label: "List Your Property", href: "/list-your-property" },
  { label: "About Us", href: "/about" },
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
