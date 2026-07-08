import Header from "../Components/CommonComponents/Header/Header";
import SeoHead from "../Components/CommonComponents/SeoHead/SeoHead";
import ActivityPageHero from "../Components/CommonComponents/ActivityPageHero/ActivityPageHero";
import ActivitiesCards from "../Components/HomeRoutes/ActivitiesCards/ActivitiesCards";
import ActivitiesCardsData from "../Components/HomeRoutes/ActivitiesCards/ActivitiesCardsData";
import Footer from "../Components/CommonComponents/Footer/Footer";
import WhatsAppFloat from "../Components/CommonComponents/WhatsAppFloat/WhatsAppFloat";
import { PAGE_SEO } from "../config/site";

const raftingCategory = ActivitiesCardsData.categories.find(
  (category) => category.id === "rafting",
);

const RaftingPackagesPage = () => (
  <>
    <SeoHead {...PAGE_SEO.rafting} />
    <Header />
    <ActivityPageHero
      tag={raftingCategory.badge}
      title={raftingCategory.label}
      subtitle={raftingCategory.tagline}
      accent="red"
    />
    <ActivitiesCards
      categoryId="rafting"
      showRouteExplorer
      showSectionHeader={false}
      hideCategoryBanner
      sectionId="rafting-packages"
      standalone
    />
    <Footer />
    <WhatsAppFloat />
  </>
);

export default RaftingPackagesPage;
