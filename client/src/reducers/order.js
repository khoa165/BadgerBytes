import { GET_UNFINISHED_ORDERS } from '../actions/types';

const initialState = {
  currentOrders: [],
  loading: true,
};

export default function order_red(state = initialState, action) {
  // Destructuring type and payload from action.
  const { type, payload } = action;

  switch (type) {
    case GET_UNFINISHED_ORDERS:
      return { ...state, loading: false, currentOrders: payload };
    default:
      return state;
  }
}
