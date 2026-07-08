const DEFAULT_SITE_URL = "https://www.riverrocksadventure.com";

function resolveSiteUrl() {
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL;
  }

  if (typeof process !== "undefined" && process.env?.VITE_SITE_URL) {
    return process.env.VITE_SITE_URL;
  }

  return DEFAULT_SITE_URL;
}

export const SITE_URL = resolveSiteUrl().replace(/\/$/, "");

export const SITE_NAME = "River & Rock Adventure";

export const SITE_TAGLINE = "Adventure Begins on the Ganga";

export const DEFAULT_DESCRIPTION =
  "Book certified river rafting in Rishikesh with River & Rock Adventure. Expert guides, premium safety gear, and unforgettable white-water experiences on the Ganga — from Brahmpuri to Kaudiyala and Devprayag.";

export const DEFAULT_KEYWORDS =
  "River Rafting Rishikesh, White Water Rafting Rishikesh, Ganga Rafting, Shivpuri Rafting, Marine Drive Rafting, Brahmpuri Rafting, Adventure Tours Rishikesh, River & Rock Adventure";

export const DEFAULT_OG_IMAGE = "/Images/River_and_rocks_logo.png";

export const THEME_COLOR = "#0F766E";

export const CONTACT = {
  email: "salesriverrockholidays@gmail.com",
  phone: "+91-135-2442307",
  address: {
    streetAddress: "Kailash Gate, Muni ki Reti, Near Union Bank",
    addressLocality: "Rishikesh",
    addressRegion: "Uttarakhand",
    postalCode: "249137",
    addressCountry: "IN",
  },
};

export const SOCIAL_PROFILES = [
  "https://www.facebook.com/RiverRocksadventure/",
  "https://www.instagram.com/river.and.rocks.adventure/",
  "https://www.linkedin.com/in/river-and-rock-adventure-48816697",
  "https://www.youtube.com/channel/UCJTquxggTSv0qA9tvSedUdA",
  "https://www.tripadvisor.in/Attraction_Review-g580106-d8099009-Reviews-River_Rocks_Adventure-Rishikesh_Dehradun_District_Uttarakhand.html",
];

/** Dedicated activity landing pages */
export const ACTIVITY_ROUTES = {
  rafting: "/river-rafting-rishikesh",
  bungee: "/bungee-jumping-rishikesh",
};

/** Routes included in sitemap.xml */
export const SITEMAP_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: ACTIVITY_ROUTES.rafting, changefreq: "weekly", priority: "0.9" },
  { path: ACTIVITY_ROUTES.bungee, changefreq: "weekly", priority: "0.9" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms-and-conditions", changefreq: "yearly", priority: "0.3" },
];

export const PAGE_SEO = {
  home: {
    title: `${SITE_NAME} | River Rafting in Rishikesh & Ganga Adventure Tours`,
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    path: "/",
  },
  privacy: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      "Read how River & Rock Adventure collects, uses, and protects your personal information when you book rafting and adventure tours in Rishikesh.",
    keywords: "Privacy Policy, River & Rock Adventure, Rishikesh Rafting",
    path: "/privacy-policy",
  },
  terms: {
    title: `Terms & Conditions | ${SITE_NAME}`,
    description:
      "Terms and conditions for booking river rafting and adventure experiences with River & Rock Adventure in Rishikesh, Uttarakhand.",
    keywords: "Terms and Conditions, River & Rock Adventure, Rafting Booking Terms",
    path: "/terms-and-conditions",
  },
  rafting: {
    title: `River Rafting Packages in Rishikesh | ${SITE_NAME}`,
    description:
      "Book Ganga river rafting in Rishikesh — Club House, Brahmpuri, Shivpuri, Marine Drive, Kaudiyala, and Devprayag packages with certified guides and safety gear.",
    keywords:
      "River Rafting Rishikesh, Ganga Rafting Packages, Shivpuri Rafting, Marine Drive Rafting, Kaudiyala Rafting, Devprayag Expedition",
    path: ACTIVITY_ROUTES.rafting,
  },
  bungee: {
    title: `Bungee Jumping in Rishikesh | ${SITE_NAME}`,
    description:
      "Book Himalayan bungee jumps in Rishikesh — 117m, 111m, 109m, and 85m jumps with DSLR video. Normal and freestyle jump packages with River & Rock Adventure.",
    keywords:
      "Bungee Jumping Rishikesh, Himalayan Bungee, Freestyle Bungee Jump, 117m Bungee Rishikesh, Adventure Jump Packages",
    path: ACTIVITY_ROUTES.bungee,
  },
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getOrganizationSchema() {
  const { address } = CONTACT;

  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(DEFAULT_OG_IMAGE),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description: DEFAULT_DESCRIPTION,
    slogan: SITE_TAGLINE,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.0869,
      longitude: 78.2676,
    },
    areaServed: {
      "@type": "Place",
      name: "Rishikesh, Uttarakhand, India",
    },
    sameAs: SOCIAL_PROFILES,
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-IN",
  };
}
