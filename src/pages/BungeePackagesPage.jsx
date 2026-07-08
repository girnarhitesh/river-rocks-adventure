import Header from "../Components/CommonComponents/Header/Header";
import SeoHead from "../Components/CommonComponents/SeoHead/SeoHead";
import ActivityPageHero from "../Components/CommonComponents/ActivityPageHero/ActivityPageHero";
import ActivitiesCards from "../Components/HomeRoutes/ActivitiesCards/ActivitiesCards";
import ActivitiesCardsData from "../Components/HomeRoutes/ActivitiesCards/ActivitiesCardsData";
import Footer from "../Components/CommonComponents/Footer/Footer";
import WhatsAppFloat from "../Components/CommonComponents/WhatsAppFloat/WhatsAppFloat";
import { PAGE_SEO } from "../config/site";

const bungeeCategory = ActivitiesCardsData.categories.find(
  (category) => category.id === "bungee",
);

const BungeePackagesPage = () => (
  <>
    <SeoHead {...PAGE_SEO.bungee} />
    <Header />
    <ActivityPageHero
      tag={bungeeCategory.badge}
      title={bungeeCategory.label}
      subtitle={bungeeCategory.tagline}
      accent="yellow"
    />
    <ActivitiesCards
      categoryId="bungee"
      showSectionHeader={false}
      hideCategoryBanner
      sectionId="bungee-packages"
      standalone
    />
    <Footer />
    <WhatsAppFloat />
  </>
);

export default BungeePackagesPage;
