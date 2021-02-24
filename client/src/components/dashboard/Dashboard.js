import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Menu from '../menu/Menu';

const Dashboard = ({ auth: { user } }) => {
  return (
    <Fragment>
      <h1 className='text-danger display-4'>Welcome {user && user.name}</h1>
      <Menu />
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
