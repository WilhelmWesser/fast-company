import React, { useState } from "react";
import Users from "./users";
import SearchStatus from "./searchStatus";
import API from "../API";

const App = () => {
  const [usersToPerform, setUsersToPerform] = useState(API.users.fetchAll());

  const handleDeletionWordRules = (peopleQuantity) => {
    const transformed = String(peopleQuantity);
    if (peopleQuantity === 0) {
      return "Никто с тобой не тусанёт";
    }
    return transformed[transformed.length - 1] > "1" &&
      transformed[transformed.length - 1] <= "4" &&
      peopleQuantity !== 14 &&
      peopleQuantity !== 13 &&
      peopleQuantity !== 12 &&
      peopleQuantity !== 11
      ? `${peopleQuantity} человека тусанут с тобой сегодня`
      : `${peopleQuantity} человек тусанет с тобой сегодня`;
  };

  return (
    <div>
      <SearchStatus
        length={usersToPerform.length}
        onQuantityChange={handleDeletionWordRules}
      />
      <Users users={usersToPerform} />
    </div>
  );
};

export default App;
