import { GET_UNFINISHED_ORDERS, UPDATE_STATUS_PRIOR } from '../actions/types';

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
    case UPDATE_STATUS_PRIOR:
      return {
        ...state,
        loading: false,
        currentOrders: payload.completed
          ? state.currentOrders.filter((order) => order._id !== payload._id)
          : state.currentOrders.map((order) =>
              order._id === payload._id ? payload : order
            ),
      };
    default:
      return state;
  }
}
