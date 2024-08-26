"use client";

import React, { useContext } from "react";
import { Chatbot } from "./components/Chatbot";
import { LocationProvider, LocationContext } from "./locationContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocationProvider>
      <ContentWrapper>{children}</ContentWrapper>
    </LocationProvider>
  );
}

function ContentWrapper({ children }: { children: React.ReactNode }) {
  const userLocation = useContext(LocationContext);

  return (
    <html lang="en">
      <body>{children}</body>
      <Chatbot userLocation={userLocation} />
    </html>
  );
}
