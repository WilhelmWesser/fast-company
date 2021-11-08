/* eslint-disable multiline-ternary */
import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../API";
import { useHistory } from "react-router-dom";
import Quality from "./quality";
const UsersPage = ({ id }) => {
    const history = useHistory();
    const handleSave = () => {
        history.replace("/users");
    };
    const [user, setUser] = useState();
    console.log(user);

    useEffect(() => {
        API.users.default.getById(id).then((user) => {
            setUser(user);
        });
    }, []);
    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                {user.qualities.map((quality) => (
                    <Quality {...quality} key={quality._id} />
                ))}
                <h4>Completed meetings: {user.completedMeetings}</h4>
                <h1>Rate: {user.rate}</h1>
                <button
                    onClick={() => {
                        handleSave();
                    }}
                >
                    Все пользователи
                </button>
            </>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};
UsersPage.propTypes = {
    id: PropTypes.string.isRequired
};
export default UsersPage;
