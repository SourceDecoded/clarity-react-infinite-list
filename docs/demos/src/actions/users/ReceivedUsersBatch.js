import * as ActionTypes from "../types";

export default function receivedUsersBatch(users) {
  return {
    type: ActionTypes.RECEIVED_USERS_BATCH,
    payload: {
        users
    }
  };
};