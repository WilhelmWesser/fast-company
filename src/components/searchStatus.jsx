import React from "react";

const SearchStatus = ({ length, onQuantityChange }) => {
  console.log(length);
  return (
    <h2 key="h2">
      <span
        key="message"
        className={
          onQuantityChange(length).includes("Никто")
            ? "badge bg-danger"
            : "badge bg-primary"
        }
      >
        {onQuantityChange(length)}
      </span>
    </h2>
  );
};

export default SearchStatus;
