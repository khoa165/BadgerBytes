import React,{Component,useState} from 'react';
import './orderForm.css';
import {Container,Row,Col} from 'reactstrap';
import Button from '../../buttons/grab-offer/grab-btn';
import { Redirect } from "react-router-dom"; 


function orderForm2(props) {

    const [deliveryInfo,setDeliveryInfo] = useState([{
        userName:"",
        phone:"",
        streetAddress:"",
        houseNumber:"",
        city:"",
        zipcode:"",
    }])
    const [isFilled,setIsFilled] = useState(false);

    const nameHandler = (e) => {
        setDeliveryInfo({userName:e.target.value})
    }
    const phoneHandler = (e) =>{
        setDeliveryInfo({phone:e.target.value});
    }
    const streetHandler = (e) =>{
        setDeliveryInfo({streetAddress:e.target.value});
    }
    const houseNumberHandler = (e) =>{
        setDeliveryInfo({houseNumber:e.target.value});
    }
    const cityHandler = (e) =>{
        setDeliveryInfo({city:e.target.value});
    }
    const zipcodeHandler = (e) =>{
        setDeliveryInfo({zipcode:e.target.value});
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        // return <Redirect to="/payment" />
        if(deliveryInfo.userName === "" || deliveryInfo.phone === "" || deliveryInfo.streetAddress === "" || deliveryInfo.houseNumber === "" ||deliveryInfo.city === "" || deliveryInfo.zipcode === ""){
            alert("Please fill out all information");
        }else{
            return <Redirect to="/payment"/>
            
        }
    }
    return (
        <div>
            <div className="OrderForm">
        <p className="OrderFormHead">Fill Delivery Details</p>
            <form id="orderForm" onSubmit={onSubmit}>
                <div className="form__container">
                <Container>
                    <Row>
                        <Col xs="6" xl="4">
                            <legend>
                                <p>Name</p>
                            </legend>
                        </Col>
                        <Col xs="6" xl="8">
                        <input type="text" required value={deliveryInfo.userName} onChange={e=>nameHandler(e)} id="CustomerName"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" xl="4">
                            <legend>
                                <p>Phone number</p>
                            </legend>
                        </Col>
                        <Col xs="6" xl="8">
                        <input type="text" required value={deliveryInfo.phone} onChange={e=>phoneHandler(e)} id="Number"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" xl="4">
                            <legend>
                                <p>Street Address</p>
                            </legend>
                        </Col>
                        <Col xs="6" xl="8">
                        <input type="text" required value={deliveryInfo.streetAddress} onChange={e=>streetHandler(e)} id="StreetAddress"/>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs="6" xl="4">
                            <legend>
                                <p>Building/Apt No.</p>
                            </legend>
                        </Col>
                        <Col xs="6" xl="8">
                        <input type="text" required value={deliveryInfo.houseNumber} onChange={e=>houseNumberHandler(e)} id="HouseNumber"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" xl="4">
                            <legend>
                                <p>City</p>
                            </legend>
                        </Col>
                        <Col xs="6" xl="8">
                        <input type="text" required value={deliveryInfo.city} onChange={e=>cityHandler(e)} id="City"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6" xl="4">
                            <legend>
                                <p>Zip Code</p>
                            </legend>
                        </Col>
                        <Col xs="6" xl="8">
                        <input type="text" required value={deliveryInfo.zipcode} onChange={e=>zipcodeHandler(e)} id="ZipCode"/>
                        </Col>
                    </Row>

 
                </Container>
                </div>
                <Button type="submit" url="/payment" content="PlaceOrder"></Button>
            </form>
            
            <p className="OrderFormNotice">*You will be able to select payment option.</p>
        </div>
        </div>
    )
}

export default orderForm2
