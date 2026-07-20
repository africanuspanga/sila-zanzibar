// ---------------------------------------------------------------------------
// SILA content layer.
//
// This is illustrative EXAMPLE inventory that mirrors the brief's example
// titles and real Zanzibar locations, mapped to the supplied photography.
// In production this module is replaced by data from the admin dashboard / DB;
// every consumer imports from here, so the swap is a single seam.
//
// Per the brief: no fictional data is presented as verified fact. Prices are
// illustrative placeholders and the site carries a disclaimer to that effect.
// ---------------------------------------------------------------------------

export type Currency = "USD" | "TZS";
export type ListingType = "sale" | "rent";

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  reference: string;
  listingType: ListingType;
  propertyType: string;
  price: number;
  currency: Currency;
  rentPeriod?: "month" | "night";
  bedrooms: number | null;
  bathrooms: number | null;
  size: number | null; // built area, sqm
  landSize?: number | null; // sqm
  furnished: "Furnished" | "Unfurnished" | "Optional";
  verified: boolean;
  featured: boolean;
  beachfront: boolean;
  newDevelopment: boolean;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  amenities: string[];
  coords: { lat: number; lng: number };
}

export interface Development {
  id: string;
  slug: string;
  name: string;
  location: string;
  status: "Planning" | "Under Construction" | "Nearing Completion" | "Ready";
  completionPercent: number;
  estCompletion: string;
  startingPrice: number;
  currency: Currency;
  unitTypes: string[];
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  amenities: string[];
  paymentPlan: string;
}

export interface Plot {
  id: string;
  slug: string;
  title: string;
  location: string;
  size: number; // sqm
  price: number;
  currency: Currency;
  pricePerSqm?: number;
  use: string;
  roadAccess: boolean;
  electricity: boolean;
  water: boolean;
  docStatus: string;
  distanceFromRoad: string;
  distanceFromBeach?: string;
  image: string;
  description: string;
  coords: { lat: number; lng: number };
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  base: "Zanzibar" | "Mainland Tanzania";
  // Optional headshot. Leave empty to show a branded monogram placeholder.
  // Admin can upload a photo per member from the dashboard.
  image?: string;
}

const IMG = {
  aerialResort: "/silo-image.jpg",
  aerialTown: "/silo-image-2.jpg",
  villaPoolAerial: "/silo-image-3.jpg",
  poolDaybeds: "/silo-image-4.jpg",
  beachfrontVilla: "/silo-image-5.jpg",
  coastGold: "/silo-image-6.jpg",
  islandSandbar: "/silo-image-7.jpg",
  beachUmbrellas: "/property-card-1.jpg",
  poolSunset: "/property-card-2.jpg",
  archTerrace: "/property-card-4.jpg",
  swahiliVilla: "/property-villa.jpg",
};

export const heroImages = IMG;

export const properties: Property[] = [
  {
    id: "p1",
    slug: "contemporary-villa-paje",
    title: "Contemporary Villa in Paje",
    location: "Paje",
    reference: "SL-PJ-001",
    listingType: "sale",
    propertyType: "Villa",
    price: 385000,
    currency: "USD",
    bedrooms: 3,
    bathrooms: 3,
    size: 240,
    landSize: 600,
    furnished: "Furnished",
    verified: true,
    featured: true,
    beachfront: false,
    newDevelopment: false,
    image: IMG.swahiliVilla,
    gallery: [IMG.swahiliVilla, IMG.poolSunset, IMG.villaPoolAerial, IMG.poolDaybeds],
    shortDescription:
      "A modern three-bedroom villa designed for comfortable tropical living, with a private garden, pool and easy beach access.",
    description:
      "A modern three-bedroom villa designed for comfortable tropical living, featuring spacious interiors, a private garden, secure parking and convenient access to the beach. Open-plan living opens onto a covered terrace and swimming pool, with a Swahili-influenced façade that keeps interiors cool through the day.",
    amenities: [
      "Private swimming pool",
      "Garden",
      "Secure parking",
      "24/7 security",
      "Backup power",
      "Water storage",
      "Air conditioning",
      "Furnished",
    ],
    coords: { lat: -6.259, lng: 39.535 },
  },
  {
    id: "p2",
    slug: "two-bedroom-apartment-fumba",
    title: "Two-Bedroom Apartment in Fumba",
    location: "Fumba",
    reference: "SL-FB-014",
    listingType: "sale",
    propertyType: "Apartment",
    price: 168000,
    currency: "USD",
    bedrooms: 2,
    bathrooms: 2,
    size: 96,
    furnished: "Optional",
    verified: true,
    featured: true,
    beachfront: true,
    newDevelopment: true,
    image: IMG.poolSunset,
    gallery: [IMG.poolSunset, IMG.beachfrontVilla, IMG.poolDaybeds, IMG.aerialResort],
    shortDescription:
      "A light-filled two-bedroom apartment within a waterfront community, moments from the marina and beach.",
    description:
      "A light-filled two-bedroom apartment within an established waterfront community, moments from the marina and beach. Floor-to-ceiling glazing frames the lagoon, while shared gardens, pools and a beach club sit within the development. A strong option for both lifestyle living and rental income.",
    amenities: [
      "Communal pool",
      "Beach access",
      "Balcony",
      "Ocean view",
      "Secure parking",
      "24/7 security",
      "Backup power",
      "Air conditioning",
    ],
    coords: { lat: -6.302, lng: 39.29 },
  },
  {
    id: "p3",
    slug: "beachfront-residence-matemwe",
    title: "Beachfront Residence in Matemwe",
    location: "Matemwe",
    reference: "SL-MT-007",
    listingType: "sale",
    propertyType: "Villa",
    price: 720000,
    currency: "USD",
    bedrooms: 4,
    bathrooms: 4,
    size: 340,
    landSize: 900,
    furnished: "Furnished",
    verified: true,
    featured: true,
    beachfront: true,
    newDevelopment: false,
    image: IMG.beachfrontVilla,
    gallery: [IMG.beachfrontVilla, IMG.poolDaybeds, IMG.aerialResort, IMG.archTerrace],
    shortDescription:
      "A four-bedroom beachfront residence with an infinity pool and uninterrupted views over the reef.",
    description:
      "A four-bedroom beachfront residence set directly on the sand at Matemwe, with an infinity pool that spills toward the reef and uninterrupted ocean views from every principal room. Generous verandas, staff quarters and a coral-stone finish make this a rare turnkey home on one of the island's quietest stretches.",
    amenities: [
      "Private infinity pool",
      "Direct beach access",
      "Ocean view",
      "Staff quarters",
      "Garden",
      "Secure parking",
      "24/7 security",
      "Backup power",
      "Furnished",
    ],
    coords: { lat: -5.867, lng: 39.352 },
  },
  {
    id: "p4",
    slug: "commercial-office-space-stone-town",
    title: "Commercial Office Space in Stone Town",
    location: "Stone Town",
    reference: "SL-ST-022",
    listingType: "rent",
    propertyType: "Office Space",
    rentPeriod: "month",
    price: 2400,
    currency: "USD",
    bedrooms: null,
    bathrooms: 2,
    size: 180,
    furnished: "Unfurnished",
    verified: true,
    featured: true,
    beachfront: false,
    newDevelopment: false,
    image: IMG.aerialTown,
    gallery: [IMG.aerialTown, IMG.archTerrace, IMG.swahiliVilla],
    shortDescription:
      "A characterful 180 sqm office floor in the heart of Stone Town, ready for professional fit-out.",
    description:
      "A characterful 180 sqm commercial office floor in the heart of Stone Town, combining high ceilings and original detailing with practical modern services. Reception area, meeting rooms and open workspace, moments from the port and business district — ideal for a professional practice or regional headquarters.",
    amenities: [
      "Reception area",
      "Office partitioning",
      "Backup power",
      "Water storage",
      "Air conditioning",
      "Road access",
      "24/7 security",
    ],
    coords: { lat: -6.163, lng: 39.189 },
  },
  {
    id: "p5",
    slug: "garden-apartment-kiwengwa",
    title: "Garden Apartment in Kiwengwa",
    location: "Kiwengwa",
    reference: "SL-KW-031",
    listingType: "rent",
    propertyType: "Apartment",
    rentPeriod: "month",
    price: 1100,
    currency: "USD",
    bedrooms: 2,
    bathrooms: 1,
    size: 84,
    furnished: "Furnished",
    verified: false,
    featured: false,
    beachfront: false,
    newDevelopment: false,
    image: IMG.poolDaybeds,
    gallery: [IMG.poolDaybeds, IMG.poolSunset, IMG.beachfrontVilla],
    shortDescription:
      "A furnished two-bedroom garden apartment with shared pool, a short walk from Kiwengwa beach.",
    description:
      "A comfortable, furnished two-bedroom garden apartment set within a small managed community with a shared pool, a short walk from Kiwengwa beach. Well suited to long-stay professionals and families looking for a turnkey home.",
    amenities: [
      "Communal pool",
      "Garden",
      "Furnished",
      "Secure parking",
      "Backup power",
      "Air conditioning",
      "24/7 security",
    ],
    coords: { lat: -5.99, lng: 39.38 },
  },
  {
    id: "p6",
    slug: "ocean-view-villa-michamvi",
    title: "Ocean-View Villa in Michamvi",
    location: "Michamvi",
    reference: "SL-MC-009",
    listingType: "sale",
    propertyType: "Villa",
    price: 540000,
    currency: "USD",
    bedrooms: 3,
    bathrooms: 3,
    size: 280,
    landSize: 750,
    furnished: "Optional",
    verified: true,
    featured: false,
    beachfront: false,
    newDevelopment: false,
    image: IMG.villaPoolAerial,
    gallery: [IMG.villaPoolAerial, IMG.poolDaybeds, IMG.archTerrace, IMG.swahiliVilla],
    shortDescription:
      "A three-bedroom villa on the Michamvi peninsula with elevated sunset views and a private pool.",
    description:
      "A three-bedroom villa on the Michamvi peninsula, positioned to capture rare west-facing sunset views over the channel. Private pool, mature garden and a flexible layout that works equally well as a family home or a premium holiday rental.",
    amenities: [
      "Private swimming pool",
      "Ocean view",
      "Garden",
      "Secure parking",
      "24/7 security",
      "Backup power",
      "Water storage",
      "Air conditioning",
    ],
    coords: { lat: -6.245, lng: 39.516 },
  },
  {
    id: "p7",
    slug: "beach-club-residence-nungwi",
    title: "Beach Club Residence in Nungwi",
    location: "Nungwi",
    reference: "SL-NG-018",
    listingType: "sale",
    propertyType: "Apartment",
    price: 295000,
    currency: "USD",
    bedrooms: 2,
    bathrooms: 2,
    size: 110,
    furnished: "Furnished",
    verified: true,
    featured: false,
    beachfront: true,
    newDevelopment: true,
    image: IMG.aerialResort,
    gallery: [IMG.aerialResort, IMG.beachUmbrellas, IMG.poolSunset],
    shortDescription:
      "A furnished two-bedroom residence within a managed beach-club community at the island's northern tip.",
    description:
      "A furnished two-bedroom residence within a professionally managed beach-club community at Nungwi, the island's most established tourism hub. Owners benefit from on-site management, a rental programme and full resort amenities — a considered choice for hands-off investors.",
    amenities: [
      "Beach access",
      "Communal pool",
      "Ocean view",
      "On-site management",
      "Furnished",
      "24/7 security",
      "Backup power",
    ],
    coords: { lat: -5.726, lng: 39.294 },
  },
  {
    id: "p8",
    slug: "commercial-building-mbweni",
    title: "Mixed-Use Commercial Building in Mbweni",
    location: "Mbweni",
    reference: "SL-MB-004",
    listingType: "sale",
    propertyType: "Commercial Building",
    price: 610000,
    currency: "USD",
    bedrooms: null,
    bathrooms: 4,
    size: 520,
    landSize: 800,
    furnished: "Unfurnished",
    verified: false,
    featured: false,
    beachfront: false,
    newDevelopment: false,
    image: IMG.archTerrace,
    gallery: [IMG.archTerrace, IMG.aerialTown, IMG.swahiliVilla],
    shortDescription:
      "A 520 sqm mixed-use building on the Mbweni road, suited to retail, offices or hospitality.",
    description:
      "A 520 sqm mixed-use commercial building on the well-trafficked Mbweni road, arranged over two floors with flexible retail and office space and room to add hospitality use. Strong road frontage and parking, a short drive from Stone Town.",
    amenities: [
      "Road access",
      "Secure parking",
      "Reception area",
      "Backup power",
      "Water storage",
      "24/7 security",
    ],
    coords: { lat: -6.213, lng: 39.216 },
  },
];

export const developments: Development[] = [
  {
    id: "d1",
    slug: "lagoon-residences-fumba",
    name: "Lagoon Residences, Fumba",
    location: "Fumba",
    status: "Under Construction",
    completionPercent: 55,
    estCompletion: "Q4 2027",
    startingPrice: 149000,
    currency: "USD",
    unitTypes: ["Studios", "1-bed apartments", "2-bed apartments", "3-bed penthouses"],
    image: IMG.poolSunset,
    gallery: [IMG.poolSunset, IMG.beachfrontVilla, IMG.aerialResort, IMG.poolDaybeds],
    shortDescription:
      "A waterfront residential community of apartments and penthouses arranged around shared gardens, pools and a beach club.",
    description:
      "Lagoon Residences is a waterfront residential community on the Fumba peninsula, arranged around shared gardens, swimming pools and a private beach club. Homes range from studios to three-bedroom penthouses, all oriented toward the lagoon. Buyers can secure a unit during construction and pay in stages, with the completed home transferred on final payment under the applicable agreement.",
    amenities: [
      "Beach club",
      "Communal pools",
      "Landscaped gardens",
      "24/7 security",
      "Backup power",
      "Water storage",
      "On-site management",
      "Rental programme",
    ],
    paymentPlan: "Reservation, then staged installments across the construction period.",
  },
  {
    id: "d2",
    slug: "coral-villas-paje",
    name: "Coral Villas, Paje",
    location: "Paje",
    status: "Nearing Completion",
    completionPercent: 80,
    estCompletion: "Q2 2027",
    startingPrice: 320000,
    currency: "USD",
    unitTypes: ["2-bed villas", "3-bed villas", "4-bed villas"],
    image: IMG.swahiliVilla,
    gallery: [IMG.swahiliVilla, IMG.poolDaybeds, IMG.villaPoolAerial, IMG.archTerrace],
    shortDescription:
      "Standalone Swahili-modern villas with private pools, a short walk from Paje's kite-surfing beach.",
    description:
      "Coral Villas is a boutique collection of standalone villas in Paje, blending Swahili architecture with contemporary interiors. Each villa has a private pool and garden and sits a short walk from one of the island's most popular beaches. A limited release with staged payment plans available on remaining units.",
    amenities: [
      "Private pools",
      "Gardens",
      "Secure parking",
      "24/7 security",
      "Backup power",
      "Water storage",
      "Air conditioning",
    ],
    paymentPlan: "Reservation deposit, milestone installments, balance on handover.",
  },
  {
    id: "d3",
    slug: "stone-town-lofts",
    name: "Stone Town Lofts",
    location: "Stone Town",
    status: "Planning",
    completionPercent: 15,
    estCompletion: "Q1 2028",
    startingPrice: 129000,
    currency: "USD",
    unitTypes: ["Studio lofts", "1-bed lofts", "2-bed lofts"],
    image: IMG.aerialTown,
    gallery: [IMG.aerialTown, IMG.archTerrace, IMG.swahiliVilla],
    shortDescription:
      "A characterful loft conversion in the heart of Stone Town, combining heritage detail with modern living.",
    description:
      "Stone Town Lofts brings a limited number of contemporary loft apartments to a restored building in the historic centre, combining heritage detail with modern services. Early-stage reservations open with the most favourable payment terms of the release.",
    amenities: [
      "Rooftop terrace",
      "Heritage façade",
      "Backup power",
      "Water storage",
      "24/7 security",
      "Air conditioning",
    ],
    paymentPlan: "Early-reservation plan with extended installments during construction.",
  },
];

export const plots: Plot[] = [
  {
    id: "l1",
    slug: "residential-plot-chukwani",
    title: "Residential Plot in Chukwani",
    location: "Chukwani",
    size: 1000,
    price: 65000,
    currency: "USD",
    pricePerSqm: 65,
    use: "Residential",
    roadAccess: true,
    electricity: true,
    water: true,
    docStatus: "Documentation available for review",
    distanceFromRoad: "On tarmac road",
    distanceFromBeach: "3.5 km",
    image: IMG.villaPoolAerial,
    description:
      "A cleared, 1,000 sqm residential plot at Chukwani with road frontage and utilities to the boundary — ready for a family home a short drive from Stone Town.",
    coords: { lat: -6.203, lng: 39.19 },
  },
  {
    id: "l2",
    slug: "investment-land-jambiani",
    title: "Investment Land in Jambiani",
    location: "Jambiani",
    size: 4000,
    price: 220000,
    currency: "USD",
    pricePerSqm: 55,
    use: "Tourism / hospitality development",
    roadAccess: true,
    electricity: true,
    water: false,
    docStatus: "Documentation under verification",
    distanceFromRoad: "150 m from main road",
    distanceFromBeach: "400 m",
    image: IMG.islandSandbar,
    description:
      "A 4,000 sqm parcel near Jambiani beach with strong tourism-development potential. Suited to a boutique hotel, villa cluster or hospitality project, subject to the relevant approvals.",
    coords: { lat: -6.28, lng: 39.545 },
  },
  {
    id: "l3",
    slug: "beach-plot-bwejuu",
    title: "Beach-Area Plot in Bwejuu",
    location: "Bwejuu",
    size: 1500,
    price: 145000,
    currency: "USD",
    pricePerSqm: 97,
    use: "Residential / hospitality",
    roadAccess: true,
    electricity: true,
    water: true,
    docStatus: "Documentation available for review",
    distanceFromRoad: "On access road",
    distanceFromBeach: "120 m",
    image: IMG.beachUmbrellas,
    description:
      "A 1,500 sqm plot moments from Bwejuu beach with utilities available and clear access — well suited to a private villa or small guesthouse.",
    coords: { lat: -6.27, lng: 39.54 },
  },
  {
    id: "l4",
    slug: "development-land-kendwa",
    title: "Subdivided Development Plots in Kendwa",
    location: "Kendwa",
    size: 800,
    price: 78000,
    currency: "USD",
    pricePerSqm: 97,
    use: "Residential development",
    roadAccess: true,
    electricity: true,
    water: true,
    docStatus: "Documentation available for review",
    distanceFromRoad: "On internal estate road",
    distanceFromBeach: "1.2 km",
    image: IMG.aerialResort,
    description:
      "Individually titled 800 sqm plots within a planned residential estate near Kendwa, with internal roads and utilities laid to each boundary. Multiple plots available.",
    coords: { lat: -5.73, lng: 39.29 },
  },
];

// ---------------------------------- Team ------------------------------------
// Placeholder team members — sample names and titles for now. In production
// these are managed from the admin dashboard (name, title, base and headshot).
// Leaving `image` empty renders a branded monogram until a photo is uploaded.

export const team: TeamMember[] = [
  {
    id: "t1",
    name: "Amina Juma",
    title: "Managing Director",
    base: "Zanzibar",
  },
  {
    id: "t2",
    name: "Khalid Salim",
    title: "Head of Sales & Lettings",
    base: "Zanzibar",
  },
  {
    id: "t3",
    name: "Fatma Ali",
    title: "Client Relations Manager",
    base: "Zanzibar",
  },
  {
    id: "t4",
    name: "Joseph Mushi",
    title: "Head of Investment Advisory",
    base: "Mainland Tanzania",
  },
  {
    id: "t5",
    name: "Neema Mbwana",
    title: "Development & Projects Manager",
    base: "Mainland Tanzania",
  },
];

// -------------------------- Static marketing content ------------------------

export const coreServices = [
  {
    title: "Property Sales & Rentals",
    body: "Discover houses, apartments, villas, office spaces, land and commercial buildings available for sale or rent across Zanzibar.",
    cta: { label: "Explore Properties", href: "/properties" },
    icon: "home",
  },
  {
    title: "Build-to-Own Properties",
    body: "Secure a property during construction through an agreed installment plan and receive your completed property after development.",
    cta: { label: "View Projects", href: "/projects" },
    icon: "hammer",
  },
  {
    title: "Plot Sales",
    body: "Explore subdivided plots suitable for homes, commercial projects, hospitality developments and long-term investment.",
    cta: { label: "View Available Plots", href: "/plots" },
    icon: "map",
  },
  {
    title: "Land Investment Consultancy",
    body: "Receive professional guidance on locations, market opportunities, ownership structures, legal considerations and investment potential.",
    cta: { label: "Speak to an Advisor", href: "/investment-advisory" },
    icon: "compass",
  },
  {
    title: "List Your Property",
    body: "Allow SILA to market your house, apartment, villa, land, office or commercial property to qualified buyers and tenants.",
    cta: { label: "List a Property", href: "/list-your-property" },
    icon: "tag",
  },
] as const;

export const whyChoose = [
  {
    title: "Carefully Selected Properties",
    body: "Every property listed by SILA is reviewed before being marketed to potential buyers or tenants.",
  },
  {
    title: "Zanzibar Market Knowledge",
    body: "Our understanding of locations, developments, demand and investment opportunities helps clients make better decisions.",
  },
  {
    title: "Local & International Clients",
    body: "We guide Tanzanian citizens, Zanzibar residents, diaspora buyers and foreign investors through the relevant process.",
  },
  {
    title: "Clear, Professional Guidance",
    body: "Clients receive straightforward information about property details, payments, documentation and next steps.",
  },
  {
    title: "Multiple Property Solutions",
    body: "Buy, rent, invest, build, sell or list property through one professional real estate partner.",
  },
  {
    title: "Long-Term Relationships",
    body: "Our work does not end when a property is identified. We support clients throughout the transaction and beyond.",
  },
];

export const commitments = [
  {
    n: "01",
    title: "Property Sales & Rentals",
    body: "Residential and commercial opportunities across Zanzibar.",
  },
  {
    n: "02",
    title: "Development Opportunities",
    body: "Build-to-own homes and residential projects.",
  },
  {
    n: "03",
    title: "Land & Plot Sales",
    body: "Selected land opportunities for living and investment.",
  },
  {
    n: "04",
    title: "Investment Guidance",
    body: "Professional support for local and international investors.",
  },
];

export const buildSteps = [
  {
    step: "01",
    title: "Choose a Development",
    body: "Review available projects, property types, locations, layouts, prices and estimated completion dates.",
  },
  {
    step: "02",
    title: "Reserve Your Property",
    body: "Select an available unit and complete the reservation process.",
  },
  {
    step: "03",
    title: "Follow the Payment Plan",
    body: "Make installment payments according to the agreed construction and payment schedule.",
  },
  {
    step: "04",
    title: "Monitor Construction",
    body: "Receive updates about development progress and important project milestones.",
  },
  {
    step: "05",
    title: "Receive Your Property",
    body: "Complete the final requirements and receive the finished property under the purchase agreement.",
  },
];

export const consultancyServices = [
  {
    title: "Location Analysis",
    body: "Understand the strengths, limitations, accessibility, surrounding development and potential demand of different locations.",
  },
  {
    title: "Property & Land Identification",
    body: "Find options that match your budget, intended use, preferred location and investment strategy.",
  },
  {
    title: "Market Opportunity Assessment",
    body: "Evaluate suitability for residential use, rental income, commercial activity, hospitality, development or long-term ownership.",
  },
  {
    title: "Legal & Regulatory Guidance",
    body: "Coordinated guidance on documents, approvals, ownership structures, lease arrangements and professional services.",
  },
  {
    title: "Foreign Investor Guidance",
    body: "Understand the additional processes that may apply to non-citizens investing in Zanzibar.",
  },
  {
    title: "Development Advisory",
    body: "Support when evaluating land for villas, apartments, commercial buildings, hospitality or residential developments.",
  },
];

export const faqs = [
  {
    q: "What types of properties does SILA offer?",
    a: "SILA offers houses, apartments, villas, office spaces, commercial buildings, land, plots, build-to-own properties and selected development opportunities across Zanzibar.",
  },
  {
    q: "Can I list my property with SILA?",
    a: "Yes. Property owners and authorised representatives can submit properties for review. Once approved, SILA can market the property to potential buyers or tenants.",
  },
  {
    q: "Does SILA offer rental properties?",
    a: "Yes. Our rental portfolio may include houses, apartments, villas, office spaces and commercial properties.",
  },
  {
    q: "What is a build-to-own property?",
    a: "A build-to-own property is purchased during the construction process. The buyer follows an agreed payment schedule, and the completed property is delivered according to the development and purchase agreements.",
  },
  {
    q: "Can I buy land through SILA?",
    a: "Yes. SILA offers selected plots and land opportunities for residential, commercial, hospitality, development and investment purposes.",
  },
  {
    q: "Can foreign investors purchase property in Zanzibar?",
    a: "Foreign investment may be possible through specific structures, approved developments, leases or investment arrangements. The applicable process depends on the property and current regulations. SILA will help coordinate the necessary guidance, but clients should obtain independent legal advice before proceeding.",
  },
  {
    q: "Does SILA verify property documents?",
    a: "SILA can perform an initial internal review and coordinate appropriate due diligence. Final legal verification should be completed by qualified legal professionals and the relevant authorities.",
  },
  {
    q: "Can SILA help me choose an investment location?",
    a: "Yes. Our land investment consultancy helps clients compare locations based on intended use, accessibility, development potential, market demand and other relevant considerations.",
  },
  {
    q: "Can I pay for a development property in installments?",
    a: "Installment plans may be available for selected build-to-own developments. The deposit, payment schedule, construction milestones and completion terms depend on the specific project.",
  },
  {
    q: "Does SILA guarantee investment returns?",
    a: "No. Property values, rental income, occupancy and investment performance can change. SILA provides information and professional guidance but does not guarantee future returns.",
  },
  {
    q: "How do I schedule a property viewing?",
    a: "Select a property and submit an enquiry through the website, call our team, or contact us through WhatsApp.",
  },
  {
    q: "Does SILA manage rental properties?",
    a: "Ongoing property management may be offered as a future service. Speak to our team about your requirements and we will advise on what is currently available.",
  },
];

export const investmentDisclaimer =
  "Information provided by SILA is for general property and investment guidance. Legal, tax, immigration, valuation and regulatory matters should be confirmed by appropriately qualified professionals and the relevant Zanzibar authorities before any transaction is completed.";

// -------------------------------- Helpers -----------------------------------

export function formatPrice(price: number, currency: Currency) {
  const opts: Intl.NumberFormatOptions = {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  };
  return new Intl.NumberFormat("en-US", opts).format(price);
}

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}
export function getDevelopment(slug: string) {
  return developments.find((d) => d.slug === slug);
}
export function getPlot(slug: string) {
  return plots.find((p) => p.slug === slug);
}
export const featuredProperties = properties.filter((p) => p.featured);
