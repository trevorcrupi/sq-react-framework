import React, { Fragment, memo } from 'react';
import { useModel } from 'lib/hooks';
import { User } from 'lib/models';
import { UserDataTable, PostsTable } from 'components/tables';

export const Home = memo(props => {
  // Access to full user model!!!
  const { user } = useModel('User', new User({
    email: 'tcrupi@purdue.edu',
    name: 'Trevor Crupi'
  }).create());

  return (
    <Fragment>
      <h3>Home page</h3>
      <UserDataTable user={user} />
      <PostsTable />
    </Fragment>
  );
});