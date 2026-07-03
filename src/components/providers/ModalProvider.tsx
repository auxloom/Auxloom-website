import React, { createContext, useContext, useState } from "react";
import BookMeetingModal from "../ui/BookMeetingModal";
import ContactModal from "../ui/ContactModal";

interface ModalContextType {
  isBookingOpen: boolean;
  isContactOpen: boolean;
  selectedService: string;
  openBooking: (serviceName?: string) => void;
  closeBooking: () => void;
  openContact: () => void;
  closeContact: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openBooking = (serviceName?: string) => {
    setSelectedService(serviceName || "");
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedService("");
  };

  const openContact = () => {
    setIsContactOpen(true);
  };

  const closeContact = () => {
    setIsContactOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isBookingOpen,
        isContactOpen,
        selectedService,
        openBooking,
        closeBooking,
        openContact,
        closeContact,
      }}
    >
      {children}
      <BookMeetingModal />
      <ContactModal />
    </ModalContext.Provider>
  );
};

export const useModals = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModals must be used within a ModalProvider");
  }
  return context;
};
