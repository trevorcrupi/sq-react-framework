import { useReducer, useEffect } from 'react';
import { dataReducer, initialState } from 'lib/framework/Model/reducer';
import { DynamicWorkerQueue } from 'lib/framework/DynamicWorkerQueue';

export default function useModel(model, modelCallback) {
    const [ state, dispatch ] = useReducer(dataReducer, initialState);
    let modelObjectPayload = {};

    // dispatch the callback given
    useEffect(() => {
        dispatch(modelCallback);
        // dispatch the DynamicWorkerQueue
        if(modelCallback['value'].worker && modelCallback['value'].worker.callback) {
          dispatch(new DynamicWorkerQueue({
              every: false,
              action: modelCallback.type,
              workerCallback: modelCallback['value'].worker.callback,
              plugins: modelCallback['value'].worker.plugins,
              workerModel: model,
              priority: 0
          }).create());
        }

        return () => {
            console.log('Cleaned up.');
        }
    }, []);

    modelObjectPayload[model.charAt(0).toLowerCase() + model.slice(1)] = state[model];
    modelObjectPayload.state    = state;
    modelObjectPayload.dispatch = dispatch;
    return modelObjectPayload;
}
