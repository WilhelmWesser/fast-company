import React, { useState } from "react";
import API from "../API";

const Users = () => {
  const [users, setUsers] = useState(API.users.fetchAll());
  const [quantity, setQuantity] = useState(users.length);
  const renderQualities = (qualities) => {
    return qualities.map((quality) => (
      <span className={"m-1 badge bg-" + quality.color}>{quality.name}</span>
    ));
  };

  const handleDeletion = (id) => {
    users.splice(
      users.findIndex((user) => user._id === id),
      1
    );
    setUsers(users);
    setQuantity(users.length);
  };

  const handleDeletionWordRules = (length) => {
    const transformed = String(length);
    return transformed[transformed.length - 1] > "1" &&
      transformed[transformed.length - 1] <= "4" &&
      length !== 14 &&
      length !== 13 &&
      length !== 12 &&
      length !== 11
      ? `${length} человека тусанут с тобой сегодня`
      : `${length} человек тусанет с тобой сегодня`;
  };

  const renderTableUsers = (users) => {
    return users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{renderQualities(user.qualities)}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <td>
          <button
            onClick={() => handleDeletion(user._id)}
            type="button"
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };
  return users.length === 0 ? (
    <React.Fragment>
      {" "}
      <h2>
        <span className="badge bg-danger">Никто с тобой не тусанёт</span>
      </h2>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <h2>
        <span className="badge bg-primary">
          {handleDeletionWordRules(quantity)}
        </span>
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderTableUsers(users)}</tbody>
      </table>
    </React.Fragment>
  );
};

export default Users;
