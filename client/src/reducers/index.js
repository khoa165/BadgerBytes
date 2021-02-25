import { combineReducers } from 'redux';
import auth from './auth';
import item from './item';
import cart from './cart';

export default combineReducers({ auth, item,cart});
