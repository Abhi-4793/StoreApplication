import React, { createContext, useState, useContext } from "react";

interface AppContextType {
  refreshApp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshApp = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Increment the key to trigger re-renders
  };

  return (
    <AppContext.Provider value={{ refreshApp }}>
      <div key={refreshKey}>{children}</div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within an AppProvider");
  return context;
};
