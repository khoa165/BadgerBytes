import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Orders from './Orders';
import { getUnfinishedOrders, updateStatusPrior } from '../../actions/orders';
import '../../styles/Dashboard.scss';

const Dashboard = ({
  getUnfinishedOrders,
  updateStatusPrior,
  auth: { user },
  order: { currentOrders, loading },
}) => {
  useEffect(() => {
    getUnfinishedOrders();
  }, []);

  return (
    <div id='dashboard'>
      <h1 className='text-danger display-4'>Welcome {user && user.name}</h1>
      <Orders
        loading={loading}
        orders={currentOrders}
        update={updateStatusPrior}
      />
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  getUnfinishedOrders: PropTypes.func.isRequired,
  updateStatusPrior: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order,
});

const mapFunctionToProps = {
  getUnfinishedOrders,
  updateStatusPrior,
};

export default connect(mapStateToProps, mapFunctionToProps)(Dashboard);
