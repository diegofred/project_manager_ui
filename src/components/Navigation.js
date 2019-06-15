import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to={"/"}>My Projects</Link>
      <Link to={"/new"}>New Project</Link>
    </nav>
  );
};

export default Navigation;
