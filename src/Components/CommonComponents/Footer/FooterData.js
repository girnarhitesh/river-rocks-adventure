import { SOCIAL_LINKS } from "../../../config/socialLinks";
import { ACTIVITY_ROUTES } from "../../../config/site";
import ActivitiesCardsData from "../../HomeRoutes/ActivitiesCards/ActivitiesCardsData";

const ACTIVITIES_HREF = "#ActivitiesCards";

const ACTIVITY_PAGE_ROUTES = {
  rafting: ACTIVITY_ROUTES.rafting,
  bungee: ACTIVITY_ROUTES.bungee,
  camping: ACTIVITY_ROUTES.camping,
};

const getActivityLinks = (categoryId) => {
  const category = ActivitiesCardsData.categories.find((item) => item.id === categoryId);
  return (category?.items ?? []).map((item) => ({
    label: item.title,
    href: ACTIVITY_PAGE_ROUTES[categoryId] || ACTIVITIES_HREF,
  }));
};

const FooterData = {
  brand: {
    logo: "/Images/River_and_rocks_logo.png",
    alt: "River & Rock Adventure — Rishikesh Rafting",
    tagline: "Adventure Begins on the Ganga",
    description:
      "Certified river rafting, bungee jumps, and riverside camps & cottages in Rishikesh with expert hosts, safety gear, and unforgettable adventure stays.",
  },
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/#ride-explore" },
    { label: "Adventure Packages", href: "/#ActivitiesCards" },
    { label: "Camping Stay", href: ACTIVITY_ROUTES.camping },
    { label: "About Us", href: "/#company-content" },
  ],
  raftingLinks: getActivityLinks("rafting"),
  bungeeLinks: getActivityLinks("bungee"),
  campingLinks: getActivityLinks("camping"),
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
    "River & Rock Adventure offers the best river rafting in Rishikesh — from gentle Brahmpuri and Club House stretches to thrilling Shivpuri, Marine Drive, and Kaudiyala rapids on the Ganga — plus Himalayan bungee jumps up to 117m with DSLR video, and riverside AC luxury & family cottages with buffet meals, bonfire, and river pool access. Book white water rafting, bungee, and camping stays near NIM Beach, Tapovan, and Ram Jhula with certified guides and safety gear in Rishikesh, Uttarakhand.",
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
