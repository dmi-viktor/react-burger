import { createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'WS_CONNECTION_START'>('WS_CONNECTION_START');
export const wsOpen = createAction('WS_CONNECTION_SUCCESS');
export const wsClose = createAction('WS_CONNECTION_CLOSED');
export const wsMessage = createAction<any, 'WS_GET_MESSAGE'>('WS_GET_MESSAGE');
export const wsError = createAction<string, 'WS_CONNECTION_ERROR'>('WS_CONNECTION_ERROR');