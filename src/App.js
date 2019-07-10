import React from 'react';
import { StateProvider } from 'state';
import Navigation from './components/layout/Navigation';
import 'assets/custom-styles.css';

function App() {
  const initialState = {
    demo: {
      demoList: [],
      value: 0
    }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeValue':
        return {
          ...state,
          value: action.value
        };

      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className='App'>
        <Navigation />
      </div>
    </StateProvider>
  );
}

export default App;
