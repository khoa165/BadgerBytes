import React from 'react'
import { connect } from 'react-redux'
import {Row,Col,Button} from 'reactstrap'

 const CartItem = (item) => {

    const {item_name,item_cost,num} = item.item;


    return (
        <Row className="justify-content-center ">

                        <Col xs={5} className=" mr-5 text-center"><p>{item_name}</p></Col>
                        <Col xs={2} className=" mx-2 mt-2 "><Row className="justify-content-center"><p class="mr-2">{num}</p><button type="button" class="btn btn-success rounded-circle mx-2">+</button>
                        <button type="button" class="btn btn-primary btn-danger rounded-circle">-</button></Row></Col>
                        <Col xs={2} className=" mx-2 text-center"><p>{item_cost}</p>
                        
                        </Col>
                        
                        </Row>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapFunctionToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
