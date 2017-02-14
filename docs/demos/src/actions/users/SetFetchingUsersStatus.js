import * as ActionTypes from "../types";

export default function setFetchingUsersStatus(isFetchingUsers) {
  return {
    type: ActionTypes.SET_FETCHING_USERS_STATUS,
    payload: {
        isFetchingUsers
    }
  };
};