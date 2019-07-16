import { initialState } from 'state/initialState';

const dataReducer = (state, action) => {
    let newState = {};
    if(action.type.includes('model')) {
        const type = action.type.split('.');
        const model = type[1];
        switch(type[2]) {
            case 'create':
                newState = { ...state };
                newState[model] = action.value;
                return newState;
            case 'read':
                newState = { ...state };
                newState[model] = action.value;
                return newState;
            case 'update':
                newState = { ...state };
                newState[model] = action.value;
                return newState;
            case 'delete':
                newState = { ...state };
                newState[model] = action.value;
                return newState;
            default:
                throw new Error(JSON.stringify(action));
        }
    }
}

export { dataReducer, initialState };
