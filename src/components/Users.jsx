import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import User from "./user";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import API from "../API";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
const Users = ({ users: allUsers, handleDeletion }) => {
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(API.professions.fetchAll());
    const [selectedProf, setSelectedProf] = useState();
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

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    // Serialization
    // const filteredUsers = selectedProf
    //     ? allUsers.filter(
    //           (user) =>
    //               JSON.stringify(user.profession) ===
    //               JSON.stringify(selectedProf)
    //       )
    //     : allUsers;

    // My solution
    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession.name === selectedProf.name)
        : allUsers;
    const count = filteredUsers.length;
    const users = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };
    // eslint-disable-next-line multiline-ternary
    return allUsers.length > 0 ? (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        // valueProperty="_id"
                        // contentProperty="name"
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus
                    length={count}
                    onQuantityChange={handleDeletionWordRules}
                />
                {count > 0 && (
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
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    ) : (
        ""
    );
};
Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    handleDeletion: PropTypes.func.isRequired
};

export default Users;
