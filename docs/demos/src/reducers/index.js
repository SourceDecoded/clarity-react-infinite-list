import { combineReducers } from "redux";
import users from "./users/Users";
import isFetchingUsers from "./users/IsFetchingUsers";

export default combineReducers({
    users,
    isFetchingUsers
});