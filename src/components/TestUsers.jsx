// import React, { useState } from "react";
// import API from "../API";

// const Users = () => {
//   const [users, setUsers] = useState(API.users.fetchAll());
//   const [quantity, setQuantity] = useState(users.length);
//   const renderQualities = (qualities) => {
//     return qualities.map((quality) => (
//       <span
//         key={"quality" + String(Math.random())}
//         className={"m-1 badge bg-" + quality.color}
//       >
//         {quality.name}
//       </span>
//     ));
//   };

//   const handleDeletion = (id) => {
//     users.splice(
//       users.findIndex((user) => user._id === id),
//       1
//     );
//     setUsers(users);
//     setQuantity(users.length);
//   };

//   const handleDeletionWordRules = (length) => {
//     const transformed = String(length);
//     return transformed[transformed.length - 1] > "1" &&
//       transformed[transformed.length - 1] <= "4" &&
//       length !== 14 &&
//       length !== 13 &&
//       length !== 12 &&
//       length !== 11
//       ? `${length} человека тусанут с тобой сегодня`
//       : `${length} человек тусанет с тобой сегодня`;
//   };

//   const renderTableUsers = (users) => {
//     return users.map((user) => (
//       <tr key={user._id}>
//         <td key={user._id + "name"}>{user.name}</td>
//         <td key={user._id + "qualities"}>{renderQualities(user.qualities)}</td>
//         <td key={user._id + "profession"}>{user.profession.name}</td>
//         <td key={user._id + "completed meetings"}>{user.completedMeetings}</td>
//         <td key={user._id + "rate"}>{user.rate}/5</td>
//         <td key={user._id + "delete button element"}>
//           <button
//             key={user._id + "delete button"}
//             onClick={() => handleDeletion(user._id)}
//             type="button"
//             className="btn btn-danger"
//           >
//             Delete
//           </button>
//         </td>
//       </tr>
//     ));
//   };
//   return users.length === 0 ? (
//     <React.Fragment>
//       {" "}
//       <h2 key="h2">
//         <span key="message" className="badge bg-danger">
//           Никто с тобой не тусанёт
//         </span>
//       </h2>
//     </React.Fragment>
//   ) : (
//     <React.Fragment>
//       <h2 key="h2">
//         <span key="message" className="badge bg-primary">
//           {handleDeletionWordRules(quantity)}
//         </span>
//       </h2>
//       <table className="table" key="table">
//         <thead key="thead">
//           <tr key="tr">
//             <th key="name" scope="col">
//               Имя
//             </th>
//             <th key="qualities" scope="col">
//               Качества
//             </th>
//             <th key="profession" scope="col">
//               Профессия
//             </th>
//             <th key="met, times" scope="col">
//               Встретился, раз
//             </th>
//             <th key="rank" scope="col">
//               Оценка
//             </th>
//             <th key="del btn column" scope="col"></th>
//           </tr>
//         </thead>
//         <tbody key="tbody">{renderTableUsers(users)}</tbody>
//       </table>
//     </React.Fragment>
//   );
// };

// export default Users;
