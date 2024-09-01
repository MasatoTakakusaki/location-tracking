import React, { createContext, useState, ReactNode } from "react";

type RegistrationContextType = {
  isRegistered: boolean;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RegistrationContext = createContext<RegistrationContextType>({
  isRegistered: false,
  setIsRegistered: () => {},
});

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  return (
    <RegistrationContext.Provider value={{ isRegistered, setIsRegistered }}>
      {children}
    </RegistrationContext.Provider>
  );
};
