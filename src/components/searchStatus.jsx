import React, { useState } from "react";

const SearchStatus = ({ length, onQuantityChange }) => {
  const [usersLength, setUsersLength] = useState(length);
  const [content, setContent] = useState(onQuantityChange(usersLength));
  return (
    <h2 key="h2">
      <span
        key="message"
        className={
          onQuantityChange(usersLength).includes("Никто")
            ? "badge bg-danger"
            : "badge bg-primary"
        }
      >
        {content}
      </span>
    </h2>
  );
};

export default SearchStatus;
