import { SOCIAL_LINKS } from "../../../config/socialLinks";
import { ACTIVITY_ROUTES } from "../../../config/site";
import ActivitiesCardsData from "../../HomeRoutes/ActivitiesCards/ActivitiesCardsData";

const ACTIVITIES_HREF = "#ActivitiesCards";

const ACTIVITY_PAGE_ROUTES = {
  rafting: ACTIVITY_ROUTES.rafting,
  bungee: ACTIVITY_ROUTES.bungee,
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
      "Certified river rafting and bungee jumps in Rishikesh with expert guides, premium safety gear, and unforgettable adventure experiences.",
  },
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/#ride-explore" },
    { label: "Adventure Packages", href: "/#ActivitiesCards" },
    { label: "About Us", href: "/#company-content" },
  ],
  raftingLinks: getActivityLinks("rafting"),
  bungeeLinks: getActivityLinks("bungee"),
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
    "River & Rock Adventure offers the best river rafting in Rishikesh — from gentle Brahmpuri and Club House stretches to thrilling Shivpuri, Marine Drive, and Kaudiyala rapids on the Ganga — plus Himalayan bungee jumps up to 117m with DSLR video. Book white water rafting Rishikesh packages near NIM Beach, Tapovan, and Ram Jhula with certified guides, life jackets, and safety kayaks. Whether you want a 9 km family rafting trip, a 70 km Devprayag expedition, or a freestyle bungee jump, we deliver safe, memorable adventure experiences in Rishikesh, Uttarakhand.",
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
