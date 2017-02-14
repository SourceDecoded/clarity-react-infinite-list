import * as ActionTypes from "../../actions/types";

export default function isFetchingUsers(state = false, action) {
    if (action.type === ActionTypes.SET_FETCHING_USERS_STATUS) {
        return action.payload.isFetchingUsers;
    } else {
        return state;
    }
};