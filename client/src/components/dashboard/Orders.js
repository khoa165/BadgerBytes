import React from 'react';
import Order from './Order';
import Spinner from '../layout/Spinner';

const Orders = ({ orders, loading, update }) => {
  return loading ? (
    <Spinner />
  ) : (
    <div>
      {orders.map((order, k) => (
        <Order order={order} key={k} update={update} />
      ))}
    </div>
  );
};

export default Orders;
