import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import Notification from "./components/UI/Notification";
import {fetchCartDatas, sendCartData} from "./store/cart-actions";

// pour eviter message de notification au chargement
let isInitial = true;

function App() {
    const dispatcher = useDispatch();
    const showCart = useSelector(state => state.ui.cartIsVisible);
    const notification = useSelector(state => state.ui.notification)

    //récup du cart mis à jour
    const cart = useSelector(state => state.cart);

    // chargement des données en bdd au chargement de la page ou rechargement
    useEffect(() =>{
        dispatcher(fetchCartDatas())
    },[dispatcher])
    //utilisation de useEffect prenant en compte la maj du cart pour envoi http =>>> Problème override la database avec panier vide quand reload
    useEffect(() => {
        if(isInitial){
            isInitial = false;
            return;
        }
        //utilisation de l'action creator
        dispatcher(sendCartData(cart))

        //en commentaire : sans action creator
        //fonction to fetch datas
        // const sendCartData = async () => {
        //     dispatcher(uiAction.showNotification({
        //         status: 'pending',
        //         title: 'sending...',
        //         message: 'sending cart datas'
        //     }));
        //     const response = await fetch('https://react-course-4cec8-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
        //         method: 'PUT',
        //         body: JSON.stringify(cart)
        //     });
        //     if (!response.ok) {
        //         throw new Error('Sending data failed.');
        //
        //     }

        //     dispatcher(uiAction.showNotification({
        //         status: 'succes',
        //         title: 'datas sent',
        //         message: 'cart datas sent'
        //     }))
        // }

        // sendCartData().catch(error => {
        //     dispatcher(uiAction.showNotification({
        //         status: 'error',
        //         title: 'error sending cart...',
        //         message: ' sending cart data failed...'
        //     }))
        // })
    }, [cart, dispatcher]);


    return (
        <>
            {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
            <Layout>
                {showCart && <Cart/>}
                <Products/>
            </Layout>
        </>
    );
}

export default App;
