import { createReducer } from '@reduxjs/toolkit'
import { wsOpen, wsClose, wsMessage, wsError } from "../actions/wsOrderHistoryTypes";
import type { TOrders } from '../../utils/types';

type TWSState = {
    wsConnected: boolean;
    error?: String;
    data?: TOrders;
};

export const initialState: TWSState = {
    wsConnected: false    
}; 

export const wsOrderHistoryReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsOpen, (state) => {
            state.error = undefined;
            state.wsConnected = true;
        })
        .addCase(wsClose, (state) => {
            state.error = undefined;
            state.wsConnected = false;
        })
        .addCase(wsError, (state, action) => {
            state.error = action.payload;
            state.wsConnected = false;
        })
        .addCase(wsMessage, (state, action) => {
            state.error = undefined;
            state.data = action.payload;
        })
})