import React from 'react';
import Item from './Item';

const Items = ({ items, user }) => {
  return (
    <div className='card-columns'>
      {items.map((item, k) => (
        <Item key={k} item={item} user={user} />
      ))}
    </div>
  );
};

export default Items;
