import React from 'react';
import OrderItem from './OrderItem';

const OrderItems = ({ items, total }) => {
  return (
    <div className='order-items'>
      {items.map((item, k) => (
        <OrderItem key={k} item={item} />
      ))}
      <hr />
      <div className='order-total'>
        <p>Total</p>
        <p>${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderItems;
