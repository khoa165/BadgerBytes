import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Orders from './Orders';
import { getUnfinishedOrders } from '../../actions/orders';

const Dashboard = ({
  getUnfinishedOrders,
  auth: { user },
  order: { currentOrders, loading },
}) => {
  useEffect(() => {
    getUnfinishedOrders();
  }, []);

  return (
    <Fragment>
      <h1 className='text-danger display-4'>Welcome {user && user.name}</h1>
      <Orders loading={loading} orders={currentOrders} />
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  getUnfinishedOrders: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order,
});

const mapFunctionToProps = {
  getUnfinishedOrders,
};

export default connect(mapStateToProps, mapFunctionToProps)(Dashboard);
