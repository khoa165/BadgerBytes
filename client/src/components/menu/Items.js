import React from 'react';
import Item from './Item';

const Items = ({ items }) => {
  return (
    <div class='card-columns'>
      {items.map((item, k) => (
        <Item key={k} item={item} />
      ))}
    </div>
  );
};

export default Items;
