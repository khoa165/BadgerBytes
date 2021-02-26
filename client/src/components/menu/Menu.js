import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getMenuItems } from '../../actions/item';
import Items from './Items';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import '../../styles/Menu.scss';

const Menu = ({
  history,
  getMenuItems,
  auth: { user },
  item: { loading, menuItems },
}) => {
  useEffect(() => {
    getMenuItems();

    // eslint-disable-next-line
  }, []);

  return loading || menuItems === null || user === null ? (
    <Spinner />
  ) : (
    <div id='menu'>
      {user && user.admin ? (
        <div className='admin-welcome mb-5'>
          <h1 className='text-danger m-0'>Welcome {user.name}</h1>
          <Button color='danger' onClick={() => history.push('/items/new')}>
            Add new Item
          </Button>
          
        </div>
      ) : (
        <h1 className='text-danger mb-5'>Welcome {user && user.name}</h1>
      )}
      <Items items={menuItems} user={user} />
    </div>
  );
};

Menu.propTypes = {
  getMenuItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  item: state.item,
});

const mapFunctionsToProps = {
  getMenuItems,

};

export default connect(mapStateToProps, mapFunctionsToProps)(withRouter(Menu));
