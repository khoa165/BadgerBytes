import {
  GET_MENU_ITEMS,
  SET_EDITED_ITEM,
  CLEAR_EDITED_ITEM,
  ADD_ITEM,
  UPDATE_ITEM,
  UPDATE_ITEM_AVAILABILITY,
} from '../actions/types';

const initialState = {
  menuItems: [],
  loading: true,
  currentEdited: null,
};

export default function item_red(state = initialState, action) {
  // Destructuring type and payload from action.
  const { type, payload } = action;

  switch (type) {
    case GET_MENU_ITEMS:
      return { ...state, loading: false, menuItems: payload };
    case SET_EDITED_ITEM:
      return { ...state, loading: false, currentEdited: payload };
    case CLEAR_EDITED_ITEM:
      return { ...state, loading: false, currentEdited: null };
    case ADD_ITEM:
      return {
        ...state,
        loading: false,
        menuItems: [...state.menuItems, payload],
      };
    case UPDATE_ITEM_AVAILABILITY:
    case UPDATE_ITEM:
      return {
        ...state,
        loading: false,
        menuItems: state.menuItems.map((item) =>
          item._id === payload._id ? payload : item
        ),
      };
    default:
      return state;
  }
}
