import './cart-icon.styles.scss';
import { ReactComponent as ShoppingCart } from '../../assets/shopping-bag.svg.svg';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../Redux/cart/cart-actions';
import { selectCartItemsCount } from '../../Redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

const CartIcon = ({ toggleCart, itemCount }) => {
  return (
    <div className="cart-icon" onClick={() => toggleCart({})}>
      <ShoppingCart className="shopping-icon" />
      <span className="item-count"> {itemCount} </span>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

const mapDispatchToProps = dispatch => ({
  toggleCart: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
