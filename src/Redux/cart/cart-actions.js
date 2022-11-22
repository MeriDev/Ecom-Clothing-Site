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
