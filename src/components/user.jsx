import React from "react";
import Qualitiy from "./qualitiy";
import Bookmark from "./bookmark";

const User = ({
  _id,
  name,
  profession,
  qualities,
  completedMeetings,
  rate,
  onDelete,
}) => {
  const showAlter = (status) => {
    if (status === "notChosen") {
      return {
        status: "Chosen",
        path: "M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z",
      };
    } else {
      return {
        status: "notChosen",
        path: "m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z",
      };
    }
  };

  return (
    <tr key={_id}>
      <td key={_id + " name"}>{name}</td>
      <td key={_id + " qualities"}>
        {qualities.map((quality) => (
          <Qualitiy key={_id + " quality" + Math.random()} {...quality} />
        ))}
      </td>
      <td key={profession.id + " profession"}>{profession.name}</td>
      <td key={_id + " completed meetings"}>{completedMeetings}</td>
      <td key={_id + " rate"}>{rate}/5</td>
      <td key={_id + " bookmark"}>
        <Bookmark status="Chosen" onChange={showAlter} />
      </td>
      <td key={_id + " deleteButtonElement"}>
        <button
          key={_id + " delete button"}
          onClick={() => onDelete(_id)}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;