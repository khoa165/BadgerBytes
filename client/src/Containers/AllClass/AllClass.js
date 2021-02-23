import React,{Component} from 'react';
import Home from '../Home/Home';
import Menu from '../Menu/Menu';
import Order from '../OrderOnline/OrderOnline';
import Cart from '../Cart/Cart';
import Payment from '../Payment/Payment'
import Payment2 from '../Payment/Payment2'
import {Switch,Route, Redirect} from 'react-router-dom';
import Offer from '../Offer/Offer';
import axios from 'axios';
import ForLoad from '../../Components/miscelleous/forLoad';
import Login from '../Login/Login';

class allClass extends Component{
    constructor(props) {
        super(props);
        this.handleAuth = this.handleAuth.bind(this);
        this.state = {
            item: [],
            data: [],
            isAuth: false,
            isStaff: false,
            isAdmin: false
        }
    }

    async handleAuth() {
        await axios.get('/api/v1/auth', {
            headers: {
                'x-auth-token': sessionStorage.getItem('token')
            }
        }).then( (res) => {
            // this.state.isAuth = true
            this.setState({isAuth: true});
        })
        console.log('handling auth')
    }

    async componentDidMount(){
        axios.get("https://twobrother0927.firebaseio.com/.json").then((data)=>{
            this.setState({data:data.data,loaded:true});
        }).catch(err=>console.log("Some Error")).then(console.log("Lets trye this "));
        // Check if user has a token
        await this.handleAuth();
    }

    addItem=(obj)=>{
        let extra=[...this.state.item];
        var check=false;
        extra.forEach(element=>{
            if(element.head===obj.head){
                check=true;  
                element.counter+=1;
            }

        });
        if(!check){
            extra.push(obj);
        }
          
        this.setState({item:extra});
          
          alert(`${obj.head} is added to your cart`);
      }
      removeItem(obj){
        var copy=[...this.state.item];
        var check=false;
        let pos=-1;
        copy.forEach(element=>{
            
            if(element.head===obj.head && element.counter>=1 ){
                element.counter=element.counter-1;
                check=true;
            }
            pos+=1;
        });
        if(check){
            
            if(copy[pos].counter===0){
                copy=copy.slice(0,pos).concat(copy.slice(pos+1));
                
            }
        }
        this.setState({item:copy});
      }
      
    render(){
        const ddt=this.state.loaded?(
            <div>
            <Switch>
                <Route exact path="/" render={ props =>
                    this.state.isAuth ? (
                        <Home  count={this.state.item.length} data={this.state.data.offers.home}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
                <Route exact path="/login" render={ props =>
                    !this.state.isAuth ? (
                        <Login handleAuth={this.handleAuth}/>
                    ) : (
                        <Redirect to="/"/>
                    )
                }/>
                <Route exact path="/cart" render={ props=>
                    this.state.isAuth ? (
                        <Cart adding={()=>this.addItem} 
                            remove={()=>this.removeItem} 
                            data={this.state.item}
                        />
                    ) : (
                        <Redirect to="login"/>
                    )
                }/>

                <ProtectedRoute path="/menu" isAuth={this.state.isAuth} component={()=><Menu inbox={this.state.item.length} data={this.state.data.menu} loaded={this.state.loaded} adding={()=>this.addItem}/>}/>
                <Route exact path="/offers" component={()=><Offer count={this.state.item.length} data={this.state.data.offers.offer} board={this.state.data.offers.board}/>}/>
                <Route path="/order" component={()=><Order count={this.state.item.length} data={this.state.item}/>}/>
                <Route path="/offers" component={()=><Offer count={this.state.item.length} data={this.state.data.offers.offer} board={this.state.data.offers.board}/>}/>
                <Route path="/payment" component={()=><Payment2 count={this.state.item.length} data={this.state.item}/>}/>
   
            </Switch>
            </div>
        ):<ForLoad/>;
        return(
           ddt
        );
    }
}

export default allClass;

class ProtectedRoute extends Component {
    render() {
        const { component: Component, ...props } = this.props
  
        return (
            <Route 
            {...props} 
            render={props => (
                this.props.isAuth ?
                <Component {...props} /> :
                <Redirect to='/login' />
            )} 
            />
        )
    }
}

