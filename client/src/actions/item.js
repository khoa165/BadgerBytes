import axios from 'axios';
import {
  GET_MENU_ITEMS,
  SET_EDITED_ITEM,
  CLEAR_EDITED_ITEM,
  ADD_ITEM,
  UPDATE_ITEM,
} from './types';
import { toast } from 'react-toastify';

const API = 'api/v1';

// Get default items of current authenticated user.
export const getMenuItems = () => async (dispatch) => {
  try {
    // Send request to API endpoints.
    const res = await axios.get(`/${API}/items`);
    // Call reducer to load items into state.
    dispatch({
      type: GET_MENU_ITEMS,
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

export const setEditedItem = (history, item) => async (dispatch) => {
  try {
    console.log('in set edited item');
    console.log(item);
    // Call reducer to set current item for edited.
    dispatch({
      type: SET_EDITED_ITEM,
      payload: item,
    });
    history.push(`/items/${item._id}`);
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};

// Clear current edited task.
export const clearEditedItem = () => async (dispatch) => {
  // Call reducer to indicate no item currently edited.
  dispatch({
    type: CLEAR_EDITED_ITEM,
  });
};

export const editItem = (history, item, edit) => async (dispatch) => {
  try {
    // Request headers.
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Send request to API endpoints.
    const res = await axios.post(`/${API}/items`, item, config);

    // Call reducer to update item or add new item.
    if (edit) {
      // Update item
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data,
      });
    } else {
      // Add item
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      });
    }

    dispatch(clearEditedItem());
    history.push(`/menu`);
    toast.success(edit ? 'Item updated successfully!' : 'New item added!');
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};
