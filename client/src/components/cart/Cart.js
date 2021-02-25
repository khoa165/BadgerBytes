import React from 'react'
import { connect } from 'react-redux'
import {Container,Row,Col,Button} from 'reactstrap'
import CartItem from './CartItem'



const Cart = ({
    history,
    auth:{user},
    item:{loading,menuItems},
    cart:{cart}
}) => {





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
        <h1 className='text-danger mb-5'>Welcome {user && user.name},</h1>
      )}
            <Container className="border border-2 shadow pb-4">
                <Row>
                    <Col><h2 class="text-center mt-2 ">Your Cart</h2></Col>
                </Row>
                <Row className="text-center mt-4 justify-content-center">
                    {console.log("HELLO")}
                    {console.log(cart)}
                    <Col xs={5} className="border-bottom mr-5"><h3>Item</h3></Col>
                    <Col xs={2} className="border-bottom mx-2 "><h3>Quantity</h3></Col>
                    <Col xs={2} className="border-bottom mx-2"><h3>Price</h3></Col>
                </Row>
                
                    {cart.map((item)=>(
                        <CartItem item={item}></CartItem>
                    ))}
                
            </Container>
            <Container className="mt-2">
                <Row className="justify-content-end"><Button color="success">Confirm order</Button></Row>
                
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    item: state.item,
    cart: state.cart
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
