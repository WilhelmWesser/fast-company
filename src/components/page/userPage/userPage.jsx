/* eslint-disable multiline-ternary */
import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../API";
import { Link } from "react-router-dom";
import Quality from "../../ui/qualities/quality";
const UserPage = ({ id }) => {
    // const history = useHistory();
    // const handleSwitchToEditMode = () => {
    //     history.replace("/users");
    // };
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(id).then((user) => {
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
                <Link to={`/users/${user._id}/edit`}>
                    <button>Изменить</button>
                </Link>
            </>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};
UserPage.propTypes = {
    id: PropTypes.string.isRequired
};
export default UserPage;
