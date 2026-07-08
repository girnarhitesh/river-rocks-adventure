import { SOCIAL_LINKS } from "../../../config/socialLinks";

const FooterData = {
  brand: {
    logo: "/Images/River_and_rocks_logo.png",
    alt: "River & Rock Adventure — Rishikesh Rafting",
    tagline: "Adventure Begins on the Ganga",
    description:
      "Certified river rafting in Rishikesh with expert guides, premium safety gear, and unforgettable white-water experiences on the holy Ganga.",
  },
  quickLinks: [
    { label: "Home", href: "#hero-home" },
    { label: "Explore", href: "#ride-explore" },
    { label: "Rafting Packages", href: "#ActivitiesCards" },
    { label: "Route Explorer", href: "#rafting-routes" },
    { label: "About Us", href: "#company-content" },
  ],
  raftingLinks: [
    { label: "Club House / NIM Beach", href: "#ActivitiesCards" },
    { label: "Brahmpuri to Ram Jhula", href: "#ActivitiesCards" },
    { label: "Shivpuri Rafting", href: "#ActivitiesCards" },
    { label: "Marine Drive Rafting", href: "#ActivitiesCards" },
    { label: "Kaudiyala Expedition", href: "#ActivitiesCards" },
    { label: "Devprayag Multi-Day Trip", href: "#ActivitiesCards" },
  ],
  contact: {
    address:
      "Kailash Gate, Muni ki Reti, Near Union Bank, Rishikesh, T.G. (Uttarakhand)-249137",
    phones: [
      { display: "+91-135-2442307", href: "+911352442307" },
      { display: "9456177183", href: "+919456177183" },
    ],
    email: "salesriverrockholidays@gmail.com",
  },
  social: SOCIAL_LINKS,
  seoText:
    "River & Rock Adventure offers the best river rafting in Rishikesh — from gentle Brahmpuri and Club House stretches to thrilling Shivpuri, Marine Drive, and Kaudiyala rapids on the Ganga. Book white water rafting Rishikesh packages near NIM Beach, Tapovan, and Ram Jhula with certified guides, life jackets, and safety kayaks. Whether you want a 9 km family rafting trip or a 70 km Devprayag expedition, we deliver safe, memorable Ganga rafting experiences in Rishikesh, Uttarakhand.",
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
  companyName: "River & Rock Adventure",
  poweredBy: {
    label: "Powered by",
    logo: "/Images/OkGhumoLogo.png",
    alt: "Ok Ghumo",
    href: "https://okghumo.in",
  },
};

export default FooterData;
