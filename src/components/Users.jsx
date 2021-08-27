import React from "react";
import User from "./user";

const Users = ({ users, handleDeletion, usersToPerform }) => {
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
          {usersToPerform.map((user) => (
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
    </div>
  ) : (
    ""
  );
};

export default Users;
