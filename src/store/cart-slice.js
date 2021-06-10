import {createSlice} from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name:'cart',
    initialState: {
        items: [],
        totalQuantity: 0
    },
    reducers:{
        addItem(state,action){
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (!existingItem){
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    quantity: 1,
                    price: newItem.price,
                    totalPrice: newItem.price
                });
            }else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
            state.totalQuantity++;
        },
        removeItem(state,action){
            const id = action.payload;
            const itemToRemove = state.items.find(item => item.id === id);
            if (itemToRemove.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            }else {
                itemToRemove.quantity --;
                itemToRemove.totalPrice = itemToRemove.totalPrice - itemToRemove.price;
            }
            state.totalQuantity--;
        }
    }

})

export const cartAction = cartSlice.actions;
export default cartSlice;