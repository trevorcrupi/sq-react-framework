import React, { Fragment, memo } from 'react';
import { UserDataTable, PostsTable } from 'components/tables';

export const Home = memo(props => {
  return (
    <Fragment>
      <h3>Home page</h3>
      <UserDataTable user={props.user} />
      <PostsTable user={props.user} />
    </Fragment>
  );
});