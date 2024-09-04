"use client";

import React, { useContext } from "react";
import { RegistrationProvider } from "./context/registrationContext";
import { Chatbot } from "./components/Chatbot";
import { LocationProvider, LocationContext } from "./context/locationContext";
import NavigationBar from "./components/NavigationBar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocationProvider>
      <RegistrationProvider>
        <ContentWrapper>{children}</ContentWrapper>
      </RegistrationProvider>
    </LocationProvider>
  );
}

function ContentWrapper({ children }: { children: React.ReactNode }) {
  const userLocation = useContext(LocationContext);

  return (
    <html lang="en">
      <body className="bg-white">
        <NavigationBar />
        <div className="px-8">{children}</div>
        <Chatbot userLocation={userLocation} />
      </body>
    </html>
  );
}
