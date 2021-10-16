import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Bookmark from "./bookmark";
const UserTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark,
    onDelete
}) => {
    const columns = {
        name: { path: "name", name: "Имя", className: "" },
        qualities: { name: "Качества", className: "" },
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
        <table className="table" key="table">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
        </table>
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
