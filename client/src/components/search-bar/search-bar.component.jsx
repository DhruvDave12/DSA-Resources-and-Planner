import React from "react";
import { Input } from "antd";
const { Search } = Input;

const CustomSearchBar = ({placeholder, handleSearch}) => {
  return (
    <Search placeholder={placeholder} onSearch={handleSearch} enterButton />
  );
};

export default CustomSearchBar;
