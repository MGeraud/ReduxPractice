
// mise en place d'un action creator pour envoi requete backend
import {uiAction} from "./ui-slice";
import {cartAction} from "./cart-slice";

export const fetchCartDatas = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://react-course-4cec8-default-rtdb.europe-west1.firebasedatabase.app/cart.json');
            if (!response.ok){
                throw new Error('Fetching datas failed.');
            };
            const datas = await response.json();

            return datas;
        };

        try {
            const cartDatas = await fetchData();
            // ou empty array car si rien en database
            dispatch(cartAction.replaceCart({items: cartDatas.items || [] ,
            totalQuantity: cartDatas.totalQuantity}))

        }catch (error) {
            dispatch(uiAction.showNotification({
                status: 'error',
                title: 'error fetching cart',
                message: 'Fetching datas failed.'
            }))
        }
    };
};

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
                body: JSON.stringify({items: cart.items,
                totalQuantity: cart.totalQuantity})
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