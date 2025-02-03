import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the type for Search Context
interface SearchContextType {
  searchText: string;
  setSearchText: (text: string) => void;
}

// Create Context with an explicit type (but no initial value)
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Provider Component
export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom Hook for easy access (ensuring it's always used within the provider)
export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
