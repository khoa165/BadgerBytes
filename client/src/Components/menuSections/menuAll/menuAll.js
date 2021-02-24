import React, { Component } from 'react';
import './menuAll.css';
import Single from './singleContain/single';
import Inoptions from '../menuAll/inOptions/inOptions';
import Modal from '../../navigation/modal/modal';
import Backdrop from '../../navigation/backdrop/backdrop';
import { Container, Row, Col } from 'reactstrap';
import {Button} from 'reactstrap';

class menuAll extends Component {

    constructor(props) {
        super(props)
        this.state = {options: [],
            load:"Select From Above",
            showCustomize:false,
            sendData:{}
        };
        this.loadStateHandler = this.loadStateHandler.bind(this);
    }

    loadStateHandler(name){
        console.log(name)
        console.log(this.props)
        this.setState({ load : name, sendData : this.props.data[name] });
      
    }
    render() {
        console.log(this.props.data)
        let opn = Object.keys(this.props.data).map(data => <Single  name={data} click={this.loadStateHandler}  key={data} />);
        let outPut=(
            <div className="menuAll">
                {opn}
                <Inoptions adding={this.props.adding} 
                    selected={this.state.load} 
                    data={this.state.sendData}
                    check={opn} />
            </div>
        );
        return (
            <div>
            {outPut}
            </div>
           
        );
    }

}

export default menuAll;