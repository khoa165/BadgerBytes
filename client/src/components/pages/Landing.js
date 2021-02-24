import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/Landing.scss';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/menu' />;
  }

  return (
    <div id='landing-page'>
      <div className='overlay'>
        <div className='content'>
          <h1>Badger Bytes</h1>
          <p>
            <i>
              Order and have your food ready within 30 minutes for pickup /
              delivery.
            </i>
          </p>
          <div>
            <Link to='/register' className='btn btn-outline-info mr-2'>
              SIGN UP
            </Link>
            <Link to='/login' className='btn btn-outline-light ml-2'>
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
