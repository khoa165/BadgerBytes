import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import {
  Container,
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Collapse,
} from 'reactstrap';
import '../../styles/NavigationBar.scss';

const NavigationBar = ({
  icon,
  title,
  auth: { isAuthenticated, loading, user },
  logout,
}) => {
  const authLinks = (
    <Fragment>
      <NavItem>
        <Link to='/account' className='nav-link'>
          <i className='fas fa-user mr-1' />
          Account
        </Link>
      </NavItem>
      <NavItem>
        <Link to='/menu' className='nav-link'>
          <i className='fas fa-hamburger mr-1' />
          Menu
        </Link>
      </NavItem>
      {user && (user.admin || user.staff) ? (
        <NavItem>
          <Link to='/dashboard' className='nav-link'>
            <i className='fas fa-chart-line mr-1' />
            Dashboard
          </Link>
        </NavItem>
      ) : (
        <NavItem>
          <Link to='/cart' className='nav-link'>
            <i className='fas fa-shopping-cart mr-1' />
            Checkout
          </Link>
        </NavItem>
      )}
      <NavItem>
        <Link to='#!' className='nav-link' onClick={logout}>
          <i className='fas fa-sign-out-alt mr-1' />
          Logout
        </Link>
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <Link to='/register' className='nav-link'>
          Register
        </Link>
      </NavItem>
      <NavItem>
        <Link to='/login' className='nav-link'>
          Login
        </Link>
      </NavItem>
    </Fragment>
  );

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar dark expand='md' id='navbar'>
      <Container>
        <NavbarBrand tag={Link} to={'/'}>
          <i className={`${icon} mr-1`} /> {title}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.defaultProps = {
  title: 'Badger Bytes',
  icon: 'fas fa-utensils',
};

NavigationBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavigationBar);
