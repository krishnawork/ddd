import { combineReducers } from "redux";
let email = "";
const UserEmail = (Email = email, action) => {
  if (action.type === "ADD_EMAIL") {
    return action.payload.email;
  }
  return Email;
};

export default combineReducers({
  user_email: UserEmail,
});
