import React from "react";
import { Input } from "antd";

const SearchBar = () => {
  const { Search } = Input;

  return (
    <div>
      <div className="searchbar_f">
        <Search />
      </div>
    </div>
  );
};

export default SearchBar;
