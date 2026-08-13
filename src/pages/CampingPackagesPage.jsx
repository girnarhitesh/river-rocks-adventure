import Header from "../Components/CommonComponents/Header/Header";
import SeoHead from "../Components/CommonComponents/SeoHead/SeoHead";
import ActivityPageHero from "../Components/CommonComponents/ActivityPageHero/ActivityPageHero";
import ActivitiesCards from "../Components/HomeRoutes/ActivitiesCards/ActivitiesCards";
import CampingInfo from "../Components/HomeRoutes/CampingPackages/CampingInfo";
import CampingPackagesData from "../Components/HomeRoutes/CampingPackages/CampingPackagesData";
import Footer from "../Components/CommonComponents/Footer/Footer";
import WhatsAppFloat from "../Components/CommonComponents/WhatsAppFloat/WhatsAppFloat";
import { PAGE_SEO } from "../config/site";

const campingCategory = CampingPackagesData.category;

const CampingPackagesPage = () => (
  <>
    <SeoHead {...PAGE_SEO.camping} />
    <Header />
    <ActivityPageHero
      tag={campingCategory.badge}
      title={campingCategory.label}
      subtitle={campingCategory.tagline}
      accent="teal"
    />
    <ActivitiesCards
      categoryId="camping"
      showSectionHeader={false}
      hideCategoryBanner
      sectionId="camping-packages"
      standalone
    />
    <CampingInfo />
    <Footer />
    <WhatsAppFloat />
  </>
);

export default CampingPackagesPage;
