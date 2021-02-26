import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import CartItem from './CartItem';
import { getCart, emptyCart } from '../../actions/cart';
import OrderForm from './OrderForm';

const Cart = ({ getCart, emptyCart, auth: { user }, cart }) => {
  const [confirmOrder, setConfirmOrder] = useState(false);

  useEffect(() => {
    getCart();
    getTotal();

    // eslint-disable-next-line
  }, []);

  const getTotal = () => {
    let total = 0;
    cart.map((eachItem) => (total = total + eachItem.price));
    return total.toFixed(2);
  };

  const paymentForm = () => {
    if (confirmOrder)
      return (
        <Container className='mt-2'>
          <Row className='justify-content-center'>
            <Col xs={8}>
              <OrderForm></OrderForm>
            </Col>
          </Row>
        </Container>
      );
  };

  const confirmButton = () => {
    if (confirmOrder === false) {
      return (
        <Button color='success' onClick={() => setConfirmOrder(true)}>
          Confirm order
        </Button>
      );
    }
  };

  return (
    <div>
      <h1 className='text-danger mb-5'>Welcome {user && user.name}</h1>
      <Container className='border border-2 shadow pb-4'>
        <Row>
          <Col>
            <h2 class='text-danger text-uppercase text-center mt-2 '>
              My Cart
            </h2>
            <h4 class='text-info text-center mt-2 '>
              {cart &&
                cart.length === 0 &&
                'No items in cart. Return to menu to add items!'}
            </h4>
          </Col>
        </Row>
        <Row className='text-center mt-4 justify-content-center'>
          <Col xs={5} className='border-bottom mr-5'>
            <h3>Item</h3>
          </Col>
          <Col xs={2} className='border-bottom mx-2 '>
            <h3>Quantity</h3>
          </Col>
          <Col xs={2} className='border-bottom mx-2'>
            <h3>Price</h3>
          </Col>
        </Row>

        {cart.map((eachItem) => (
          <CartItem key={eachItem} item={eachItem}></CartItem>
        ))}
        <Row className='justify-content-center'>
          <h3 class='mx-2 mt-4'>Total: ${getTotal()}</h3>
        </Row>
      </Container>
      {cart && cart.length > 0 && (
        <Container className='mt-3'>
          <Row className='justify-content-end'>
            <Button onClick={emptyCart} color='danger' className='mr-3 px-4'>
              Empty cart
            </Button>
            {confirmButton()}
          </Row>
        </Container>
      )}

      {paymentForm()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart.cart,
});

Cart.propTypes = {
  setEditedItem: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired,
  getCart: PropTypes.func.isRequired,
};

const mapFunctionsToProps = {
  getCart,
  emptyCart,
};

export default connect(mapStateToProps, mapFunctionsToProps)(Cart);
