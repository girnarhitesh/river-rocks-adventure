import Header from "../Components/CommonComponents/Header/Header";
import SeoHead from "../Components/CommonComponents/SeoHead/SeoHead";
import { PAGE_SEO } from "../config/site";
import LegalPage from "../Components/CommonComponents/LegalPage/LegalPage";
import termsConditionsContent from "../Components/CommonComponents/LegalPage/termsConditionsContent";
import Footer from "../Components/CommonComponents/Footer/Footer";
import WhatsAppFloat from "../Components/CommonComponents/WhatsAppFloat/WhatsAppFloat";

const TermsConditionsPage = () => (
  <>
    <SeoHead {...PAGE_SEO.terms} />
    <Header />
    <LegalPage content={termsConditionsContent} />
    <Footer />
    <WhatsAppFloat />
  </>
);

export default TermsConditionsPage;
