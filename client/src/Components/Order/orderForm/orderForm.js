import React,{Component} from 'react';
import './orderForm.css';
import {Container,Row,Col} from 'reactstrap';
import Button from '../../buttons/grab-offer/grab-btn';

class  orderForm extends Component{

    constructor(props) {
        super(props);
        this.state = {name:"",
        phone:"",
        streetAddress:"",
        houseNumber:"",
        city:"",
        zipcode:"",};
      }
    
    nameHandler(e){
        this.setState({name:e.target.value});
    }
    phoneHandler(e){
        this.setState({phone:e.target.value});
    }
    streetHandler(e){
        this.setState({streetAddress:e.target.value});
    }
    houseNumberHandler(e){
        this.setState({houseNumber:e.target.value});
    }
    cityHandler(e){
        this.setState({city:e.target.value});
    }
    zipcodeHandler(e){
        this.setState({zipcode:e.target.value});
    }

    render(){
        var checkOut={
            name:this.state.name,
            phone:this.state.number,
            streetAddress:this.state.streetAddress,
            houseNumber:this.state.houseNumber,
            city:this.state.city,
            zipcode:this.state.zipcode
        };
        return(
        <div className="OrderForm">
        <p className="OrderFormHead">Fill Delivery Details</p>
            <form id="orderForm">
                <div className="form__container">
                <Container>
                    <Row>
                        <Col xs="6" xl="4">
                            <legend>
                                <p>Name</p>
                            </legend>
                        </Col>
                        <Col xs="6" xl="8">
                        <input type="text" value={this.state.name} onChange={this.nameHandler} id="CustomerName"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" xl="4">
                            <legend>
                                <p>Phone number</p>
                            </legend>
                        </Col>
                        <Col xs="6" xl="8">
                        <input type="text" value={this.state.phone} onChange={this.phoneHandler} id="Number"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" xl="4">
                            <legend>
                                <p>Street Address</p>
                            </legend>
                        </Col>
                        <Col xs="6" xl="8">
                        <input type="text" value={this.state.streetAddress} onChange={this.streetHandler} id="StreetAddress"/>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="6" xl="4">
                            <legend>
                                <p>Building/Apt No.</p>
                            </legend>
                        </Col>
                        <Col xs="6" xl="8">
                        <input type="text" value={this.state.houseNumber} onChange={this.houseNumberHandler} id="HouseNumber"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" xl="4">
                            <legend>
                                <p>City</p>
                            </legend>
                        </Col>
                        <Col xs="6" xl="8">
                        <input type="text" value={this.state.city} onChange={this.cityHandler} id="City"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" xl="4">
                            <legend>
                                <p>Zip Code</p>
                            </legend>
                        </Col>
                        <Col xs="6" xl="8">
                        <input type="text" value={this.state.zipcode} onChange={this.zipcodeHandler} id="ZipCode"/>
                        </Col>
                    </Row>

 
                </Container>
                </div>
                <Button type="button" url="/payment" content="Place Order"></Button>
            </form>
            
            <p className="OrderFormNotice">*You will be able to select payment option.</p>
        </div>
    );
}
}

export default orderForm;