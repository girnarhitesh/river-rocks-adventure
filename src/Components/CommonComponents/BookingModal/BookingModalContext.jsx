import { createContext, useCallback, useContext, useEffect, useState } from "react";
import BookingModal from "./BookingModal";

const BookingModalContext = createContext(null);

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [packageTitle, setPackageTitle] = useState("");

  const openBookingModal = useCallback((title = "") => {
    setPackageTitle(title);
    setIsOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsOpen(false);
    setPackageTitle("");
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeBookingModal();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeBookingModal]);

  return (
    <BookingModalContext.Provider
      value={{ isOpen, packageTitle, openBookingModal, closeBookingModal }}
    >
      {children}
      <BookingModal />
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);

  if (!context) {
    throw new Error("useBookingModal must be used within BookingProvider");
  }

  return context;
}
