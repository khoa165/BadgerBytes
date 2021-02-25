import axios from 'axios';
import {
    GET_CART,
     ADD_CART,
} from './types';
import { toast } from 'react-toastify';

// Clear current edited task.
export const addToCart = (history,item_name,item_cost,num) => async (dispatch) => {
    //ADD item to cart 
    dispatch({
      type: ADD_CART,
      payload:{item_name,item_cost,num}
    });
    history.push(`/cart`);
  };

//   // Increase item quantity
// export const addToCart = (history,item_id,item_name,item_cost,num) => async (dispatch) => {
//   try {
//       // Request headers.
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//     const body = JSON.stringify({
    
//     })
//     // Send request to API endpoints.
//     const res = await axios.post(`/${API}/order`);
//     // Call reducer to load items into state.
//     dispatch({
//       type: GET_MENU_ITEMS,
//       payload: res.data,
//     });
//   } catch (err) {
//     // Loop through errors and notify user.
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach((error) => toast.error(error.msg));
//     }
//   }

// };