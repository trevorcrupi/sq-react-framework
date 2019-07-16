import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {runWithAdal } from 'react-adal';
import { authContext } from './config/adal';

// THIS IS ONLY FOR THE DEMO APP
import 'bootstrap/dist/css/bootstrap.css';

const DO_NOT_LOGIN = false;

runWithAdal(authContext, () => {
  ReactDOM.render(<App context={authContext} />, document.getElementById('root'));
}, DO_NOT_LOGIN);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
