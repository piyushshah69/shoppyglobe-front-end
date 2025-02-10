import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const availableItem = state.find(item => item.id === action.payload.id);
            if (availableItem) {
                availableItem.quantity++;
            } else {
                state.push(
                    {
                        id: action.payload.id,
                        quantity: 1,
                        product: action.payload,
                        amount: (action.payload.price - (action.payload.discountPercentage / 100) * action.payload.price).toFixed(2),
                    }
                );
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            return state.filter(item => item.id != id);
        },
        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const item = state.find(item => item.id === id);
            item.quantity--;
        },
        emptyCart: () => {
            return [];
        }
    }
})

export const { addToCart, removeFromCart, decreaseQuantity, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;