import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import rootReducer from "./reducers";
import rootEpic from "./epics";

const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(
                epicMiddleware
            )
        )
    );
    return store;
};