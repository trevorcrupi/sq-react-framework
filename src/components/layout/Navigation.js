import React from 'react';
import { Router, Link, navigate } from '@reach/router';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { AddPost, ReadPost, EditPost } from '../pages/Post';

const Navigation = (props, { children }) => (
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
        <Link to='/post/add'>
          Add a Post
        </Link>
      </li>
    </ul>
    <Router>
      <Home path='/' user={props.user} />
      <About path='/about' user={props.user} />
      <AddPost path='/post/add' user={props.user} navigate={navigate} />
      <ReadPost path='/post/:id' user={props.user} />
      <EditPost path='/post/edit/:id' user={props.user} navigate={navigate} />
    </Router>
  </div>
);

export default Navigation;
