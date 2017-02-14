import * as ActionTypes from "../../actions/types";

export default function users(state = [], action) {
    if (action.type === ActionTypes.RECEIVED_USERS_BATCH) {
        return action.payload.users;
    } else {
        return state;
    }
};