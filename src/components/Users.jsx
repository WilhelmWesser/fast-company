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

  const deleteHandle = (id) => {};

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
            onClick={() => deleteHandle(user._id)}
            type="button"
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <React.Fragment>
      <h2>
        <span className="badge bg-primary">
          {quantity} человек тусанут с тобой сегодня
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
