import React from 'react';
import { StateProvider } from 'state';
import Navigation from './components/layout/Navigation';
import 'assets/custom-styles.css';

import { Model } from 'lib/framework/context';
import { useModel } from 'lib/framework/hooks';
import { Auth } from 'lib/models';

function App(props) {
  const { auth, dispatch } = useModel('Auth', new Auth({
    oid: props.context._user.profile.oid,
    userName: props.context._user.userName,
    name: props.context._user.profile.name
  }).create());

  return (
    <StateProvider>
      <Model.Provider value={dispatch}>
        <div className='App'>
          <Navigation user={auth} />
        </div>
      </Model.Provider>
    </StateProvider>
  );
}

export default App;
