import axios from "axios";
import React from "react";

const header = () => {
  const h = new Headers();
  h.append("Conten-Type", "application/json");
  const session = JSON.parse(sessionStorage.getItem("user"));
  if (session && session != null) {
    h.append(session);
  }
  return h;
};

