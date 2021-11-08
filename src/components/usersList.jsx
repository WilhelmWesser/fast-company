/* eslint-disable multiline-ternary */
/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../API";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./userTable";
import { useParams } from "react-router";
import _ from "lodash";
import UsersPage from "./userPage";
import SearchBar from "./searchBar";
const UsersList = () => {
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;
    const [users, setUsers] = useState();
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        api.users.default.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookmark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSearchValue("");
        findByName(searchValue);
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const findByName = (name) => {
        setUsers(api.users.default.findByName(name));
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleChange = ({ target }) => {
        setSelectedProf();
        setSearchValue(target.value);
        findByName(target.value);
    };
    if (users) {
        // eslint-disable-next-line multiline-ternary
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };
        const { userId } = params;
        return userId ? (
            <UsersPage id={userId} />
        ) : (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            {" "}
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <SearchBar
                        onFind={findByName}
                        handleChange={handleChange}
                        searchValue={searchValue}
                    />
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onToggleBookmark={handleToggleBookmark}
                            onDelete={handleDelete}
                        />
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
        );
    }
    return (
        <>
            <h1>Loading...</h1>
        </>
    );
};

export default UsersList;
