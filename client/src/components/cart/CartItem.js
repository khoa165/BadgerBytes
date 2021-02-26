import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

const CartItem = (item) => {
  const { quantity, name, price } = item.item;

  return (
    <Row className='justify-content-center '>
      <Col xs={5} className=' mr-5 mt-2 text-center'>
        {' '}
        <p>{name}</p>
      </Col>
      <Col xs={2} className=' mx-2 mt-2 '>
        <Row className='justify-content-center'>
          <p class='mr-2'>{quantity}</p>
        </Row>
      </Col>
      <Col xs={2} className=' mx-2 mt-2 text-center'>
        <p>${price.toFixed(2)}</p>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({});

const mapFunctionToProps = {};

export default connect(mapStateToProps, mapFunctionToProps)(CartItem);
