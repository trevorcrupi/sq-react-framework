import { useReducer } from 'react';
import { dataReducer, initialState } from 'lib/framework/Model/reducer';

export default function useModel() {
    return useReducer(dataReducer, initialState);
}