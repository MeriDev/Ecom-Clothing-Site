import './cart-icon.styles.scss';
import { ReactComponent as ShoppingCart } from '../../assets/shopping-bag.svg.svg';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../Redux/cart/cart-actions';

const CartIcon = ({ toggleCart }) => {
  return (
    <div className="cart-icon" onClick={() => toggleCart()}>
      <ShoppingCart className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  toggleCart: () => dispatch(toggleCartHidden()),
});

export default connect(null, mapDispatchToProps)(CartIcon);
