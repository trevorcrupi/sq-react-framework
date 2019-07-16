import React from 'react';
import { Router, navigate } from '@reach/router';
import { Header } from './Header';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { ReadMovie } from '../pages/Movie/ReadMovie';

const Navigation = (props, { children }) => (
  <div>
    <Header navigate={navigate} user={props.user} />
    <Router>
      <Home path='/' />
      <About path='/about' />
      <ReadMovie path='movie/:id' />
    </Router>
  </div>
);

export default Navigation;
