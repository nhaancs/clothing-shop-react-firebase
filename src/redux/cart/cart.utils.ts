import { CartItem } from "../../models/cart.model";

export const addItemToCart = (
  existingItems: CartItem[],
  addedItem: CartItem
): CartItem[] => {
  const existingItem = existingItems.find((item) => item.id === addedItem.id);

  if (existingItem) {
    return existingItems.map((item) =>
      item.id === addedItem.id
        ? { ...item, quantity: item.quantity + addedItem.quantity }
        : item
    );
  }

  return [...existingItems, addedItem];
};

export const removeItemToCart = (
  existingItems: CartItem[],
  removedItem: CartItem
): CartItem[] => {
  return existingItems.filter((item) => item.id !== removedItem.id);
};

export const decreaseQuantityOrRemoveCartItem = (
  existingItems: CartItem[],
  cartItem: CartItem
): CartItem[] => {
  const existingItem = existingItems.find((item) => item.id === cartItem.id);

  if (!existingItem) {
    return [];
  }

  if (existingItem.quantity === 1) {
    return removeItemToCart(existingItems, cartItem);
  }

  return existingItems.map((item) =>
    item.id === cartItem.id ? { ...item, quantity: item.quantity - 1 } : item
  );
};
