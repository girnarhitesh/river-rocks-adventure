import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { BookingProvider } from './Components/CommonComponents/BookingModal/BookingModalContext'
import ScrollToTop from './Components/CommonComponents/ScrollToTop/ScrollToTop'
import StickySocialBar from './Components/CommonComponents/StickySocialBar/StickySocialBar'
import PageTransition from './Components/CommonComponents/PageTransition/PageTransition'
import HomePage from './pages/HomePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsConditionsPage from './pages/TermsConditionsPage'
import RaftingPackagesPage from './pages/RaftingPackagesPage'
import BungeePackagesPage from './pages/BungeePackagesPage'
import { ACTIVITY_ROUTES } from './config/site'

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path={ACTIVITY_ROUTES.rafting}
          element={
            <PageTransition>
              <RaftingPackagesPage />
            </PageTransition>
          }
        />
        <Route
          path={ACTIVITY_ROUTES.bungee}
          element={
            <PageTransition>
              <BungeePackagesPage />
            </PageTransition>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <PageTransition>
              <PrivacyPolicyPage />
            </PageTransition>
          }
        />
        <Route
          path="/terms-and-conditions"
          element={
            <PageTransition>
              <TermsConditionsPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <ScrollToTop />
        <StickySocialBar />
        <AppRoutes />
      </BookingProvider>
    </BrowserRouter>
  )
}

export default App
