import Header from "../Components/CommonComponents/Header/Header";
import SeoHead from "../Components/CommonComponents/SeoHead/SeoHead";
import { PAGE_SEO } from "../config/site";
import HeroHome from "../Components/HomeRoutes/HeroHome/HeroHome";
import RideExplore from "../Components/HomeRoutes/RideExplore/RideExplore";
import ActivitiesCards from "../Components/HomeRoutes/ActivitiesCards/ActivitiesCards";
import RaftingRouteExplorer from "../Components/HomeRoutes/RaftingRouteExplorer/RaftingRouteExplorer";
import CompanyContent from "../Components/HomeRoutes/CompanyContent/CompanyContent";
import Footer from "../Components/CommonComponents/Footer/Footer";
import WhatsAppFloat from "../Components/CommonComponents/WhatsAppFloat/WhatsAppFloat";

const HomePage = () => (
  <>
    <SeoHead {...PAGE_SEO.home} includeStructuredData />
    <Header />
    <HeroHome />
    <RideExplore />
    <RaftingRouteExplorer />
    <ActivitiesCards />
    <CompanyContent />
    <Footer />
    <WhatsAppFloat />
  </>
);

export default HomePage;
