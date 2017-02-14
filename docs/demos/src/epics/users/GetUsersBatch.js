import * as ActionTypes from "../../actions/types";
import { receivedUsersBatch, setFetchingUsersStatus } from "../../actions";

export default function getUsersBatch(action$) {
  return action$.ofType(ActionTypes.GET_USERS_BATCH)
    .delay(1000).mergeMap(action =>
      fetch(`https://api.github.com/users?since=${action.payload.lastUserId}`)
        .then(response => {
          return response.json();
        })
        .then(users => {
          return users.reduce((acc, user) => {
            const randNum = Math.round(Math.random() * 10) + 1;

            acc.push({
              id: user.id,
              avatar_url: user.avatar_url,
              login: user.login,
              numSpaceEaters: randNum
            });

            return acc;
          }, []);
        })
    )
    .flatMap(users => ([receivedUsersBatch(users), setFetchingUsersStatus(false)]));
};