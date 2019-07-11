import React, { createContext, useContext, useReducer } from 'react';
import * as initialState from './initialState';
// import { mainReducer } from './mainReducer';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>;

export const useStateValue = () => useContext(StateContext);

// TODO: create a single reducer object
export { initialState };
