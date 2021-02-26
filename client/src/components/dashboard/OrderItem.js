import React from 'react';

const OrderItem = ({
  item: {
    quantity,
    id: { item_name, item_cost },
  },
}) => {
  return (
    <div className='order-item'>
      <p>
        x{quantity} {item_name}
      </p>
      <p>${(quantity * item_cost).toFixed(2)}</p>
    </div>
  );
};

export default OrderItem;
