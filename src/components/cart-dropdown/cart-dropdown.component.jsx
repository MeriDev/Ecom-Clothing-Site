import './cart-dropdown.styles.scss';
import { connect } from 'react-redux';
import CustomBtn from '../custom-button/custom-button-component';
import CartItem from '../cart_item/cart-item.component';

const CartDropdown = ({ cartItems }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CustomBtn>Go to Checkoout</CustomBtn>
    </div>
  );
};

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
});

export default connect(mapStateToProps)(CartDropdown);
