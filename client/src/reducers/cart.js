import { GET_CART } from '../actions/types';

const initialState = {
  cart: [],
  loading: true,
};

export default function cart_red(state = initialState, action) {
  // Destructuring type and payload from action.
  const { type, payload } = action;

  switch (type) {
    case GET_CART:
      return { ...state, loading: false, cart: payload };
    default:
      return state;
  }
}
