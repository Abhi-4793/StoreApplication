// import React from "react";
// import { FaSearch } from "react-icons/fa";
import { useSearch } from "../context/SearchBarContext";

const SearchBar = () => {
  const { searchText, setSearchText } = useSearch();
  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search for products"
      />
      {/* <button className="header__search-btn">
        <FaSearch />
      </button> */}
    </div>
  );
};

export default SearchBar;
