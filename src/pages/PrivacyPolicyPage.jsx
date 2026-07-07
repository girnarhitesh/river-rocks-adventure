import Header from "../Components/CommonComponents/Header/Header";
import SeoHead from "../Components/CommonComponents/SeoHead/SeoHead";
import { PAGE_SEO } from "../config/site";
import LegalPage from "../Components/CommonComponents/LegalPage/LegalPage";
import privacyPolicyContent from "../Components/CommonComponents/LegalPage/privacyPolicyContent";
import Footer from "../Components/CommonComponents/Footer/Footer";
import WhatsAppFloat from "../Components/CommonComponents/WhatsAppFloat/WhatsAppFloat";

const PrivacyPolicyPage = () => (
  <>
    <SeoHead {...PAGE_SEO.privacy} />
    <Header />
    <LegalPage content={privacyPolicyContent} />
    <Footer />
    <WhatsAppFloat />
  </>
);

export default PrivacyPolicyPage;
