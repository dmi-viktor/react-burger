import { createAction } from '@reduxjs/toolkit';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';

export const wsConnect = createAction<string, typeof WS_CONNECTION_START>(WS_CONNECTION_START);
export const wsOpen = createAction(WS_CONNECTION_SUCCESS);
export const wsClose = createAction(WS_CONNECTION_CLOSED);
export const wsMessage = createAction<any, typeof WS_GET_MESSAGE>(WS_GET_MESSAGE);
export const wsError = createAction<string, typeof WS_CONNECTION_ERROR>(WS_CONNECTION_ERROR);