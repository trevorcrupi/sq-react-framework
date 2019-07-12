import { useReducer, useEffect } from 'react';
import { dataReducer, initialState } from 'lib/framework/Model/reducer';
import { DynamicWorker } from 'lib/framework/DynamicWorker';

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

    // Gotta check everything...
    if(state[model] && state[model].worker && state[model].worker.callback) {
        dispatch(new DynamicWorker({
            workerCallback: state[model].worker.callback,
            plugins: state[model].worker.plugins,
            workerModel: state[model],
            priority: 0 
        }).create());
    }

    modelObjectPayload[model.charAt(0).toLowerCase() + model.slice(1)] = state[model];
    modelObjectPayload.state    = state;
    modelObjectPayload.dispatch = dispatch;
    return modelObjectPayload;
}
