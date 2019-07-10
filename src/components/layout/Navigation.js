import React from 'react';
import { Router, Link } from '@reach/router';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { AddPost, ReadPost } from '../pages/Post';

const Navigation = ({ children }) => (
  <div>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>
          About
        </Link>
      </li>
      <li>
        <Link to='/add'>
          Add a Post
        </Link>
      </li>
    </ul>
    <Router>
      <Home path='/' />
      <About path='/about' />
      <AddPost path='/add' />
      <ReadPost path='/post/:id' />
    </Router>
  </div>
);

export default Navigation;
