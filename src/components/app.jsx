import React, { useState, useEffect } from "react";
import Users from "./users.jsx";
import API from "../API";

const App = () => {
    const [usersToPerform, setUsersToPerform] = useState(
        API.users.default.fetchAll()
    );

    const handleDelete = (userId) => {
        const newUsers = usersToPerform.filter((user) => user._id !== userId);
        setUsersToPerform(newUsers);
    };

    useEffect(() => {
        API.users.default.fetchAll().then((users) => {
            setUsersToPerform(users);
        });
    }, []);

    return (
        <div>
            <Users
                users={usersToPerform}
                handleDeletion={handleDelete}
                usersToPerform={usersToPerform}
            />
        </div>
    );
};

export default App;
