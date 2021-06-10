import {createSlice} from "@reduxjs/toolkit";
import {uiAction} from "./ui-slice";


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

// mise en place d'un action creator pour envoi requete backend
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiAction.showNotification({
            status: 'pending',
            title: 'sending...',
            message: 'sending cart datas'
        }));

        const sendRequest = async () => {
            const response = await fetch('https://react-course-4cec8-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
            });
            if (!response.ok) {
                throw new Error('Sending data failed.');
            };
        }

        try {
            await sendRequest();
            dispatch(uiAction.showNotification({
                status: 'succes',
                title: 'datas sent',
                message: 'cart datas sent'
            }));
        } catch (error){
            dispatch(uiAction.showNotification({
                status: 'error',
                title: 'error sending cart...',
                message: ' sending cart data failed...'
            }))
        }



    }
}

export const cartAction = cartSlice.actions;
export default cartSlice;