import { ACTIVITY_ROUTES } from "../../../config/site";

const HeaderData = {
  logo: {
    src: "/Images/River_and_rocks_logo.png",
    alt: "River & Rocks Adventure",
    href: "/",
  },
  navigation: [
    {
      label: "Rafting",
      href: ACTIVITY_ROUTES.rafting,
    },
    {
      label: "Bungee",
      href: ACTIVITY_ROUTES.bungee,
    },
  ],
  cta: {
    label: "Book Now",
  },
  scrollThreshold: 200,
};

export default HeaderData;
