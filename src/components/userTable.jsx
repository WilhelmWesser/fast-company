import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark,
    onDelete
}) => {
    const columns = {
        name: { path: "name", name: "Имя", className: "" },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />,
            className: ""
        },
        professions: {
            path: "profession.name",
            name: "Профессия",
            className: ""
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз",
            className: ""
        },
        rate: { path: "rate", name: "Оценка", className: "" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => onToggleBookmark(user._id)}
                />
            ),
            className: ""
        },
        delete: {
            component: (user) => (
                <button
                    key={user._id + " delete button"}
                    onClick={() => onDelete(user._id)}
                    type="button"
                    className="btn btn-danger"
                >
                    Delete
                </button>
            )
        },
        className: ""
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserTable;
