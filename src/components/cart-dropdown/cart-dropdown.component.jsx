import './cart-dropdown.styles.scss';
import CustomBtn from '../custom-button/custom-button-component';

const CartDropdown = () => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items" />
      <CustomBtn>Go to Checkoout</CustomBtn>
    </div>
  );
};

export default CartDropdown;
