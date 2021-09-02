import { CartItem } from "../../models/cart.model";

export const addItemToCart = (existingItems: CartItem[], addedItem: CartItem): CartItem[] => {
    const existingItem = existingItems.find(item => item.id === addedItem.id)

    if (existingItem) {
        return existingItems.map(item => 
            item.id === addedItem.id ? {...item, quantity: item.quantity + addedItem.quantity} : item
        )
    }

    return [...existingItems, addedItem]
}