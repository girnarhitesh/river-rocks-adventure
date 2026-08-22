import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { BookingProvider } from "./Components/CommonComponents/BookingModal/BookingModalContext";
import ScrollToTop from "./Components/CommonComponents/ScrollToTop/ScrollToTop";
import StickySocialBar from "./Components/CommonComponents/StickySocialBar/StickySocialBar";
import PageTransition from "./Components/CommonComponents/PageTransition/PageTransition";
import { PrerenderContext } from "./context/PrerenderContext";
import HomePage from "./pages/HomePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import RaftingPackagesPage from "./pages/RaftingPackagesPage";
import BungeePackagesPage from "./pages/BungeePackagesPage";
import CampingPackagesPage from "./pages/CampingPackagesPage";
import { ACTIVITY_ROUTES } from "./config/site";

const routeConfig = [
  { path: "/", element: <HomePage /> },
  { path: ACTIVITY_ROUTES.rafting, element: <RaftingPackagesPage /> },
  { path: ACTIVITY_ROUTES.bungee, element: <BungeePackagesPage /> },
  { path: ACTIVITY_ROUTES.camping, element: <CampingPackagesPage /> },
  { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
  { path: "/terms-and-conditions", element: <TermsConditionsPage /> },
];

function wrapPage(element) {
  return <PageTransition>{element}</PageTransition>;
}

function AppRoutes({ isPrerender }) {
  const location = useLocation();

  const routes = (
    <Routes location={isPrerender ? undefined : location}>
      {routeConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={wrapPage(element)} />
      ))}
    </Routes>
  );

  if (isPrerender) return routes;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routeConfig.map(({ path, element }) => (
          <Route key={path} path={path} element={wrapPage(element)} />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

function App({ isPrerender = false }) {
  return (
    <PrerenderContext.Provider value={isPrerender}>
      <BookingProvider>
        {!isPrerender && <ScrollToTop />}
        <StickySocialBar />
        <AppRoutes isPrerender={isPrerender} />
      </BookingProvider>
    </PrerenderContext.Provider>
  );
}

export default App;
