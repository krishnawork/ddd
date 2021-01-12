import React from "react";

export const Adduseremail = (email) => {
  return {
    type: "ADD_EMAIL",
    payload: {
      email: email,
    },
  };
};
