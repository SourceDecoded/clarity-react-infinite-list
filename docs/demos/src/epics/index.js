import { combineEpics } from "redux-observable";
import getUsersBatch from "./users/GetUsersBatch";

export default combineEpics(
    getUsersBatch
);