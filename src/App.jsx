import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BookingProvider } from './Components/CommonComponents/BookingModal/BookingModalContext'
import ScrollToTop from './Components/CommonComponents/ScrollToTop/ScrollToTop'
import HomePage from './pages/HomePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsConditionsPage from './pages/TermsConditionsPage'

function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
        </Routes>
      </BookingProvider>
    </BrowserRouter>
  )
}

export default App
