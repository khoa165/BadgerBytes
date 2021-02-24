import React, { Component } from 'react';
import  './menuHeader.css';
import {NavLink} from 'react-router-dom';
import MenuAll from '../menuAll/menuAll';
import Footer from '../../navigation/footer/footer';

class menuHeader extends Component {

    constructor(props) {
        super(props)
    }

    render(){
        // console.log(this.props.data)
        return(
        <div>
        <section className="menuHeader">
            {this.props.children}
            <p className="menuTitle">MENU</p>
            <ul>
                <li>
                <NavLink  to="/">Home </NavLink>
                </li>
                <li>
                <NavLink  to="/menu">Menu </NavLink>
                </li>
            </ul>
        </section>

        <section className="menu-options">
            <MenuAll adding={this.props.adding} data={this.props.data}/>
        </section>

        <Footer/>
        </div>
        );
    }
}

export default menuHeader;