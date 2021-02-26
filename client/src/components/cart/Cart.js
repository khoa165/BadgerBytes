import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux'
import {Container,Row,Col,Button} from 'reactstrap'
import CartItem from './CartItem'
import { withRouter } from 'react-router-dom';
import { getCart } from '../../actions/cart';
import OrderForm from './OrderForm'




const Cart = ({
    history,
    getCart,
    auth:{user},
    item:{loading,menuItems},
    cart,
    order
}) => {

    const [confirmOrder,setConfirmOrder] = useState(false)

    useEffect(() => {
        getCart();
        getTotal();
    
        // eslint-disable-next-line
      }, []);

    const getTotal = () => {
        let total =0;
        cart.map((eachItem)=>(
            total = total + eachItem.price
        ))
        return total.toFixed(2);
    }

    const paymentForm = () =>{
        if(confirmOrder)
            return (<Container className="mt-2"><Row className="justify-content-center"><Col xs={8}><OrderForm></OrderForm></Col></Row></Container>)
    }

    const confirmButton = () => {
        if(confirmOrder===false){
            return(<Button color="success" onClick={()=>setConfirmOrder(true)}>Confirm order</Button>)
            
        }
    }




    return (
        <div>
            {user && user.admin ? (
        <div className='admin-welcome mb-5'>
          <h1 className='text-danger m-0'>Welcome {user.name},</h1>
          <Button color='danger' onClick={() => history.push('/items/new')}>
            Add new Item
          </Button>
        </div>
      ) : (
        <h1 className='text-danger mb-5'>Welcome {user && user.name}</h1>
      )}
            <Container className="border border-2 shadow pb-4">
                <Row>
                    <Col><h2 class="text-center mt-2 ">Your Cart</h2></Col>
                </Row>
                <Row className="text-center mt-4 justify-content-center">
                    <Col xs={5} className="border-bottom mr-5"><h3>Item</h3></Col>
                    <Col xs={2} className="border-bottom mx-2 "><h3>Quantity</h3></Col>
                    <Col xs={2} className="border-bottom mx-2"><h3>Price</h3></Col>
                </Row>
                
                    {cart.map((eachItem)=>(
                        <CartItem key={eachItem} item={eachItem}></CartItem>
                    ))}
                <Row className="justify-content-center">
                    <h3 class="mx-2">Total: ${getTotal()}</h3>
                </Row>
                
            </Container>
            <Container className="mt-2">
                <Row className="justify-content-end">{confirmButton()}</Row>
                
            </Container>
            
            {paymentForm()}
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    item: state.item,
    cart: state.cart.cart,
    order: state.order,
    
})

Cart.propTypes={
    setEditedItem: PropTypes.func.isRequired,
};

const mapFunctionsToProps = {
    getCart,
};



export default connect(mapStateToProps, mapFunctionsToProps)(withRouter(Cart));
