import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { RootState } from '../../utils/types';

export type TwsActionTypes = {
    wsConnect: ActionCreatorWithPayload<any>,
    wsSendMessage?: ActionCreatorWithPayload<any>,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<any>,
}

export const socketMiddleware = (wsActions: TwsActionTypes): Middleware => {
    return (store) => {
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = '';

        return next => action => {
            const { dispatch } = store;
            const { wsConnect, wsSendMessage, onOpen,
                onClose, onError, onMessage } = wsActions;

            if (wsConnect.match(action)) {                
                url = action.payload;
                socket = new WebSocket(url);
                isConnected = true;
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(onOpen());
                };

                socket.onerror = err => {                    
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(onMessage(parsedData));
                };

                socket.onclose = event => {
                    if (event.code !== 1000) {                    
                        dispatch(onError(event.code.toString()));
                    }
                    dispatch(onClose());

                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(wsConnect(url));
                        }, 3000)
                    }
                };

                if (wsSendMessage && wsSendMessage.match(action)) {                    
                    socket.send(JSON.stringify(action.payload));
                }
            }

            next(action);
        };
    };
};