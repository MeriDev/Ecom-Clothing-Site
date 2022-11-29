import { cartTypes } from './cart-types';

export const toggleCartHidden = () => {
  return {
    type: cartTypes.TOGGLE_CART,
  };
};

export const addItemsToCart = item => {
  return {
    type: cartTypes.ADD_ITEM,
    payload: item,
  };
};

export const clearItemsFromCart = item => {
  return {
    type: cartTypes.CLEAR_ITEM_FROM_CART,
    payload: item,
  };
};

export const removeItemFromCart = item => {
  return {
    type: cartTypes.REMOVE_ITEM,
    payload: item,
  };
};
