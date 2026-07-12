import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
const [selectedSong, setSelectedSong] = useState(null);
  return (
   <SearchContext.Provider
  value={{
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    selectedSong,
    setSelectedSong,
  }}
>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);