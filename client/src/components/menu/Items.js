import React from 'react';
import Item from './Item';

const Items = ({ items }) => {
  return (
    <div className='card-columns'>
      {items.map((item, k) => (
        <Item key={k} item={item} />
      ))}
    </div>
  );
};

export default Items;
