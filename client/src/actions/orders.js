import axios from 'axios';
import { GET_UNFINISHED_ORDERS } from './types';
import { toast } from 'react-toastify';

const API = 'api/v1';

// Get current orders for admin/staff.
export const getUnfinishedOrders = () => async (dispatch) => {
  try {
    // Send request to API endpoints.
    const res = await axios.get(`/${API}/orders`);
    // Call reducer to load orders into state.
    dispatch({
      type: GET_UNFINISHED_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};
