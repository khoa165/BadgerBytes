import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// Routing components.
import PrivateRoute from '../routing/PrivateRoute';
// Authentication components.
import Register from '../auth/Register';
import Login from '../auth/Login';
// Page component.
import NotFound from '../pages/NotFound';
// Layout components.
import NavigationBar from '../layout/NavigationBar';
// Account component.
import Account from '../account/Account';
// Menu component.
import Menu from '../menu/Menu';
import ItemCreate from '../menu/ItemCreate';
import ItemEdit from '../menu/ItemEdit';
// Dashboard component.
import Dashboard from '../dashboard/Dashboard';

// Cart component
import Cart from '../cart/Cart'

//Payment component
import Payment from '../payment/Payment'

// Library component.
import { Container } from 'reactstrap';

const Routes = () => {
  return (
    <Fragment>
      <NavigationBar />
      <Container className='my-5'>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/account' component={Account} />
          <PrivateRoute exact path='/menu' component={Menu} />
          <PrivateRoute exact path='/items/new' component={ItemCreate} />
          <PrivateRoute exact path='/items/:item_id' component={ItemEdit} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/cart' component={Cart} />
          <PrivateRoute exact path='/payment' component={Payment} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Fragment>
  );
};

export default Routes;
