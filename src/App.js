import React from 'react';
import { StateProvider } from 'state';
import Navigation from './components/layout/Navigation';
import 'assets/custom-styles.css';

import { Model } from 'lib/framework/context';
import { useModel } from 'lib/hooks';
import { User } from 'lib/models';

function App() {
  const { user, dispatch } = useModel('User', new User({
    email: 'tcrupi@purdue.edu',
    name: 'Trevor Crupi'
  }).read({
    table: 'user'
  }));

  return (
    <StateProvider>
      <Model.Provider value={dispatch}>
        <div className='App'>
          <Navigation user={user} />
        </div>
      </Model.Provider>
    </StateProvider>
  );
}

export default App;
