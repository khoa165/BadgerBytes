import { GET_CART, ADD_CART, EMPTY_CART } from '../actions/types';

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
    case ADD_CART:
      return {
        ...state,
        loading: false,
        cart: [...state.cart, payload],
      };
    case EMPTY_CART:
      return {
        ...state,
        loading: false,
        cart: [],
      };
    default:
      return state;
  }
}
