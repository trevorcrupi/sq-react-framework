import React, { Fragment, memo } from 'react';
import { Jumbotron } from 'reactstrap';


export const About = memo(props => {
  return (
    <Fragment>
      <Jumbotron>
        <h1 className="display-3">About Page</h1>
        <p className="lead">This is the demo app about page for the SQ React Framework, based on hooks and context.</p>
        <hr className="my-2" />
      </Jumbotron>
    </Fragment>
  );
});
