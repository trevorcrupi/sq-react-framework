import { useState } from 'react';

export default function useForm(defaults, callback) {
    let [ inputs, setInputs ] = useState(defaults);

    let handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }
      callback(inputs);
    }

    let handleInputChange = (event) => {
      event.persist();
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }

    return {
      handleSubmit,
      handleInputChange,
      inputs
    };
  }