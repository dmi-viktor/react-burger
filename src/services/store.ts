import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from 'redux-thunk'

import { rootReducer } from './reducers/index';
import { socketMiddleware } from './middleware/socketMiddleware'

import {
    wsConnect as LiveTableWsConnect,
    wsOpen as LiveTableWsOpen,
    wsClose as LiveTableWsClose,
    wsMessage as LiveTableWsNessage,
    wsError as LiveTableWsError
} from "./actions/wsOrderFeedTypes";

import {
    wsConnect as LiveTableWsConnect2,
    wsOpen as LiveTableWsOpen2,
    wsClose as LiveTableWsClose2,
    wsMessage as LiveTableWsNessage2,
    wsError as LiveTableWsError2
} from "./actions/wsOrderHistoryTypes";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsActions = {
    wsConnect: LiveTableWsConnect,
    onOpen: LiveTableWsOpen,
    onClose: LiveTableWsClose,
    onError: LiveTableWsError,
    onMessage: LiveTableWsNessage,
};

const wsActions2 = {
    wsConnect: LiveTableWsConnect2,
    onOpen: LiveTableWsOpen2,
    onClose: LiveTableWsClose2,
    onError: LiveTableWsError2,
    onMessage: LiveTableWsNessage2,
};

const enhancer = composeEnhancers(applyMiddleware(
    thunkMiddleware,
    socketMiddleware(wsActions),
    socketMiddleware(wsActions2)
));

export const store = createStore(
    rootReducer,
    enhancer
);
