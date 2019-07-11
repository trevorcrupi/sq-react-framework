import { useReducer, useEffect } from 'react';
import { dataReducer, initialState } from 'lib/framework/Model/reducer';

export default function useModel(model, modelCallback) {
    const [ state, dispatch ] = useReducer(dataReducer, initialState);
    let modelObjectPayload = {};

    // dispatch the callback given
    useEffect(() => {
        dispatch(modelCallback);

        return () => {
            console.log('Cleaned up.');
        }
    }, []);

    modelObjectPayload[model.charAt(0).toLowerCase() + model.slice(1)] = state[model];
    modelObjectPayload.state    = state;
    modelObjectPayload.dispatch = dispatch;
    return modelObjectPayload;
}
