import React, { useState } from "react";
import Pagination from "./pagination";
import User from "./user";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
const Users = ({ users: allUsers, handleDeletion, usersToPerform }) => {
    const count = allUsers.length;
    const pageSize = 4;
    const [currentPage, setCurrnetPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        console.log("page:", pageIndex);
        setCurrnetPage(pageIndex);
    };

    const users = paginate(allUsers, currentPage, pageSize);
    // eslint-disable-next-line multiline-ternary
    return usersToPerform.length > 0 ? (
        <div>
            <table className="table" key="table">
                <thead key="thead">
                    <tr key="tr">
                        <th key="name" scope="col">
                            Имя
                        </th>
                        <th key="qualities" scope="col">
                            Качества
                        </th>
                        <th key="profession" scope="col">
                            Профессия
                        </th>
                        <th key="met, times" scope="col">
                            Встретился, раз
                        </th>
                        <th key="rank" scope="col">
                            Оценка
                        </th>
                        <th key="chosen" scope="col">
                            Избранное
                        </th>
                        <th key="del btn column" scope="col"></th>
                    </tr>
                </thead>
                <tbody key="tbody">
                    {users.map((user) => (
                        <User
                            key={user._id}
                            _id={user._id}
                            name={user.name}
                            profession={user.profession}
                            qualities={user.qualities}
                            completedMeetings={user.completedMeetings}
                            rate={user.rate}
                            onDelete={handleDeletion}
                        />
                    ))}
                </tbody>
            </table>
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    ) : (
        ""
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired,
    handleDeletion: PropTypes.func.isRequired,
    usersToPerform: PropTypes.array.isRequired
};

export default Users;
