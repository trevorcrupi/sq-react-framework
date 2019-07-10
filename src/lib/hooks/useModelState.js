import { useReducer } from 'react';
import { dataReducer, initialState } from 'lib/framework/Model/reducer';

export default function useModelState(model) {
    const [ state ] = useReducer(dataReducer, initialState);
    return state[model];
}