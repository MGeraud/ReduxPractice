import classes from './CartButton.module.css';
import {useDispatch, useSelector} from "react-redux";
import {uiAction} from "../../store/ui-slice";


const CartButton = (props) => {
    const totalItems = useSelector(state => state.cart.totalQuantity)

    const dispatch = useDispatch();

    const toggleCartHandler = () => {
        dispatch(uiAction.toggle());
    };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default CartButton;
