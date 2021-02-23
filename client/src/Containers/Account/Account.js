import React,{Component} from 'react';
import Toolbar from '../../Components/navigation/toolbar/toolbar';

// So users can edit accounts
class Account extends Component{
    
    render(){
        let dtr=this.props.loaded ? (
            <div>
                
                {/* <Backdrop click={()=>console.log("clicked")}/> */}
            <Toolbar count={this.props.inbox} />
            <p>placeholder</p>
            </div>
        ) : null;
        return(
            <div>
                {dtr}
            </div>
        );
    }
}

export default Account;