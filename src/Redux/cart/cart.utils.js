export const addItemToCart = (cartItems, newItem) => {
  const existingCartItems = cartItems.find(item => item.id === newItem.id);

  if (existingCartItems) {
    return cartItems.map(item =>
      item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...cartItems, { ...newItem, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, ItemToRemove) => {
  const existingCartItems = cartItems.find(item => item.id === ItemToRemove.id);

  if (existingCartItems.quantity === 1) {
    return cartItems.filter(item => item.id !== ItemToRemove.id);
  }

  return cartItems.map(item =>
    item.id === ItemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};
