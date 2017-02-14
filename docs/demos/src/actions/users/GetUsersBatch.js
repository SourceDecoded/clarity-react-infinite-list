import * as ActionTypes from "../types";

export default function getUsersBatch(lastUserId) {
  return {
    type: ActionTypes.GET_USERS_BATCH,
    payload: {
      lastUserId
    }
  };
};