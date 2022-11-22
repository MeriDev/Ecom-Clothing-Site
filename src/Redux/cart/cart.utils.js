export const addItemToCart = (cartItems, newItem) => {
  const existingCartItems = cartItems.find(item => item.id === newItem.id);

  if (existingCartItems) {
    return cartItems.map(item =>
      item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...cartItems, { ...newItem, quantity: 1 }];
};
