import React, { Fragment, memo } from 'react';
import { Link } from '@reach/router';
import { Jumbotron, Button } from 'reactstrap';


import { useModel } from 'lib/framework/hooks';
import { Init } from 'lib/framework/Init';

import { PopularMovieTable } from 'components/tables';

export const Home = memo(props => {
  const query = {
    table: 'init',
    query: {
      id: '1'
    }
  };
  const { init } = useModel('Init', new Init({}).read(query));

  return (
    <Fragment>
      <Jumbotron>
        <h1 className="display-3">Home Page</h1>
        <p className="lead">This is the demo app homepage for the SQ React Framework, based on hooks and context.</p>
        <hr className="my-2" />
        <p>{init.text}</p>
        <p className="lead">
          <Link to='/about'>
            <Button color="primary">About</Button>
          </Link>
        </p>
      </Jumbotron>
      <PopularMovieTable />
    </Fragment>
  );
});
