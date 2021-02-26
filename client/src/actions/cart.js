import axios from 'axios';
import {
    GET_CART,
} from './types';
import { toast } from 'react-toastify';

const API = 'api/v1';


export const getCart =() => async(dispatch)=>{
  // Request headers.

  try {
    // Send request to API endpoints.
    const res = await axios.get(`/${API}/orders/me`);
    // Call reducer to load items into state.
    dispatch({
      type: GET_CART,
      payload: res.data.items,
    });
    
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }

};

  // Increase item quantity
export const addToCart = (id,quantity) => async (dispatch) => {
  // Request headers.
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

    const body = JSON.stringify({
    id,
    quantity
    })

    console.log("ID",id,quantity)
  try {
      
    // Send request to API endpoints.
    const res = await axios.post(`/${API}/orders/items`,body,config);
    toast.success("Items added to cart 👍🏽")

  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }

};

export const submitOrder = (orderInfo) => async (dispatch)=>{
  // Request headers.
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(orderInfo)

  try {
      
    // Send request to API endpoints.
    const res = await axios.post(`/${API}/orders/`,body,config);

  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }

}