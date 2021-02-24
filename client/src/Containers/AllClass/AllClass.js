import React,{Component} from 'react';
import Home from '../Home/Home';
import Menu from '../Menu/Menu';
import Order from '../OrderOnline/OrderOnline';
import Cart from '../Cart/Cart';
import Account from '../Account/Account'
import Payment2 from '../Payment/Payment2'
import {Switch,Route, Redirect} from 'react-router-dom';
import Offer from '../Offer/Offer';
import axios from 'axios';
import ForLoad from '../../Components/miscelleous/forLoad';
import Login from '../Login/Login';
import item from '../../Components/Order/Items/Item/item';

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
            this.setState({
                isAuth: true, 
                isAdmin: res.data.admin, 
                isStaff: res.data.staff
            });
        })
    }

    componentDidMount(){
        // Check if user has a token
        this.handleAuth();
        axios.get("https://twobrother0927.firebaseio.com/.json").then((data)=>{
            this.setState({data:data.data});
            axios.get("/api/v1/items").then( menuItems => {
                console.log(menuItems.data);
                console.log(this.processFoodData(menuItems.data));
    
                let newData = {...this.state.data};
                newData.menu = this.processFoodData(menuItems.data);
                this.setState({ data: newData, loaded: true});
                console.log(this.state.data)
            });
        }).catch(err=>console.log("Some Error")).then(console.log("Lets try this "));
    }

    processFoodData(menuItems) {
        let formattedItems = {}

        menuItems.forEach( item => {
            // console.log(item)
            let itemObject = {
                image: item.picture_link,
                price: item.item_cost,
                availability: item.item_availability,
                description: item.item_description
            };
            
            if (item.item_category in formattedItems) {
                formattedItems[item.item_category][item.item_name] = itemObject
            } else {
                formattedItems[item.item_category] = {[item.item_name]: itemObject}
            }
        });
        return formattedItems;
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
                <Route exact path="/" render={ (props) =>
                    !this.state.isAuth ? (
                        <Redirect to="/login"/>
                    ) : (
                        <Home count={this.state.item.length} data={this.state.data.offers.home}/>
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
                    !this.state.isAuth ? (
                        <Redirect to="/login"/>
                    ) : (
                        <Cart adding={()=>this.addItem} 
                            remove={()=>this.removeItem} 
                            data={this.state.item}
                        />
                    )
                }/>

                <Route exact path="/menu"  render={ () =>
                    !this.state.isAuth ? (
                        <Redirect to="login"/>
                    ) : (
                        <Menu inbox={this.state.item.length}
                         data={this.state.data.menu} 
                         loaded={this.state.loaded} 
                         adding={()=>this.addItem}
                         />
                    )
                }/>

                <Route exact path="/offers" render={ () =>
                    !this.state.isAuth ? (
                        <Redirect to="login"/>
                    ) : (
                        <Offer count={this.state.item.length} 
                         data={this.state.data.offers.offer} 
                         board={this.state.data.offers.board}
                        />
                    )
                }/>

                <Route exact path="/order" render={ () => 
                    !this.state.isAuth ? (
                        <Redirect to="login"/>
                    ) : (
                        <Order count={this.state.item.length} 
                         data={this.state.item}
                        />
                    )
                }/>
                <Route exact path="/offers" render={ () =>
                    !this.state.isAuth ? (
                        <Redirect to="login"/>
                    ) : (
                        <Offer count={this.state.item.length} data={this.state.data.offers.offer} board={this.state.data.offers.board}
                        />
                    )
                }/>
                <Route exact path="/payment" render={ () =>
                    !this.state.isAuth ? (
                        <Redirect to="login"/>
                    ) : (
                        <Payment2 count={this.state.item.length} data={this.state.item}
                        />
                    )
                }/>
                {/* Added for future route to allow users to edit account info */}
                <Route exact path="/account" render={ () =>
                    !this.state.isAuth ? (
                        <Redirect to="login"/>
                    ) : (
                        <Account inbox={this.state.item.length}
                        data={this.state.data.menu} 
                        loaded={this.state.loaded} 
                        adding={()=>this.addItem}
                        />
                    )
                }/>
   
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

