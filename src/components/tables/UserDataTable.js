import React, { Fragment, useState } from 'react';

export const UserDataTable = props => {
  let [counter, setCounter] = useState(0);
  // Access to full user model!!!

  if(!props.user) {
    return <div>Loading...</div>;
  }

  if(counter < 0) {
    alert('No going below zero!');
    setCounter(0);
  }

  return (
    <Fragment>
      <p>This is an example of using state without needing models at all.</p>
      <button onClick={() => setCounter(counter+1)}>+</button>
      <button onClick={() => setCounter(counter-1)}>-</button>
      <br /><br />
      {counter}
      <ul>
        <li>Name: {props.user.getName()}</li>
        <li>Email: {props.user.getEmail()}</li>
      </ul>
      <hr />
    </Fragment>
  );
};