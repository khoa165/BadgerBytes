import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import {Container,Row,Col} from 'reactstrap'
import CartItem from '../cart/CartItem'
import Info from './Info'
import PaymentOption from './PaymentOption'




export const Payment = ({history,
    getCart,
    auth:{user},
    item:{loading,menuItems},
    cart,location}) => {
        
        useEffect(() => {
            if(cart === null || cart === undefined || cart.length === 0) {
                history.push('/cart');
            }
            getTotal();
        
            // eslint-disable-next-line
          }, []);

    const getTotal = () => {
        let total =0;
        cart.map((eachItem)=>(
            total = total + eachItem.price
        ))
        console.log("total",total)
        return total.toFixed(2);
    }



    return (
        
            <div>
            {user && user.admin ? (
        <div className='admin-welcome mb-5'>
          <h1 className='text-danger m-0'>Welcome {user.name},</h1>

        </div>
      ) : (
        <h1 className='text-danger mb-5'>Welcome {user && user.name}</h1>
      )}
      
            <Container className="border border-2 shadow pb-4">
                <Row>
                    <Col><h2 className="text-center mt-2 ">Your Cart</h2></Col>
                </Row>
                <Row className="text-center mt-4 justify-content-center">

                    <Col xs={5} className="border-bottom mr-5"><h3>Item</h3></Col>
                    <Col xs={2} className="border-bottom mx-2 "><h3>Quantity</h3></Col>

                    <Col xs={2} className="border-bottom mx-2"><h3>Price</h3></Col>
                </Row>
                
                    {cart.map((eachItem)=>(
                        <CartItem key={eachItem} item={eachItem}></CartItem>
                    ))}
                <Row className="justify-content-center ">
                    <h3 className="mx-2">Total: ${getTotal()}</h3>
                </Row>
                <Row className="mt-4 ml-4"><Info pickupInfo={location.state.info}/></Row>
                
            </Container>
            <PaymentOption paymentInfo={location.state.info} cart={cart} user={user}/>
            
        </div>
    )
}

Payment.propTypes = {
    
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    item: state.item,
    cart: state.cart.cart,
    order: state.order,
})

const mapFunctionsToProps = {
    
}

export default connect(mapStateToProps, mapFunctionsToProps)(withRouter(Payment))
