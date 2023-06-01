import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

const Search = ({ product }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      return [];
    }

    return product.filter((product) =>
      product.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const renderSuggestion = (suggestion) => {
    console.log(suggestion);
    const MAX_CHARACTERS = 25; // Số kí tự tối đa hiển thị

    const truncatedName =
      suggestion.name.length > MAX_CHARACTERS
        ? suggestion.name.substring(0, MAX_CHARACTERS - 3) + "..."
        : suggestion.name;

    return (
      <div className="bg-gray-200 border-b border-1 border-black/[0.1] text-black p-4 z-100 grid grid-cols-[auto,1fr] gap-4">
        <div className="h-12 w-12">
          <img
            src={suggestion.main_image}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            {truncatedName}
          </div>
          <div>{suggestion.current_price.toLocaleString("vi-VN")} VND</div>
        </div>
      </div>
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    const productId = suggestion.id;
    const url = `/products/${productId}`;

    // Chuyển hướng đến trang "/products/${suggestion.id}"
    // Sử dụng Link từ thư viện next/link
    router.push(url);
    setValue(""); // Xóa giá trị của ô input
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Search",
    value,
    onChange,
    className: "border-[2px] border-black md:w-[300px] px-2",
  };

  return (
    <div className="absolute top-[100px] md:right-10 md:w-[300px] h-[430px] overflow-hidden md:top-[38px] ">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};

export default Search;
