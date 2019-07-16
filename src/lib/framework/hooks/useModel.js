import { useReducer, useEffect } from 'react';
import { dataReducer, initialState } from 'lib/framework/Model/reducer';
import { DynamicWorkerQueue } from 'lib/framework/DynamicWorkerQueue';

export default function useModel(model, modelCallback) {
    const [ state, dispatch ] = useReducer(dataReducer, initialState);
    let modelObjectPayload = {};

    // dispatch the callback given
    // Im disabling es-lint here because of that fucking dependency error... whenever I add the dependencies there is an infinite loop!
    /* eslint-disable */
    useEffect(() => {
        async function dispatchAsyncAction(model, modelCallback) {
          const action = await modelCallback;
          dispatch(action);
          // dispatch the DynamicWorkerQueue
          if(action['value'].worker && action['value'].worker.callback) {
            dispatch(new DynamicWorkerQueue({
                every: false,
                action: action.type,
                workerCallback: action['value'].worker.callback,
                plugins: action['value'].worker.plugins,
                workerModel: model,
                priority: 0
            }).create());
          }
        }

        dispatchAsyncAction(model, modelCallback);
        return () => {
            console.log('Cleaned up.');
        }
    }, []);
    /* eslint-enable */

    modelObjectPayload[model.charAt(0).toLowerCase() + model.slice(1)] = state[model];
    modelObjectPayload.state    = state;
    modelObjectPayload.dispatch = dispatch;
    return modelObjectPayload;
}
