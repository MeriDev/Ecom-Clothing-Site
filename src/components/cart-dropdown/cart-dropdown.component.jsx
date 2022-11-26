import './cart-dropdown.styles.scss';
import { connect } from 'react-redux';
import CustomBtn from '../custom-button/custom-button-component';
import CartItem from '../cart_item/cart-item.component';
import { selectCartItems } from '../../Redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';

const CartDropdown = ({ cartItems }) => {
  const navigate = useNavigate();

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map(item => <CartItem key={item.id} item={item} />)
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomBtn onClick={() => navigate('/checkout')}>
        Go to Checkoout
      </CustomBtn>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default connect(mapStateToProps)(CartDropdown);
