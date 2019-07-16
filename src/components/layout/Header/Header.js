import React, { useState, Fragment, useContext } from 'react';
import { Link } from '@reach/router';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

// To delete the user
import { Model } from 'lib/framework/context';


export const Header = React.memo(props => {
  let name = '...';
  let logout = (<Fragment />);
  const dispatch = useContext(Model);
  let [ collapsed, setCollapsed ] = useState(true);

  if(props.user) {
    name = props.user.get('name');
    logout = (
      <Link to='#'>Logout</Link>
    );
  }

  async function onLogout(user) {
    dispatch(await user.logout());
    props.navigate('/');
  }

  return (
    <div>
      <Navbar color="black" light>
        <NavbarBrand href="#" className="mr-auto">
            My Movies
        </NavbarBrand>
        <NavbarToggler onClick={() => setCollapsed(!collapsed)} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link to='/'>Home</Link>
            </NavItem>
            <NavItem>
              <Link to='/about'>About</Link>
            </NavItem>
            <NavItem>
              Hello, {name}!
            </NavItem>
            <NavItem onClick={ () => {onLogout(props.user)} }>
              {logout}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
});
