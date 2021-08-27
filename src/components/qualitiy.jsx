import React from "react";

const Qualitiy = ({ color, name, _id }) => {
  return (
    <span key={"quality" + _id} className={"m-1 badge bg-" + color}>
      {name}
    </span>
  );
};

export default Qualitiy;
