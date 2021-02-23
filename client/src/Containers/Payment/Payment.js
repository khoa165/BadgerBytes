import React, { useState,Component } from 'react'
import Footer from '../../Components/navigation/footer/footer';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Container,Row,Col} from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {dropdownOpen:false,
            paypal:false,
            creditcard:false};
      }
    

    toggle() {
        this.setState({dropdownOpen:!this.state.dropdownOpen})
    }

    render() {
        const PaymentOptions=(<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Credit Card</DropdownItem>
              <DropdownItem>Paypal</DropdownItem>
              <DropdownItem>Quo Action</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )

        const CreditCard=(<div class="mt-4">Credit Card</div>)
        return (
            <div>
                <section className="Payment">
                <h2>Payment</h2>
                <div>
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/menu">Menu</NavLink>
                            <NavLink to="/order">Order Online</NavLink>
                        </div>
                </section>
                <section className="PaymentOption">
                <Container>
                    <Row>
                        <Col xs={4}><p>Please select a payment option:</p></Col>
                        <Col xs={8}>{PaymentOptions}</Col></Row>
                </Container>
                </section>
                
                {CreditCard}
                
                <Footer/>

            </div>
        )
    }
}
