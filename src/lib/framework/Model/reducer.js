import { User, Post } from 'lib/models';

const initialState = {
    User: new User({
        id: 0,
        email: '',
        name: ''
    }),
    Post: new Post({
        id: '',
        title: '',
        author: 0,
        date: '',
        text: ''
    })
};

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
            default:
                throw new Error(JSON.stringify(action));
        }
    }
}

export { dataReducer, initialState };