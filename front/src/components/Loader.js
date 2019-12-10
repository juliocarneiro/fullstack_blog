import React from "react";

const Loader = props => {
  return (
    <div className="load animated fadeIn">
      <div
        id="loader"
        style={{
          border: `10px solid ${props.color}`,
          borderTop: "10px solid white"
        }}
      ></div>
      <p>{props.title}</p>
    </div>
  );
};

export default Loader;
