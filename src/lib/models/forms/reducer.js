import { initialState } from './data';
import { GET_FORMS, CREATE_FORM } from './types';

const formReducer = (state = initialState.forms, action) => {
  switch (action.type) {
    case GET_FORMS:
      return {
        ...state,
        formsList: action.formsList
      };
    case CREATE_FORM:
      return {
        ...state,
        formsList: action.formsList
      };
    default:
      return state;
  }
};

export default formReducer;
