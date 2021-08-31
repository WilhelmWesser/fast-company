import React, { useState } from "react";
import Users from "./users";
import SearchStatus from "./searchStatus";
import API from "../API";

const App = () => {
    const [usersToPerform, setUsersToPerform] = useState(API.users.fetchAll());
    const [totalLength, setTotalLength] = useState(usersToPerform.length);

    const handleDelete = (userId) => {
        const newUsers = usersToPerform.filter((user) => user._id !== userId);
        setUsersToPerform(newUsers);
        setTotalLength(newUsers.length);
    };

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
                length={totalLength}
                onQuantityChange={handleDeletionWordRules}
            />
            <Users
                users={usersToPerform}
                handleDeletion={handleDelete}
                usersToPerform={usersToPerform}
            />
        </div>
    );
};

export default App;
