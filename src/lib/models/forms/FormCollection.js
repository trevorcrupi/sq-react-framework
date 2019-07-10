// import { objIndexOf } from 'sq-utils';
import React, { useState, useEffect } from 'react';
import { getForms } from './api';
import Storage from 'state/Storage';
import { useStateValue } from 'state';
import * as types from './types';

class FormCollection extends Array {
  constructor(name, ...items) {
    super(...items);
    this.name = name;
  }

  init = async needsRefresh => {
    const [{ forms }, dispatch] = useStateValue();

    try {
      if (!needsRefresh) {
        // get state
        if (typeof forms !== 'undefined' && typeof forms.formsList !== 'undefined') {
          return forms.formsList;
        }

        // get from storage
        //
        // should compare these values. if different,
        // update state from storage.
      }
      const response = getForms(1);
      let formsList = [];

      if (typeof response !== 'undefined' && typeof response.data !== 'undefined') {
        formsList = response.data;
      }

      // update state and storage.
      dispatch({
        type: types.GET_FORMS,
        forms: formsList
      });

      Storage.set('forms', formsList);

      // return value
      return formsList;
    } catch (err) {
      console.log(err);
    }
  };

  save = async () => {
    try {
      // update state
      // update storage
      // update db
    } catch (err) {
      console.log(err);
    }
  };

  add = async form => {
    this.push(form);
  };

  remove = async id => {
    try {
      // this will filter to an array of one. need to get the object.
      // const form = await this.filter(x => x.id === id);
      // const index = objIndexOf(this, form);
      // if (index > -1) this.splice(index, 1);
    } catch (err) {
      console.log(err);
    }
  };

  replace = async form => {
    try {
      await this.remove(form.id);
      await this.add(form);
    } catch (err) {
      console.log(err);
    }
  };
}

export default FormCollection;
