import * as types from './types';

export const getForms = userId => {
  return {
    type: types.GET_FORMS,
    userId
  };
};

export const createForm = form => {
  return {
    type: types.CREATE_FORM,
    form
  };
};

export const updateTestValue = value => {
  return {
    type: 'changeValue',
    value
  };
};
