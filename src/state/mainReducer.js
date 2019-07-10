import formReducer from 'lib/models/forms/reducer';

export const mainReducer = ({ forms }, action) => ({
  forms: formReducer(forms, action)
});
