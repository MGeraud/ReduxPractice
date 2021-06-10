import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from "react-redux";
import {useEffect} from "react";

function App() {

    const showCart = useSelector(state => state.ui.cartIsVisible);

    //récup du cart mis à jour
    const cart = useSelector(state => state.cart);
    //utilisation de useEffect prenant en compte la maj du cart pour envoi http
    useEffect(() => {
        fetch('https://react-course-4cec8-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
            method: 'PUT',
            body: JSON.stringify(cart)
        },[cart])
    })

  return (
    <Layout>
        {showCart && <Cart/>}
      <Products />
    </Layout>
  );
}

export default App;
