import axios from 'axios';
import { GET_UNFINISHED_ORDERS, UPDATE_STATUS_PRIOR } from './types';
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

// Update status/priority.
export const updateStatusPrior = (id, data) => async (dispatch) => {
  try {
    // Request headers.
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Send request to API endpoints.
    const res = await axios.put(`/${API}/orders/${id}`, data, config);

    // Call reducer to load orders into state.
    dispatch({
      type: UPDATE_STATUS_PRIOR,
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
