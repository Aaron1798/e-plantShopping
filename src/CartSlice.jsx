import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
    const { name, image, cost } = action.payload;
    const existingItem = state.items.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    }
    else {
        state.items.push({name, image, cost, quantity: 1});
    }
    state.totalQuantity++
    },
    removeItem: (state, action) => {
        const itemToRemove = state.items.find(item => item.name === action.payload);
        if(itemToRemove) {
            state.totalQuantity -= itemToRemove.quantity
            state.items = state.items.filter(item => item.name !== action.payload)
        }
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate){
            state.totalQuantity += quantity - itemToUpdate.quantity;
            itemToUpdate.quantity = quantity;
        }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;